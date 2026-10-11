# `stringstream`：拼接與解析字串流

`std::stringstream` 同時提供輸入與輸出介面，可以把字串當成串流處理。它適合將欄位格式化成文字，或從一行文字逐欄解析。標頭檔是 `<sstream>`。

函式中的串流運算仍使用第六章的 `<<` 輸出和 `>>` 輸入。下面的片段可先按「回傳型別、函式名稱、參數清單、函式本文」閱讀；函式宣告格式回顧見[第五章函式骨架](../chapter_5/section_1.md)。

## 格式化欄位

```cpp
#include <iomanip>
#include <sstream>
#include <string>

std::string make_record(int id, double value) {
    std::ostringstream output;
    output << "id=" << id << ", value="
           << std::fixed << std::setprecision(2) << value;
    return output.str();
}
```

呼叫 `make_record(7, 3.5)` 得到 `id=7, value=3.50`。`std::ostringstream` 專用於輸出，`str()` 取出目前組成的字串。大量重複串接時，應先量測需求；不要因為「串流看起來抽象」就假定它一定比其他方式快或慢。

## 解析一行文字

假設每行格式是「整數 ID、空白、整數數量」：

```cpp
#include <sstream>
#include <string>

bool parse_record(const std::string& line, int& id, int& count) {
    std::istringstream input(line);
    char extra{};
    if (!(input >> id >> count)) {
        return false;
    }
    return !(input >> extra);
}
```

輸入 `"12 4"` 成功，`"12 four"` 和 `"12 4 extra"` 都失敗。最後一次讀取用來確保兩個欄位後沒有非空白額外內容；空白會被 `>>` 略過。此介面會先寫入 `id`，再可能失敗於 `count`，因此若呼叫者要求「失敗時輸出參數完全不變」，應先解析到區域變數，確認整行有效後再指定輸出參數。

## 解析逗號分隔欄位

```cpp
#include <sstream>
#include <string>

int main() {
    std::istringstream input("north,17");
    std::string name;
    int count{};
    char comma{};
    if ((input >> name >> comma >> count) && comma == ',') {
        // 欄位有效
    }
}
```

這種簡單方式不支援引號內含逗號、跳脫字元等完整 CSV 規則；正式 CSV 應使用符合其格式規範的解析器，而不是不斷擴充這個小範例。

## 重設字串串流

`str(new_text)` 替換字串內容；但輸入串流可能仍保留 EOF/失敗狀態，重用前要呼叫 `clear()`。若不需要重用，建立新的區域串流通常更容易理解。