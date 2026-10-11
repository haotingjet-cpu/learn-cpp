# 3.7 `string` 字串初始化和賦值示例

字串可以用空值、文字字面值或另一個字串初始化。以下程式完整展示初始化、複製、指定和重複字元：

```cpp
#include <iostream>
#include <string>

int main() {
    std::string empty;
    std::string name{"sensor"};
    std::string padded(4, '0');
    std::string copy = name;
    copy.assign("node");

    std::cout << '[' << empty << "]\n";
    std::cout << name << '\n';
    std::cout << padded << '\n';
    std::cout << copy << '\n';
}
```

輸出依序為空行、`sensor`、`0000`、`node`。`std::string padded(4, '0')` 選擇「建立四個字元」的建構方式；使用括號可清楚表達第一個參數是重複次數。字串字面值本身用花括號初始化通常更安全，也與本書變數初始化風格一致。

`copy` 一開始是 `name` 的獨立副本；對 `copy` 呼叫 `assign` 不會改變 `name`。可自行將程式加上 `copy += " 2";`，觀察只修改副本。這就是字串的值語意：變數指定給另一個字串時，預期是可獨立修改的內容。

賦值或串接可能使字串內部重新配置，所以先前取得的內部指標或參考不一定繼續有效。小字串最佳化是實作細節，不應依賴它保證沒有配置。若要閱讀長度、比較或截取字串，請接續[3.8 字串操作](section_8.md)。