# 同名成員與不同基底建構子

衍生類別若宣告與基底相同名稱的成員，會遮蔽基底同名名稱：

```cpp
class Base {
public:
    void reset() {}
};

class Derived : public Base {
public:
    void reset(int mode) {}
};
```

此時 `Derived` 的名稱查找會找到 `reset(int)`，看不到基底的無參數版本。需要同時提供時，可使用 `using`：

```cpp
class Derived : public Base {
public:
    using Base::reset;
    void reset(int mode) {}
};
```

更清楚的設計可能是替不同操作取不同名稱，避免呼叫端困惑。

## 呼叫不同基底建構子

基底子物件在衍生物件之前建構，衍生類別需在初始化列表中選擇基底建構子：

```cpp
class Base {
public:
    explicit Base(int id) : id_(id) {}
private:
    int id_;
};

class Child : public Base {
public:
    Child(int id, int level)
        : Base(id), level_(level) {}
private:
    int level_;
};
```

若基底有多個建構方式，就由衍生類別明確轉送所需參數。成員初始化順序仍由宣告順序決定，而基底子物件會先初始化。

## 繼承建構子

`using Base::Base;` 可以讓基底建構子在衍生類別中可用，但不會消除衍生類別自身的不變條件責任。若衍生類別需要額外驗證或初始化，應定義自己的建構子並明確委派給基底。