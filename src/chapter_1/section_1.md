# 1.1 C++ 程式生成過程中各種檔案的作用

| 檔案 | 常見副檔名 | 用途與本例中的角色 |
|---|---|---|
| C++ 原始檔 | `.cpp`、`.cc` | 開發者編寫的實作。下方的 `main.cpp` 和 `add.cpp` 會分別編譯。 |
| 標頭檔 | `.h`、`.hpp` | 提供共用宣告。本例的 `add.hpp` 讓呼叫端知道 `add` 函式的名稱和型別。 |
| 預處理輸出 | `.ii` | 展開 include 與前處理指令後的文字，可用來查標頭到底帶進哪些內容。 |
| 組合語言檔 | `.s`、`.asm` | 編譯器產生的目標架構組合語言，可用來觀察指令生成。 |
| 物件檔 | `.o`、`.obj` | 含機器碼及連結所需資訊的中間產物；仍可能引用其他檔案中的函式。 |
| 函式庫 | `.a`／`.lib`、`.so`／`.dll` | 可重用程式碼。靜態與動態連結方式和部署需求不同。 |
| 可執行檔 | 平台相關 | 連結完成的產物；仍可能需要系統上的共享函式庫才能啟動。 |

## 一個可追蹤的兩檔案範例

建立以下三個檔案。標頭只宣告加法函式；實作放在 `add.cpp`；程式入口放在 `main.cpp`。

```cpp
// add.hpp
#pragma once
int add(int left, int right);
```

```cpp
// add.cpp
#include "add.hpp"
int add(int left, int right) {
    return left + right;
}
```

```cpp
// main.cpp
#include <iostream>
#include "add.hpp"

int main() {
    std::cout << add(20, 22) << '\n';
}
```

分別編譯 `main.cpp` 和 `add.cpp` 時，編譯器各自處理一份原始檔及其 include 進來的內容。這個「原始檔加上其包含內容」常稱為一個 **translation unit（翻譯單元）**。因此本例有兩個 translation unit。`main.cpp` 能編譯，是因為它讀到 `add` 的宣告；真正的函式定義則留在 `add.cpp`。

標頭檔不是特殊的二進位模組；`#include` 會在預處理時把指定檔案內容帶進目前的原始檔。`#pragma once` 避免同一標頭在同一 translation unit 重複展開。它是常見編譯器支援的作法；可攜的傳統寫法是 include guard。

**工程判斷：** 一般函式通常在標頭宣告、只在一個 `.cpp` 定義。若把相同的普通函式定義放入被多個 `.cpp` include 的標頭，連結時可能出現重複定義。這條規則之所以重要，會在[第五章多檔案與單一定義規則](../chapter_5/section_10.md)用實例深入說明。模板函式通常需要讓使用端看到定義，簡單模板範例見[第五章陣列參數](../chapter_5/section_8.md)。