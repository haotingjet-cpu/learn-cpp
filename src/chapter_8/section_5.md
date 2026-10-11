# 智慧指標原理與 `unique_ptr`

智慧指標是管理動態物件的類別，利用 RAII 在擁有者生命週期結束時自動釋放資源。單一擁有權通常使用 `std::unique_ptr`，由 `<memory>` 提供。

常見宣告格式是 `std::unique_ptr<T> 名稱;`，其中 `T` 是所擁有物件的型別。建立並取得所有權時通常寫 `auto 名稱 = std::make_unique<T>(建構參數...);`；`auto` 會推導成 `std::unique_ptr<T>`，不是動態型別。

```cpp
#include <memory>

struct Session {
    void run() {}
};

int main() {
    auto session = std::make_unique<Session>();
    session->run();
}
```

`make_unique` 建立物件並回傳唯一擁有者。離開作用域時，`unique_ptr` 自動刪除所擁有的 `Session`。除非 API 明確要求轉移所有權，不要使用裸 `new`。

## 不可複製、可以移動

```cpp
auto first = std::make_unique<Session>();
// auto second = first; // 編譯錯誤：不能複製唯一擁有權
auto second = std::move(first);
```

移動後 `first` 不再擁有物件，通常為空；可用 `if (first)` 檢查。`unique_ptr` 清楚表示「此處是唯一擁有者」。若函式只暫時使用物件而不接手擁有權，通常收裸指標或參考，不要把它包成 `unique_ptr`。

## `unique_ptr` 作為成員

```cpp
class Manager {
public:
    explicit Manager(std::unique_ptr<Session> session)
        : session_(std::move(session)) {}
private:
    std::unique_ptr<Session> session_;
};
```

呼叫端需明確移交所有權。標準類別的特殊成員函式會正確管理成員指標，不需自行寫解構子。

## 原始指標不等於擁有權

`unique_ptr::get()` 可取得不擁有的原始指標供短暫觀察，但不應對該指標呼叫 `delete`。只有擁有者負責釋放。陣列資源需使用 `std::unique_ptr<T[]>` 或更合適的 `std::vector<T>`，不可與單一物件形式混用。