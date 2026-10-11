# 4.14 Base16 編碼實作

## 驗算範例與長度

輸入兩個位元組 `0x41, 0xff`，高半位／低半位分別得到十六進位字元 `4`、`1`、`f`、`f`，輸出是 `"41ff"`。這也提醒我們：測試不能只用可列印 ASCII，必須包含高位元為 1 的位元組。

以下實作把 `unsigned char` 位元組序列編成小寫十六進位字串。使用無號字元保存原始位元組，避免一般 `char` 的正負號差異混入 nibble 計算：

```cpp
#include <cstddef>
#include <iostream>
#include <stdexcept>
#include <string>
#include <vector>

std::string encode_hex(const std::vector<unsigned char>& bytes) {
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

int main() {
    const std::vector<unsigned char> bytes{0x41, 0xFF};
    std::cout << encode_hex(bytes) << '\n'; // 41ff
}
```

範例另需 `#include <iostream>`。輸出是文字字串，原始輸入則明確以 `std::vector<unsigned char>` 表示。若介面不使用例外，應改以明確結果型別回報輸出長度超限。

測試空輸入、`00`、`0f`、`10`、`ff` 和多位元組資料。固定預期輸出，不只測試 encode/decode 互逆，否則兩端若有同一錯誤仍會互相通過。還要測試 `bytes.size()` 接近輸出長度上限時的拒絕行為，確保乘法檢查在 `reserve` 前完成。