# 2.2 變數程式演示：從量測值算出速率

這一節把上一節的設備資料放進一個完整程式。目標是由「已處理的請求數」和「耗時秒數」算出每秒處理量。

```cpp
#include <iostream>

int main() {
    const int requests{12};
    const double seconds{0.5};
    const double rate{requests / seconds};

    std::cout << requests << " requests / "
              << seconds << " seconds = "
              << rate << " requests per second\n";
}
```

預期輸出中的速率是 `24`。`requests` 是 `int`，`seconds` 是 `double`；除法運算前，整數值會轉成可配合浮點運算的型別，所以結果保留小數。請把 `seconds` 改成 `0.4` 再執行，並觀察顯示值可能有許多小數位；這不是計算流程「多算了」，而是浮點數表示的特性，詳見[2.4 浮點數](section_4.md)。

## 常見錯誤：把整數除法結果存進浮點數

比較以下兩個初始化：

```cpp
const double wrong_rate{12 / 5};
const double correct_rate{12.0 / 5};
```

第一行先以兩個整數做除法，運算結果已經是 `2`，之後才轉成 `double` 的 `2.0`。第二行至少有一個運算元是浮點數，結果才是 `2.4`。**目標變數的型別不會倒過來改變已完成的運算型別。**

## 動手修改

1. 將 `requests` 改為 `13`，`seconds` 改為 `0.5`，預測輸出並確認。
2. 將 `rate` 改成整數型別，觀察小數結果如何變化。
3. 嘗試讓 `seconds` 為零。這個程式目前沒有輸入功能，但已顯示為什麼真實程式在計算前必須定義零秒時的政策。輸入和錯誤分支會在後續章節逐步學習。