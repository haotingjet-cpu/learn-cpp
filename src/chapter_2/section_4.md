# 2.4 C++ 浮點數計算和轉換

二進位浮點通常無法精確表示許多十進位小數：

```cpp
double x = 0.1 + 0.2;
// x 通常不是精確的 0.3
```

原因是有限個二進位位元無法精確表示所有十進位小數。計算後的值會是最接近的可表示值，因此直接用 `==` 比較兩個經計算得出的浮點值，通常不是可靠的「數學相等」判斷。

先輸出值觀察差異：

```cpp
#include <iomanip>
#include <iostream>

int main() {
    const double result{0.1 + 0.2};
    std::cout << std::setprecision(17) << result << '\n';
}
```

這裡的 `setprecision` 用來顯示更多有效位數；輸出的最後幾位可能和十進位 `0.3` 不同。顯示更多位數只讓誤差可見，不會讓計算更精確。

## 用容差比較計算結果

容差必須依應用的量測精度和數值尺度定義，不能任意抄一個固定 epsilon：

```cpp
#include <algorithm>
#include <cmath>

bool nearly_equal(double a, double b, double abs_tol, double rel_tol) {
    if (a == b) return true;
    const double diff = std::abs(a - b);
    return diff <= abs_tol ||
           diff <= rel_tol * std::max(std::abs(a), std::abs(b));
}
```

`abs_tol` 用於接近零時的絕對誤差；`rel_tol` 依數值大小放寬比較範圍。函式假設兩種容差非負且有限。先檢查 `a == b`，可讓相同的無窮大比較為相等；任何包含 NaN 的比較都會回傳不相等。若程式需要特別處理 NaN，應在呼叫前明確檢查。

## 浮點轉整數

```cpp
const double measured{12.9};
const int whole{static_cast<int>(measured)}; // whole 是 12
```

明確轉型讓讀者看見型別轉換，但不代表範圍自動安全。將超出目標整數範圍的浮點數轉為整數，不可當成一般可用情況；轉換前要先驗證範圍。金融數值通常不用二進位浮點直接表示金額，可用最小貨幣單位的整數並定義捨入政策。

`float`、`double` 常見實作採 IEEE 754，但標準並未要求每個平台在所有細節上完全一致。跨平台數值程式還要關注精度、運算順序、編譯器浮點最佳化設定與輸入值範圍。

金融或精確十進位需求不應直接用二進位浮點作帳；常見方案是以最小貨幣單位的整數儲存，並定義四捨五入規則。