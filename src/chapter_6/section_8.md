# `ifstream`：讀取檔案與觀察持續更新內容

讀取靜態文字檔，可逐行使用 `std::getline`。處理記錄時，應區分正常到達檔尾與真正 I/O 錯誤：

```cpp
std::string line;
while (std::getline(input, line)) {
    process(line);
}
if (input.bad()) {
    // 底層 I/O 錯誤
} else if (!input.eof()) {
    // 其他格式或串流狀態問題
}
```

`process` 代表本章讀取迴圈中的應用程式處理函式；函式參數與模組化方式見[第五章函式](../chapter_5/section_1.md)。EOF 常在最後一次讀取失敗時才設定，因此不建議先寫 `while (!input.eof())`，再讀取資料；那種寫法容易多處理一次舊資料。

## 讀取固定大小二進位區塊

```cpp
#include <array>
#include <fstream>
#include <iostream>

int main() {
    std::ifstream input("sample.bin", std::ios::binary);
    if (!input) {
        std::cerr << "無法開啟檔案\n";
        return 1;
    }

    std::array<char, 4096> buffer{};
    while (input.read(buffer.data(),
                      static_cast<std::streamsize>(buffer.size())) ||
           input.gcount() > 0) {
        const std::streamsize bytes_read = input.gcount();
        // 僅處理 buffer[0..bytes_read)，不處理整個 buffer
    }
    if (input.bad()) {
        std::cerr << "讀取檔案時發生 I/O 錯誤\n";
        return 1;
    }
}
```

最後一個區塊可能短於緩衝區大小，因此必須用 `gcount()`，不能假定每次都讀滿。範例中的處理本文應使用 `bytes_read` 作為有效長度。

## 觀察持續寫入的檔案

「讀到檔尾後等待，再繼續讀」常用於監看日誌，但標準檔案串流不提供跨平台的檔案變更通知。反覆清除 EOF 並輪詢可能浪費 CPU，也可能錯過檔案輪替、截斷或重新命名。正式 tail 工具應依平台使用檔案通知 API，並明確處理輪替；簡化輪詢則必須設定等待間隔、停止條件及重新開檔策略。

因此一般教材程式應將 EOF 視為讀取工作完成，而不是自行無限輪詢。