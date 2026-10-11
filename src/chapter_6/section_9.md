# 輸入輸出實戰：日誌模組需求與技術準備

在實作 Logger 前，先把需求拆成可驗證的行為。本章把它限制為教學用單程序模組，後續第七章會再以介面與組合方式重構。

## 需求

1. 呼叫端提供一行訊息。
2. 每筆記錄含等級與訊息。
3. 可輸出到控制台、`std::string` 或檔案。
4. 檔案開啟或寫入失敗時，呼叫端能辨識失敗。
5. 輸出文字不依賴隱含的全域重導向。

## 最小資料模型

```cpp
#include <string>
#include <string_view>

enum class LogLevel { info, warning, error };

std::string_view level_name(LogLevel level) {
    switch (level) {
    case LogLevel::info: return "INFO";
    case LogLevel::warning: return "WARN";
    case LogLevel::error: return "ERROR";
    }
    return "UNKNOWN";
}
```

`enum class` 的前置知識見[第三章列舉](../chapter_3/section_11.md)。`string_view` 是不擁有字串內容的檢視；本例回傳字串常值，因此生命週期安全。一般字串檢視的生命週期規則見[第五章字串介面](../chapter_5/section_11.md)。

## 設計輸出函式

格式化與寫入分開，讓格式可獨立測試：

```cpp
#include <ostream>

bool write_log(std::ostream& output, LogLevel level,
               std::string_view message) {
    output << '[' << level_name(level) << "] " << message << '\n';
    return static_cast<bool>(output);
}
```

接受 `std::ostream&` 讓同一函式可以寫到 `std::cout`、檔案輸出串流，或字串輸出串流。參考參數的使用方式見[第五章參考參數](../chapter_5/section_5.md)。回傳 `bool` 表示這次寫入是否仍成功；正式 API 可改用專案既有的錯誤型別。

## 測試策略

先以 `std::ostringstream` 測試輸出格式，再用暫存檔測試檔案建立與失敗情況；不要只看終端機上「有出現文字」。控制台輸出和磁碟檔案具有不同失敗模式，應各自驗證。