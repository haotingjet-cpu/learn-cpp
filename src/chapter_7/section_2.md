# 類別成員變數與物件記憶體空間

非靜態資料成員屬於每一個物件；每建立一個物件，都有該物件自己的成員值。

```cpp
#include <iostream>

struct Point {
    int x{};
    int y{};
};

int main() {
    Point first{3, 4};
    Point second{8, 9};
    first.x = 10;
    std::cout << first.x << ' ' << second.x << '\n'; // 10 8
}
```

`first` 和 `second` 是兩個不同物件，各自有 `x`、`y`。類別定義描述其型別，不等於建立某個物件。

## `sizeof` 能告訴我們什麼

```cpp
std::cout << sizeof(Point) << '\n';
```

結果至少足以容納成員，但可能因對齊而比 `sizeof(int) * 2` 大。標準不保證所有型別、平台的精確大小，也不保證不同編譯器使用相同填充位元組。若要固定寬度的外部資料格式，不要直接寫入整個物件記憶體；參見[第六章二進位格式提醒](../chapter_6/section_7.md)。

物件位址可用 `&object` 觀察，但不同物件的位址差距不是成員大小的可攜證明。尤其類別含虛擬函式時，實作可能使用額外資料支援動態派發；標準沒有規定某種固定的「虛表指標」布局。

## `class` 與 `struct` 的預設存取

兩者都能有資料、函式、建構子與繼承；差別是預設存取權限：

```cpp
struct PublicRecord {
    int id;          // 預設 public
};

class InternalRecord {
    int id;          // 預設 private
};
```

實務上常以 `struct` 表示單純公開資料聚合，以 `class` 表示需要保護不變條件的型別。這是慣例，非語言限制。