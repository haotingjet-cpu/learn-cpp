# 多型：虛擬函式與執行期派發

基底類別的虛擬函式允許透過基底參考或指標呼叫時，依實際物件型別選擇衍生類別實作。

最小的虛擬函式模式是：基底函式前寫 `virtual`，衍生類別中的覆寫函式後寫 `override`。呼叫端透過基底參考／指標呼叫相同函式名稱時，執行期會選擇實際物件型別的版本，這就是動態派發。

```cpp
#include <iostream>

class Output {
public:
    virtual void write() const {
        std::cout << "generic\n";
    }
    virtual ~Output() = default;
};

class ConsoleOutput : public Output {
public:
    void write() const override {
        std::cout << "console\n";
    }
};

void emit(const Output& output) {
    output.write();
}

int main() {
    ConsoleOutput console;
    emit(console); // console
}
```

`virtual` 宣告此函式可由衍生類別覆寫；`override` 請求編譯器檢查確實覆寫了基底函式。函式「簽章」包含名稱、參數型別及成員函式的 `const` 等資訊；若不匹配，例如衍生版本漏了 `const`，`override` 會讓錯誤在編譯期被發現。`virtual ~Output() = default;` 表示基底解構子為虛擬，並使用編譯器產生的預設清理本文。

## 透過參考或指標使用多型

按值傳遞基底物件會發生物件切片，衍生部分不再存在於複製後的基底物件中。需要保留動態型別時，使用基底參考或指標；參考與指標的選擇見[第五章](../chapter_5/section_4.md)。

## 何時值得使用虛擬函式

當程式需要一組可替換實作、且呼叫端只依賴穩定介面時，多型很有用。只有一兩個固定分支時，`switch` 或普通函式往往更簡單。虛擬呼叫帶來間接派發及類別契約成本，不應為「看起來物件導向」而到處加入。