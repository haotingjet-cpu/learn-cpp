# 5.4 指標和參考：理論到實戰

把參考和指標放在函式參數中時，先辨認 `&`、`*` 寫在哪裡：

```cpp
回傳型別 函式名稱(T& 必要且可修改的物件);
回傳型別 函式名稱(const T& 必要且唯讀的物件);
回傳型別 函式名稱(T* 可選物件); // 可用 nullptr 表示沒有物件
```

這是型別宣告格式，不是可直接編譯的函式。`T` 代表某個具體型別，例如 `int` 或 `std::string`。參考和指標都不會自動取得物件所有權；要不要複製、能否為空、是否可修改，需由介面契約決定。

先看整數參考：它是既有物件的另一個名稱，不會建立第二個整數。

```cpp
#include <iostream>

int main() {
    int value{10};
    int& alias = value;
    alias = 11;
    std::cout << value << '\n'; // 11
}
```

一般參考宣告時必須初始化，並且之後不能改綁到另一個物件。指標則是保存位址的變數，可以是空值，也可以改為指向另一個目標：

```cpp
#include <iostream>

int main() {
    int first{10};
    int second{20};
    int* pointer{&first}; // 取 first 的位址
    *pointer = 11;        // 解參考後修改 first
    std::cout << first << '\n'; // 11

    pointer = &second;
    std::cout << *pointer << '\n'; // 20
    pointer = nullptr; // 表示目前沒有目標
}
```

`&first` 取得物件位址；`*pointer` 存取該位址所指物件。解參考前必須確認指標非空，而且目標物件仍在生命週期內。空指標或懸空指標解參考都會造成錯誤。參考也可能因原始物件已結束生命週期而懸空，見[5.6 回傳參考與指標](section_6.md)。

指標和參考描述的是存取方式，本身不必然表示擁有權。若要管理動態資源，優先用標準容器或智慧指標；`std::unique_ptr` 和 RAII 的基本動機已在[第二章生命週期](../chapter_2/section_5.md)預告，本節不重講完整介面。非擁有連續資料檢視 `std::span` 則在[5.8 陣列參數](section_8.md)介紹。

常用介面慣例：必要且唯讀物件用 `const T&`；可選物件用指標或 `std::optional<T>`（其「可能沒有結果」語意見[第四章解碼範例](../chapter_4/section_15.md)）；小型純量按值傳遞。指標可空、參考不能重新綁定等差異，應與函式契約一起表達。