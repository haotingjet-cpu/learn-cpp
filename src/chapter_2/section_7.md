# 2.7 C++ 的 `auto` 自動推導型別

`auto` 讓編譯器從初始化式推導出變數型別。它不是執行時才決定的動態型別；推導在編譯期完成，之後型別固定。使用它時，仍必須提供能讓編譯器推導型別的初始值。

```cpp
#include <iostream>

int main() {
    int count = 4;
    auto value = count;       // int，複製值
    const auto& view = count; // const int&，唯讀別名
    auto& writable = count;   // int&，可修改別名

    writable = 8;
    std::cout << value << '\n'; // 4
    std::cout << view << '\n';  // 8
}
```

`auto value = count` 取得一份 `int` 值；若 `count` 之後改變，`value` 不會跟著改。`auto& writable = count` 則是同一個物件的別名，對 `writable` 指派也會改變 `count`。`const auto& view` 是不可透過 `view` 修改的別名。此處的參考會在[第五章指標與參考](../chapter_5/section_4.md)詳細介紹；目前只需注意 `&` 會改變「複製值」的意義。

## 逐步觀察型別和值

```cpp
#include <iostream>

int main() {
    int count{4};
    auto copied = count;
    const auto& observed = count;

    count = 9;
    std::cout << copied << '\n';   // 4：先前複製的值
    std::cout << observed << '\n'; // 9：仍指向 count
}
```

這個例子顯示 `auto` 不是一律複製，也不是一律建立別名；結果取決於宣告中的 `&`。在目前已學範圍內，最常見的規則是：一般 `auto` 取得推導型別的值，`auto&` 建立參考，`const auto&` 建立唯讀參考。

遇到初始化清單或複雜標準函式庫型別時，推導規則可能較不直觀，應使用 IDE 或編譯器檢查實際型別。範本與代理參考屬於後續進階主題，這裡先不展開。