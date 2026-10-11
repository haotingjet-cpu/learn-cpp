# 控制台與檔案輸出類別

現在為 `LogSink` 提供兩種實作。控制台 sink 寫到 `std::clog`；檔案 sink 以追加模式開啟，並檢查開啟與寫入狀態。

```cpp
#include <iostream>
#include <string_view>

class ConsoleSink final : public LogSink {
public:
    bool write(std::string_view text) override {
        std::clog.write(text.data(),
                        static_cast<std::streamsize>(text.size()));
        std::clog.put('\n');
        return static_cast<bool>(std::clog);
    }
};
```

檔案 sink：

```cpp
#include <fstream>
#include <string>
#include <string_view>

class FileSink final : public LogSink {
public:
    explicit FileSink(const std::string& path)
        : file_(path, std::ios::out | std::ios::app) {}

    bool is_open() const { return file_.is_open(); }

    bool write(std::string_view text) override {
        if (!file_) return false;
        file_.write(text.data(),
                    static_cast<std::streamsize>(text.size()));
        file_.put('\n');
        return static_cast<bool>(file_);
    }

private:
    std::ofstream file_;
};
```

建構後呼叫者應檢查 `is_open()`；如果失敗，不能仍把這個 sink 當成可用。真實系統還需防範過長訊息造成長度轉型問題，並定義是否自動刷新、如何回報磁碟錯誤。

## 生命週期

`std::ofstream` 是 `FileSink` 成員，檔案會在 sink 解構時關閉。`Logger` 若保存 sink 參考，建立與銷毀順序必須保證 sink 先建立、Logger 後建立，且 Logger 先銷毀。這也是第八章智慧指標與所有權設計要解決的核心問題之一。