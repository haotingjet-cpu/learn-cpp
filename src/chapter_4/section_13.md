# 4.13 Base16 編碼分析：逐位元組轉換

## 手算一個位元組

Base16 把一個 8-bit 位元組拆成兩組 4-bit 數值。以 `0xAF` 為例：

1. 二進位是 `1010 1111`。
2. 高半位 `1010` 的值為 10，映射成十六進位字元 `A`。
3. 低半位 `1111` 的值為 15，映射成 `F`。
4. 因此位元組 `0xAF` 編碼成兩個字元 `"af"`（本教材採小寫輸出）。

輸入四個位元組就產生八個十六進位字元；若輸出緩衝區的長度乘二超出容器上限，必須在配置前拒絕。轉換是表示方式改變，不會把內容加密或驗證真偽。

```cpp
constexpr char hex_digits[] = "0123456789abcdef";
const unsigned char byte = 0xAF;
const char high = hex_digits[byte >> 4];       // 'a'
const char low  = hex_digits[byte & 0x0F];     // 'f'
```

輸入型別應採 `unsigned char` 或 `std::uint8_t`，避免 `char` 的 signedness 造成右移或遮罩誤解。實際編碼要檢查輸出長度乘二不溢位；若輸出要放入 `std::string`，先 `reserve` 合理容量。完整可執行版本見[4.14](section_14.md)。

Base16 只提供表示轉換，不提供加密、完整性或保密性。採小寫或大寫需由協定規格固定；解碼器可選擇大小寫策略，但不能悄悄接受格式外字元。