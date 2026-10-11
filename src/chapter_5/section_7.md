# 5.7 函式重載和預設值

## 用實際呼叫看重載

```cpp
#include <iostream>
#include <string_view>

void report(int code) {
    std::cout << "code=" << code << '\n';
}

void report(std::string_view message) {
    std::cout << "message=" << message << '\n';
}

int main() {
    report(404);
    report("not found");
}
```

編譯器依引數型別挑選對應的 `report`。如果兩個 overload 都能透過隱式轉換匹配，呼叫可能歧義；設計時避免只差細微轉換規則的多個版本。不同回傳型別不能單獨區分 overload，因為呼叫點可能根本不使用回傳值。

函式重載允許同名函式依參數型別或數量區分；回傳型別不能單獨用來重載。

```cpp
void log_message(std::string_view message);
void log_message(std::string_view level, std::string_view message);
```

預設引數在呼叫點使用，通常只在宣告處提供一次，後續定義不可重複指定：

```cpp
void connect(std::string_view host, int port = 443);
```

例如呼叫 `connect("example.local")` 時使用預設 port 443；呼叫 `connect("example.local", 8443)` 則由呼叫端覆寫。預設參數放在宣告處一次，避免不同標頭或定義對同一函式提供不一致預設值。

預設值通常由呼叫端在編譯時帶入；若函式庫更新預設值但呼叫端沒有重新編譯，舊程式仍可能使用舊值。公開函式庫 ABI 設計需考量這點。選擇性參數很多時，可將選項放入具名設定結構，讓呼叫端按欄位指定；這比長串容易填錯位置的引數更易讀。