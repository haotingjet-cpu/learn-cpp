# 靜態成員與存取說明符

非靜態成員屬於各個物件；`static` 資料成員則屬於整個類別，共用一份狀態。

宣告靜態資料成員及靜態函式的概念格式如下：

```cpp
class 類別名稱 {
public:
    static 回傳型別 函式名稱(參數清單);
private:
    inline static 資料型別 共用資料名稱{初始值}; // C++17 起可類別內定義
};
```

`static` 表示成員不屬於某一個物件，而屬於整個類別。範例中的 `inline static` 允許在標頭所見的類別定義內提供這一份變數定義；此處使用 `inline` 是 C++17 以來的資料成員規則，不是「保證函式展開」。

```cpp
#include <cstddef>

class Connection {
public:
    Connection() { ++active_count_; }
    ~Connection() { --active_count_; }

    static std::size_t active_count() {
        return active_count_;
    }

private:
    inline static std::size_t active_count_{};
};
```

`inline static` 資料成員可在 C++17 及更新版本於類別內定義一次。每個 `Connection` 的建構與解構會更新共享計數。若類別物件生命週期管理錯誤，計數也會錯；此例只用來展示共享資料，不代表所有計數都適合放在類別裡。

可透過類別名稱呼叫靜態函式：

```cpp
const auto count = Connection::active_count();
```

靜態成員函式沒有 `this`，因而不能直接讀取某個物件的非靜態成員；它只可直接存取靜態成員。

## 存取說明符

- `public`：類別使用者可呼叫或讀取。
- `private`：只有類別本身及其友元可存取。
- `protected`：類別本身、友元及衍生類別可存取。

應優先把資料設為 `private`，公開維護不變條件的操作。不要為了省事把所有欄位設成 `public`，否則任何呼叫端都可讓物件進入無效狀態。`protected` 會讓衍生類別依賴基底實作，應審慎使用。