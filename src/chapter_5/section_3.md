# 5.3 函式與變數作用域分析

區域變數名稱只在其區塊內可見。以下完整例子讓區域值在函式中先後經過轉換；`input` 和 `normalized` 各自只在其宣告區塊可見：

```cpp
#include <iostream>

int calculate() {
    const int input{17};
    const int normalized{input - 10};
    return normalized * 2;
}

int main() {
    std::cout << calculate() << '\n'; // 14
}
```

當函式結束時，`input` 和 `normalized` 都不能再由呼叫端直接使用。用更窄的區塊可以進一步限制暫時值的作用範圍。不要在不同層重複使用同名變數來遮蔽外層名稱，否則除錯時容易改錯對象。

函式區域 `static` 變數則會在多次呼叫之間保留值，但名稱仍只在函式內可見；它會讓結果依賴先前呼叫，測試和併發設計時必須考慮這種狀態。

命名空間可避免全域名稱衝突；不要在標頭中使用 `using namespace ...`，以免污染所有 include 該標頭的 translation unit。匿名 namespace 適用於 `.cpp` 內部使用的名稱，將在[5.10 多檔案設計](section_10.md)連同連結性示範。名稱可見範圍和物件生命週期是不同概念；[第二章](../chapter_2/section_5.md)已先介紹基本生命週期。