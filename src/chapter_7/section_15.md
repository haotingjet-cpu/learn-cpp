# 介面實作與委派示範

本節將前兩節的抽象介面與組合合在一起：Logger 依賴 `LogSink` 介面，實際輸出工作交給某個 sink。

```cpp
#include <iostream>
#include <string>
#include <string_view>

class LogSink {
public:
    virtual bool write(std::string_view text) = 0;
    virtual ~LogSink() = default;
};

class ConsoleSink final : public LogSink {
public:
    bool write(std::string_view text) override {
        std::cout.write(text.data(),
                        static_cast<std::streamsize>(text.size()));
        std::cout.put('\n');
        return static_cast<bool>(std::cout);
    }
};
```

`final` 表示 `ConsoleSink` 不再作為基底被繼承。`write` 使用明確長度，因此 `string_view` 內容不必以零字元結尾。字串檢視不能被 sink 保存，除非它另外複製內容；本例只在函式呼叫期間使用。

Logger 透過參考依賴 sink：

```cpp
class Logger {
public:
    explicit Logger(LogSink& sink) : sink_(sink) {}

    bool info(std::string_view message) {
        return sink_.write("[INFO] " + std::string(message));
    }
private:
    LogSink& sink_;
};
```

`Logger` 不擁有 `sink_`，所以 sink 必須比 Logger 活得久。此生命週期條件應在使用位置明確安排；若需要共享或動態擁有，應先設計所有權，再採用第八章智慧指標。

## 替換實作

可再實作 `FileSink`，讓同一個 Logger 寫入檔案；也可實作測試用 `MemorySink`，記錄收到的文字以供斷言。這讓測試不需要讀取控制台輸出。

## 邊界

這個介面一次只寫一行，沒有重試、緩衝、併發或多目的地一致性保證。清楚限制範圍比在教材範例中假裝涵蓋完整生產級日誌系統更重要。