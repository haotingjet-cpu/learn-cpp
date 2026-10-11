# `std::async`：非同步工作與取得回傳值

`std::async` 可在非同步工作完成後透過 `std::future` 取得結果。`future::get()` 等待結果，並回傳值；若工作拋出例外，`get()` 會重新拋出。

```cpp
#include <future>
#include <iostream>

int calculate() {
    return 6 * 7;
}

int main() {
    std::future<int> result =
        std::async(std::launch::async, calculate);
    std::cout << result.get() << '\n'; // 42
}
```

指定 `std::launch::async` 要求以非同步執行方式執行；不指定策略時，實作可選擇延遲執行。`get()` 通常只能成功取值一次；需要多次讀取共享結果時可了解 `std::shared_future`。

## 參數與生命週期

```cpp
const int input = 10;
auto result = std::async(std::launch::async, [input] {
    return input * 2;
});
```

值捕獲避免背景工作依賴區域變數參考。Lambda 捕獲規則見[第六節](section_6.md)。若必須共享可變資料，應使用同步原語並定義生命週期；單純捕獲 `&value` 不會讓它活得更久。

## `async` 與 `thread` 的選擇

- 需要直接管理執行緒停止、生命週期或長時間工作者：考慮 `std::jthread`。
- 需要啟動計算並取得單一結果：`std::async` / `std::future` 較直觀。
- 需要持續處理多筆工作：明確設計佇列、工作者與關閉協定。

不要為每一個小任務無限制建立新執行緒；大量任務通常需要受控執行緒池。