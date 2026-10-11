# 5.5 指標和參考作為函式參數以避免複製

## 三種參數契約

以下先是一組函式定義片段，不是完整程式；它們示範三種不同的參數宣告格式：

```cpp
#include <iostream>
#include <string>

void print_name(const std::string& name) {
    std::cout << name << '\n';
}

void normalize_name(std::string& name) {
    if (name.empty()) {
        name = "unnamed";
    }
}

void maybe_print(const std::string* name) {
    if (name != nullptr) {
        std::cout << *name << '\n';
    }
}
```

第一個函式保證不透過參數修改字串；第二個要求呼叫端提供可修改的字串；第三個允許 `nullptr`，表示沒有可印的名字。呼叫方式分別是 `print_name(name)`、`normalize_name(name)`、`maybe_print(&name)` 或 `maybe_print(nullptr)`。

將前面的三個定義放入一個 `.cpp` 後，以下 `main` 可和那些定義合併編譯：

```cpp
int main() {
    std::string name;
    normalize_name(name);
    print_name(name);      // unnamed
    maybe_print(&name);    // unnamed
    maybe_print(nullptr);  // 不輸出
}
```

傳大型唯讀物件的參考可避免複製；但「複製成本」需依型別判斷，小型物件或廉價 view 按值通常更合適。前面的函式宣告可直接放進標頭檔，函式本體則放在一個 `.cpp`；多檔案做法見[5.10](section_10.md)。

`const T&` 表示函式不透過此參考修改物件，但不保證沒有其他別名修改它。`T&` 是必要且可修改的參數；`T*` 可用 `nullptr` 表達缺席，呼叫端必須遵守契約。若不需要保存字串，按值傳入 `std::string_view` 也可能是合理選擇；view 不擁有來源，生命週期限制見[第三章 string_view 說明](../chapter_3/section_6.md)。C++20 可用 `std::span` 表達連續元素範圍，完整例子見[5.8](section_8.md)。

參數設計亦要考量別名：若同一容器同時作為輸入和輸出，操作中重新配置可能使內部參考失效。文件化前置條件，並以測試涵蓋「輸入和輸出是同一物件」的情況。是否避免複製應透過量測判斷，別為了省掉小型純量複製而讓介面難用。