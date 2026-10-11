// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_1/intro.html"><strong aria-hidden="true">1.</strong> 第一章: C++環境與程式分析</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_1/section_1.html"><strong aria-hidden="true">1.1.</strong> Cpp 程式產生過程中每種檔案的作用</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_1/section_2.html"><strong aria-hidden="true">1.2.</strong> 代碼到程式產生過程</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_1/section_3.html"><strong aria-hidden="true">1.3.</strong> 註釋與cout詳解</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_1/homework.html"><strong aria-hidden="true">1.4.</strong> hw: 第一章的摘要與作業</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_2/intro.html"><strong aria-hidden="true">2.</strong> 第二章: C++的變數與記憶體</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_2/section_1.html"><strong aria-hidden="true">2.1.</strong> cpp變數分析</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_2/section_2.html"><strong aria-hidden="true">2.2.</strong> 變數代碼示範</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_2/section_3.html"><strong aria-hidden="true">2.3.</strong> 變數的算術運算</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_2/section_4.html"><strong aria-hidden="true">2.4.</strong> cpp浮點數計算與轉化</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_2/section_5.html"><strong aria-hidden="true">2.5.</strong> 變數的作用域與聲明週期</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_2/section_6.html"><strong aria-hidden="true">2.6.</strong> cpp運行時和編譯時常數</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_2/section_7.html"><strong aria-hidden="true">2.7.</strong> cpp的auto自動推導類型</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_2/homework.html"><strong aria-hidden="true">2.8.</strong> hw: 第二章摘要與作業</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_3/intro.html"><strong aria-hidden="true">3.</strong> 第三章: C++邏輯處理</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_3/section_1.html"><strong aria-hidden="true">3.1.</strong> 邏輯判斷if語法分析</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_3/section_2.html"><strong aria-hidden="true">3.2.</strong> if代碼示範與常見錯誤</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_3/section_3.html"><strong aria-hidden="true">3.3.</strong> 算術運算逐位非與或</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_3/section_4.html"><strong aria-hidden="true">3.4.</strong> bool類型的算數運算</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_3/section_5.html"><strong aria-hidden="true">3.5.</strong> cpp邏輯運算與數學運算處理邏輯區別</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_3/section_6.html"><strong aria-hidden="true">3.6.</strong> C++string功能分析</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_3/section_7.html"><strong aria-hidden="true">3.7.</strong> string代碼範例初始化與賦值</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_3/section_8.html"><strong aria-hidden="true">3.8.</strong> string字串長度截斷與比較</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_3/section_9.html"><strong aria-hidden="true">3.9.</strong> string字串數字轉換與拼接</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_3/section_10.html"><strong aria-hidden="true">3.10.</strong> string字串的尋找與替換</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_3/section_11.html"><strong aria-hidden="true">3.11.</strong> 枚舉enum類型與新特性分析</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_3/section_12.html"><strong aria-hidden="true">3.12.</strong> 枚舉代碼實戰</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_3/section_13.html"><strong aria-hidden="true">3.13.</strong> 入口函數main參數傳遞與環境變數取得</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_3/section_14.html"><strong aria-hidden="true">3.14.</strong> switch高效條件判斷分析與代碼範例</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_3/section_15.html"><strong aria-hidden="true">3.15.</strong> 邏輯實戰範例日誌模塊</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_3/homework.html"><strong aria-hidden="true">3.16.</strong> hw: 第三章摘要與作業</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_4/intro.html"><strong aria-hidden="true">4.</strong> 第四章: C++的批次處理</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_4/section_1.html"><strong aria-hidden="true">4.1.</strong> cpp的for循環語法分析</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_4/section_2.html"><strong aria-hidden="true">4.2.</strong> for循環代碼實戰_遍歷環境變數</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_4/section_3.html"><strong aria-hidden="true">4.3.</strong> while循環流程控制與表達式條件實戰</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_4/section_4.html"><strong aria-hidden="true">4.4.</strong> while實戰，開發shell使用system和cin輸入</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_4/section_5.html"><strong aria-hidden="true">4.5.</strong> 完成項目實戰支援ls的shell</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_4/section_6.html"><strong aria-hidden="true">4.6.</strong> 數組和vector分析</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_4/section_7.html"><strong aria-hidden="true">4.7.</strong> 棧區數組代碼演示</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_4/section_8.html"><strong aria-hidden="true">4.8.</strong> 堆區數組代碼示範</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_4/section_9.html"><strong aria-hidden="true">4.9.</strong> vector數組訪問和遍歷代碼</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_4/section_10.html"><strong aria-hidden="true">4.10.</strong> vector搜尋刪除插入與排序</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_4/section_11.html"><strong aria-hidden="true">4.11.</strong> vector元素空間與記憶空間顯示與控制</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_4/section_12.html"><strong aria-hidden="true">4.12.</strong> vector的push_back和emplace_back差異</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_4/section_13.html"><strong aria-hidden="true">4.13.</strong> 循環數組實戰base16編碼分析</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_4/section_14.html"><strong aria-hidden="true">4.14.</strong> base16編碼</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_4/section_15.html"><strong aria-hidden="true">4.15.</strong> 循環數組實戰base16解碼</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_4/homework.html"><strong aria-hidden="true">4.16.</strong> hw: 第四章摘要與作業</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_5/intro.html"><strong aria-hidden="true">5.</strong> 第五章: C++的模塊化編程</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_5/section_1.html"><strong aria-hidden="true">5.1.</strong> 初識函數原理分析</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_5/section_2.html"><strong aria-hidden="true">5.2.</strong> 函數參數回傳值代碼實戰</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_5/section_3.html"><strong aria-hidden="true">5.3.</strong> 函數與變數作用域分析</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_5/section_4.html"><strong aria-hidden="true">5.4.</strong> 指針和引用理論到實戰</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_5/section_5.html"><strong aria-hidden="true">5.5.</strong> 指針和引用作為函數參數減少複製</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_5/section_6.html"><strong aria-hidden="true">5.6.</strong> 引用和指針在傳回值中的使用和問題</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_5/section_7.html"><strong aria-hidden="true">5.7.</strong> 函數重載與預設值</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_5/section_8.html"><strong aria-hidden="true">5.8.</strong> 函數與數組和數組引用</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_5/section_9.html"><strong aria-hidden="true">5.9.</strong> 函數與vector數組和引用</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_5/section_10.html"><strong aria-hidden="true">5.10.</strong> 多檔案聲明定義函數和全域變數</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_5/section_11.html"><strong aria-hidden="true">5.11.</strong> 字串,vector和string之間的高效轉換</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_5/section_12.html"><strong aria-hidden="true">5.12.</strong> 案例開發base16函數庫</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_5/homework.html"><strong aria-hidden="true">5.13.</strong> hw: 第五章摘要與作業</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_6/intro.html"><strong aria-hidden="true">6.</strong> 第六章: C++的輸入輸出</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_6/section_1.html"><strong aria-hidden="true">6.1.</strong> cout標準輸出ostream示範</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_6/section_2.html"><strong aria-hidden="true">6.2.</strong> cout無格式輸出</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_6/section_3.html"><strong aria-hidden="true">6.3.</strong> 標準輸出和錯誤輸出重定向到檔案</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_6/section_4.html"><strong aria-hidden="true">6.4.</strong> cin標準輸入與失敗處理</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_6/section_5.html"><strong aria-hidden="true">6.5.</strong> stringstream拼接與處理字串流</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_6/section_6.html"><strong aria-hidden="true">6.6.</strong> fstream檔案流的讀寫與開啟模式</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_6/section_7.html"><strong aria-hidden="true">6.7.</strong> ofstream寫入二進位和追加寫入檔案</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_6/section_8.html"><strong aria-hidden="true">6.8.</strong> ifstream讀取檔案讀取即時更新的內容</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_6/section_9.html"><strong aria-hidden="true">6.9.</strong> 輸入輸出實戰-日誌模組需求分析與技術準備</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_6/section_10.html"><strong aria-hidden="true">6.10.</strong> 日誌流實作可設定輸出到控制台_string和檔案中</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_6/homework.html"><strong aria-hidden="true">6.11.</strong> hw: 第六章摘要與作業</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/intro.html"><strong aria-hidden="true">7.</strong> 第七章: C++的面對對象</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/section_1.html"><strong aria-hidden="true">7.1.</strong> 物件導向程式設計範式與程式碼示範</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/section_2.html"><strong aria-hidden="true">7.2.</strong> 類別的成員變數與物件記憶體空間</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/section_3.html"><strong aria-hidden="true">7.3.</strong> 類別成員函數與內聯_this指標模擬</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/section_4.html"><strong aria-hidden="true">7.4.</strong> 靜態成員變數與函數與存取說明符</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/section_5.html"><strong aria-hidden="true">7.5.</strong> 建構與析構函式基礎語法與堆疊區的自動呼叫</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/section_6.html"><strong aria-hidden="true">7.6.</strong> 堆區動態物件建構與析構的呼叫</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/section_7.html"><strong aria-hidden="true">7.7.</strong> 類別成員變數初始化的三種方法</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/section_8.html"><strong aria-hidden="true">7.8.</strong> 建構子參數與explicit</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/section_9.html"><strong aria-hidden="true">7.9.</strong> 類別繼承語法與記憶體分佈</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/section_10.html"><strong aria-hidden="true">7.10.</strong> 繼承中的存取權限設定</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/section_11.html"><strong aria-hidden="true">7.11.</strong> 繼承中的同名成員和基底類別不同構造的處理</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/section_12.html"><strong aria-hidden="true">7.12.</strong> 多態虛函數與實戰範例</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/section_13.html"><strong aria-hidden="true">7.13.</strong> 純虛函數_抽象類別_析構的虛擬函數</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/section_14.html"><strong aria-hidden="true">7.14.</strong> Cpp組合和委託分析和組合程式碼範例</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/section_15.html"><strong aria-hidden="true">7.15.</strong> 介面實作與委託程式碼示範</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/section_16.html"><strong aria-hidden="true">7.16.</strong> 日誌模組需求分析與麵型物件六大原則實戰</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/section_17.html"><strong aria-hidden="true">7.17.</strong> 日誌模組文字格式化介面與類別設計與實作</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/section_18.html"><strong aria-hidden="true">7.18.</strong> 日誌控制台和檔案輸出類別設計與實作</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/section_19.html"><strong aria-hidden="true">7.19.</strong> Logger委託實作和日誌等級輸出控制</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/section_20.html"><strong aria-hidden="true">7.20.</strong> LogFac工廠類別完成實作日誌輸出簡化巨集</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/section_21.html"><strong aria-hidden="true">7.21.</strong> 實作動態設定日誌輸出與等級控制</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7/homework.html"><strong aria-hidden="true">7.22.</strong> hw: 第七章摘要與作業</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_8/intro.html"><strong aria-hidden="true">8.</strong> 第八章: C++堆內存的危險與解方</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_8/section_1.html"><strong aria-hidden="true">8.1.</strong> 拷貝建構函數語意原理與實戰示範</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_8/section_2.html"><strong aria-hidden="true">8.2.</strong> 透過vector實戰移動語意提升效率</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_8/section_3.html"><strong aria-hidden="true">8.3.</strong> 自訂移動語意的String類別</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_8/section_4.html"><strong aria-hidden="true">8.4.</strong> 運算子重載賦值與移動賦值符號=</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_8/section_5.html"><strong aria-hidden="true">8.5.</strong> 智慧指標原理分析與unique_ptr使用詳解</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_8/section_6.html"><strong aria-hidden="true">8.6.</strong> 手動實作一個智慧型指標</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_8/section_7.html"><strong aria-hidden="true">8.7.</strong> 日誌模組專案重構引入智慧指標</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_8/homework.html"><strong aria-hidden="true">8.8.</strong> hw: 第八章總結與作業</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_9/intro.html"><strong aria-hidden="true">9.</strong> 第九章: C++的並發程式設計</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_9/section_1.html"><strong aria-hidden="true">9.1.</strong> map與陣列鍊錶樹分析</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_9/section_2.html"><strong aria-hidden="true">9.2.</strong> map的初始化與增刪改查</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_9/section_3.html"><strong aria-hidden="true">9.3.</strong> 函數指標和成員函數指標的宣告定義和存取</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_9/section_4.html"><strong aria-hidden="true">9.4.</strong> function函數封裝器使用</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_9/section_5.html"><strong aria-hidden="true">9.5.</strong> bind封裝函數轉換成員函數綁定為普通函數</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_9/section_6.html"><strong aria-hidden="true">9.6.</strong> lambda表達式暫存函數應用實戰</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_9/section_7.html"><strong aria-hidden="true">9.7.</strong> 多執行緒程式設計概述</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_9/section_8.html"><strong aria-hidden="true">9.8.</strong> 線程thread範例</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_9/section_9.html"><strong aria-hidden="true">9.9.</strong> 線程間資源競爭互斥mutex</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_9/section_10.html"><strong aria-hidden="true">9.10.</strong> 非同步安全性的取得執行緒的回傳值async</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_9/section_11.html"><strong aria-hidden="true">9.11.</strong> 訊息伺服器設計詳細說明</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_9/section_12.html"><strong aria-hidden="true">9.12.</strong> 使用map和函數物件完成訊息處理函數註冊</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_9/section_13.html"><strong aria-hidden="true">9.13.</strong> 完成訊息快取與處理執行緒</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_9/section_14.html"><strong aria-hidden="true">9.14.</strong> 完成線程安全性和http模擬測試</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_9/homework.html"><strong aria-hidden="true">9.15.</strong> 第九章總結與作業</a></span></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split('#')[0].split('?')[0];
        if (current_page.endsWith('/')) {
            current_page += 'index.html';
        }
        const links = Array.prototype.slice.call(this.querySelectorAll('a'));
        const l = links.length;
        for (let i = 0; i < l; ++i) {
            const link = links[i];
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The 'index' page is supposed to alias the first chapter in the book.
            // Check both with and without the '.html' suffix to be robust against pretty URLs
            if (link.href.replace(/\.html$/, '') === current_page.replace(/\.html$/, '')
                || i === 0
                && path_to_root === ''
                && current_page.endsWith('/index.html')) {
                link.classList.add('active');
                let parent = link.parentElement;
                while (parent) {
                    if (parent.tagName === 'LI' && parent.classList.contains('chapter-item')) {
                        parent.classList.add('expanded');
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', e => {
            if (e.target.tagName === 'A') {
                const clientRect = e.target.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                sessionStorage.setItem('sidebar-scroll-offset', clientRect.top - sidebarRect.top);
            }
        }, { passive: true });
        const sidebarScrollOffset = sessionStorage.getItem('sidebar-scroll-offset');
        sessionStorage.removeItem('sidebar-scroll-offset');
        if (sidebarScrollOffset !== null) {
            // preserve sidebar scroll position when navigating via links within sidebar
            const activeSection = this.querySelector('.active');
            if (activeSection) {
                const clientRect = activeSection.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                const currentOffset = clientRect.top - sidebarRect.top;
                this.scrollTop += currentOffset - parseFloat(sidebarScrollOffset);
            }
        } else {
            // scroll sidebar to current active section when navigating via
            // 'next/previous chapter' buttons
            const activeSection = document.querySelector('#mdbook-sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        const sidebarAnchorToggles = document.querySelectorAll('.chapter-fold-toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(el => {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define('mdbook-sidebar-scrollbox', MDBookSidebarScrollbox);


// ---------------------------------------------------------------------------
// Support for dynamically adding headers to the sidebar.

(function() {
    // This is used to detect which direction the page has scrolled since the
    // last scroll event.
    let lastKnownScrollPosition = 0;
    // This is the threshold in px from the top of the screen where it will
    // consider a header the "current" header when scrolling down.
    const defaultDownThreshold = 150;
    // Same as defaultDownThreshold, except when scrolling up.
    const defaultUpThreshold = 300;
    // The threshold is a virtual horizontal line on the screen where it
    // considers the "current" header to be above the line. The threshold is
    // modified dynamically to handle headers that are near the bottom of the
    // screen, and to slightly offset the behavior when scrolling up vs down.
    let threshold = defaultDownThreshold;
    // This is used to disable updates while scrolling. This is needed when
    // clicking the header in the sidebar, which triggers a scroll event. It
    // is somewhat finicky to detect when the scroll has finished, so this
    // uses a relatively dumb system of disabling scroll updates for a short
    // time after the click.
    let disableScroll = false;
    // Array of header elements on the page.
    let headers;
    // Array of li elements that are initially collapsed headers in the sidebar.
    // I'm not sure why eslint seems to have a false positive here.
    // eslint-disable-next-line prefer-const
    let headerToggles = [];
    // This is a debugging tool for the threshold which you can enable in the console.
    let thresholdDebug = false;

    // Updates the threshold based on the scroll position.
    function updateThreshold() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // The number of pixels below the viewport, at most documentHeight.
        // This is used to push the threshold down to the bottom of the page
        // as the user scrolls towards the bottom.
        const pixelsBelow = Math.max(0, documentHeight - (scrollTop + windowHeight));
        // The number of pixels above the viewport, at least defaultDownThreshold.
        // Similar to pixelsBelow, this is used to push the threshold back towards
        // the top when reaching the top of the page.
        const pixelsAbove = Math.max(0, defaultDownThreshold - scrollTop);
        // How much the threshold should be offset once it gets close to the
        // bottom of the page.
        const bottomAdd = Math.max(0, windowHeight - pixelsBelow - defaultDownThreshold);
        let adjustedBottomAdd = bottomAdd;

        // Adjusts bottomAdd for a small document. The calculation above
        // assumes the document is at least twice the windowheight in size. If
        // it is less than that, then bottomAdd needs to be shrunk
        // proportional to the difference in size.
        if (documentHeight < windowHeight * 2) {
            const maxPixelsBelow = documentHeight - windowHeight;
            const t = 1 - pixelsBelow / Math.max(1, maxPixelsBelow);
            const clamp = Math.max(0, Math.min(1, t));
            adjustedBottomAdd *= clamp;
        }

        let scrollingDown = true;
        if (scrollTop < lastKnownScrollPosition) {
            scrollingDown = false;
        }

        if (scrollingDown) {
            // When scrolling down, move the threshold up towards the default
            // downwards threshold position. If near the bottom of the page,
            // adjustedBottomAdd will offset the threshold towards the bottom
            // of the page.
            const amountScrolledDown = scrollTop - lastKnownScrollPosition;
            const adjustedDefault = defaultDownThreshold + adjustedBottomAdd;
            threshold = Math.max(adjustedDefault, threshold - amountScrolledDown);
        } else {
            // When scrolling up, move the threshold down towards the default
            // upwards threshold position. If near the bottom of the page,
            // quickly transition the threshold back up where it normally
            // belongs.
            const amountScrolledUp = lastKnownScrollPosition - scrollTop;
            const adjustedDefault = defaultUpThreshold - pixelsAbove
                + Math.max(0, adjustedBottomAdd - defaultDownThreshold);
            threshold = Math.min(adjustedDefault, threshold + amountScrolledUp);
        }

        if (documentHeight <= windowHeight) {
            threshold = 0;
        }

        if (thresholdDebug) {
            const id = 'mdbook-threshold-debug-data';
            let data = document.getElementById(id);
            if (data === null) {
                data = document.createElement('div');
                data.id = id;
                data.style.cssText = `
                    position: fixed;
                    top: 50px;
                    right: 10px;
                    background-color: 0xeeeeee;
                    z-index: 9999;
                    pointer-events: none;
                `;
                document.body.appendChild(data);
            }
            data.innerHTML = `
                <table>
                  <tr><td>documentHeight</td><td>${documentHeight.toFixed(1)}</td></tr>
                  <tr><td>windowHeight</td><td>${windowHeight.toFixed(1)}</td></tr>
                  <tr><td>scrollTop</td><td>${scrollTop.toFixed(1)}</td></tr>
                  <tr><td>pixelsAbove</td><td>${pixelsAbove.toFixed(1)}</td></tr>
                  <tr><td>pixelsBelow</td><td>${pixelsBelow.toFixed(1)}</td></tr>
                  <tr><td>bottomAdd</td><td>${bottomAdd.toFixed(1)}</td></tr>
                  <tr><td>adjustedBottomAdd</td><td>${adjustedBottomAdd.toFixed(1)}</td></tr>
                  <tr><td>scrollingDown</td><td>${scrollingDown}</td></tr>
                  <tr><td>threshold</td><td>${threshold.toFixed(1)}</td></tr>
                </table>
            `;
            drawDebugLine();
        }

        lastKnownScrollPosition = scrollTop;
    }

    function drawDebugLine() {
        if (!document.body) {
            return;
        }
        const id = 'mdbook-threshold-debug-line';
        const existingLine = document.getElementById(id);
        if (existingLine) {
            existingLine.remove();
        }
        const line = document.createElement('div');
        line.id = id;
        line.style.cssText = `
            position: fixed;
            top: ${threshold}px;
            left: 0;
            width: 100vw;
            height: 2px;
            background-color: red;
            z-index: 9999;
            pointer-events: none;
        `;
        document.body.appendChild(line);
    }

    function mdbookEnableThresholdDebug() {
        thresholdDebug = true;
        updateThreshold();
        drawDebugLine();
    }

    window.mdbookEnableThresholdDebug = mdbookEnableThresholdDebug;

    // Updates which headers in the sidebar should be expanded. If the current
    // header is inside a collapsed group, then it, and all its parents should
    // be expanded.
    function updateHeaderExpanded(currentA) {
        // Add expanded to all header-item li ancestors.
        let current = currentA.parentElement;
        while (current) {
            if (current.tagName === 'LI' && current.classList.contains('header-item')) {
                current.classList.add('expanded');
            }
            current = current.parentElement;
        }
    }

    // Updates which header is marked as the "current" header in the sidebar.
    // This is done with a virtual Y threshold, where headers at or below
    // that line will be considered the current one.
    function updateCurrentHeader() {
        if (!headers || !headers.length) {
            return;
        }

        // Reset the classes, which will be rebuilt below.
        const els = document.getElementsByClassName('current-header');
        for (const el of els) {
            el.classList.remove('current-header');
        }
        for (const toggle of headerToggles) {
            toggle.classList.remove('expanded');
        }

        // Find the last header that is above the threshold.
        let lastHeader = null;
        for (const header of headers) {
            const rect = header.getBoundingClientRect();
            if (rect.top <= threshold) {
                lastHeader = header;
            } else {
                break;
            }
        }
        if (lastHeader === null) {
            lastHeader = headers[0];
            const rect = lastHeader.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top >= windowHeight) {
                return;
            }
        }

        // Get the anchor in the summary.
        const href = '#' + lastHeader.id;
        const a = [...document.querySelectorAll('.header-in-summary')]
            .find(element => element.getAttribute('href') === href);
        if (!a) {
            return;
        }

        a.classList.add('current-header');

        updateHeaderExpanded(a);
    }

    // Updates which header is "current" based on the threshold line.
    function reloadCurrentHeader() {
        if (disableScroll) {
            return;
        }
        updateThreshold();
        updateCurrentHeader();
    }


    // When clicking on a header in the sidebar, this adjusts the threshold so
    // that it is located next to the header. This is so that header becomes
    // "current".
    function headerThresholdClick(event) {
        // See disableScroll description why this is done.
        disableScroll = true;
        setTimeout(() => {
            disableScroll = false;
        }, 100);
        // requestAnimationFrame is used to delay the update of the "current"
        // header until after the scroll is done, and the header is in the new
        // position.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Closest is needed because if it has child elements like <code>.
                const a = event.target.closest('a');
                const href = a.getAttribute('href');
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    threshold = targetElement.getBoundingClientRect().bottom;
                    updateCurrentHeader();
                }
            });
        });
    }

    // Takes the nodes from the given head and copies them over to the
    // destination, along with some filtering.
    function filterHeader(source, dest) {
        const clone = source.cloneNode(true);
        clone.querySelectorAll('mark').forEach(mark => {
            mark.replaceWith(...mark.childNodes);
        });
        dest.append(...clone.childNodes);
    }

    // Scans page for headers and adds them to the sidebar.
    document.addEventListener('DOMContentLoaded', function() {
        const activeSection = document.querySelector('#mdbook-sidebar .active');
        if (activeSection === null) {
            return;
        }

        const main = document.getElementsByTagName('main')[0];
        headers = Array.from(main.querySelectorAll('h2, h3, h4, h5, h6'))
            .filter(h => h.id !== '' && h.children.length && h.children[0].tagName === 'A');

        if (headers.length === 0) {
            return;
        }

        // Build a tree of headers in the sidebar.

        const stack = [];

        const firstLevel = parseInt(headers[0].tagName.charAt(1));
        for (let i = 1; i < firstLevel; i++) {
            const ol = document.createElement('ol');
            ol.classList.add('section');
            if (stack.length > 0) {
                stack[stack.length - 1].ol.appendChild(ol);
            }
            stack.push({level: i + 1, ol: ol});
        }

        // The level where it will start folding deeply nested headers.
        const foldLevel = 3;

        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            const level = parseInt(header.tagName.charAt(1));

            const currentLevel = stack[stack.length - 1].level;
            if (level > currentLevel) {
                // Begin nesting to this level.
                for (let nextLevel = currentLevel + 1; nextLevel <= level; nextLevel++) {
                    const ol = document.createElement('ol');
                    ol.classList.add('section');
                    const last = stack[stack.length - 1];
                    const lastChild = last.ol.lastChild;
                    // Handle the case where jumping more than one nesting
                    // level, which doesn't have a list item to place this new
                    // list inside of.
                    if (lastChild) {
                        lastChild.appendChild(ol);
                    } else {
                        last.ol.appendChild(ol);
                    }
                    stack.push({level: nextLevel, ol: ol});
                }
            } else if (level < currentLevel) {
                while (stack.length > 1 && stack[stack.length - 1].level > level) {
                    stack.pop();
                }
            }

            const li = document.createElement('li');
            li.classList.add('header-item');
            li.classList.add('expanded');
            if (level < foldLevel) {
                li.classList.add('expanded');
            }
            const span = document.createElement('span');
            span.classList.add('chapter-link-wrapper');
            const a = document.createElement('a');
            span.appendChild(a);
            a.href = '#' + header.id;
            a.classList.add('header-in-summary');
            filterHeader(header.children[0], a);
            a.addEventListener('click', headerThresholdClick);
            const nextHeader = headers[i + 1];
            if (nextHeader !== undefined) {
                const nextLevel = parseInt(nextHeader.tagName.charAt(1));
                if (nextLevel > level && level >= foldLevel) {
                    const toggle = document.createElement('a');
                    toggle.classList.add('chapter-fold-toggle');
                    toggle.classList.add('header-toggle');
                    toggle.addEventListener('click', () => {
                        li.classList.toggle('expanded');
                    });
                    const toggleDiv = document.createElement('div');
                    toggleDiv.textContent = '❱';
                    toggle.appendChild(toggleDiv);
                    span.appendChild(toggle);
                    headerToggles.push(li);
                }
            }
            li.appendChild(span);

            const currentParent = stack[stack.length - 1];
            currentParent.ol.appendChild(li);
        }

        const onThisPage = document.createElement('div');
        onThisPage.classList.add('on-this-page');
        onThisPage.append(stack[0].ol);
        const activeItemSpan = activeSection.parentElement;
        activeItemSpan.after(onThisPage);
    });

    document.addEventListener('DOMContentLoaded', reloadCurrentHeader);
    document.addEventListener('scroll', reloadCurrentHeader, { passive: true });
})();

