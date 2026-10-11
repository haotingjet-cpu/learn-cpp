# 3.5 C++ 邏輯運算和數學運算處理邏輯的區別

把數學式翻譯成程式時，不能只抄運算符號，還要確認型別、運算優先順序、短路規則和極端值。這一節用「封包是否在有效長度範圍」及位元遮罩比較，對照邏輯與數學推理的差異。

## 邏輯運算有順序

數學中的 `and`、`or` 通常被當作對稱命題；C++ 的 `&&`、`||` 則有**左至右短路求值**。例如檢查除數不為零之後才計算餘數：

```cpp
#include <iostream>

int main() {
   const int divisor{3};
   const int value{12};
   const unsigned flags{0b0101};
   const unsigned mask{0b0010};

   if (divisor != 0 && value % divisor == 0) {
       std::cout << "divisible\n";
   }

   if ((flags & mask) == 0) {
       std::cout << "masked bits are clear\n";
   }
}
```

如果 `divisor` 為零，右邊不會執行，避免非法除法。不要把有副作用的運算藏在條件中；把狀態更新寫成單獨一行通常較容易閱讀。

## 運算優先序與括號

位元 AND 的 `&` 和比較相等的 `==` 混用時，運算優先序可能和直覺不同。若要檢查 `mask` 的指定位元是否為零，明確寫成：

```cpp
const unsigned flags{0b0101};
const unsigned mask{0b0010};
if ((flags & mask) == 0) {
    std::cout << "masked bits are clear\n";
}
```

不要依賴背誦優先序表來讓複雜條件「剛好正確」。括號可以同時說明分組意圖並降低維護時出錯機率。`&&`／`||` 用於真假組合，`&`／`|` 用於整數位元遮罩，詳見[3.3 位元運算](section_3.md)。

## 數學式不保證數值行為相同

- 整數 `7 / 2` 得到 `3`，不是實數數學中的 `3.5`；浮點誤差見[第二章浮點數](../chapter_2/section_4.md)。
- `count + length` 可能溢位；要在運算前檢查範圍，見[第二章算術運算](../chapter_2/section_3.md)。
- 邊界比較要確認含不含端點，例如 `0 <= index && index < count`。

把公式拆解成命名清楚的中間變數，往往比寫成一條長條件更容易測試。