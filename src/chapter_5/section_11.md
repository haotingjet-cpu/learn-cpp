# 5.11 字串、`vector` 和 `string` 之間的高效轉換

## 先分清「拷貝位元組」和「轉換文字」

下面只把 vector 中的 `char` 元素複製到字串；它不解析文字，也不驗證 UTF-8：

```cpp
#include <iostream>
#include <string>
#include <vector>

int main() {
    const std::vector<char> bytes{'o', 'k'};
    const std::string text(bytes.begin(), bytes.end());
    std::cout << text << '\n'; // ok
}
```

`bytes.begin()`／`bytes.end()` 表示複製的範圍。反向建立 `std::vector<char>` 也可使用字串的迭代器範圍。此作法會複製每個元素；若內容是任意位元組而不一定是文字，應選擇明確的位元組型別，而不是替資料貼上「文字」語意。

轉換前先確認資料語意：文字是 UTF-8／本地編碼，還是任意位元組？數字是文字表示，還是 binary encoding？相同容器型別不代表相同協定。

`std::string` 可視為連續 `char` 序列；`std::vector<char>` 可透過迭代器範圍建構字串，反向亦同。C++20 的 `std::span` 可在不複製的情況下檢視連續資料，但不擁有記憶體：

```cpp
#include <span>
#include <string>
#include <vector>

std::vector<char> bytes{'o', 'k'};
std::string text(bytes.begin(), bytes.end());
std::span<const char> view{bytes};
```

範例中 `text` 是擁有資料的複本；`view` 只記錄 `bytes` 的起始位置與長度，不複製、不擁有元素。只要 `bytes` 銷毀或可能重新配置，`view` 就不能再使用。

需要 UTF-8 字串時，這類轉換只複製位元組，不驗證 UTF-8。若要轉成 `std::vector<std::byte>`，必須逐項轉換型別；任意二進位資料更適合使用 `std::vector<unsigned char>` 或 `std::byte` 型別。

不要保存指向來源 `data()` 的指標／view 超過來源生命週期，也不要在來源可能重新配置後繼續使用。`span`／`string_view` 的目的只是短暫借用，不會延長資料生命週期。若要跨非同步工作或長期保存，複製或移動到擁有型別；效能改進應經量測確認。