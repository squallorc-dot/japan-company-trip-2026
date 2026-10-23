# 2026 日本員工旅遊｜互動式旅遊手冊

獨立儲存庫，完全不修改舊版 `2026` 或 `TTAA` 專案。

## 使用
網址： https://squallorc-dot.github.io/japan-company-trip-2026/ （須先完成 Pages 發布）

- 2026/12/02–12/06 五日公司行程、航班、飯店、自助方案、周邊夜間活動
- Day 1 四套、Day 2 五套方案可切換，個人瀏覽器可儲存選擇
- Google Maps 一鍵導航、航班飯店資訊、景點詳情、離線閱讀
- 所有自助時刻是日本時間（JST），集合時間以旅行社最終通知為準

## 內容更新
- `data.js`：唯一行程與景點資料來源
- `app.js`：互動功能；`styles.css`：手機與桌機排版
- `assets/`：SVG 圖像、圖示
- `version.json` 及 `sw.js` CACHE_NAME：發布新版本時同步更新，避免舊快取

## GitHub Pages
Settings → Pages → Build and deployment → Source 選 GitHub Actions；`main` 每次推送觸發部署工作流程。

## 安全
公開網站請勿放護照、機票訂位代碼、個人電話、員工清單、機密團體文件。
