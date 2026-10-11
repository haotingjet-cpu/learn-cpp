# 4.4 `while` 實戰：使用 `system` 和 `cin` 的簡化 Shell

先界定這是教學用的命令選單，不是完整 shell：它只認識固定字串 `ls` 和 `quit`，不支援參數、引號、管線或重導向。

以下完整程式示範提示、逐行讀取、命令比較和 EOF：

```cpp
#include <cstdlib>
#include <iostream>
#include <string>

int main() {
    std::string command;
    while (std::cout << "mini> " && std::getline(std::cin, command)) {
        if (command == "quit") break;
        if (command == "ls") {
            const int status = std::system("ls");
            if (status != 0) std::cerr << "ls failed\n";
        } else {
            std::cerr << "unsupported command\n";
        }
    }
}
```

輸入 `ls` 會執行固定命令；輸入 `quit` 離開；其他任何一行都會回報不支援。`std::getline` 把整行放入 `command`，所以像 `ls; del ...` 不會被拼接進 shell；不過傳給 `system` 的命令必須持續是程式中的固定字面值，不能依照輸入組合。

此範例的 `"ls"` 只適用提供該命令的環境。`std::system` 透過命令處理器執行字串，具有可攜性、錯誤狀態解碼、命令注入和子程序管理等風險，因此只用來示範概念。

正式工具請使用平台程序 API／函式庫，以可執行檔與參數分開傳遞，限制環境、工作目錄及權限，並處理退出狀態、中斷和輸出管線。若目的只是列出目錄，較可攜的 C++ 做法是 `std::filesystem`，在[4.5 專案實戰](section_5.md)改用它。