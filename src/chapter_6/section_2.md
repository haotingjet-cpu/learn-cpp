# `cout` 無格式輸出

一般 `operator<<` 會依照資料型別進行格式化；例如整數 `65` 會輸出字元 `65`，而不是位元組 `A`。需要精確輸出字元或位元組數量時，使用 `put` 和 `write`。

## `put` 輸出單一字元

```cpp
#include <iostream>

int main() {
    std::cout.put('O').put('K').put('\n');
}
```

`put` 每次輸出一個字元，回傳串流，因此可串接。它仍然是文字輸出，並不會自動把整數格式化成數字。

## `write` 輸出指定長度

```cpp
#include <iostream>
#include <string>

int main() {
    const std::string record{"A\0B", 3};
    std::cout.write(record.data(),
                    static_cast<std::streamsize>(record.size()));
    std::cout.put('\n');
}
```

`std::string` 可以包含 `'\0'`，但一般以 C 字串方式處理時會在第一個零字元停止。`write` 配合明確長度可以送出全部三個位元組。終端機可能不顯示零字元，因此此範例不適合用肉眼判斷內容完整性。

`write` 的長度型別是 `std::streamsize`。從 `size()` 轉型前，資料量應確定在該型別可表示的範圍內；大資料應切成多塊處理，而不是直接窄化一個極大的長度。

## 格式化與原始資料的選擇

| 需求 | 合適介面 |
|---|---|
| 顯示數字、文字與欄位 | `operator<<` |
| 輸出單一字元 | `put` |
| 輸出含零位元組的資料區段 | `write` |
| 寫入可供其他程式交換的二進位檔 | 二進位檔案串流的 `write` |

不要用 `std::cout << buffer` 輸出不保證以零字元結尾的陣列，因為它會把陣列當成 C 字串尋找終止字元。若有明確長度，使用 `write`。