# 3.11 列舉 `enum` 類型和新特性分析

## 範例：用整數表示狀態為何容易出錯

假設服務狀態只有停止、啟動、執行和失敗。若用 `int`，任意數字也都能存入，呼叫端必須另外記住每個數字的意義；用 `enum class` 時，狀態名稱和值的關聯直接寫在程式裡：

```cpp
enum class ServiceState {
    stopped,
    starting,
    running,
    failed
};

ServiceState state{ServiceState::stopped};
state = ServiceState::running;
```

`ServiceState::running` 不能不小心當一般整數使用。這是 `enum class` 相較於舊式 `enum` 的重要安全特性。列舉型別的分支處理會在[3.14 `switch`](section_14.md)進一步實作。

傳統 `enum` 的列舉項目會洩漏到外層作用域，且可隱式轉成整數。C++11 的 scoped enumeration `enum class` 避免名稱衝突與隱式整數轉換，可指定底層型別。

```cpp
enum class Status : unsigned char {
    idle,
    running,
    failed
};

Status status = Status::idle;
```

`enum class` 適合狀態、協定欄位與有限選項。轉成整數需明確 `static_cast`，並自行確認值合法。使用指定底層型別時，序列化前仍需明確定義線上位元組順序和有效列舉值；不能把物件記憶體直接寫進封包就假定可攜。

列舉讓非法狀態集合可被限制，但轉型或外部資料仍可能產生不合法值。解析外部輸入時先驗證，再建立列舉。旗標列舉應提供具名 bitwise 操作並挑選無號底層型別，避免無意義的算術。