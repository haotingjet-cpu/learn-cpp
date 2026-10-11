# `ofstream`：二進位寫入與追加

文字串流可能依平台轉換換行字元；二進位格式則要求位元組原樣保存，因此開啟檔案時加入 `std::ios::binary`。本節使用 `std::vector<unsigned char>` 表示原始位元組，避免一般 `char` 的 signedness 差異。

```cpp
#include <fstream>
#include <iostream>
#include <vector>

int main() {
    const std::vector<unsigned char> bytes{0x00, 0x41, 0xFF};
    std::ofstream output("sample.bin",
                         std::ios::binary | std::ios::out | std::ios::trunc);
    if (!output) {
        std::cerr << "無法建立 sample.bin\n";
        return 1;
    }

    for (const unsigned char byte : bytes) {
        output.put(static_cast<char>(byte));
    }
    output.close();
    if (!output) {
        std::cerr << "寫入 sample.bin 失敗\n";
        return 1;
    }
}
```

`put` 的參數是 `char`，但這裡只把單一位元組送進二進位串流，不將其當數字解讀。若要一次寫入整段連續資料，可用 `write`：

```cpp
if (!bytes.empty()) {
    output.write(reinterpret_cast<const char*>(bytes.data()),
                 static_cast<std::streamsize>(bytes.size()));
}
```

`reinterpret_cast` 在這裡只用於串流 API 要求的字元指標介面；仍須確保長度可轉成 `std::streamsize`。對可能極大的資料，分塊寫入並檢查每次操作。

## 追加寫入

```cpp
std::ofstream log("events.bin",
                  std::ios::binary | std::ios::out | std::ios::app);
```

`app` 保留既有資料，並確保每次寫入發生在檔案尾端。這適用於簡單追加記錄，但不會自動讓多程序或多執行緒的複合記錄操作具備原子性；併發寫入要使用明確同步或集中式寫入者，見[第九章互斥鎖](../chapter_9/section_9.md)。

## 格式與可攜性提醒

直接把 C++ 物件的記憶體位元組寫入檔案，不等於建立可攜格式。物件可能含填充位元組、指標或平台相關表示法；整數的位元組順序也可能不同。可靠的檔案格式應逐欄位指定寬度、位元組順序、版本與錯誤處理方式。不要把含指標或 `std::string` 的物件直接 `write` 到檔案。