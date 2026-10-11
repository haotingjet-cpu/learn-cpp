# Lambda：臨時可呼叫物件與實戰

Lambda 是可在程式碼位置定義的匿名函式物件。基本形式包含捕獲區、參數、可選回傳型別與函式本文：

```cpp
[捕獲清單](參數清單) -> 回傳型別 {
    // 函式本文
}
```

回傳型別箭頭 `-> 回傳型別` 可在編譯器能推導時省略；捕獲清單用來列出 Lambda 是否使用外層變數。`[]` 表示不捕獲任何外層變數，`[name]` 按值複製 `name`，`[&name]` 以參考借用 `name`。

```cpp
const auto square = [](int value) {
    return value * value;
};
```

呼叫 `square(5)` 得到 `25`。每個 Lambda 都有自己的匿名型別，使用 `auto` 保存通常最自然。

## 捕獲外部狀態

```cpp
#include <algorithm>
#include <vector>

int total = 0;
const std::vector<int> values{2, 4, 6};
std::for_each(values.begin(), values.end(),
              [&total](int value) { total += value; });
```

`[&total]` 以參考捕獲外部變數；此例呼叫同步完成，`total` 在 Lambda 使用時仍有效。若 Lambda 被保存或交給另一執行緒，參考捕獲的生命週期會更難保證。

值捕獲建立副本：

```cpp
const int limit = 10;
const auto below_limit = [limit](int value) {
    return value < limit;
};
```

## 初始化捕獲與可變狀態

```cpp
auto task = [counter = 0]() mutable {
    return ++counter;
};
```

初始化捕獲建立 Lambda 自己擁有的 `counter`，`mutable` 允許修改這份副本。每次呼叫都會更新同一 Lambda 物件的內部狀態；若多執行緒共用該物件，仍可能發生資料競爭。

## 值捕獲 `this`

類別成員函式中的 Lambda 若要保存物件狀態，可用初始化捕獲複製所需值，避免延後執行時 `this` 已失效：

```cpp
auto task = [name = name_] { return name; };
```

`[this]` 只保存物件指標，不延長該物件生命週期。非同步工作與捕獲的安全性會在執行緒小節繼續討論。