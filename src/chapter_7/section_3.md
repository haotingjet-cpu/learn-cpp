# 類別成員函式、內聯與 `this`

成員函式是類別對外或內部提供的操作。非靜態成員函式執行時會作用於一個物件，並可直接存取該物件的成員。

一般成員函式宣告的格式是：

```cpp
回傳型別 函式名稱(參數清單) 限定詞;
```

例如 `int value() const;` 表示沒有參數、回傳 `int`，且最後的 `const` 限定函式不修改目前物件。成員函式定義也可直接寫在類別本文內：

```cpp
class Counter {
public:
    void increment() { ++value_; }
    int value() const { return value_; }

private:
    int value_{};
};
```

`void` 表示 `increment` 不回傳結果；`++value_` 把目前物件的計數加一；`int` 表示讀取器回傳整數。花括號內是函式本文。呼叫 `counter.increment()` 時，函式操作的是 `counter` 的 `value_`。概念上可把物件位址視為隱含的 `this`，但 `this` 是 C++ 成員函式中的語言機制，不是呼叫端額外傳入的普通參數。

```cpp
class Counter {
public:
    void set(int value) {
        this->value_ = value;
    }
private:
    int value_{};
};
```

`this` 是指向目前物件的指標。`this->value_` 表示透過目前物件存取名為 `value_` 的成員；`->` 是「先取指標所指物件，再存取成員」的運算子。當參數名稱與成員名稱相同時，`this->member` 可消除歧義。一般情況直接寫成員名稱更簡潔。

## `const` 成員函式

在成員函式參數列表後加 `const`，表示此函式不會透過目前物件修改非 `mutable` 成員：

```cpp
class Counter {
public:
    int value() const { return value_; }
    void increment() { ++value_; }
private:
    int value_{};
};
```

`const Counter` 只能呼叫 `const` 成員函式。這裡的 `const` 限制的是函式透過 `this` 修改物件，不是把回傳型別變成唯讀。讀取器應標示 `const`，才能讓唯讀物件使用，也能清楚表達操作契約。若函式呼叫會改變邏輯狀態（例如 `increment`），就不能標成 `const`。

## 類別內定義與內聯

在類別定義內直接定義的成員函式隱含為 `inline`，這允許相同定義出現在多個翻譯單元，並不保證編譯器一定把呼叫展開。大型函式通常宣告放標頭檔、定義放 `.cpp`；多檔案原則見[第一章](../chapter_1/section_1.md)。