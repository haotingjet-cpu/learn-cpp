# 類別成員初始化的三種方式

初始化成員有三種常見寫法，各有使用情境。設計類別時應選擇清楚且一致的形式。

## 1. 類別內預設成員初始化

```cpp
class Packet {
private:
    int retry_count_{3};
    bool encrypted_{};
};
```

所有建構路徑都使用預設值，除非建構子明確提供另一個值。空花括號初始化 `encrypted_` 為 `false`。

## 2. 建構函式初始化列表

```cpp
class Packet {
public:
    Packet(int id, bool encrypted)
        : id_(id), encrypted_(encrypted) {}
private:
    int id_;
    bool encrypted_;
};
```

初始化列表是在成員初始化階段設定值，適用於必須初始化的成員、參考成員與 `const` 成員。它和進入建構函式本文後再賦值不同：後者要求成員先有可預設狀態。

## 3. 建構函式本文內賦值

```cpp
class Packet {
public:
    explicit Packet(int id) {
        id_ = id;
    }
private:
    int id_{};
};
```

這裡成員先以預設值初始化，之後再被賦值。對需要參數才能建立的成員，初始化列表通常更清楚也更有效率。本文賦值適合先完成其他檢查或計算、再更新可重新指定的成員時使用。

## 建議

使用類別內預設值表達通用預設狀態，使用初始化列表表達建構時必須給定的值。避免讓基本型別成員保持未初始化狀態；未初始化值不可被安全地當成預設值使用，相關初始化知識見[第二章變數](../chapter_2/section_1.md)。