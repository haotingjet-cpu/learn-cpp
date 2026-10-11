# 面向物件程式設計範式與 `class` 語法

程序式程式通常以函式和資料流為中心；面向物件則把狀態與操作放進一個型別。兩種方式可以在同一個程式並用。使用類別的目的不是讓程式「看起來比較物件導向」，而是把資料規則集中起來，避免呼叫端任意建立無效狀態。

## 先看類別的一般格式

最常見的類別可先讀成以下骨架：

```cpp
class 類別名稱 {
public:
    // 對外提供的建構函式與操作函式

private:
    // 物件自己的資料，以及不希望外部直接呼叫的輔助操作
};
```

- `class` 告訴編譯器要宣告一種新的型別。
- `類別名稱` 是型別名稱，依慣例以大寫開頭；這是風格，不是語言限制。
- 類別本文由 `{` 開始、以 `}` 結束，最後的分號 `;` 是必要語法。
- `public:` 和 `private:` 是存取標籤，標籤後面的宣告會採用該存取範圍，直到遇到下一個標籤。
- `public` 成員是呼叫端可使用的介面；`private` 成員只能由類別自己的成員函式等特定情境存取。

`struct` 也能包含資料、函式和存取標籤；主要語法差別是 `struct` 預設成員為 `public`，而 `class` 預設成員為 `private`。這兩個關鍵字能力相近，常見慣例是用 `struct` 表示單純資料，用 `class` 表示需要保護規則的型別。

## 一個完整例子：設備名稱和連線狀態

```cpp
#include <iostream>
#include <string>

class Device {
public:
    explicit Device(const std::string& name)
        : name_(name), online_(false) {}

    const std::string& name() const {
        return name_;
    }

    bool online() const {
        return online_;
    }

    void set_online(bool value) {
        online_ = value;
    }

private:
    std::string name_;
    bool online_;
};

int main() {
    const Device gateway{"edge-01"};
    std::cout << gateway.name() << '\n';       // edge-01
    std::cout << gateway.online() << '\n';     // 0，false

    Device sensor{"sensor-02"};
    sensor.set_online(true);
    std::cout << sensor.online() << '\n';      // 1，true
}
```

### 逐段讀懂宣告

1. `class Device { ... };` 定義一個名為 `Device` 的型別；這行本身沒有建立任何設備物件。
2. `public:` 以下三個操作是呼叫端能使用的介面；`private:` 以下的 `name_` 和 `online_` 是每個設備物件自己的資料。
3. `Device(...)` 是建構函式：函式名稱和類別名稱相同，沒有回傳型別，在建立物件時執行。
4. `name_(name), online_(false)` 是**成員初始化列表**。冒號後逐一指定成員初值；此處建立 `name_` 的字串內容，並把 `online_` 設為 `false`。
5. `name()` 和 `online()` 是讀取器；`set_online(...)` 是修改狀態的操作。
6. `main` 中的 `Device gateway{"edge-01"};` 建立物件並呼叫建構函式。`gateway` 是物件名稱，`Device` 是它的型別。

## `explicit` 是什麼，為什麼放在建構函式前？

接受一個參數的建構函式有時可被編譯器拿來做隱式轉換。隱式的意思是呼叫端沒有明寫 `Device{...}`，編譯器仍自動嘗試建立物件。類別名稱這種需要先驗證、才可成立的資料通常不應任意自動轉換，所以在建構函式前加 `explicit`。

以下是兩個宣告與呼叫的語法片段；`print_name` 只有宣告，實際執行程式時需在其他位置提供函式定義。

```cpp
class DeviceName {
public:
    explicit DeviceName(const std::string& value) : value_(value) {}
private:
    std::string value_;
};

void print_name(DeviceName name);

std::string raw{"gateway"};
// print_name(raw);              // 因 explicit 而拒絕隱式轉換
print_name(DeviceName{raw});     // 明確要求建立 DeviceName
```

`explicit` 限制的是隱式轉換；它不禁止明確的直接初始化，例如 `DeviceName{raw}`。這個小型 `DeviceName` 只示範轉換語法，建構子尚未驗證空字串；明寫型別表示呼叫端明確要求建構，不代表輸入已經符合業務規則。多參數建構函式、轉換運算子還有更細的規則，先不在這裡展開。

## 拆解 `const std::string& name() const`

以讀取器 `name()` 為例，這個宣告分成三個位置，各自有不同作用：

```cpp
const std::string& name() const;
// ^^^^^^^^^^^^^^^^^  ^^^^
// 回傳型別           函式名稱及參數之後的 const
```

- `name()`：函式名稱是 `name`，括號內沒有參數。
- `std::string&`：`&` 表示回傳**參考**，也就是回傳原本 `name_` 的另一個存取名稱，而不是建立一份新的字串副本。
- 前面的 `const`：呼叫端不能透過這個回傳參考修改字串內容。它是唯讀參考。
- 最後的 `const`：這是**成員函式的限定詞**，表示這個函式不會透過目前物件修改一般資料成員。它和回傳型別前面的 `const` 不是同一件事。

因此 `const std::string& name() const` 的意思是：「不帶參數；回傳目前物件所擁有字串的唯讀參考；函式本身承諾不修改目前物件的狀態。」像 `const Device gateway` 這種唯讀物件，只能呼叫這類 `const` 成員函式。

為什麼回傳參考安全？`name_` 是 `gateway` 物件的成員，呼叫端使用 `gateway.name()` 時，只要 `gateway` 還活著，`name_` 就還存在。若物件已結束生命週期，參考便不能再使用。函式回傳參考的其他生命週期規則見[第五章回傳值](../chapter_5/section_6.md)。

若回傳型別改為 `std::string name() const`，函式會回傳一份字串值；這比較簡單但可能複製內容。對「只讀取物件成員且不延長成員生命週期」的介面，`const T&` 常用來避免複製；小型型別則通常按值回傳。這不是一律要選參考的效能規則，呼叫者還必須遵守參考生命週期。

## 為什麼資料要設成 `private`？

如果 `name_` 是公開資料，任何呼叫端都能把它設成空字串，即使系統規則禁止空名稱。封裝的意思是外部必須透過類別提供的操作，類別才有機會維護不變條件。上面的範例尚未拒絕空名稱；若空名稱不合法，應在建構時驗證並明確回報錯誤。

## 何時用類別

適合建立類別的情況：資料有必須一直成立的規則、多個操作共用同一狀態、呼叫端不應依賴實作細節。若只是幾個無狀態轉換函式，普通函式可能更直接。不要為了符合形式而把每組資料都包成一個沒有封裝價值的類別。

接下來會看物件成員如何影響 `sizeof`、成員函式和 `this`、存取控制、建構與解構，之後才引入繼承和動態多型。物件大小是可觀察的實作資訊，但不能據此推導所有平台上的固定成員偏移量。