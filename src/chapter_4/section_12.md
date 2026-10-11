# 4.12 `vector` 的 `push_back` 和 `emplace_back` 差異

## 完整型別範例

以下示範一個可獨立編譯的元素型別；本節舊例中的 `Record(int, std::string)` 若只寫宣告而沒有函式主體，不能單獨連結，這裡補上完整定義：

```cpp
#include <iostream>
#include <string>
#include <vector>

struct Record {
    int id;
    std::string name;

    Record(int record_id, std::string record_name)
        : id{record_id}, name{record_name} {}
};

int main() {
    std::vector<Record> records;
    records.emplace_back(7, "sensor");
    records.push_back(Record{8, "gateway"});

    for (const Record& record : records) {
        std::cout << record.id << ": " << record.name << '\n';
    }
}
```

`emplace_back` 將建構參數交給 `Record`，`push_back` 接受已建立的 `Record` 值。若要加入已經存在的物件，`push_back` 往往更直接；只有要用多個建構參數直接在容器中建立物件時，`emplace_back` 才會讓呼叫意圖更清楚。兩者都可能遇到配置成本，不能僅憑函式名稱保證效能。若多個建構函式可匹配而造成歧義，先明確建立具有目標型別的物件，再傳給 `push_back`。

C++17 起兩者回傳新元素參考；舊標準的 `emplace_back` 回傳型別不同。重新配置仍會使先前元素的參考失效。