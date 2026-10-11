# 3.9 `string` 數字轉換和拼接

# 3.9 `string` 數字轉換和拼接

將數值轉成文字可用 `std::to_string`；反向解析數字時，若需要嚴格檢查輸入，可用 `<charconv>` 的 `std::from_chars`。以下範例只接受完整的十進位整數，不接受尾端多餘字元：

```cpp
#include <charconv>
#include <iostream>
#include <string>
#include <string_view>
#include <system_error>

bool parse_int(std::string_view input, int& value) {
    if (input.empty()) return false;
    const auto [end, error] =
        std::from_chars(input.data(), input.data() + input.size(), value);
    return error == std::errc{} && end == input.data() + input.size();
}

int main() {
    int port{};
    if (parse_int("8080", port)) {
        std::cout << "port=" << port << '\n';
    }
}
```

`from_chars` 回傳解析停止位置 `end` 和錯誤碼 `error`，並把結果寫入 `value`。檢查錯誤碼可辨別格式錯誤或超出 `int` 範圍；檢查 `end` 等於輸入結尾則可拒絕 `"12junk"`。它不會自動忽略前後空白，是否接受空白、正負號或部分解析應由介面定義。

`std::string_view` 用來讀取一段文字而不複製，但它不擁有來源資料；不要保存超過來源字串的生命週期。此類非擁有參數會在[第五章函式參數](../chapter_5/section_5.md)配合函式介面說明。需要數值轉文字時，可使用 `std::to_string`：

```cpp
const int device_id{17};
const std::string label{"device-" + std::to_string(device_id)};
```

`std::to_string` 方便但浮點格式控制有限；需要精確小數格式時應使用專案既有格式化工具。大量拼接可考慮預留容量，但以量測結果決定是否需要最佳化。