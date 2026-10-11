# 5.12 案例：開發 Base16 函式庫

將第四章的演算法收斂成公開介面、私有實作與測試。Base16 的輸入是任意位元組，輸出編碼是文字；解碼結果則是位元組集合，所以公開介面分別使用 `std::vector<unsigned char>` 和 `std::string`。

```cpp
// hex.hpp
#pragma once
#include <cstddef>
#include <optional>
#include <string>
#include <string_view>
#include <vector>

namespace hex {
std::string encode(const std::vector<unsigned char>& bytes);
std::optional<std::vector<unsigned char>> decode(std::string_view text);
}
```

實作放在 `hex.cpp`，集中管理字元映射：

```cpp
#include "hex.hpp"

#include <stdexcept>

namespace hex {
namespace {
int hex_value(char c) {
    if (c >= '0' && c <= '9') return c - '0';
    if (c >= 'a' && c <= 'f') return c - 'a' + 10;
    if (c >= 'A' && c <= 'F') return c - 'A' + 10;
    return -1;
}
}

std::string encode(const std::vector<unsigned char>& bytes) {
    constexpr char digits[] = "0123456789abcdef";
    std::string result;
    if (bytes.size() > result.max_size() / 2) {
        throw std::length_error("hex output is too large");
    }
    result.reserve(bytes.size() * 2);
    for (const unsigned char byte : bytes) {
        result.push_back(digits[byte >> 4]);
        result.push_back(digits[byte & 0x0F]);
    }
    return result;
}

std::optional<std::vector<unsigned char>> decode(std::string_view text) {
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
}
```

此版本接受大小寫、拒絕奇數長度及非十六進位字元，遇到格式錯誤回傳空的 `optional`；此型別的語意先見[第四章 Base16 解碼](../chapter_4/section_15.md)。輸出長度上限則以 `length_error` 拒絕；專案若不使用例外，應用明確結果型別統一回報錯誤位置和類別。輸入 view 僅在函式執行期間讀取，不會被保存。

用 `main.cpp` 做固定測試：

```cpp
#include "hex.hpp"
#include <iostream>

int main() {
    const std::vector<unsigned char> bytes{0x00, 0x41, 0xFF};
    const std::string encoded = hex::encode(bytes);
    std::cout << encoded << '\n'; // 0041ff

    const auto decoded = hex::decode(encoded);
    std::cout << (decoded.has_value() && *decoded == bytes) << '\n'; // 1
}
```

## 建置與測試

```sh
g++ -std=c++20 -Wall -Wextra -Wpedantic -c hex.cpp
g++ -std=c++20 -Wall -Wextra -Wpedantic main.cpp hex.o -o hex_demo
```

單元測試至少涵蓋空輸入、所有 256 種位元組、大小寫策略、奇數長度、非法字元、超限輸入和固定測試向量。另測試 `decode(encode(x)) == x`；互逆測試不能取代固定預期值測試。避免全域可變狀態，使函式可重入且容易併發呼叫。