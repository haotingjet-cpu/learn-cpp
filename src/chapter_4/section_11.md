# 4.11 `vector` 元素數量與容量管理

## 實際觀察 `size` 和 `capacity`

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> values;
    values.reserve(100);
    std::cout << values.size() << '\n';     // 0
    std::cout << values.capacity() << '\n'; // 至少 100

    values.push_back(7);
    values.push_back(9);
    std::cout << values.size() << '\n';     // 2
}
```

`reserve(100)` 只要求配置能容納至少 100 個元素的空間，沒有建立 100 個元素；因此 `size()` 仍是 0。只有 `push_back` 後才會增加元素數。`capacity()` 的確切值由實作決定，不能假設剛好等於 100。

重新配置會使先前保存的元素參考、指標和 iterator 失效。已知要加入大量資料時，先 `reserve` 可減少重新配置；預留太多則浪費記憶體。`shrink_to_fit()` 只是請求，不保證縮小。是否值得調容量策略應用 profiler 或配置追蹤驗證。

`max_size()` 是容器理論上允許的元素數量上限，不等於目前可用記憶體。容量成長策略由實作決定，不應假設每次加倍。

```cpp
std::vector<int> values;
values.reserve(1000);       // 若可行，預留容量
for (int i = 0; i < 1000; ++i) {
    values.push_back(i);
}
```

已知大致元素數時 `reserve` 可減少配置次數。過度預留會浪費記憶體；對短暫性批次資料，結束後可用交換空容器釋放容量，但一般不應在熱路徑頻繁縮放。`shrink_to_fit()` 是非強制請求，不保證一定縮小。

分析配置行為時使用 profiler 或配置追蹤工具，不要僅由容量輸出推斷所有實作細節。元素的建構／搬移成本與 allocator 行為都會影響整體效能。