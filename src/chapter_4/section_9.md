# 4.9 `vector` 存取和遍歷

## 完整範例：讀取和修改元素

以下的 `for (變數 : values)` 是範圍式 for：每輪依序取一個元素放入變數。`const int value` 只讀取複本；`int& value` 中的 `&` 表示參考，因此對 `value` 的修改會改到 vector 裡的原元素。

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> values{10, 20, 30};

    std::cout << values.at(0) << '\n'; // 10
    for (const int value : values) {
        std::cout << value << ' '; // 10 20 30
    }
    std::cout << '\n';

    for (int& value : values) {
        value *= 2;
    }
}
```

`at(0)` 會檢查範圍；越界時丟出 `std::out_of_range`。`operator[]` 不作檢查，所以只在呼叫端已確定索引有效時使用。`front()`／`back()` 存取首尾元素，空 vector 不可呼叫。

第一個 range-for 中的 `value` 是一份唯讀值複製；第二個迴圈中的 `int& value` 是元素的參考，所以乘以二會修改 vector 內容。對小型整數，值複製容易理解；大型元素只讀時，才考慮用 `const auto&` 避免複製。參考的完整規則見[第五章](../chapter_5/section_4.md)。

需要在走訪中刪除元素時，每次 `erase` 後都要使用它回傳的新位置；刪除規則和例子見[4.10 搜尋與刪除](section_10.md)。重新配置或移除元素後，不可繼續使用已失效的元素參考。

`operator[]` 和 `front()`／`back()` 不檢查空容器或索引；`at()` 會檢查但有例外成本。選擇依介面約束：若越界代表程式錯誤可用已驗證的索引；若輸入可控制索引則先驗證或使用 `at()`。

走訪期間不要在可能重新配置的操作後使用舊 iterator／參考。以下片段展示安全刪除負數的方式；`erase` 回傳下一個仍有效的位置，所以刪除後不要再額外遞增：

```cpp
for (auto it = values.begin(); it != values.end();) {
    if (*it < 0) it = values.erase(it);
    else ++it;
}
```