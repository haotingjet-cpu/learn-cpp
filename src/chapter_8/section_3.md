# 實作一個擁有字元陣列的 `String`

標準 `std::string` 幾乎總是正確選擇。此節建立教學用 `ByteString`，觀察擁有動態記憶體時的複製、移動與解構責任；它不處理所有字串功能，不可取代標準字串。

類別維持不變條件：`size_` 是內容位元組數；非空內容由 `data_` 指向、結尾額外有 `'\0'`。移動後允許 `data_ == nullptr`，`size_ == 0`，`c_str()` 仍提供空字串。

```cpp
#include <cstddef>
#include <cstring>
#include <limits>
#include <stdexcept>
#include <string_view>
#include <utility>

class ByteString {
public:
    ByteString() : data_(new char[1]{'\0'}), size_(0) {}

    explicit ByteString(std::string_view text)
        : data_(allocate(text.size())), size_(text.size()) {
        if (size_ != 0) {
            std::memcpy(data_, text.data(), size_);
        }
        data_[size_] = '\0';
    }

    ByteString(const ByteString& other)
        : data_(new char[other.size_ + 1]), size_(other.size_) {
        if (size_ != 0) {
            std::memcpy(data_, other.data_, size_);
        }
        data_[size_] = '\0';
    }

    ByteString(ByteString&& other) noexcept
        : data_(std::exchange(other.data_, nullptr)),
          size_(std::exchange(other.size_, 0)) {}

    ~ByteString() {
        delete[] data_;
    }

    ByteString& operator=(ByteString other) {
        swap(other);
        return *this;
    }

    void swap(ByteString& other) noexcept {
        std::swap(data_, other.data_);
        std::swap(size_, other.size_);
    }

    const char* c_str() const {
        return data_ ? data_ : "";
    }
    std::size_t size() const { return size_; }

private:
    static char* allocate(std::size_t size) {
        if (size == std::numeric_limits<std::size_t>::max()) {
            throw std::length_error("ByteString is too large");
        }
        return new char[size + 1];
    }

    char* data_{};
    std::size_t size_{};
};
```

這份教學實作使用「值傳遞賦值」：傳入左值時先複製參數，傳入右值時可移動參數；函式本文只交換資源。複製配置若失敗，原左側物件尚未改變，因而具備強例外安全保證。

## 使用及驗證

```cpp
ByteString first{"device"};
ByteString second = first;            // 深複製
ByteString third = std::move(first);  // 資源轉交
second = third;                       // 複製賦值
```

修改任何一份內容（本範例刻意未提供可修改介面）都不應影響其他份。可擴充 `operator==` 做測試，但必須以 `size_` 比較，因為 `string_view` 也可包含內嵌零位元組，C 字串比較不一定符合位元組序列語意。

## 此教學型別仍有界限

- `text.size() + 1` 可能溢位或超過配置上限；生產型別須檢查並使用更適合的錯誤策略。
- 建構子假設複製的範圍有效；對空 `string_view`，呼叫 `memcpy` 時的指標有效性應按其前置條件處理，正式實作可對零長度跳過複製。
- 缺少迭代器、比較、容量管理與完整錯誤契約。
- 移動後 `c_str()` 回傳靜態空字串，不代表移動來源可被任意假設為原值。

此例的目的在說明擁有權，不應在專案中重造 `std::string`。