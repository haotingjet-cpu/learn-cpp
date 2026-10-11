# `std::function` 函式封裝器

`std::function<簽章>` 可保存符合指定呼叫簽章的可呼叫物件，例如普通函式、Lambda 或函式物件。標頭為 `<functional>`。

```cpp
#include <functional>
#include <iostream>

int multiply(int a, int b) { return a * b; }

int main() {
    std::function<int(int, int)> operation = multiply;
    std::cout << operation(6, 7) << '\n'; // 42
}
```

`std::function<int(int, int)>` 表示呼叫時接收兩個 `int` 並回傳 `int`。它可在執行期替換不同可呼叫目標：

```cpp
operation = [](int a, int b) { return a + b; };
```

格式可以寫成 `std::function<回傳型別(參數型別...)> 名稱;`。尖括號裡的括號描述「如何呼叫」；不是一般函式呼叫。此範例也假設 `operation` 已在同一作用域宣告，若單獨閱讀第二段，必須先接上前一個完整程式。

Lambda 的語法與捕獲規則見[第六節](section_6.md)。

## 空函式狀態

預設建構或清除後的 `std::function` 沒有目標；直接呼叫會拋出 `std::bad_function_call`。可用轉成 `bool` 的方式先檢查：

```cpp
if (operation) {
    const int result = operation(1, 2);
}
```

若只需在單一函式內接受泛型回呼，模板參數常能避免 `std::function` 的型別抹除成本。當需要把不同型別目標存入同一容器或作為穩定成員欄位時，`std::function` 較方便。不要在未量測前假定其配置或呼叫成本。