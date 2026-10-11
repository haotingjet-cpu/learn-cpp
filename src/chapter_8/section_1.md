# 複製建構子語意與實戰

複製建構子以既有物件建立新物件，形式通常是 `Type(const Type&)`。編譯器在複製初始化時會考慮它。

```cpp
#include <iostream>

struct Sample {
    int value{};
};

int main() {
    Sample first{7};
    Sample second = first;
    second.value = 9;
    std::cout << first.value << ' ' << second.value << '\n'; // 7 9
}
```

內含 `int` 的預設複製會複製數值，兩物件各自擁有自己的欄位。標準容器和 `std::string` 等型別也會依其定義管理複製。

## 裸擁有指標的淺複製問題

假設類別以 `char*` 擁有 `new[]` 配置的資料，而編譯器自動產生複製操作只複製指標值：

```cpp
#include <cstddef>

// 可編譯但刻意有錯誤的示意型別，不要建立兩份後執行
class BrokenBuffer {
public:
    explicit BrokenBuffer(std::size_t size) : data_(new char[size]{}) {}
    ~BrokenBuffer() { delete[] data_; }

private:
    char* data_;
};

// BrokenBuffer first{8};
// BrokenBuffer second = first; // 預設複製只複製位址
```

這裡建構子用 `new[]` 配置八個字元，解構子以 `delete[]` 釋放。類別沒有自行定義複製建構子，所以編譯器產生的複製會逐欄位複製；對 `char*` 而言只複製位址，不會配置第二個陣列。複製後兩個物件便指向同一配置；其中一個解構釋放後，另一個成為懸空指標，兩個都解構又會重複釋放。這不是「複製了緩衝區」，而是只複製了位址，因此不要執行這段錯誤用法。

## 深複製

擁有資源的型別若支援複製，通常必須建立獨立資源，讓兩物件互不影響。還要實作賦值操作與解構操作，確保所有生命週期一致。這組責任稱為 Rule of Three；若再自訂移動操作，則常稱 Rule of Five。詳細實作見[自訂 String 類別](section_3.md)。

## 不需要複製時

若資源語意上只能有單一擁有者，禁止複製可能比深複製更合理。`std::unique_ptr` 正是不可複製、可移動的單一所有權工具，見[智慧指標](section_5.md)。