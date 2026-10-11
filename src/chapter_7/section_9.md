# 類別繼承語法與基底子物件

繼承表示衍生類別包含一個基底類別子物件，並可在權限允許下重用其介面與行為。

繼承的一般格式是：

```cpp
class 衍生類別名稱 : public 基底類別名稱 {
    // 衍生類別新增或覆寫的成員
};
```

冒號後的 `public` 是繼承存取方式；本章先使用最常見的公開繼承。這個 `public` 和類別本文裡的 `public:` 都與可見性有關，但前者設定基底介面在衍生類別中的公開方式，後者設定本類別成員對外的存取權限。

```cpp
class Device {
public:
    explicit Device(int id) : id_(id) {}
    int id() const { return id_; }
private:
    int id_;
};

class Sensor : public Device {
public:
    Sensor(int id, double scale)
        : Device(id), scale_(scale) {}
private:
    double scale_;
};
```

建立 `Sensor` 時先建構 `Device` 子物件，再建構 `scale_`。衍生類別必須在初始化列表中呼叫所需的基底建構子。

在 `class Sensor : public Device` 中，`Sensor` 是衍生類別、`Device` 是基底類別。`Sensor(...)` 的初始化列表先呼叫 `Device(id)` 建立基底部分，再以 `scale_(scale)` 初始化自己的資料成員。初學者可先把「衍生物件含基底部分」當作行為模型；不要自行假定兩部分在所有 ABI 中的固定位址布局。

## 「是一種」關係

只有當衍生型別能在基底型別使用處維持相同契約時，繼承才合理。例如 `Sensor` 是一種 `Device`；「Logger 使用一個 Formatter」則通常是組合，而不是繼承。錯誤的「是一種」關係會讓基底介面限制衍生類別或破壞呼叫者假設。

## 物件布局不可作可攜假設

語言保證基底子物件與成員有其生命週期和存取規則，但不保證它們在所有編譯器上的固定位移。多重繼承、虛擬繼承和虛擬函式還會使實作更複雜。不要把類別物件原始記憶體當成網路封包或跨程序 ABI 格式；外部格式請逐欄位序列化。