# 3.10 `string` 字串的查找和替換

## 完整範例：尋找並替換副檔名

```cpp
#include <iostream>
#include <string>

int main() {
    std::string path{"logs/app.log"};
    const std::string::size_type pos = path.find(".log");

    if (pos != std::string::npos) {
        path.replace(pos, 4, ".txt");
    }
    std::cout << path << '\n'; // logs/app.txt
}
```

`find` 找到時回傳起始位置，找不到則回傳 `std::string::npos`。回傳型別是無號 `size_type`，因此要和 `npos` 比較，不要拿 `-1` 判斷。`replace(pos, count, replacement)` 從 `pos` 起替換 `count` 個字元。若搜尋外部輸入，請先驗證位置和長度。

## 搜尋多次出現的位置

```cpp
std::string text{"cat cat cat"};
std::string::size_type pos{0};
while ((pos = text.find("cat", pos)) != std::string::npos) {
    std::cout << pos << '\n';
    pos += 3;
}
```

每輪從前一次命中後面繼續，避免一直找到同一處。若在搜尋期間修改字串，位置及內部指標都需重新計算。這些函式是逐 `char` 操作，不會解析 UTF-8 字元邊界，參見[3.6 字串基礎](section_6.md)。它們也不能取代路徑安全驗證或完整命令語法解析。

`replace`、`insert` 和 `erase` 的位置／長度要在範圍內；對不可信位置先驗證。修改字串可能使內部參考或指標失效。查找和替換是逐 `char` 的序列操作，不知道 UTF-8 字元邊界；作路徑正規化、命令解析或安全過濾時，不要用簡單字串取代冒充完整語法解析。