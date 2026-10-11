# 4.5 專案實戰：完成僅支援 `ls` 的 Mini Shell

本節完成一個小型目錄列印工具：只接受 `ls`、`help`、`quit` 三種命令，不呼叫 shell、不支援參數或命令組合。用 `std::filesystem::directory_iterator` 列出目前目錄，避免 `system("ls")` 的平台依賴。

```cpp
#include <filesystem>
#include <iostream>
#include <string>
#include <system_error>

int main() {
    std::string command;
    while (std::cout << "mini> " && std::getline(std::cin, command)) {
        if (command == "quit") {
            break;
        } else if (command == "help") {
            std::cout << "commands: help, ls, quit\n";
        } else if (command == "ls") {
            std::error_code error;
            const std::filesystem::directory_iterator end;
            auto entry = std::filesystem::directory_iterator(".", error);
            while (!error && entry != end) {
                std::cout << entry->path().filename().string() << '\n';
                entry.increment(error);
            }
            if (error) {
                std::cerr << "cannot list directory: "
                          << error.message() << '\n';
            }
        } else {
            std::cerr << "unsupported command\n";
        }
    }
}
```

這個程式接受整行輸入，精確比較命令；`ls; other_command` 會被當成未知命令，不會執行第二段命令。錯誤以 `std::error_code` 回報，避免在此範例中例外中止整個互動迴圈。`std::filesystem` 自 C++17 起提供，編譯時至少選擇 `-std=c++17`。

Windows、POSIX 等系統對檔名編碼和權限的處理可能不同；這個範例僅列出目前目錄名稱，不代表完成了檔案權限或路徑安全設計。

實作檢核清單：

1. 使用 `std::getline` 讀取整行，處理 EOF。
2. 對每個允許命令做精確比對，不接受額外參數或命令串接。
3. `ls` 用標準 filesystem 列出目前目錄，不呼叫 shell。
4. 將目錄錯誤回報至 `std::cerr`，並定義程式是否繼續。
5. 測試空字串、未知命令、尾端空白和 EOF。

此練習刻意不實作引號、跳脫、管線或重導向，因此不可宣稱為 shell 語法。若加入使用者指定的路徑，需要另外規定允許範圍、符號連結和錯誤策略；不可把路徑字串直接拼進 `std::system`。