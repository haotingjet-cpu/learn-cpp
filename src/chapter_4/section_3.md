# 4.3 `while` 流程控制與表達式條件

`while` 的一般格式是：

```cpp
while (繼續條件) {
    // 每次條件為 true 時執行
}
```

它在每次進入本文前檢查條件；適合停止時機由狀態或輸入決定的工作。如果本文沒有改變條件所依賴的狀態，也沒有 `break`，就可能永遠不會結束。先看簡單倒數，並手動追蹤條件何時變成假：

```cpp
#include <iostream>

int main() {
    int remaining{3};
    while (remaining > 0) {
        std::cout << remaining << '\n';
        --remaining;
    }
    std::cout << "done\n";
}
```

每輪都要更新 `remaining`，否則它會一直大於零，形成無限迴圈。`while` 先測條件，所以若初始值為 0，本體一次也不執行。

實際輸入迴圈可用 `std::cin` 狀態作條件：

```cpp
int value{};
while (std::cin >> value) {
    std::cout << "read " << value << '\n';
}
```

輸入成功便處理一個整數，遇到 EOF 或無法解析的內容後停止。若要分別處理 EOF 和格式錯誤，需在迴圈結束後檢查串流狀態；不要默默假設所有失敗都是正常結束。

`break` 立即離開最近一層迴圈；`continue` 跳過本輪剩餘內容並開始下一次條件檢查。清楚的迴圈通常比大量 `break`／`continue` 容易檢查。