# 5.9 函式與 `vector` 陣列和參考

## 完整例子：計算樣本總和

```cpp
#include <iostream>
#include <vector>

long long sum(const std::vector<int>& values) {
    long long total{0};
    for (const int value : values) {
        total += value;
    }
    return total;
}

int main() {
    const std::vector<int> samples{10, 20, 30};
    std::cout << sum(samples) << '\n'; // 60
}
```

函式參數是 `const std::vector<int>&`：呼叫時不需複製整個 vector，函式也不能透過此名稱修改它。迴圈逐項讀值並回傳總和。累加使用 `long long` 只是提供較大範圍，不代表任意長度輸入都不可能溢位；若資料量不受控，還需實作溢位檢查或定義輸入上限。

一般可將只讀容器參數寫成 `const std::vector<T>& values`：`const` 表示函式不能透過該名稱修改元素，`&` 表示傳入原容器而非複製整個 vector。若函式需要擁有輸入，可按值接收，再依所有權需求保存；若只需讀取連續序列，`std::span<const T>` 可降低對特定容器的耦合，見[5.8 陣列參數](section_8.md)。

要修改呼叫者的 vector，使用非 const 參考並在介面表達會改變大小或內容：

```cpp
void append_default(std::vector<int>& values) {
    values.push_back(0);
}
```

若只輸出一個新序列，回傳 vector 值通常比輸出參數更易理解。呼叫者還須知道修改容器後哪些元素參考可能失效，見[第四章 vector 容量](../chapter_4/section_11.md)。