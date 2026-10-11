# 5.6 參考和指標在回傳值中的使用與問題

回傳參考或指標代表呼叫者取得對既有物件的非擁有存取；其生命週期必須長於呼叫者使用時間。絕不可回傳區域自動物件的參考或位址：

```cpp
const std::string& bad_name() {
    std::string local{"temporary"};
    return local; // 錯誤：回傳後 local 已結束生命週期
}
```

回傳擁有值通常最簡單安全：

```cpp
std::string make_name() {
    return "worker";
}
```

呼叫端可以安全地接收這個回傳字串：

```cpp
const std::string name = make_name();
```

回傳值讓結果的擁有者清楚。不要為了避免複製而返回區域變數的參考；現代編譯器通常能省略不必要的複製。

回傳容器元素參考時，呼叫端需知道後續插入／刪除可能使其失效；回傳指標時需定義空值和所有權。若要表示可能沒有結果，回傳 `std::optional<T>`（例如 Base16 解碼的失敗結果，見[第四章 4.15](../chapter_4/section_15.md)）或明確的非擁有指標，不要用懸空參考代表失敗。