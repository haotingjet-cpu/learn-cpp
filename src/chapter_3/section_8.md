# 3.8 `string` 長度、截斷和比較

以下程式從一個字串開始，逐步觀察長度、縮短、追加和擷取子字串：

```cpp
#include <iostream>
#include <string>

int main() {
    std::string text{"abcdef"};
    std::cout << text.size() << '\n'; // 6

    text.resize(3);
    std::cout << text << '\n'; // abc

    text.append("XYZ");
    std::cout << text << '\n'; // abcXYZ
    std::cout << text.substr(3, 3) << '\n'; // XYZ
}
```

`size()` 和 `length()` 對 `std::string` 等價，計算的是 `char` 元素數。`resize(3)` 移除尾端字元；把長度調大則以零字元填補。`substr(pos, count)` 回傳一個新的字串副本。若 `pos` 大於字串長度會丟出 `std::out_of_range`，外部給定的位置應先驗證。

用 `==` 可比較兩個字串的 `char` 序列是否完全相同；`<` 等比較也不是依中文等語言的字典順序排序。大小寫不同的 ASCII 字串也不相等；Unicode 正規化與語系排序需使用對應文字函式庫。

UTF-8 多位元組文字可能被位元組索引切開，請勿把位元組長度當作畫面字元數，詳見[3.6 `std::string` 的 UTF-8 限制](section_6.md)。

## 內嵌零位元組

```cpp
const std::string binary_text{"A\0B", 3};
std::cout << binary_text.size() << '\n'; // 3
```

`std::string` 可含零位元組，因此長度由容器記錄，而不只是遇到第一個 `'\0'` 就結束。若把 `c_str()` 傳給使用 NUL 結尾慣例的 C API，對方可能只讀到第一個 `A`；處理二進位資料要同時傳遞資料指標和長度。