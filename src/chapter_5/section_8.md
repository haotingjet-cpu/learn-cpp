# 5.8 函式與陣列、陣列參考

## 為什麼普通陣列參數看不到長度

C++ 傳遞內建陣列時，函式參數會退化為指標。下例中即使呼叫端傳入 4 個元素，函式也必須另外收到 `count`：

```cpp
#include <cstddef>

void inspect(int values[], std::size_t count); // 等同 int* values
```

函式不會由 `values` 得知元素數量，所以呼叫端還要傳 `count`。若陣列長度是固定的，可透過模板參數保留長度：

```cpp
#include <cstddef>
#include <iostream>

template <std::size_t N>
void inspect(const int (&values)[N]) {
    for (const int value : values) {
        std::cout << value << ' ';
    }
    std::cout << '\n';
}

int main() {
    const int samples[]{2, 4, 8};
    inspect(samples);
}
```

先把新的語法拆開看：

- `template <...>` 宣告這是一個模板；編譯器會依實際呼叫時提供的資訊，產生可用的函式版本。
- `std::size_t N` 表示模板有一個名為 `N` 的非型別參數，型別是代表大小的 `std::size_t`；它保存的是數字長度，不是資料型別。
- `void` 是回傳型別，表示函式不回傳結果。
- `const int (&values)[N]` 表示參數 `values` 是「對含有 N 個 int 的陣列的唯讀參考」。括號不可移除，否則 `&` 的結合方式會改變。
- 呼叫 `inspect(samples)` 時，編譯器從陣列長度推導 `N`。三個元素的範例會使用 `N == 3` 的版本，輸出 `2 4 8`。

可以把此類函式模板的外形記成：

```cpp
template <模板參數>
回傳型別 函式名稱(參數型別 參數名稱) {
    // 函式本文
}
```

本例只用模板保留固定長度，尚不討論多型別推導、特化或概念約束。若容器長度在執行期才知道，就不適合用 `N` 當作長度，應改用 `std::span` 或容器參數。

在 C++20，可用 `std::span<const int>` 同時表示連續元素範圍和元素數量，不複製陣列；span 不擁有元素，呼叫端必須保證來源活得夠久。此型別首次可用在本節，和 `std::string_view` 一樣是非擁有檢視。若 API 明確只服務 vector，則可用 `const std::vector<int>&` 表達依賴；抽象通用性和簡單性之間要依需求取捨。

對函式呼叫端而言，最重要的是不要把元素指標和長度分開管理而遺失範圍資訊。裸指標介面要明確規定長度和空指標政策；完整所有權規則見[5.4 指標與參考](section_4.md)。