# 1.3 註解和 `std::cout` 詳解

註解供讀者理解設計意圖，不會參與程式執行。`//` 到行尾為止；`/* ... */` 可跨行但不能巢狀。好的註解應說明「為什麼這樣寫」、外部限制或容易忽略的假設，而不是把下一行程式碼換成中文重講一次。

先看本書多數完整範例的外層骨架：

```cpp
#include <iostream>

int main() {
    std::cout << "ready\n";
    return 0;
}
```

- `#include <iostream>` 是預處理指令，讓編譯器看到標準輸入輸出串流的宣告；`#include` 行不以分號結尾。
- `int main()` 是程式入口函式。作業系統啟動程式後，程式從 `main` 開始執行；`int` 表示它以整數狀態回報結束結果。
- `{` 和 `}` 圍住函式本文。敘述通常以分號 `;` 結尾；少了分號是常見編譯錯誤。
- `std` 是標準函式庫使用的命名空間，`::` 是作用域解析符號，因此 `std::cout` 指標準命名空間中的 `cout`。
- `return 0;` 慣例上代表成功結束。對 `main` 而言，走到結尾也等同回傳 0；初學時明寫可讓結束位置更清楚。

```cpp
// 以下語句放在 main() 的本文中。
std::cout << "ready" << '\n';
```

`std::cout` 是 `<iostream>` 提供的標準輸出串流，常用來輸出正常資訊。`<<` 將右側的值送入左側串流，因此多次插入可以串在一起：

```cpp
// 以下語句放在 main() 的本文中。
const int device_id = 7;
const double temperature = 36.5;
std::cout << "device=" << device_id
          << ", temperature=" << temperature << '\n';
```

`'\n'` 是單一換行字元。`std::endl` 也會換行，但還會要求串流立即 flush（把暫存輸出送出）。一般大量輸出用 `'\n'` 可避免不必要的 flush；需要在等待使用者輸入前確保提示已顯示時，才考慮 flush：

```cpp
#include <iostream>

int main() {
    std::cout << "Enter command: " << std::flush;
}
```

資料通常會先留在串流緩衝區，再送往終端、檔案或管線。不同目的地的顯示與效能可能不同；除非明確需要控制小數格式，本節先保持輸出簡單，格式控制會用到尚未介紹的標準函式庫功能。