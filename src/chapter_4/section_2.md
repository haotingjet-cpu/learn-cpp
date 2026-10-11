# 4.2 `for` 迴圈實戰：遍歷環境變數

環境變數遍歷是平台相關主題。以下 POSIX 範例只輸出變數名稱，不列印可能包含秘密的值：

```cpp
#include <iostream>
#include <string_view>

extern "C" char** environ;

int main() {
    for (char** current = environ; *current != nullptr; ++current) {
        const std::string_view entry{*current};
        const std::string_view::size_type separator = entry.find('=');
        if (separator != std::string_view::npos) {
            std::cout << entry.substr(0, separator) << '\n';
        }
    }
}
```

`environ` 是 POSIX 慣例，不是可攜的標準 C++ 介面；Windows 有不同的環境區塊 API。`std::string_view` 暫時檢視每一項 `NAME=value`，再以 `find('=')` 找到分隔位置。若只需讀取一個已知名稱，跨平台程式可用 `<cstdlib>` 的 `std::getenv`，並檢查回傳值；單一變數讀取例子見[第三章入口函式章節](../chapter_3/section_13.md)。

這段程式需在 POSIX 環境編譯；執行前應先確認目標平台。測試時注入少量已知變數並核對輸出，而非假設開發機環境固定。不要把整個環境 dump 到正式日誌：環境變數可能包含密碼、token 或其他敏感值。