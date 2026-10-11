# 5.10 多檔案宣告、定義、函式和全域變數

## 從兩個原始檔開始

建立 `device.hpp`、`device.cpp` 和 `main.cpp`。標頭提供函式宣告，實作只出現在一個 `.cpp`，入口程式 include 標頭並呼叫它。

典型組織將公開宣告放標頭、定義放單一 `.cpp`。以下三段各自存成指定檔案，檔名必須一致：

```cpp
// device.hpp
#pragma once
int device_status_code();
```

```cpp
// device.cpp
#include "device.hpp"
int device_status_code() {
    return 200;
}
```

```cpp
// main.cpp
#include <iostream>
#include "device.hpp"
int main() {
    std::cout << device_status_code() << '\n';
}
```

三個檔案不能原樣當成單一檔案編譯。分別編譯後再連結：

```sh
g++ -std=c++20 -c device.cpp -o device.o
g++ -std=c++20 -c main.cpp -o main.o
g++ main.o device.o -o device_app
```

如果 `main.cpp` 忘了 include 標頭，編譯器不知道 `device_status_code` 的宣告；若連結時漏掉 `device.o`，編譯可能成功，但連結器找不到函式定義。把錯誤定位到「編譯」或「連結」，可快速縮小問題範圍，詳見[第一章建置階段](../chapter_1/section_2.md)。

標頭保護避免同一 translation unit 重複 include；它不能解決在多個 `.cpp` 中定義同一個非 `inline` 外部函式的 ODR 違規。全域變數若要跨檔案共享，使用一處定義、其他處 `extern` 宣告，但更建議封裝為明確狀態物件以降低全域耦合。

不要在標頭定義非 `inline` 全域變數或一般非模板函式。否則每個 include 標頭的 translation unit 都會產生一份定義，連結時可能違反 One Definition Rule（ODR）。多檔案簡化心法：標頭宣告「介面是什麼」，某一個 `.cpp` 定義「實際怎麼做」。

若必須跨檔案共享全域物件，可在標頭以 `extern` 宣告、在唯一 `.cpp` 定義；但可變全域增加隱含依賴和初始化順序風險，通常優先將狀態放入物件並明確傳遞。`inline` 變數（C++17）是特定的 ODR 例外，只有所有 translation unit 定義一致時才可使用。