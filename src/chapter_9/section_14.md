# 執行緒安全與 HTTP 風格訊息模擬測試

本節完成停止協定並測試訊息處理。範例仍是程序內模型；「HTTP 風格」只指使用 `GET /status` 這類文字欄位，不會開啟 socket，也不實作 HTTP 規範。

## 停止協定與生命週期

第十三節的 `stop()` 在鎖內設置 `stopping_ = true`，解鎖後喚醒 worker，並等待它完成佇列中已接受的工作。worker 的等待述詞是 `stopping_ || !queue_.empty()`。停止後若佇列仍有訊息，仍先取出處理；佇列清空後退出。

若需求是停止時丟棄佇列，需另訂策略並回報被丟棄工作數。`stop()` 要由單一管理執行緒呼叫，不可由 worker 自己呼叫並等待自己加入。重複呼叫在此版本中安全，但同時由多個執行緒呼叫 `stop()` 不在保證範圍內。

## HTTP 風格測試資料

註冊一個 `status` handler，輸入 `"GET /status"` 後將它轉成結構化 `Message`。使用 `std::promise`/`std::future` 等待明確完成訊號，避免用固定 `sleep_for` 猜測工作已完成：

```cpp
#include <chrono>
#include <future>
#include <stdexcept>
#include <string>

std::promise<std::string> response_promise;
auto response_future = response_promise.get_future();

MessageServer server;
const bool registered = server.register_handler(
   "status", [&response_promise](const Message& message) {
       response_promise.set_value("200 OK: " + message.payload);
   });
if (!registered) {
    throw std::runtime_error("could not register status handler");
}

const bool accepted =
   server.submit(Message{"status", "GET /status"});
if (!accepted) {
    throw std::runtime_error("server rejected the message");
}
if (response_future.wait_for(std::chrono::seconds(2)) !=
    std::future_status::ready) {
    throw std::runtime_error("timed out waiting for handler");
}
if (response_future.get() != "200 OK: GET /status") {
    throw std::runtime_error("unexpected handler response");
}
server.stop();
```

此測試只提交一筆訊息，因此 promise 僅設定一次。這裡以明確的 `if` 檢查失敗條件，而不把等待操作放在 `assert` 中：若建置時定義 `NDEBUG`，`assert` 內的運算式可能不執行。若等待逾時，擲出例外後區域物件仍會正常解構，`MessageServer` 會停止並 join worker。正式測試框架也可用 RAII fixture 確保失敗時完成清理。

`submit()` 回傳 `true` 表示訊息已進入佇列，不代表 handler 已成功處理。測試資料應先由專用 parser 驗證方法與路徑，再建立 `Message`；本例刻意省略 parser，不能視為 HTTP 請求解析器。此程式碼需與[第十三節](section_13.md)的 `MessageServer` 定義放在同一翻譯單元或透過標頭檔包含。

至少覆蓋：

- 已註冊訊息正常派送。
- 未知訊息類型會由 worker 輸出診斷；`submit()` 成功僅代表已排入佇列。
- 多個 producer 同時提交，所有已接受訊息都被處理一次。
- 停止後新訊息被拒絕。
- 停止時既有佇列按指定策略排空或丟棄。
- 處理器失敗不會使 worker 靜默死亡，失敗能由明確通道觀察。
- 重複停止及空佇列停止可正常完成。

## 執行緒安全檢查

註冊表、佇列與停止狀態若共用同一把鎖，每次讀寫都必須持鎖；不要回傳指向容器內部的參考供鎖外使用。處理器複本拿到後可在鎖外呼叫。使用 ThreadSanitizer 等工具（若平台支援）輔助檢查，但工具通過不能取代正確的同步設計。