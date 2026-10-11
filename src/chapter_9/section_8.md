# `std::thread` 執行緒示例

`std::thread` 在建構時啟動工作。每個可 join 的 thread 必須在其解構前呼叫 `join()` 或 `detach()`；否則 `std::thread` 解構子會呼叫 `std::terminate()`。一般服務程式應避免 `detach()`，因為它讓背景工作生命週期脫離管理者。

基本使用形式是 `std::thread 執行緒物件(可呼叫工作, 工作參數...)`。第一個引數指定要執行的函式或 Lambda，後續引數會傳給該工作函式；建立執行緒時工作就開始，不是等到呼叫 `join()` 才開始。

```cpp
#include <iostream>
#include <thread>

void worker(int id) {
    std::cout << "worker " << id << '\n';
}

int main() {
    std::thread background(worker, 1);
    background.join();
    std::cout << "done\n";
}
```

`join()` 等待執行緒結束。執行緒間輸出順序除非同步，否則不可假定固定；上例先 `join`，因此 `done` 一定在 worker 結束之後。

## `std::jthread`（C++20）

`std::jthread` 在解構時自動請求停止並加入執行緒，可降低忘記 `join()` 的風險。停止請求需要工作函式配合檢查：

```cpp
#include <chrono>
#include <stop_token>
#include <thread>

void worker(std::stop_token stop) {
    while (!stop.stop_requested()) {
        std::this_thread::sleep_for(std::chrono::milliseconds(10));
    }
}

int main() {
    std::jthread background(worker);
    // 離開作用域時請求停止並等待結束
}
```

停止請求不是強制中斷；worker 必須定期檢查 token。若工作阻塞在無限期等待上，需另外設計可喚醒機制。

## 不要以參考捕獲搭配不確定生命週期

```cpp
int value = 42;
std::thread worker([&] {
    use(value);
});
worker.join();
```

此範例因主執行緒立即 `join`，`value` 活到工作完成；若改成 `detach` 或提早離開作用域，就可能懸空。非同步工作優先以值傳遞必要資料，並明確管理結果與停止。