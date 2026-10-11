# 手動實作最小單一擁有智慧指標

實務上應使用 `std::unique_ptr`。本節手寫極小型 `Owner<T>`，只支援單一物件，用來展示不可複製、可移動及 RAII 的核心規則；它不是標準庫替代品。

先說明類別模板的格式：

```cpp
template <typename 型別參數>
class 類別名稱 {
    型別參數 成員;
};
```

`template` 宣告後面的類別要依一個或多個模板參數產生型別；`typename T` 表示 `T` 是稍後由使用者提供的型別名稱。因此 `Owner<int>` 是擁有 `int` 的型別，`Owner<Session>` 則是擁有 `Session` 的型別。模板定義通常要放在使用端可見的標頭，完整的模板連結規則不在本節展開。

```cpp
#include <utility>

template <typename T>
class Owner {
public:
    explicit Owner(T* pointer = nullptr) noexcept : pointer_(pointer) {}
    ~Owner() { delete pointer_; }

    Owner(const Owner&) = delete;
    Owner& operator=(const Owner&) = delete;

    Owner(Owner&& other) noexcept
        : pointer_(std::exchange(other.pointer_, nullptr)) {}

    Owner& operator=(Owner&& other) noexcept {
        if (this != &other) {
            reset(other.release());
        }
        return *this;
    }

    T* get() const noexcept { return pointer_; }
    T& operator*() const { return *pointer_; }
    T* operator->() const noexcept { return pointer_; }

    T* release() noexcept {
        return std::exchange(pointer_, nullptr);
    }

    void reset(T* replacement = nullptr) noexcept {
        if (pointer_ == replacement) return;
        delete pointer_;
        pointer_ = replacement;
    }

private:
    T* pointer_{};
};
```

類別明確刪除複製操作，防止兩個擁有者同時刪除同一個物件。移動建構把來源指標換成 `nullptr`；移動賦值先釋放原資源，再接手來源。

讀這個模板時，`T*` 表示「指向 T 的指標」；`Owner(const Owner&) = delete` 明確禁止複製建構；`Owner& operator=(const Owner&) = delete` 明確禁止複製賦值。函式名稱中的 `operator=` 是賦值運算子，`Owner&` 是回傳目前擁有者的參考，讓 `a = b = c` 這類鏈式賦值有合理結果。`noexcept` 表示函式承諾不拋出例外；若實作違反承諾，程式會終止，所以只應在可確定安全時標示。

`std::exchange(pointer_, nullptr)` 先取出 `pointer_` 原本的指標，再把 `pointer_` 改成空指標。`release()` 只交出指標、不刪除物件；呼叫者接手責任。`reset()` 則先刪除目前物件，再接手新指標。`delete` 是單一物件的釋放方式，不可用於 `new[]` 建立的陣列。

## 解參考的前置條件

`operator*` 和 `operator->` 要求指標非空。教學版沒有做空值檢查，呼叫端必須先確認；標準 `unique_ptr` 同樣不能對空指標解參考。

## 為何此類別不適用於生產

它沒有自訂 deleter、陣列支援、比較運算、完整 `noexcept`/型別限制、互通轉換或經過驗證的標準相容性。例外與 API 邊界的細節很容易出錯。學完後請回到標準 `std::unique_ptr`，不要在專案裡複製貼上自製智慧指標。