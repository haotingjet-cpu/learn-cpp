# 4.7 區域陣列程式演示

這一節的「區域」是指在函式內宣告；不要把它和「陣列大小固定」混為一談。

`std::array` 把元素數量保留在型別中，適合固定通道數、固定 header 欄位等情況。

range-for（範圍式 for）的一般格式是：

```cpp
for (元素變數 : 範圍) {
    // 每輪處理一個元素
}
```

冒號右側提供一個可走訪的範圍，例如陣列或 vector；每輪將其中一個元素提供給左側變數。一般的 `int value` 會複製元素，`const int& value` 是唯讀參考、不複製元素，`int& value` 則可修改原元素。參考語法先見[第五章](../chapter_5/section_4.md)。

```cpp
#include <array>
#include <iostream>

int main() {
    std::array<int, 4> samples{3, 5, 8, 13};
    for (const int sample : samples) {
        std::cout << sample << '\n';
    }
}
```

程式會輸出 3、5、8、13，每個元素一次。範例使用 range-for；若要逐項操作，這比手動維護索引更不容易出現 off-by-one。

`std::array` 保留長度，可用 `size()` 和 `at(i)` 存取。`at(i)` 越界會丟出 `std::out_of_range`；`operator[]` 不作邊界檢查，呼叫端必須先確保索引有效。先用固定陣列建立不變資料，再觀察加入和修改值：

```cpp
std::array<int, 4> samples{}; // 四個元素都初始化為 0
samples[0] = 3;
samples.at(1) = 5;
```

常說「區域變數放在 stack」是常見實作模型，並非 C++ 標準保證的實體位置。大型區域陣列可能耗盡執行緒堆疊；若大小在執行時變動，改用[4.8 的 vector](section_8.md)。未初始化元素不可讀，使用 `{}` 明確初始化。