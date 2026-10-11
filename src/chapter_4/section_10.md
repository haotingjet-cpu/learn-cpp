# 4.10 `vector` 搜尋、刪除、插入和排序

## 可執行範例：搜尋、排序、刪除

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> values{4, 1, 3, 1};

    const auto found = std::find(values.begin(), values.end(), 3);
    std::cout << (found != values.end()) << '\n'; // 1

    std::sort(values.begin(), values.end());
    const auto new_end = std::remove(values.begin(), values.end(), 1);
    values.erase(new_end, values.end());

    for (const int value : values) {
        std::cout << value << ' '; // 3 4
    }
}
```

`find` 沒找到時回傳 `values.end()`；比較後才可使用找到的位置。`sort` 將值升冪排序。`remove` 將要保留的元素搬到前面，回傳新的邏輯結尾，但它本身不改變 vector 大小，因此還需 `erase` 刪除尾端。C++20 可直接用 `std::erase(values, 1)`。

中間插入或刪除需移動後續元素，成本通常與元素數量成正比。自訂排序比較器必須建立嚴格弱序，不能用 `<=` 代替 `<`；浮點 NaN 需要另外定義排序策略。

測試空容器、找不到目標、重複值和所有元素都被刪除。這些案例比只測試一個正常值更容易抓出迭代器和邊界錯誤。