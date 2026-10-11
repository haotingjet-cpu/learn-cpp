# `bind`：綁定參數與成員函式

`std::bind` 可建立新的可呼叫物件，預先固定某些參數或調整呼叫順序；`std::placeholders::_1` 表示呼叫時的第一個參數。

```cpp
#include <functional>
#include <iostream>

int subtract(int left, int right) {
    return left - right;
}

int main() {
    const auto subtract_from_10 =
        std::bind(subtract, 10, std::placeholders::_1);
    std::cout << subtract_from_10(3) << '\n'; // 7
}
```

不綁定的佔位符由呼叫參數填入。若參數複製、參考或移動方式很重要，`bind` 的儲存規則可能不夠直觀，需檢查目標型別與 `std::ref` 使用情況。

## 綁定成員函式

```cpp
struct Counter {
    void add(int amount) { value += amount; }
    int value{};
};

Counter counter;
auto add_five = std::bind(&Counter::add, &counter, 5);
add_five();
```

成員函式需要綁定一個物件。本例把 `counter` 的位址保存於回呼，因此 `counter` 必須比 `add_five` 活得久；否則會留下懸空指標。透過 `std::function` 儲存綁定結果不會延長物件生命週期。

## 通常優先選 Lambda

等價寫法：

```cpp
auto add_five = [&counter] { counter.add(5); };
```

Lambda 捕獲對象與參數較清楚，也更容易閱讀。現代 C++ 多數新程式優先用 Lambda；閱讀既有程式時仍需理解 `bind`。完整捕獲生命週期說明見[下一節](section_6.md)。