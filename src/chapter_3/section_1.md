# 3.1 邏輯判斷 `if` 語法分析

`if` 依括號中的條件選擇要執行的程式區塊。先看通用格式：

```cpp
if (條件) {
    // 條件為 true 時執行
} else {
    // 條件為 false 時執行；沒有需要的分支時可省略 else
}
```

條件通常是比較運算式，例如 `temperature > 70`；比較結果是 `bool` 型別的 `true` 或 `false`。以下程式是完整範例：

```cpp
const int temperature{73};

if (temperature > 70) {
    std::cout << "temperature is high\n";
} else {
    std::cout << "temperature is normal\n";
}
```

因為 `73 > 70` 為真，所以只執行第一個大括號中的程式。條件為假時，若有 `else`，就執行 `else` 區塊。條件括號外的大括號框住受條件控制的敘述；結尾的 `}` 之後可以繼續執行後續程式。需要使用 `std::cout` 時，檔案開頭要有 `#include <iostream>`。

## 多種結果：`if`、`else if`、`else`

裝置狀態常有多個互斥範圍。條件由上到下檢查，第一個為真的分支執行後，其餘分支不再檢查：

```cpp
const int temperature{73};

if (temperature >= 90) {
    std::cout << "critical\n";
} else if (temperature >= 70) {
    std::cout << "warning\n";
} else {
    std::cout << "normal\n";
}
```

若第一個條件先寫成 `temperature >= 70`，溫度 95 會先符合該條件，`critical` 分支就永遠到不了。這就是為什麼範圍由窄到寬、較特殊條件通常要先判斷。

## 條件中使用布林變數

```cpp
const bool connected{true};
if (connected) {
    std::cout << "send packet\n";
}
```

直接寫 `if (connected)` 比 `if (connected == true)` 簡潔。若需要知道 `if` 條件的真假，可以把同一條件存成 `bool`，方便命名與測試。

每個分支都使用大括號，即使目前只有一行。之後增加第二行時，可以避免縮排看似屬於 `if`、實際上卻不受條件控制的錯誤。賦值和短路求值等常見陷阱會在[3.2 `if` 實例與錯誤](section_2.md)接著說明。