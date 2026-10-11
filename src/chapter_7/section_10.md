# 繼承中的存取權限

存取權限會決定類別使用者與衍生類別可見到哪些成員。基底類別成員原本的權限與繼承時指定的權限共同決定衍生類別對外呈現的介面。

```cpp
class Base {
public:
    void public_call() {}
protected:
    void extension_hook() {}
private:
    int internal_state_{};
};

class Derived : public Base {
public:
    void run() {
        public_call();
        extension_hook();
        // internal_state_ 不可直接存取
    }
};
```

`public` 繼承最常用，保留基底的 public/protected 分類；private 成員仍不能由衍生類別直接存取。基底類別可公開受控操作，而不必公開內部欄位。

## 其他繼承方式

- `protected` 繼承會把基底的 public/protected 成員以 protected 方式提供給衍生類別。
- `private` 繼承會把基底的 public/protected 成員以 private 方式提供給衍生類別。

它們通常不應拿來模擬一般「是一種」關係，因為呼叫端不能把衍生類別當公開基底使用。若只是重用實作，優先考慮把基底型別作為成員（組合）；見[組合與委派](section_14.md)。

## `protected` 的代價

把欄位設成 `protected` 看似方便，但會讓所有衍生類別依賴欄位表示法。未來改變基底實作時，必須同時修正子類別。通常將資料設為 `private`，只開放受控的 protected/public 操作。