# 透過 `vector` 觀察移動語意

移動語意表示可以將某個物件所擁有的資源轉交到另一個物件，避免複製昂貴內容。`std::move` 本身不搬資料；它把運算式轉成可供移動操作選用的右值形式，真正搬移由型別的移動建構子或移動賦值完成。

```cpp
#include <iostream>
#include <string>
#include <utility>
#include <vector>

int main() {
    std::string source(1000, 'x');
    std::string destination = std::move(source);
    std::cout << destination.size() << '\n'; // 1000
}
```

移動後的 `source` 仍是有效物件，但其值處於型別允許的有效狀態；除非型別文件保證，不應假定它一定為空。可重新指定或解構它。

## `vector` 擴容與移動

```cpp
std::vector<std::string> names;
names.emplace_back(1000, 'a');
names.emplace_back(1000, 'b');
```

當 `vector` 儲存空間不足時，可能配置新的連續儲存區並搬移既有元素。具備不拋例外移動建構子的型別較容易高效搬移；對自訂型別正確標示 `noexcept` 可讓容器在標準條件允許時採用移動策略。不能只從某次輸出或位址變化推斷所有標準庫實作都採用完全相同策略。

## `push_back` 與 `emplace_back`

- `push_back(existing)` 將既有物件複製或移動進容器。
- `emplace_back(args...)` 在容器末端直接用參數建構元素。

`emplace_back` 不保證一定更快；當已有完整物件時，直接 `push_back` 常更清楚。不要在呼叫 `std::move` 後再假設原物件保有原值。

此處所述移動建構子與 Rule of Five 實作見[自訂類別](section_3.md)。