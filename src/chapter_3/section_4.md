# 3.4 `bool` 類型的算術運算

`bool` 表達一個條件成立與否，合法值只有 `true` 和 `false`。把它輸出到 `std::cout` 時，預設顯示為 `1` 和 `0`；若希望讀者看到 `true`／`false`，可以明確用條件輸出文字。

```cpp
#include <iostream>

int main() {
    const bool connected{true};
    const bool has_error{false};

    std::cout << connected << '\n'; // 1
    std::cout << (connected && !has_error) << '\n'; // 1
    std::cout << (connected ? "online" : "offline") << '\n';
}
```

邏輯運算會產生 `bool`：`!` 反轉真假，`&&` 要求兩邊都為真，`||` 只要一邊為真即可。條件式 `?:` 根據真假選擇兩個值之一；本例只用它選擇狀態文字。

`bool` 在某些算術運算中會轉成整數，`true` 變成 `1`，`false` 變成 `0`。雖然程式可以計算 `true + false`，但這通常不是好的狀態計數方式：若需要統計數量，應使用適當整數型別和明確的計數程式。

比較鏈也不是數學式的鏈式比較。`a < b < c` 先算 `a < b`，得到 `true` 或 `false`，再把這個結果和 `c` 比較。要判斷 `a` 是否小於 `b`、且 `b` 是否小於 `c`，應寫成：

```cpp
#include <iostream>

int main() {
    const int a{2};
    const int b{5};
    const int c{9};

    if (a < b && b < c) {
        std::cout << "strictly increasing\n";
    }
}
```

在 `if` 中寫 `if (connected)` 即可，不需額外比較 `connected == true`。至於邏輯運算和位元遮罩的不同，見[3.3 位元運算](section_3.md)；條件順序與短路則見[3.2](section_2.md)。