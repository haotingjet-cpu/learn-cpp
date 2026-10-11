# 3.13 入口函式 `main` 參數與環境變數

## 從引數檢查檔案名稱

以下範例只接受一個引數，並將不同用法的錯誤送到 `std::cerr`：

```cpp
#include <iostream>

int main(int argc, char* argv[]) {
    if (argc != 2) {
        std::cerr << "usage: app <file>\n";
        return 2;
    }

    std::cout << "requested file: " << argv[1] << '\n';
    return 0;
}
```

執行 `app input.dat` 時，`argc` 是 2，因為程式名稱本身也算一個引數。執行時若帶了多個參數，程式拒絕並回傳非零狀態。`argv[1]` 只是未驗證文字；打開檔案前還需檢查路徑、權限和格式。`char*` 的指標寫法會在[第五章指標與參考](../chapter_5/section_4.md)完整介紹。

常見入口簽名為 `int main()` 或 `int main(int argc, char* argv[])`。`argc` 是引數數量；`argv` 是 C 風格字串指標的陣列，`argv[0]` 通常是程式名稱，`argv[1]` 是第一個使用者引數；`argv[argc]` 保證為空指標。陣列與指標寫法見[第五章指標與參考](../chapter_5/section_4.md)。引數字串由執行環境提供，需在程式存活期間使用；要長期保存則複製到 `std::string`。

回傳 0 慣例上表示成功，非零表示失敗；具體退出碼由程式文件定義。環境變數介面依平台而異，標準 C++ 可用 `std::getenv` 讀取，但回傳指標不應跨越環境修改或生命週期邊界保存，也不應把缺少變數當成空字串。環境變數可控制敏感設定，需視為不可信輸入。

引數解析要處理缺參數、格式錯誤、超出範圍、重複選項和未知選項。複雜命令列使用成熟解析器；不要將原始輸入直接拼接成 shell 命令。