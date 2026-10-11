# Logger 委派與等級過濾

Logger 接收一個格式器和一個 sink，負責依最低等級過濾訊息、格式化並委派寫出。以下是類別片段，假設 `Formatter`、`LogSink`、`LogLevel` 已在前幾節定義；為便於逐步學習，先展示類別本文，不重複貼出整個日誌模組。

```cpp
class Logger {
public:
    Logger(const Formatter& formatter, LogSink& sink,
           LogLevel minimum)
        : formatter_(formatter), sink_(sink), minimum_(minimum) {}

    bool log(LogLevel level, std::string_view message) const {
        if (rank(level) < rank(minimum_)) return true;
        const std::string line = formatter_.format(level, message);
        return sink_.write(line);
    }

private:
    static int rank(LogLevel level) {
        switch (level) {
        case LogLevel::debug: return 0;
        case LogLevel::info: return 1;
        case LogLevel::warning: return 2;
        case LogLevel::error: return 3;
        }
        return 4;
    }

    const Formatter& formatter_;
    LogSink& sink_;
    LogLevel minimum_;
};
```

低於門檻的訊息回傳 `true` 表示「已按配置略過」，這種語意可能令人混淆。生產 API 可改用結果型別區分「已寫入」「被過濾」「寫入失敗」。本例選擇簡單回傳值，並要求使用者理解其契約。

`const Formatter&` 和 `LogSink&` 是非擁有參考成員：Logger 不會複製或刪除對象，呼叫端要確保這些對象活得比 Logger 久。`minimum_` 則是 Logger 自己的一份列舉值。`static int rank(...)` 沒有目前 Logger 物件可用，只根據引數回傳等級排序，因此宣告為 `static` 成員函式。

## 使用方式

```cpp
Formatter formatter;
ConsoleSink console;
Logger logger{formatter, console, LogLevel::info};
logger.log(LogLevel::debug, "verbose details"); // 過濾
logger.log(LogLevel::error, "service failed");  // 輸出
```

兩個參考成員都不擁有其目標物件，因此順序與作用域不可隨意調換。低耦合不等於無生命週期責任；API 必須明確說明物件擁有權。