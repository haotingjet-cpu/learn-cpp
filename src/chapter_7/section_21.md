# 動態配置日誌輸出與等級

執行期配置通常需要根據設定檔或命令列選擇 sink 和最低日誌等級。先解析配置，再建立元件；不要讓每筆日誌輸出都重新讀設定檔。

## 以組合選擇輸出

若 Logger 必須在執行期擁有任意一種 sink，可用 `std::unique_ptr<LogSink>` 保存多型物件。智慧指標會在第八章完整介紹；此處先連結到[第八章 `unique_ptr`](../chapter_8/section_5.md)。安全建立時，確認檔案 sink 開啟成功後才交給 Logger。

```cpp
#include <memory>
#include <string>

std::unique_ptr<LogSink> sink =
    std::make_unique<FileSink>("service.log");
```

此片段依賴[第十五節的 `LogSink` 介面](section_15.md)及[第十八節的 `FileSink`](section_18.md)，並需包含 `<memory>`。`FileSink` 的開啟失敗策略應透過工廠回報；不可只因指標非空就假定檔案成功開啟。

## 配置等級

解析文字設定時，先映射到已知列舉值：

通用函式格式回顧：`回傳型別 函式名稱(參數型別 參數名稱) { ... }`。本例的 `std::optional<LogLevel>` 表示回傳值可能含有一個 `LogLevel`，也可能是空值；`std::string_view text` 是只在呼叫期間讀取的文字檢視。

`LogLevel` 定義於[第十七節](section_17.md)；`std::string_view` 的概念見[第五章](../chapter_5/section_11.md)。以下是函式片段，不含列舉定義或 `main`。

```cpp
#include <optional>
#include <string_view>

std::optional<LogLevel> parse_level(std::string_view text) {
    if (text == "debug") return LogLevel::debug;
    if (text == "info") return LogLevel::info;
    if (text == "warning") return LogLevel::warning;
    if (text == "error") return LogLevel::error;
    return std::nullopt;
}
```

遇到未知等級應明確拒絕或套用文件化的預設值，不要靜默假裝成功。`return std::nullopt` 表示沒有有效的列舉結果；`return LogLevel::info` 則回傳一個有效值。錯誤表示方式先見[第五章 Base16 函式庫](../chapter_5/section_12.md)。

## 併發設定的界線

本章 Logger 尚未承諾可由多執行緒同時呼叫。即使設定等級是單一整數，同時讀寫也不能想當然地安全；第九章會討論互斥鎖與資料競爭。不要把「動態配置」和「執行緒安全」混為一談。