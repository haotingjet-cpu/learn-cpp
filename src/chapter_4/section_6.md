# 4.6 陣列和 `vector` 分析

要批次處理資料，首先需要選擇資料容器。兩種標準容器的宣告格式是：

```cpp
std::array<元素型別, 固定長度> 名稱;
std::vector<元素型別> 名稱;
```

尖括號表示型別參數：`std::array<int, 4>` 是「四個 `int` 的固定陣列」；`std::vector<int>` 是「元素型別為 `int`、數量可變的向量」。這裡的尖括號是標準容器的型別寫法；第五章會另外介紹函式模板如何用型別參數產生函式。

內建陣列和 `std::array` 長度固定；`std::vector` 可依執行時資料增減元素，且元素在記憶體中連續。

```cpp
#include <array>
#include <vector>

int main() {
std::array<int, 4> fixed{1, 2, 3, 4};
std::vector<int> dynamic{1, 2, 3};
dynamic.push_back(4);
}
```

內建陣列和 `std::array` 適合資料筆數固定的情況，例如 4 個感測器通道；`std::vector` 適合筆數在程式執行後才知道的封包列表。`std::array<T, N>` 中的 `T` 代表元素型別，`N` 是編譯期已知的長度，也是型別的一部分。`std::vector<T>` 中的 `T` 一樣代表元素型別，但元素數量可在執行時改變。`push_back(4)` 將值 `4` 加到向量末端。

vector 連續儲存元素，支援依索引讀寫；元素增加時若需要重新配置，舊指標、參考和 iterator 可能失效。`size()` 是已存在元素數，`capacity()` 是目前配置可容納的元素數。後續章節會用實際程式觀察差異。

原生陣列傳入函式時會失去長度資訊；函式只收到元素位址，因此需另傳長度。較現代的範圍介面 `std::span` 會在[第五章函式與陣列](../chapter_5/section_8.md)介紹。選擇容器的基本原則：固定尺寸優先考慮 `std::array`，可變數量通常使用 `std::vector`，避免自行管理裸陣列的配置。