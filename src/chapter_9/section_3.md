# 函式指標與成員函式指標

普通函式指標可以保存函式位址，前提是參數與回傳型別相容：

一般宣告格式為：

```cpp
回傳型別 (*指標名稱)(參數型別清單);
```

括號不可省略；`int (*operation)(int, int)` 是「指向函式的指標」，而 `int *operation(int, int)` 會被解析成「回傳 `int*` 的函式宣告」，意思不同。

```cpp
#include <iostream>

int add(int left, int right) {
    return left + right;
}

int main() {
    int (*operation)(int, int) = &add;
    std::cout << operation(2, 3) << '\n'; // 5
}
```

函式名稱在適當情境可轉成函式指標，因此 `&` 通常可省略。函式指標只能指向簽章相容的普通函式，不能直接保存一般成員函式。

## 成員函式指標

非靜態成員函式需要一個物件才能呼叫，所以成員函式指標包含類別型別：

```cpp
class Motor {
public:
    void start() { running_ = true; }
    bool running() const { return running_; }
private:
    bool running_{};
};

int main() {
    void (Motor::*start_method)() = &Motor::start;
    Motor motor;
    (motor.*start_method)();

    auto check_method = &Motor::running;
    const bool active = (motor.*check_method)();
}
```

經由物件呼叫使用 `object.*member_pointer`；經由物件指標呼叫則使用 `pointer->*member_pointer`。括號不可省略，因為運算子優先序不同。

## 何時使用

函式指標適合簡單、無狀態的回呼；成員函式指標適合明確選擇同一類別的一種操作，但其語法較不直觀。現代程式常用 Lambda、`std::function` 或直接傳入可呼叫物件，後續各節會比較它們。