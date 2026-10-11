# 日誌流：輸出到控制台、字串與檔案

有了統一接受 `std::ostream&` 的 `write_log`，呼叫端可以選擇不同目的地，而不必為每種目的地複製格式化程式碼。

```cpp
#include <fstream>
#include <iostream>
#include <sstream>
#include <string>

int main() {
    std::ostringstream memory_log;
    if (!write_log(memory_log, LogLevel::info, "service started")) {
        return 1;
    }
    const std::string captured = memory_log.str();
    std::cout << captured;

    std::ofstream file_log("service.log",
                           std::ios::out | std::ios::app);
    if (!file_log) {
        std::cerr << "cannot open service.log\n";
        return 1;
    }
    if (!write_log(file_log, LogLevel::warning, "queue is near capacity")) {
        std::cerr << "cannot write service.log\n";
        return 1;
    }
}
```

字串串流適合測試與暫存內容；檔案輸出串流負責持久化；`std::cout` 則連接標準輸出。寫入器不決定要不要輸出到哪裡，因此責任清楚且容易替換。

## 同時輸出多個目的地

若需求是「同一筆訊息寫入多個串流」，可以明確呼叫多次：

```cpp
const bool console_ok = write_log(std::cout, level, message);
const bool file_ok = write_log(file_log, level, message);
if (!console_ok || !file_ok) {
    // 至少一個目的地失敗
}
```

此寫法可能只成功一部分：例如控制台成功、檔案失敗。系統必須定義是否接受部分成功，以及如何回報；多目的地輸出並非交易，不能假裝具有全有或全無保證。

## 這個版本的限制

這是單執行緒示範，沒有時間戳、併發保護、輪替、格式化配置或非同步佇列。把 `std::ofstream` 或標準串流放在共享物件中後，多執行緒同時寫入需要同步策略；第九章會討論資料競爭。第七章會將目前的函式與輸出目的地整理成物件介面。