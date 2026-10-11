# 4.8 動態陣列程式演示

`std::vector` 適合元素數量執行時才知道、但仍希望資料連續存放的情況。它自己管理記憶體與元素生命週期，不需要自行配對 `new[]` 和 `delete[]`。

避免手動 `new[]`／`delete[]`。`std::vector` 會管理配置、元素建構與解構：

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> samples;
    samples.push_back(12);
    samples.push_back(24);
    samples.push_back(48);

    std::cout << samples.size() << '\n'; // 3
    samples.resize(2);
    std::cout << samples.size() << '\n'; // 2
    samples.reserve(16);
    std::cout << samples.size() << '\n'; // 仍是 2
}
```

`push_back` 加入一個元素，`size()` 因此增加。`resize(2)` 將元素數改成 2，第三個元素生命週期結束。`reserve(16)` 只要求容器預留空間，不建立額外元素，因此 `size()` 仍為 2。只能存取 `[0, size())` 範圍內的元素，不能以 `capacity()` 作為可讀寫元素數。

vector 離開作用域時會自動釋放資源。重新配置可能讓先前保存的元素位址失效，容量和失效規則見[4.11](section_11.md)。非擁有檢視如 `std::span` 的細節不在本節先行展開，參見[第五章](../chapter_5/section_8.md)。