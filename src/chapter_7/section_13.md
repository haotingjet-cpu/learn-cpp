# 純虛擬函式、抽象類別與虛擬解構子

純虛擬函式的宣告在分號前寫 `= 0`：

```cpp
virtual 回傳型別 函式名稱(參數) = 0;
```

這裡的 `= 0` 是指定「純虛擬」的特殊語法，不是把函式回傳值設成零。含有純虛擬函式的類別是抽象類別，不能直接建立物件；具體衍生類別必須提供相符的覆寫。

```cpp
#include <string>

class Writer {
public:
    virtual bool write(const std::string& text) = 0;
    virtual ~Writer() = default;
};
```

衍生類別需實作 `write` 才能成為具體類別。`= default` 不是純虛擬語法：它表示要求編譯器產生該特殊函式的預設實作。純虛擬介面常用來讓呼叫端依賴抽象契約，而不依賴某一種檔案或控制台實作。

## 為什麼基底解構子要是虛擬

若物件可能透過基底指標刪除，基底解構子必須是虛擬的：

```cpp
class MemoryWriter final : public Writer {
public:
    bool write(const std::string&) override { return true; }
};

void destroy_through_base() {
    Writer* writer = new MemoryWriter;
    delete writer; // virtual destructor 確保衍生部分也被解構
}
```

現代程式通常不用裸指標擁有物件；本例只展示多型解構規則。使用智慧指標時也同樣需要正確的虛擬解構子，詳見[第八章](../chapter_8/section_5.md)。

## 介面類別習慣

介面型別通常包含虛擬函式、虛擬解構子，不保存具體輸出實作狀態。把共同演算法或狀態放進抽象基底前，先確認所有實作真的共享相同語意；介面越小，替換與測試越容易。