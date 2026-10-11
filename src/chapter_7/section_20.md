# `LogFactory`：集中建立日誌配置與簡化呼叫

若每個呼叫端都自行建立格式器、sink、Logger，容易出現不一致配置。工廠可集中建立一套具明確生命週期的預設配置。本節採用簡化做法：工廠物件擁有具體 sink 與 logger；示意程式需把成員完整定義在同一個類別中。

以下類別依賴前面章節的 `Formatter`、`FileSink`、`Logger` 和 `LogLevel` 定義；閱讀順序為[格式化器與 LogLevel](section_17.md)、[FileSink](section_18.md)、[Logger](section_19.md)。此處不重複貼出那些類別。

```cpp
#include <memory>
#include <stdexcept>
#include <string>

class LogFactory {
public:
    explicit LogFactory(const std::string& path)
        : file_sink_(path),
          logger_(formatter_, file_sink_, LogLevel::info) {
        if (!file_sink_.is_open()) {
            throw std::runtime_error("cannot open log file");
        }
    }

    const Logger& logger() const { return logger_; }

private:
    Formatter formatter_;
    FileSink file_sink_;
    Logger logger_;
};
```

成員依宣告順序初始化，所以 `formatter_` 和 `file_sink_` 都先於 `logger_` 建立。解構順序相反，Logger 先於 sink 和 formatter 銷毀，參考在使用期間有效。此範例需要 `<stdexcept>` 和 `<string>`；完整專案應把類別宣告放在標頭、實作放在 `.cpp`，參見[第一章多檔案建置](../chapter_1/section_1.md)。

## 巨集是否值得使用

許多日誌 API 會提供 `LOG_INFO("ready")` 一類巨集。巨集可以省去呼叫冗長，但沒有一般函式的型別檢查、作用域與除錯體驗，且巨集參數可能被重複求值。若沒有需要編譯期移除某等級訊息等明確理由，優先使用普通函式：

```cpp
factory.logger().log(LogLevel::info, "ready");
```

若專案採用巨集，應加上專案前綴、避免參數重複求值，並保留可測試的函式 API。不要將巨集當作類別封裝或執行期配置的替代品。