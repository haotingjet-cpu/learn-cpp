# 日誌模組重構：使用智慧指標管理 sink

第七章的 Logger 以 `LogSink&` 保存非擁有參考，呼叫端必須確保 sink 活得更久。若 Logger 應負責 sink 生命週期，可改成持有 `std::unique_ptr<LogSink>`。

以下是類別主體片段，假設 `LogSink`、`Formatter`、`LogLevel` 與 `rank` 已依[第七章介面](../chapter_7/section_15.md)定義；新增的標頭列出本段直接使用的標準函式庫功能。

```cpp
#include <memory>
#include <stdexcept>
#include <string>
#include <string_view>
#include <utility>

class Logger {
public:
    explicit Logger(std::unique_ptr<LogSink> sink)
        : sink_(std::move(sink)) {
        if (!sink_) {
            throw std::invalid_argument("Logger requires a sink");
        }
    }

    bool log(LogLevel level, std::string_view message) {
        if (rank(level) < rank(minimum_)) return true;
        return sink_->write(formatter_.format(level, message));
    }

private:
    Formatter formatter_;
    std::unique_ptr<LogSink> sink_;
    LogLevel minimum_{LogLevel::info};
};
```

建構函式的參數型別是 `std::unique_ptr<LogSink>`，表示它會接收一個唯一擁有者。初始化列表中的 `std::move(sink)` 把所有權移到成員；如果不移動，因為 `unique_ptr` 不可複製，程式無法編譯。`sink_` 成員宣告在 `formatter_` 之後，解構時會先銷毀 `sink_`，再銷毀 `formatter_`；這個類別沒有讓 Logger 保存指向 Formatter 的參考，因此兩者的先後不影響使用安全。

建立時移交所有權：

```cpp
auto logger = std::make_unique<Logger>(
    std::make_unique<FileSink>("service.log"));
```

這個 API 保證 Logger 擁有 sink，避免 sink 參考懸空。建構 `FileSink` 後仍必須檢查檔案開啟結果；可讓 FileSink 建構失敗時拋出明確例外，或透過工廠回傳錯誤結果。不可把「`unique_ptr` 非空」當成「檔案成功開啟」。

## 何時仍用參考

若 sink 由外部管理、Logger 只借用它，參考可表達非擁有關係；但生命週期契約要清楚。`unique_ptr` 表達擁有權，而不是單純讓指標語法看起來安全。

## 執行緒安全尚未解決

智慧指標保護物件生命週期，不會自動保護 Logger 內部狀態或檔案寫入。多執行緒共用同一 Logger 仍需同步；見[第九章互斥鎖](../chapter_9/section_9.md)。