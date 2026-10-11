# `cin`：標準輸入與失敗處理

`std::cin >> value` 會從標準輸入讀取並轉換成 `value` 的型別。轉換失敗時，串流會進入失敗狀態；後續讀取通常不會成功，直到狀態被清除並處理錯誤輸入。

```cpp
#include <iostream>

int main() {
    int count{};
    std::cout << "請輸入數量：";

    if (!(std::cin >> count)) {
        std::cerr << "輸入必須是整數\n";
        return 1;
    }

    std::cout << "count=" << count << '\n';
}
```

此範例採「輸入錯誤即結束」策略，適合命令列工具。互動式程式若要重試，必須清除錯誤狀態，並丟棄這次錯誤輸入留下的字元：

```cpp
#include <iostream>
#include <limits>

int main() {
    int count{};
    while (true) {
        std::cout << "請輸入非負整數：";
        if (std::cin >> count && count >= 0) {
            break;
        }

        if (std::cin.eof()) {
            std::cerr << "輸入已結束\n";
            return 1;
        }

        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
        std::cerr << "格式錯誤，請重試\n";
    }
    std::cout << "count=" << count << '\n';
}
```

`clear()` 清除串流錯誤旗標，`ignore()` 丟棄直到換行的內容。只呼叫 `clear()` 而不丟棄錯誤字元，下一次讀取會再次碰到同一段無效輸入，造成重複錯誤甚至無限迴圈。

## `>>` 與整行讀取

`operator>>` 會略過前置空白，並在下一個空白處停止。因此讀取名字或包含空格的路徑時不適用。可改用 `std::getline` 讀一整行。混用兩種方式時，上一個 `>>` 留下的換行可能讓 `getline` 立即讀到空字串；可依輸入格式明確清理換行，或從一開始就逐行讀取，再用字串串流解析，見[字串串流](section_5.md)。

## 不要忽略輸入邊界

讀入整數成功只代表字串可轉成整數，不代表數值符合業務範圍。讀取後仍要檢查範圍；使用者輸入超出整數型別可表示範圍時，串流會失敗，應走錯誤處理路徑。