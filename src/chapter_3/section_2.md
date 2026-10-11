# 3.2 `if` 程式演示和常見錯誤

本節用「除數是否安全」示範複合條件。當 `divisor` 不為零才可以計算餘數；條件應先檢查安全前提，再執行依賴該前提的運算。

```cpp
#include <iostream>

int main() {
    const int value{27};
    const int divisor{3};

    if (divisor != 0 && value % divisor == 0) {
        std::cout << "divisible\n";
    } else {
        std::cout << "not divisible, or divisor is zero\n";
    }
}
```

`&&` 從左至右檢查，左側為假時，右側不會執行。若將 `divisor` 設成零，`divisor != 0` 為假，所以不會求值 `value % divisor`。這個特性叫**短路求值**。同理，`||` 的左側為真時，右側不會執行。

短路順序不是效能小技巧，而是正確性的一部分：若右側操作依賴左側已確認某個前提，前提就必須放左側。條件若包含會改變狀態的操作，通常應拆成一般敘述，避免讀者猜測它是否執行。

```cpp
const int port{8080};
const bool allowed{port >= 1 && port <= 65535};

if (allowed) {
    std::cout << "valid port\n";
} else {
    std::cout << "invalid port\n";
}
```

## 常見錯誤

1. **把 `=` 寫成 `==` 的比較。** `=` 是指定，`==` 才是相等比較。依變數型別不同，某些錯誤寫法會被編譯器拒絕，某些則可能改變狀態並讓條件符合預期以外的結果。讓條件本身使用清楚的比較式。
2. **把範圍檢查寫反。** `value >= 0 && value <= 100` 表示介於 0 和 100（含邊界）；若誤用 `||`，幾乎所有值都會通過。
3. **忽略短路順序。** 任何可能除零或索引越界的操作，都應在條件左側先檢查必要前提。本章稍後的陣列索引會在[第四章陣列與 vector](../chapter_4/section_6.md)細講。

每個邊界都要測試：對 port 驗證，測試 `0`、`1`、`65535`、`65536`，而不只測試一般的 `8080`。