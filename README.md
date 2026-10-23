# 2026 日本員工旅遊｜互動式旅遊手冊

獨立網站專案，**不使用原本 `2026` 與 `TTAA` 儲存庫的任何檔案路徑**。

- 旅遊日期：2026/12/02–12/06
- 內容：五日公司行程與 Day 1–2 夫妻自由行完整方案、夜間周邊建議、交通快捷入口、航班、三家住宿。
- 技術：**零外部依賴的 ES Modules + PWA + GitHub Pages**，不需要 Node/npm、Google 試算表、Apps Script、API Key、帳號或資料庫。
- 檔案：`index.html`、`styles.css`、`app.js`、`data.js`、`manifest.webmanifest`、`sw.js`、`assets/`。
- 版本：`2026.10.24-03`。

> 技術與先前 Vue/Vite 提案略有調整：此站不需要複雜的元件生態系；為確保能直接在 GitHub Pages 運行、無 npm 依賴且可穩定離線，改採原生 JavaScript 模組。介面與內容依然分離，保留完整互動功能。未來需要更大型功能時再遷移框架。

## 立即在電腦預覽

在**這個獨立資料夾**啟動靜態伺服器，勿用 `file://` 直接開啟（ES 模組與 PWA 在檔案模式下可能被瀏覽器限制）。

```bash
python -m http.server 8080
```

瀏覽 http://localhost:8080/ 。

## 正式網站與部署

- 正式網站：https://squallorc-dot.github.io/japan-company-trip-2026/
- GitHub 儲存庫：https://github.com/squallorc-dot/japan-company-trip-2026
- 已在 GitHub Pages 上線；透過 `main` 分支的 GitHub Actions 發布。
- 發布時先驗證行程資料及程式語法，再由專案內的原始照片產生社群封面、驗證中繼標籤，最後發布網頁。
- 原本的 `2026` 東京行程網站與 `TTAA` 儲存庫都維持獨立。

## 後續維護（由 ChatGPT 協助）

- 行程、景點、飯店、方案、備案：主要修改 `data.js`。
- UI／UX、文字與排版：`styles.css`、`app.js`。
- 圖示與封面：`assets/`。
- 每次修改發布時：同步更新 `data.js`、`version.json`、`sw.js`、`index.html`、`app.js` 與 `refresh.html` 的版本識別，確保手機與 LINE 不混讀新舊資料。
- 旅行社尚未公告的停留／集合時間標記「待確認」，不要自行補上精確時刻。
- **公開儲存庫不應存放護照、訂位代碼、員工名單、私人聯絡資訊。** PDF 來源只保存在私人電腦，沒有打包到網站。

## 交通與離線說明

- Google Maps 查詢為**外部連結**，由 Google 決定當時可搭列車與路線。本站不自行取得列車即時資料，也不保證會照特色鐵路行駛，搭乘湘南單軌及江之電要依站名選擇。
- PWA 需從 HTTPS（GitHub Pages）或 localhost 使用，開啟後才能正常快取。主要 HTML/CSS/JS/插畫可離線，但 Maps、外部官網及真實列車狀況需網路。
- 自己手機選的方案保存在該裝置；分享按鈕可產生帶 `day` 與 `plan` 參數的連結，不需要夫妻同步服務。
- 所有自助時刻使用 JST。台灣比日本慢一小時。

## 已知待更新資料

- 12/2 飯店實際入住時刻。
- 12/4–12/6 公司每個景點集合時間。
- 花石和團體住宿的貸切風呂條件。
- 12/3 真正的列車班次、天氣、聖誕市集購票方式。

網站公開頁僅顯示有用的景點／飯店／交通官網；版本與來源資料保留在儲存庫供維護，不公開團體 PDF。

## 實景圖片與素材來源
實景圖片與作者／授權標記集中於 `media.js` 與 `assets/photos/credits.json`。六張主要實景照片已儲存於 `assets/photos/`，可供離線閱讀；網站頁尾保留照片來源。照片為過往景觀，不代表旅行當下的天氣。YouTube 影片僅連結至原影片。

## 影音與預覽卡片
- 5 天各附一支已確認存在的具體 YouTube 影片，卡片可直接在 YouTube 開啟，避免嵌入播放器失效。
- 影片封面優先讀取 YouTube 原始縮圖，載入失敗改顯示 `assets/video-poster-{day}.svg`，不會留下白框。
- 照片作者與授權資訊保留於頁尾及 `assets/photos/credits.json`；網站內六張主要照片均為本地 WebP。
## 行程網頁出現舊版時
手機瀏覽器及 LINE 內建瀏覽器可能保留較舊的 Service Worker。直接打開下列網站專用更新入口：
https://squallorc-dot.github.io/japan-company-trip-2026/refresh.html

