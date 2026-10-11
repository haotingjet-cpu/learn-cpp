# 3.14 `switch` 條件判斷分析和程式示例

## 執行流程

遇到符合的 `case` 後，程式從該位置開始往下執行，直到遇到 `break` 或 `switch` 區塊結束。這表示忘記 `break` 不是「自動跳出」，而可能連下一個分支的動作一起執行。每個分支若有多行，建議都加大括號或清楚縮排，讓範圍容易檢查。

`switch` 適合對整數、列舉等 integral／enumeration 表達式做多路分支。每個 `case` 必須是編譯期常數；一般字串不適用。除非刻意 fallthrough，使用 `break` 結束分支。

```cpp
switch (status) {
case State::idle:
    start();
    break;
case State::running:
    report_running();
    break;
case State::failed:
    recover();
    break;
}
```

不要宣稱 `switch` 一定比 `if` 快；編譯器可能使用跳躍表、比較樹或其他策略，效能須在目標平台量測。列舉分支省略 `default` 有助於編譯器對新增列舉值發出警告；若輸入可被外部破壞，仍要在解析邊界驗證合法性。

C++17 的 `[[fallthrough]];` 可標明刻意穿透至下一個 case。若 case 內需要區域變數，通常以大括號包住分支，避免跨 case 初始化／作用域問題。