# 3.15 邏輯實戰：小型日誌模組

## 從需求到輸出

先決定一筆日誌要包含什麼。這個練習只選「等級」和「訊息」兩個欄位，輸出格式固定為 `[LEVEL] message`。把等級轉文字集中在 `label`，可以避免呼叫端各自拼出不同寫法。

設計較完整的日誌模組時還要定義輸出目的地、時間戳格式、併發行為與失敗策略。以下最小範例把標籤和輸出集中管理；它不宣稱具備多執行緒原子性或高吞吐保證。

```cpp
#include <iostream>
#include <string_view>

enum class LogLevel { debug, info, warning, error };

constexpr std::string_view label(LogLevel level) {
    switch (level) {
    case LogLevel::debug:   return "DEBUG";
    case LogLevel::info:    return "INFO";
    case LogLevel::warning: return "WARN";
    case LogLevel::error:   return "ERROR";
    }
    return "INVALID";
}

void log(LogLevel level, std::string_view message) {
    std::clog << '[' << label(level) << "] " << message << '\n';
}

int main() {
    log(LogLevel::info, "device started");
    log(LogLevel::warning, "queue is almost full");
}
```

例如呼叫 `log(LogLevel::warning, "queue is almost full")`，會輸出 `[WARN] queue is almost full`。`std::clog` 是緩衝的標準錯誤串流，適合一般診斷資訊；`std::cerr` 通常用於較需立即顯示的錯誤。

`std::clog` 是標準錯誤串流的緩衝版本；`std::cerr` 通常不緩衝或較積極 flush。真實服務應定義併發輸出如何避免行交錯，並考量 sink I/O 失敗、敏感資料遮罩、輪替與背壓。不要在鎖內執行可能阻塞的複雜輸出而不評估延遲。

## 驗證

逐一測試四種等級標籤、未知列舉值和空訊息。增加最低輸出等級時，明確定義 debug、info、warning、error 的排序，不要仰賴列舉數字的偶然值。將格式化和輸出目的地分離，單元測試便能檢查訊息格式而不依賴終端環境。

實際服務還要避免敏感資料直接輸出、處理多執行緒行交錯、輸出端失敗和磁碟背壓。這些不是本最小範例已解決的功能，應列為模組需求，而不是默認 `std::clog` 自動提供。