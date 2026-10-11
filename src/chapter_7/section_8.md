# 建構函式參數與 `explicit`

建構函式可接收參數，並在初始化列表中設定物件狀態。

通用格式為：

```cpp
explicit 類別名稱(參數型別 參數名稱, ...)
    : 成員名稱(初始值), 其他成員名稱(初始值) {
    // 必要的驗證或其他建構工作
}
```

只有當建構函式不應參與隱式轉換時才加 `explicit`；它寫在建構函式名稱之前。冒號後的初始化列表直接建立成員的初始值；花括號本文在成員初始化之後執行。

```cpp
#include <string>
#include <utility>

class Port {
public:
    Port(std::string protocol, int number)
        : protocol_(std::move(protocol)), number_(number) {}
private:
    std::string protocol_;
    int number_;
};

Port http{"tcp", 8080};
```

建構子應驗證必要條件。例如連接埠需落在合法範圍；若輸入可能無效，應選擇明確的錯誤回報策略，不要悄悄建立半有效物件。此例使用 `std::move` 將參數字串移入成員以避免一次不必要的複製；移動語意見[第八章](../chapter_8/section_2.md)。初學時可改寫成 `protocol_(protocol)`，先理解初始化列表，再學移動。

## 單一參數建構子的隱式轉換

單參數建構子若沒有 `explicit`，編譯器可能允許隱式轉換：

```cpp
class UserId {
public:
    UserId(int value) : value_(value) {}
private:
    int value_;
};

void load(UserId id);
// load(42); // 未標示 explicit 時可能允許隱式轉換
```

這種轉換有時方便，但也可能讓型別錯誤不易察覺。對不打算作為隱式轉換的建構子加上 `explicit`：

```cpp
class UserId {
public:
    explicit UserId(int value) : value_(value) {}
private:
    int value_;
};

load(UserId{42}); // 呼叫者清楚表達轉換
```

`explicit` 不會阻止直接初始化，只會阻止多數隱式轉換路徑。對只有一個必填參數的型別建構子，除非轉換本身是刻意的 API 設計，通常應標記 `explicit`。