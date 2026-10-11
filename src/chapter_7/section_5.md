# 建構與解構：區域物件的自動生命週期

建構函式在物件建立時初始化狀態；解構函式在物件生命週期結束時執行清理。建構子名稱與類別相同，解構子前加 `~`，兩者都沒有回傳型別。

最基本的形式是：

```cpp
class 類別名稱 {
public:
    類別名稱(參數清單) : 成員初始化列表 {
        // 建構函式本文
    }

    ~類別名稱() {
        // 解構函式本文
    }
};
```

建構函式的參數可用來設定初始狀態；初始化列表以冒號開始，項目用逗號分隔。解構函式沒有參數，也不能重載成多種版本。若類別不需要自行做清理，通常不必手寫解構函式。

```cpp
#include <iostream>
#include <string>

class Sensor {
public:
    explicit Sensor(std::string name) : name_(name) {
        std::cout << "construct " << name_ << '\n';
    }
    ~Sensor() {
        std::cout << "destroy " << name_ << '\n';
    }
private:
    std::string name_;
};

int main() {
    Sensor first{"A"};
    {
        Sensor second{"B"};
    }
}
```

輸出：

```text
construct A
construct B
destroy B
destroy A
```

區域物件在離開作用域時自動解構；巢狀作用域先離開的 `second` 先解構。這種「取得資源時建立物件、離開作用域時自動釋放」是 RAII 的核心，後續智慧指標會把這個概念用於動態資源。

## 成員初始化順序

資料成員依照它們在類別中的宣告順序初始化，而不是依照初始化列表書寫順序：

```cpp
class Range {
public:
    Range(int first, int last)
        : first_(first), last_(last) {}
private:
    int first_;
    int last_;
};
```

保持初始化列表順序與成員宣告一致，避免誤讀和編譯器警告。成員解構順序與建構順序相反。

## 解構子注意事項

一般解構子不應拋出例外；解構期間若再有未處理例外，程式可能直接終止。解構子適合做可靠且有限的清理工作，不適合輸出重要錯誤後假裝成功。若類別未自行管理資源，通常可使用編譯器產生的解構子。