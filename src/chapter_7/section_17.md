# 日誌格式化介面與實作

Formatter 的責任是把結構化欄位轉成文字，不負責選擇目的地或寫檔。輸入等級使用第三章介紹的列舉；本例用字串串流組合結果。

```cpp
#include <sstream>
#include <string>
#include <string_view>

enum class LogLevel { debug, info, warning, error };

class Formatter {
public:
    std::string format(LogLevel level, std::string_view message) const {
        std::ostringstream output;
        output << '[' << name(level) << "] " << message;
        return output.str();
    }

private:
    static const char* name(LogLevel level) {
        switch (level) {
        case LogLevel::debug: return "DEBUG";
        case LogLevel::info: return "INFO";
        case LogLevel::warning: return "WARN";
        case LogLevel::error: return "ERROR";
        }
        return "UNKNOWN";
    }
};
```

呼叫 `format(LogLevel::warning, "disk is nearly full")` 得到 `[WARN] disk is nearly full`。使用 `string_view` 避免僅為讀取訊息而複製輸入，但回傳值是擁有內容的 `std::string`，不會依賴呼叫端的訊息生命週期。

## 可測試性

```cpp
const Formatter formatter;
const std::string line =
    formatter.format(LogLevel::error, "cannot open file");
```

測試直接比較 `line` 與預期字串，不需建立任何檔案或檢查終端機。測試應涵蓋每個列舉值；對非法底層值的策略也要明確，雖然一般使用者不應自行製造不合法列舉值。

## 格式擴充

增加時間戳、執行緒識別碼或結構化輸出（例如 JSON）時，應確認格式契約與跳脫規則。JSON 字串不能只靠直接串接；需正確跳脫引號、反斜線及控制字元，或使用 JSON 函式庫。