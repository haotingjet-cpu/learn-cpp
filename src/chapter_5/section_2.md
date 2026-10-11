# 5.2 函式參數與回傳值程式實戰

## 實際呼叫函式

先從不修改呼叫端狀態的值參數開始。小型純量（例如整數）通常按值傳入：

```cpp
#include <iostream>

int add(int left, int right) {
    return left + right;
}

int main() {
    const int result = add(20, 22);
    std::cout << result << '\n'; // 42
}
```

呼叫 `add(20, 22)` 時，引數值成為函式的參數值；`return` 把結果交回呼叫端。修改函式內的 `left` 不會修改呼叫端原本的整數變數。

純量小值通常按值傳遞；唯讀大型物件通常以 `const T&` 傳入；需要修改呼叫端物件時以 `T&` 表達，參見[5.5 函式參數的參考使用](section_5.md)。回傳新值時直接回傳值，編譯器可省略不必要的複製。

```cpp
#include <string>
#include <string_view>

std::string make_greeting(std::string_view name) {
    return "Hello, " + std::string{name};
}
```

`string_view` 不擁有輸入資料，這裡只在函式呼叫期間讀取，回傳的新 `string` 則擁有結果。若函式要保存名稱，應接收或建立擁有資料的 `std::string`，不可保存呼叫端短命 view。

不要把輸出參考當成預設介面。若一次要回傳多個欄位，可定義一個結果結構；若「沒有結果」是正常情況，可用 `std::optional<T>`（例如[第四章 Base16 解碼](../chapter_4/section_15.md)）；錯誤型別和政策則由模組契約明確規定。介面應讓呼叫者知道是否必須檢查失敗。