# 4.15 Base16 解碼實作

## 手算解碼與錯誤位置

字串 `"af"` 的兩個字元各自轉為 10 和 15，合併計算 `10 * 16 + 15 = 175`，也就是 `0xAF`。解碼時每一對字元產生一個位元組，所以奇數個字元不可能是完整編碼。

解碼需將每兩個十六進位字元轉為一個位元組，並拒絕奇數長度或非法字元。`std::optional<T>` 表示結果可能包含一個 `T`，也可能沒有；這裡成功時包含位元組 vector，格式錯誤時回傳 `std::nullopt`：

```cpp
#include <cstddef>
#include <optional>
#include <string_view>
#include <vector>

int hex_value(char c) {
    if (c >= '0' && c <= '9') return c - '0';
    if (c >= 'a' && c <= 'f') return c - 'a' + 10;
    if (c >= 'A' && c <= 'F') return c - 'A' + 10;
    return -1;
}

std::optional<std::vector<unsigned char>> decode_hex(std::string_view text) {
    if (text.size() % 2 != 0) return std::nullopt;
    std::vector<unsigned char> result;
    if (text.size() / 2 > result.max_size()) return std::nullopt;
    result.reserve(text.size() / 2);
    for (std::size_t i = 0; i < text.size(); i += 2) {
        const int high = hex_value(text[i]);
        const int low = hex_value(text[i + 1]);
        if (high < 0 || low < 0) return std::nullopt;
        result.push_back(static_cast<unsigned char>((high << 4) | low));
    }
    return result;
}
```

範例允許大小寫並拒絕空白；若協定不同，應更改文件和測試。解碼結果使用 `std::vector<unsigned char>`，明確表示任意位元組，而不將 `0x80`–`0xFF` 依賴平台的 `char` signedness 轉換。錯誤回傳目前只說明「無效」，沒有指出位置；正式介面可回傳錯誤位置和原因。測試奇數長度、非法字元、`00`、`ff`，以及 `decode_hex(encode_hex(x)) == x`。對安全敏感輸入，還應考慮拒絕過大的字串，避免資源耗盡。