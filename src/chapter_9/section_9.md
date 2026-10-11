# 執行緒間資源競爭與 `mutex`

互斥鎖確保同一時間只有一個執行緒進入受保護區域。使用 `std::lock_guard` 以 RAII 在離開作用域時自動解鎖。

```cpp
#include <mutex>

class Counter {
public:
    void increment() {
        const std::lock_guard<std::mutex> lock(mutex_);
        ++value_;
    }

    int value() const {
        const std::lock_guard<std::mutex> lock(mutex_);
        return value_;
    }

private:
    mutable std::mutex mutex_;
    int value_{};
};
```

鎖與資料應一起封裝；每次存取 `value_` 都遵守同一把鎖。`mutable` 讓唯讀查詢函式能鎖定同步物件，不代表該操作會修改邏輯值。

## 鎖的範圍

鎖住太多工作會降低併發，也可能在鎖內執行未知回呼造成死結。鎖住太少則保護不完整。只在需要一致存取共享資料的最小區域持鎖，並避免在持鎖期間呼叫可能再取得相同鎖的外部函式。

## 死結

若兩個執行緒以相反順序取得兩把鎖，可能互相等待。可使用 `std::scoped_lock` 一次鎖多把互斥鎖，或在整個系統維持一致鎖順序。不要手動 `lock()` 後在多個早退路徑忘記 `unlock()`；RAII 鎖管理器更安全。

## 互斥鎖不等於所有同步

鎖能保護共享狀態，但不會自動定義工作停止協定、佇列容量、錯誤傳遞或重試策略。條件變數與任務佇列會在訊息伺服器範例說明。讀寫極簡計數器可考慮原子型別，但原子操作不能自動保護多個欄位組成的不變條件。