更新頁只 unregister 本專案作用範圍的 Service Worker，並刪除名稱以 `japan-trip-2026-` 開頭的 CacheStorage。保留 LocalStorage 方案/字級/行前勾選。其他 GitHub Pages 專案不受影響。
最新版 HTML 引用含版本參數的 CSS、JS；`app.js` 內的兩個 ES 模組匯入亦使用相同版本參數。每次後續內容更新須同步提高 `index.html`、`app.js`、`sw.js`、`version.json` 的版本，確保 LINE 與手機不再混讀不同版本。此頁面需要連網執行，無法取代離線閱讀功能。

## HTML、LINE 分享及索引政策（2026.10.24-01）

- 網站 Title／Description／OG／Twitter Card／Canonical 皆為靜態 HTML，讓 LINE／Facebook 不必執行 JavaScript 即可取得分享卡片。
- OG 分享封面為「富士山＋新倉山忠靈塔」單張實景，使用 `assets/photos/fuji.webp`，不加文字；以 `scripts/build-social-image.py` 在 GitHub Actions 發布階段裁成 1200×630 的 `assets/og-cover.jpg`。
- **注意：儲存庫中既有的 `assets/og-cover.jpg` 舊三景拼貼只是舊產物；正式網站發布流程會先覆蓋產生單張新封面。** 將來若需要在原始碼中也同步二進位 JPEG，可於本機執行 `python scripts/build-social-image.py` 後一起提交。
- 分享標題：`2026 日本冬日旅行｜東京・湘南・富士`。
- 分享說明：`12/2–12/6，從東京街道到湘南海風，再和富士山相遇。五天的風景，也有兩個人的自由時光。`。
- OG 圖片 URL 附版本參數，以避免 LINE／Facebook 繼續使用舊三景快取。全站維持 `noindex, nofollow, noarchive`；這不是密碼保護，持有網址的人仍可存取。
- 網站互動切換在客戶端完成，Day 1／Day 2 方案可隨網址分享，但不同日期仍共用同一張 OG 封面。

## 2026/10/24：旅行操作與可還原版本

- 修改前備份分支：`backup-pre-ux-20261024`，定位在 GitHub 提交 `f1419b8e769837a03271e9a9bdca51eb94e35379`。新版有問題時以此為上一版基準，比對後可用 GitHub revert 還原；**不要強制覆寫** main 以免遺失後續更新。
- 正式版維持四個手機選單：**總覽／行程／交通／資訊**，不增加第二行文字及新選單。
- 自由行預設步行至車站，再搭 JR、地下鐵、私鐵及指定特色鐵道；不主動安排公車。Google Maps 的 transit 模式可能仍推薦公車，須依網站的鐵道站名自行選擇。
- 行程頁的導航快捷入口直接使用已存在的路段資料，交通頁仍提供完整路線；自助時刻為參考，不代表位置追蹤。
- 方案比較改為簡短的步調／特色提示；景點照片移到時間軸後方，完整保留。
- 旅行日每分鐘只更新當日時間小區塊，不重新繪製整個畫面。
- 來源資料和個人方案仍分別由 `data.js` 與本機 LocalStorage 管理；保留既有 OG 圖片與社群設定。
- 尚需手機／LINE／離線實機回歸測試；不要把 GitHub 部署成功等同於所有裝置已驗證。


## 2026.10.24-03｜交通指南與還原
- 本輪修改前備份：`backup-pre-transit-20261024`，基礎提交 `2fe3a7914630a959c4f7de6850a9612995291968`。
- `data.js` 的 `transportGuides` 是自由行轉乘方向、站號、出口、步行、候車與官方資訊的共用資料來源。
- 行程卡片及「交通」頁使用同一份指南，不新增底部選單；Google Maps 另外保留最快大眾運輸路線參考，可能含公車，亦可能跳過湘南單軌或江之電。
- 交通出發時刻與出口資訊以本次查核所見為參考，實際 12 月 3 日出發班次、臨時月台變動與末班仍須出發前核實。
- 公司遊覽車安排保持不變；景點順序與 Day 1／Day 2 備案數量不變。
