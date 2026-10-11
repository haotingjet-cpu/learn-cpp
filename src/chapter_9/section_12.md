# 使用 `map` 與函式物件註冊訊息處理器

每種訊息類型映射到一個可呼叫物件。使用 `std::function` 統一儲存簽章，讓註冊者可傳入函式或 Lambda。

```cpp
#include <functional>
#include <map>
#include <string>
#include <string_view>
#include <utility>

struct Message {
    std::string type;
    std::string payload;
};

using Handler = std::function<void(const Message&)>;

class Dispatcher {
public:
    bool register_handler(std::string type, Handler handler) {
        if (type.empty() || !handler) return false;
        const auto [it, inserted] =
            handlers_.emplace(std::move(type), std::move(handler));
        return inserted;
    }

    bool dispatch(const Message& message) const {
        const auto it = handlers_.find(message.type);
        if (it == handlers_.end()) return false;
        it->second(message);
        return true;
    }

private:
    std::map<std::string, Handler> handlers_;
};
```

此基本版本不是執行緒安全的；註冊與派送不能同時由多執行緒呼叫。下一節會將註冊表納入服務鎖保護。空 `std::function` 不可呼叫，因此註冊時拒絕空處理器。

## 註冊 Lambda

```cpp
Dispatcher dispatcher;
dispatcher.register_handler("status", [](const Message& message) {
    // 解析並處理 message.payload
});
```

不要捕獲生命週期較短的區域變數參考，再把 Lambda 長期存進註冊表。若需要狀態，優先以值捕獲必要資料，或使用由服務明確擁有的處理器物件。

## 重複鍵策略

`emplace` 對同一類型只允許首次註冊成功。若產品需要替換處理器，可改用 `insert_or_assign` 並文件化替換時機；註冊與派送併發時，替換操作也必須同步。

## 解析限制

此處 `payload` 是已解析的文字，不是網路資料。正式入口必須在進佇列前限制訊息長度、驗證格式並拒絕無效輸入；不能把未信任輸入直接當成任意命令執行。