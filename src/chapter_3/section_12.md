# 3.12 列舉程式實戰

本節範例展示「每種狀態對應一段動作」的目標。若尚未讀過 `switch` 語法，先讀[3.14 `switch` 判斷](section_14.md)，再回來看這個實作。

以傳輸狀態為例，把可接受狀態明確列出，並集中處理文字表示：

```cpp
#include <string>
#include <string_view>

enum class State { stopped, starting, running, failed };

constexpr std::string_view to_string(State state) {
    switch (state) {
    case State::stopped:  return "stopped";
    case State::starting: return "starting";
    case State::running:  return "running";
    case State::failed:   return "failed";
    }
    return "invalid";
}
```

若函式處理外部資料，先驗證文字是否對應到已列出的狀態，不要假設外部輸入必定合法。顯示函式回傳 `"invalid"` 可避免把未知值誤認成正常狀態，但不能取代輸入解析時的錯誤回報。

練習加入 `parse_state(std::string_view) -> std::optional<State>`，只接受明確列出的字串，測試未知值與大小寫策略。`std::optional` 的基本意義見[第四章 Base16 解碼](../chapter_4/section_15.md)。將文字轉換放在單一位置，避免日誌、設定檔和網路層各自維護不一致的映射。