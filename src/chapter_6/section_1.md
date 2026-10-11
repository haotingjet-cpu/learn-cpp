# `cout`：標準輸出串流

`std::cout` 是標準輸出串流，通常連接到終端機。它由 `<iostream>` 提供，使用 `<<` 將資料送入串流。

可以把輸出敘述先讀成：

```cpp
輸出目的地 << 要輸出的值 << 下一個值;
```

`<<` 在這裡是串流輸出運算子，不是數學上的左移；串流物件會依右側值的型別選擇輸出方式。每次輸出運算都回傳同一條串流，所以可以連續接多個 `<<`。

```cpp
#include <iostream>

int main() {
    const int device_id = 42;
    const double temperature = 23.75;

    std::cout << "device=" << device_id
              << ", temperature=" << temperature << '\n';
}
```

輸出：

```text
device=42, temperature=23.75
```

每個 `<<` 都把右側值格式化後寫入左側串流；運算式回傳串流本身，所以可以串接。`'\n'` 只輸出換行字元，而 `std::endl` 除了換行還會要求立即刷新緩衝區。一般輸出優先使用 `'\n'`，避免不必要的刷新降低效能。

## 格式與型別

串流會依型別選擇輸出方式。整數以十進位輸出，`bool` 預設輸出 `1` 或 `0`，字元輸出其字元值：

```cpp
#include <iostream>

int main() {
    const bool connected = true;
    const char marker = 'A';
    std::cout << connected << ' ' << marker << '\n';
}
```

結果是 `1 A`。若要輸出 `true`/`false`，可加入 `<iomanip>` 並使用 `std::boolalpha`：

```cpp
#include <iomanip>
#include <iostream>

int main() {
    std::cout << std::boolalpha << true << ' ' << false << '\n';
}
```

輸出 `true false`。格式旗標會留在串流狀態中，後續輸出也會受影響；函式若修改共享串流格式，應清楚說明其副作用，或在輸出後恢復旗標。

## 串流狀態

輸出操作可能失敗，例如磁碟空間不足或管線已關閉。串流可轉成 `bool` 檢查是否仍可使用：

```cpp
if (!std::cout) {
    // 寫入失敗；正式程式應交由上層處理或回報
}
```

不要把「呼叫了 `operator<<`」等同於「資料已可靠地保存」。檔案寫入若需要確認成功，必須檢查串流狀態，並考慮關閉時才發現的錯誤；詳見[檔案串流與開啟模式](section_6.md)。

## 常見錯誤

- 忘記 `#include <iostream>` 或漏寫 `std::`。
- 在高頻路徑每輸出一行都使用 `std::endl`。
- 假設浮點數輸出的小數位數、科學記號格式符合需求；需要固定格式時使用 `<iomanip>` 明確設定，見[無格式輸出以外的格式控制](section_2.md)。
- 將任意二進位資料直接當成文字串流輸出。二進位資料應使用 `write`，見[二進位與追加寫入](section_7.md)。