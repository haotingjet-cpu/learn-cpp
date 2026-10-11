# `fstream`：檔案讀寫與開啟模式

`std::ifstream` 用於讀取檔案、`std::ofstream` 用於寫入、`std::fstream` 同時讀寫；三者由 `<fstream>` 提供。檔案串流物件可用建構子開檔，也可先建立再呼叫 `open()`。

```cpp
#include <fstream>
#include <iostream>
#include <string>

int main() {
    std::ifstream input("devices.txt");
    if (!input) {
        std::cerr << "無法開啟 devices.txt\n";
        return 1;
    }

    std::string line;
    while (std::getline(input, line)) {
        std::cout << line << '\n';
    }
    if (input.bad()) {
        std::cerr << "讀取時發生 I/O 錯誤\n";
        return 1;
    }
}
```

`while (std::getline(...))` 是讀取文字檔常見模式：讀取成功才進入本文。離開作用域時串流會自動關閉，無須手動 `close()`。若需要在同一作用域先後使用不同檔案，可明確關閉後再開啟。

## 常見開啟模式

| 模式 | 意義 |
|---|---|
| `std::ios::in` | 讀取 |
| `std::ios::out` | 寫入 |
| `std::ios::app` | 每次寫入都追加到檔尾 |
| `std::ios::trunc` | 開啟時清空原有內容 |
| `std::ios::binary` | 不做文字模式轉換 |
| `std::ios::ate` | 開啟後先移到檔案尾；之後仍可移動位置 |

多個模式以 `|` 組合，例如：

```cpp
std::ofstream output("events.log", std::ios::out | std::ios::app);
```

`ofstream` 預設通常會截斷既有檔案；若要保留舊內容，必須明確使用 `app`。不要把 `ate` 和 `app` 混為一談：前者只設定初始位置，後者要求寫入追加。

## 檢查寫入結果

```cpp
std::ofstream output("result.txt");
if (!output) {
    // 開檔失敗
}
output << "complete\n";
output.close();
if (!output) {
    // 寫入或關閉期間發生錯誤
}
```

單純檢查開檔還不夠；緩衝資料可能在之後才寫出，關閉也可能回報錯誤。路徑的相對位置是相對於程式的目前工作目錄，而非原始碼檔案所在目錄，部署時應清楚設定工作目錄或使用明確路徑。

> 本節只示範基本文字檔。要處理任意位元組，請使用 `std::ios::binary` 與明確長度，見[二進位檔案寫入](section_7.md)。