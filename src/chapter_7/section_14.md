# 組合與委派

組合是把一個物件作為另一個物件的成員；委派是由一個物件把工作交給其成員物件。兩者可重用行為，不必宣稱兩型別存在繼承的「是一種」關係。

以下是可獨立理解的 Logger 類別實作片段（不含 `main`），用字串表示等級，不依賴尚未定義的 `LogLevel` 或 `level_name`。正式日誌模組可再用列舉型別限制合法等級。

```cpp
#include <iostream>
#include <string>
#include <string_view>

class Formatter {
public:
    std::string format(std::string_view level,
                       std::string_view message) const {
        return "[" + std::string(level) + "] "
             + std::string(message);
    }
};

class Logger {
public:
    void log(std::string_view message) {
        const std::string line = formatter_.format("INFO", message);
        std::clog << line << '\n';
    }
private:
    Formatter formatter_;
};
```

`Logger` 使用 `Formatter`，但不是一種 Formatter。它透過成員呼叫 `format`，把格式工作委派出去。

## 組合的優點

- 成員生命週期由擁有者管理。
- 不會把實作細節暴露為衍生類別可依賴的 protected 狀態。
- 可在建構時選擇不同成員實作，建立較容易測試的模組邊界。

## 組合不是萬用答案

若呼叫端確實需要透過穩定基底介面替換不同型別，繼承與虛擬介面可能合適；否則先考慮組合。設計時問：「B 是否能在所有 A 的使用情境下遵守 A 的契約？」若不能，通常不應讓 B 公開繼承 A。

本例的 `Formatter` 以字串串接示意責任分離，實際格式化可使用第六章學過的字串串流。成員函式不必透過全域狀態取得格式器。