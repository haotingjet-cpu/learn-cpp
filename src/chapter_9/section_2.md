# `map` 的初始化與增刪改查

以下以設備編號為鍵、名稱為值。`std::map` 依鍵排序，因此遍歷順序不是插入順序。

```cpp
#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<int, std::string> devices{
        {24, "sensor"},
        {17, "gateway"}
    };

    for (const auto& [id, name] : devices) {
        std::cout << id << '=' << name << '\n';
    }
}
```

輸出順序是 `17=gateway` 再 `24=sensor`。結構化繫結的完整概念見[第二章 auto 型別推導](../chapter_2/section_7.md)。

## 插入與更新

```cpp
std::map<int, std::string> devices;
const auto [it, inserted] = devices.emplace(17, "gateway");
if (!inserted) {
    // 鍵 17 已存在；it 指向既有元素
}

devices.insert_or_assign(17, "edge-gateway");
```

`emplace` 不覆寫已存在的鍵；`insert_or_assign` 有則更新、無則新增。需要原子語意以外的「先查再改」時，優先使用這些明確操作。

## 查詢與 `operator[]`

```cpp
const auto found = devices.find(17);
if (found != devices.end()) {
    std::cout << found->second << '\n';
}
```

`devices[key]` 在鍵不存在時會插入一個預設建構的值。若只是查詢，使用 `find`，或對非 const map 使用 `at`（不存在時拋出 `std::out_of_range`），不要意外改變容器。

## 刪除與清空

```cpp
devices.erase(17);   // 依鍵刪除，不存在時不做事
devices.clear();     // 移除全部項目
```

對迭代器刪除前，須確認它仍有效且不等於 `end()`。修改容器時要留意迭代器失效規則；不要跨越容器修改保存過期迭代器。