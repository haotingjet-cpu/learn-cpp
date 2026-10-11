# 完成訊息佇列與處理執行緒

本節把第十二節的 `Message`、`Handler` 和註冊表概念組合成可啟動、提交工作及停止的單一 worker 服務。為了讓資料流程清楚，佇列暫不設容量上限；生產系統需另訂背壓策略。

```cpp
#include <condition_variable>
#include <deque>
#include <exception>
#include <functional>
#include <iostream>
#include <map>
#include <memory>
#include <mutex>
#include <string>
#include <thread>
#include <utility>

struct Message {
    std::string type;
    std::string payload;
};
using Handler = std::function<void(const Message&)>;

class MessageServer {
public:
    MessageServer() : worker_([this] { run(); }) {}

    ~MessageServer() {
        stop();
    }

    MessageServer(const MessageServer&) = delete;
    MessageServer& operator=(const MessageServer&) = delete;

    bool register_handler(std::string type, Handler handler) {
        if (type.empty() || !handler) return false;
        const std::lock_guard<std::mutex> lock(mutex_);
        if (stopping_) return false;
        auto stored_handler =
            std::make_shared<const Handler>(std::move(handler));
        return handlers_.emplace(std::move(type),
                                 std::move(stored_handler)).second;
    }

    bool submit(Message message) {
        {
            const std::lock_guard<std::mutex> lock(mutex_);
            if (stopping_) return false;
            queue_.push_back(std::move(message));
        }
        ready_.notify_one();
        return true;
    }

    void stop() {
        {
            const std::lock_guard<std::mutex> lock(mutex_);
            if (stopping_) return;
            stopping_ = true;
        }
        ready_.notify_all();
        if (worker_.joinable()) worker_.join();
    }

private:
    void run() {
        while (true) {
            Message message;
            std::shared_ptr<const Handler> handler;
            {
                std::unique_lock<std::mutex> lock(mutex_);
                ready_.wait(lock, [this] {
                    return stopping_ || !queue_.empty();
                });
                if (queue_.empty() && stopping_) return;
                message = std::move(queue_.front());
                queue_.pop_front();

                const auto it = handlers_.find(message.type);
                if (it != handlers_.end()) handler = it->second;
            }

            if (!handler || !*handler) {
                std::cerr << "no handler for message type: "
                          << message.type << '\n';
                continue;
            }

            try {
                (*handler)(message); // 不持有 mutex_ 執行外部程式碼
            } catch (const std::exception& error) {
                std::cerr << "message handler failed: "
                          << error.what() << '\n';
            } catch (...) {
                std::cerr << "message handler failed: unknown exception\n";
            }
        }
    }

    std::mutex mutex_;
    std::condition_variable ready_;
    std::deque<Message> queue_;
    std::map<std::string, std::shared_ptr<const Handler>> handlers_;
    bool stopping_{};
    std::thread worker_;
};
```

## 條件變數一定搭配述詞

`wait(lock, predicate)` 等價於在迴圈中等待並反覆檢查條件。條件變數可能虛假喚醒，因此不能只呼叫一次 `wait` 就假設佇列已有資料。

## 取出與執行分離

worker 在鎖內將訊息移出佇列，並複製對應處理器的 `shared_ptr`；離開鎖後才呼叫處理器。`shared_ptr` 在此讓正在執行的 handler 物件在鎖外保持有效，不會因註冊表生命週期而提前消失。這可避免複製任意 handler 本身時執行使用者自訂複製程式碼，也避免處理器執行很久時阻塞其他提交者或回呼重新進入伺服器時死結。一般程式若不用動態共享生命週期，優先選用更簡單的值或 `unique_ptr`；這裡的 `shared_ptr` 是為了鎖外安全使用 handler 的具體設計選擇。

## 尚待補足的生命週期

`stop()` 會排空已接受的訊息後再返回；停止後提交及註冊都回傳 `false`。此教學版要求由單一管理執行緒呼叫 `stop()`，不要從 handler 內呼叫它，因為 worker 不能等待自己結束。析構子會呼叫 `stop()`，確保一般離開作用域時完成等待。

處理器例外會輸出診斷後繼續處理後續訊息。實際系統通常應注入錯誤回報通道，而不是把 `std::cerr` 寫死；執行緒建立失敗、佇列配置失敗等資源錯誤仍須由服務啟動端處理。