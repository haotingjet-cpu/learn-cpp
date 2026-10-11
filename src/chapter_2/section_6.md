# 2.6 C++ 編譯時與執行時常量

`const` 表示物件初始化後，不可透過這個名稱修改；它不代表初始化值在編譯期已知。`constexpr` 則要求物件的初值必須是編譯期可計算的常數運算式。C++20 的 `consteval` 可標記立即函式：呼叫這類函式必須產生編譯期常數結果，否則程式不合法。先學會前三者的差異即可，不必急著在一般程式使用 `consteval`。

先用最短格式記住宣告差異：

```cpp
const 型別 名稱 = 可於執行期取得的初值;
constexpr 型別 名稱 = 編譯期常數運算式;
consteval 回傳型別 函式名稱(參數) { /* 編譯期呼叫 */ }
```

`const` 限制修改；`constexpr` 要求這個物件可作為編譯期常數；`consteval` 限定函式呼叫必須在編譯期求值。它們解決的是不同問題，不能只按「更嚴格」順序互相替換。

```cpp
#include <iostream>

int read_limit() {
    return 2048;
}

const int runtime_limit = read_limit(); // 執行期初始化，之後不可透過此名稱修改
constexpr int max_header_size = 64;     // 常數運算式

consteval int square(int n) { return n * n; }
constexpr int area = square(8);

int main() {
    std::cout << runtime_limit << '\n';   // 2048
    std::cout << max_header_size << '\n'; // 64
    std::cout << area << '\n';            // 64
}
```

`runtime_limit` 是唯讀值，但呼叫 `read_limit()` 才知道它是多少，因此不能在編譯期預先計算。`max_header_size` 和 `area` 則有編譯期可知的值。編譯時常量可幫助固定設定與編譯期計算，但不是所有 `const` 都能放進必須在編譯期求值的位置。

請看下面的兩個宣告：

```cpp
const int packet_limit{1500};     // 唯讀，且初值是常數
const int received_count = read_limit(); // 唯讀，但值在執行時才取得
```

`const` 回答「初始化後可否修改」，`constexpr` 回答「能否在編譯期求值」。請依這兩個不同問題選擇關鍵字。`constexpr` 函式若傳入只能在執行時知道的值，也可能在執行時呼叫；關鍵在該次求值是否符合編譯期要求。

全域常量和多檔案初始化順序涉及連結與初始化規則，見[第一章的建置流程](../chapter_1/section_2.md)與[第五章的多檔案設計](../chapter_5/section_10.md)。本節先避免依賴跨檔案的全域執行期初始化。