# 動態物件的建立與銷毀

區域物件在作用域結束時自動銷毀。以 `new` 建立的單一物件必須由 `delete` 配對；以 `new[]` 建立的陣列必須由 `delete[]` 配對。

```cpp
#include <iostream>

struct Job {
    Job() { std::cout << "start\n"; }
    ~Job() { std::cout << "finish\n"; }
};

int main() {
    Job* job = new Job;
    // 使用 job
    delete job;
    job = nullptr;
}
```

`new` 執行時會建立物件並呼叫建構子，`delete` 呼叫解構子並釋放儲存空間。只要有任何程式路徑忘記 `delete`，便會洩漏；重複 `delete` 或錯用 `delete[]` 也會造成未定義行為。

## 為何手動管理脆弱

```cpp
Job* job = new Job;
perform_operation(); // 若此處以例外離開，delete 可能不會執行
delete job;
```

這個例子展示控制流程可能跳過清理。真實系統還有早退、錯誤回傳、多個資源及所有權轉交等路徑。除非在學習語言底層或實作特定配置器，應使用自動儲存期物件或智慧指標管理資源；詳見[第八章智慧指標](../chapter_8/section_5.md)。

## `new[]` 配對規則

```cpp
int* values = new int[10]{};
// 使用 values[0] 到 values[9]
delete[] values;
```

不得用 `delete values` 釋放陣列。陣列長度不會自動隨指標保存，索引邊界仍由程式負責。一般動態序列請優先使用 `std::vector`，可參考[第四章容器](../chapter_4/section_6.md)。