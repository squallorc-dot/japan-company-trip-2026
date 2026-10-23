# 2026 日本員工旅遊｜互動式旅遊手冊

獨立網站專案，**不使用原本 `2026` 與 `TTAA` 儲存庫的任何檔案路徑**。

- 旅遊日期：2026/12/02–12/06
- 內容：五日公司行程與 Day 1–2 夫妻自由行完整方案、夜間周邊建議、交通快捷入口、航班、三家住宿。
- 技術：**零外部依賴的 ES Modules + PWA + GitHub Pages**，不需要 Node/npm、Google 試算表、Apps Script、API Key、帳號或資料庫。
- 檔案：`index.html`、`styles.css`、`app.js`、`data.js`、`manifest.webmanifest`、`sw.js`、`assets/`。
- 版本：`2026.10.23-03`。

> 技術與先前 Vue/Vite 提案略有調整：此站不需要複雜的元件生態系；為確保能直接在 GitHub Pages 運行、無 npm 依賴且可穩定離線，改採原生 JavaScript 模組。介面與內容依然分離，保留完整互動功能。未來需要更大型功能時再遷移框架。

## 立即在電腦預覽

在**這個獨立資料夾**啟動靜態伺服器，勿用 `file://` 直接開啟（ES 模組與 PWA 在檔案模式下可能被瀏覽器限制）。

```bash
python -m http.server 8080
```

瀏覽 http://localhost:8080/ 。

## 建立全新 GitHub 儲存庫並發布

1. GitHub 登入 `squallorc-dot`，進入 https://github.com/new 。
2. 建立新的公開儲存庫，建議名稱 **`japan-company-trip-2026`**，不要選用現有的 `2026` 或 `TTAA`。
3. 將此資料夾的**所有檔案與子資料夾**（包含 `.github/workflows/deploy.yml`）上傳到新儲存庫根目錄。
4. GitHub → Settings → Pages → Build and deployment → Source: **GitHub Actions**。
5. 在 Actions 查看 Publish Japan Trip Website 的部署狀態；首次如果未自動觸發可手動執行 `workflow_dispatch`。
6. 成功後網站會位於：`https://squallorc-dot.github.io/japan-company-trip-2026/`。

此網址**只是依建議儲存庫名稱推算的未來網址**，在 GitHub 新儲存庫成立且部署成功前不會存在。

## 後續維護（由 ChatGPT 協助）

- 行程、景點、飯店、方案、備案：主要修改 `data.js`。
- UI／UX、文字與排版：`styles.css`、`app.js`。
- 圖示與封面：`assets/`。
- 每次修改發布時：更新 `data.js` 的 `guide.version`、`version.json` 的 `version`、`sw.js` 的 `CACHE_NAME`，確保手機離線快取會更新。
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
實景圖片連結與攝影者／授權標記集中於 `media.js`。網站頁尾「照片鳴謝」保留連往每張照片授權頁面的入口；照片大多是過往景觀，不代表此次旅遊期間的現場影像。YouTube 影片採縮圖與外部連結，不複製影片。