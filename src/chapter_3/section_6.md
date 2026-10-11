# 3.6 `std::string` 功能分析

`std::string` 是標準函式庫提供的文字容器。可以把它想成「長度可變、會自行管理記憶體的一串 `char`」，它能複製、串接、比較和查詢長度。要使用它，先引入 `<string>`。

```cpp
#include <iostream>
#include <string>

int main() {
    std::string message{"device online"};
    message += " on port ";
    message += "8080";
    std::cout << message << '\n';
}
```

預期輸出 `device online on port 8080`。字串字面值 `"8080"` 是文字；本例刻意直接串接，數值轉文字會在[3.9 數字轉換與拼接](section_9.md)再教。

字串物件有目前長度和可使用的記憶體容量。讀取長度用 `size()`；字串可包含內嵌的零位元組，並非只靠遇到第一個零位元組決定結尾。

### UTF-8 的重要限制

`std::string` 裡每個元素是 `char`，不是「一個畫面上的字」。若內容採 UTF-8，一個中文或其他非 ASCII 字元通常由多個位元組組成；`size()` 算的是位元組數，不是 Unicode 碼點數，也不是使用者看到的字元數。因此不要把 `text[i]` 當成第 `i` 個中文文字來切字。若程式只處理 ASCII 命令或十六進位字元，逐位元組操作則是合適的。

`c_str()` 可取得供需要 NUL 結尾字串的舊式 API 使用的檢視。該指標由原 `std::string` 管理；不要在原字串銷毀後或可能令字串重新配置的修改後繼續使用它。指標與參考的完整生命週期規則見[第五章](../chapter_5/section_4.md)。

唯讀參數可以用 `std::string_view` 避免擁有或複製資料，但它不管理來源生命週期；這個型別會在[第五章函式參數](../chapter_5/section_5.md)配合函式介面說明。