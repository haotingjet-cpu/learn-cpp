# 標準輸出與錯誤輸出重導向

程式通常使用三個標準串流：

- `std::cin`：標準輸入。
- `std::cout`：標準輸出，放置一般結果。
- `std::cerr`：標準錯誤，放置診斷與錯誤訊息。

```cpp
#include <iostream>

int main() {
    std::cout << "processing records\n";
    std::cerr << "warning: one record was skipped\n";
}
```

將結果與診斷分流後，呼叫程式的人可以分別保存或檢視它們。shell 語法依作業系統不同；在 POSIX shell 常見的寫法如下：

```sh
./app > result.txt 2> error.txt
```

在 PowerShell 可用：

```powershell
.\app.exe > result.txt 2> error.txt
```

若要將標準輸出與錯誤合併，shell 語法也有差異；應以目標 shell 文件為準。不要在 C++ 程式中硬編碼 shell 命令來達成重導向。

## `cerr` 與 `clog`

`std::cerr` 預設會較積極地刷新，適合立即顯示錯誤；`std::clog` 是標準錯誤串流的另一個介面，通常適合較大量的診斷輸出。兩者都不代表日誌已寫入永久儲存，失敗仍須檢查串流狀態。

```cpp
if (!input_file) {
    std::cerr << "error: cannot open input file\n";
    return 1;
}
```

錯誤訊息應包含可採取動作的上下文，例如檔案路徑或操作名稱；不要洩漏密碼、權杖或完整機敏資料。

## 程式內重導向串流緩衝區

也可以將 `cout` 的緩衝區暫時導向檔案串流，但這會改變全域標準輸出的目的地，必須在離開前恢復原本緩衝區。初學階段優先直接把目的地串流當參數傳給輸出函式，避免全域狀態造成隱晦副作用。檔案串流的使用方式見[第六節](section_6.md)。