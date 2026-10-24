// 行程唯一資料來源：只需在此修改公司時間、景點與自由行方案。
// 所有時間均為日本當地時間 JST (UTC+9)。
// status: confirmed = 航班/指定住宿或官方活動已確認；planned = 旅行社既定但集合時間待定；estimate = 自助預估。
const item = (at, title, place, kind, desc, options = {}) => ({ at,title,place,kind,desc,...options });
const option = (id,name,subtitle,events,note) => ({id,name,subtitle,events,note});

export const guide = {
 version:'2026.10.24-07', verified:'2026-10-23', timezone:'Asia/Tokyo',
 tripStart:'2026-12-02', tripEnd:'2026-12-06', title:'東京・湘南・富士 五日',
 subTitle:'2026 日本員工旅遊｜夫妻自由行互動手冊',
 intro:'五天有公司安排的風景，也有兩個人自己決定的旅行。把當下需要的資訊，留在最容易找到的位置。',
 warning:'旅行社可能調整路線及集合時間；網站內的自由行時刻是規劃參考。電車班次、天氣、營業狀態請於旅行當天再次確認。',
 transportGuides:{
  "銀座一丁目駅|丸の内仲通り": {
    "summary": "銀座一丁目站／銀座商圈 → 沿有樂町方向步行 → 丸之內仲通與東京站周邊；不須搭車。",
    "steps": ["銀座一丁目站或銀座百貨區先以步行沿銀座～有樂町方向前進。", "再往東京站西側、丸之內仲通與 KITTE 周邊散步，按當晚體力及營業時間調整。"],
    "note": "銀座到丸之內是散步路線，無須特別搭乘地鐵；實際商店起點不同，步行時間也不同。",
    "official": "https://www.marunouchi.com/"
  },
  "hotel MONday Premium TOYOSU|イオン東雲店": {
    "summary": "從飯店門口出發 → 依行人穿越道過馬路 → AEON 東雲店；全程步行。",
    "steps": ["飯店正對面為 AEON 東雲，依行人穿越道過馬路步行前往。", "購物後步行返回飯店，留意個別店舖營業時段。"],
    "note": "飯店周邊活動，不安排鐵道或公車。",
    "official": "https://www.aeon.com/store/イオン/イオン東雲店/"
  },
  "hotel MONday Premium TOYOSU|銀座一丁目駅": {
    "summary": "飯店步行至豐洲站（Y22）→ 有樂町線往和光市方面 → 銀座一丁目站（Y19）；無須轉乘。",
    "steps": [
      "飯店步行約 10 分鐘至豐洲站（有樂町線 Y22；飯店側以 2b／6a 出口附近作為步行方向參考）。",
      "搭有樂町線『和光市方面』往銀座一丁目站（Y19），不用在有樂町轉車。",
      "銀座百貨依店舖位置選出口；銀座一丁目 4 號出口通往部分銀座商圈，2 號出口偏有樂町。"
    ],
    "note": "直達銀座適合豐洲站；不必先繞去東雲。出口依當天商場位置選擇。",
    "official": "https://www.tokyometro.jp/station/ginza-itchome/index.html",
    "alternative": "Google Maps 的最快路線僅供比較；不必改用公車。",
    "crowd": "平日傍晚可能遇下班人潮，熱門出入口注意步行流量。"
  },
  "有楽町駅|hotel MONday Premium TOYOSU": {
    "summary": "有樂町站（Y18）→ 有樂町線往新木場 → 豐洲站（Y22）→ 步行回飯店。",
    "steps": [
      "至東京 Metro 有樂町站（Y18），搭有樂町線『新木場方面』至豐洲站（Y22）。",
      "豐洲站出站後步行約 10 分鐘回飯店；切勿把捷運站當飯店終點。"
    ],
    "note": "飯店團體訂房不適用官方免費接駁，晚間以步行回飯店為準。",
    "official": "https://www.tokyotouristinfo.com/detail/M0612",
    "crowd": "晚間班次與末班請出發當天確認。"
  },
  "hotel MONday Premium TOYOSU|アーバンドック ららぽーと豊洲": {
    "summary": "飯店 → 步行約 15 分鐘 → LaLaport 豐洲；不用搭電車。",
    "steps": [
      "直接從飯店步行往 LaLaport 豐洲，不必搭地鐵。",
      "若由豐洲站附近辨認方向，2b 出口通往 LaLaport 豐洲。"
    ],
    "note": "單程步行約 15 分鐘為初步參考，以當天導航為準。",
    "official": "https://www.tokyometro.jp/station/toyosu/index.html"
  },
  "アーバンドック ららぽーと豊洲|hotel MONday Premium TOYOSU": {
    "summary": "LaLaport 豐洲 → 沿人行道步行回東雲飯店；可依需要順路採買。",
    "steps": [
      "由 LaLaport 步行回東雲的飯店，視需要順路到 AEON Shinonome 採買。",
      "夜晚及下雨時留意路口、過馬路及步行時間。"
    ],
    "note": "飯店步行路線不用乘車；AEON 的最後營業時間請以實際店舖為準。",
    "official": "https://www.tokyotouristinfo.com/detail/M0612"
  },
  "hotel MONday Premium TOYOSU|有明ガーデン": {
    "summary": "飯店步行至東雲站（R02）→ 臨海線往大崎方向 → 國際展示場站（R03）→ 步行至有明 Garden；也可比較直接步行。",
    "steps": [
      "飯店步行約 14 分鐘到東雲站（R02，B 出口方向）。",
      "搭臨海線『大崎方面』至國際展示場站（R03），再步行至有明 Garden。",
      "先比較『全程步行』與『步行＋臨海線』的總時間，避免候車比走路還久。"
    ],
    "note": "雨天或較晚出發時，不一定要搭車；選擇當下步行負擔較小的方式。",
    "official": "https://www.twr.co.jp/route/tabid/108/Default.aspx"
  },
  "有明ガーデン|hotel MONday Premium TOYOSU": {
    "summary": "有明 Garden → 步行至國際展示場站（R03）→ 臨海線往新木場 → 東雲站（R02）→ 步行回飯店。",
    "steps": [
      "回國際展示場站（R03），搭臨海線『新木場方面』只到東雲站（R02）。",
      "東雲站 B 出口步行回飯店；若轉乘與等車比直接步行慢，可以直接走回去。"
    ],
    "note": "注意站內『新木場方面』不是大崎方向。",
    "official": "https://www.twr.co.jp/route/tabid/108/Default.aspx"
  },
  "hotel MONday Premium TOYOSU|大船駅": {
    "summary": "A｜東雲站：飯店步行到東雲（R02）→ 臨海線往大崎（R08）→ 轉 JR 湘南新宿線往橫濱／大船，確認停靠大船。B｜豐洲站：飯店步行到豐洲（Y22）→ 有樂町線往和光市到有樂町（Y18）→ 轉 JR 山手線往品川到新橋 → JR 東海道線往橫濱／小田原到大船。兩線使用不同出發車站，以當天轉乘時間比較。",
    "alternatives": [
      {
        "label": "A｜東雲站出發・優先",
        "short": "飯店步行至東雲站（R02）→ 臨海線往大崎（R08）→ JR 湘南新宿線往橫濱／大船（確認停靠大船）→ 大船站。",
        "note": "飯店步行約 14 分鐘到東雲（R02），走臨海線往大崎方向；大崎轉 JR 湘南新宿線至大船。需配合清晨較疏的南下班次。",
        "steps": ["飯店步行至東雲站（R02，B 出口側）", "臨海線往大崎（R08）", "大崎依電子看板轉 JR 湘南新宿線南下並確認列車停靠大船", "大船到站後出東口方向，找獨立的湘南單軌站"],
        "official": "https://www.twr.co.jp/route/tabid/108/Default.aspx"
      },
      {
        "label": "B｜豐洲站出發・市中心方向",
        "short": "飯店步行至豐洲站（Y22）→ 有樂町線往和光市到有樂町（Y18）→ JR 山手線往品川到新橋 → JR 東海道線往橫濱／小田原到大船。",
        "note": "飯店改步行約 10 分鐘到「另一座車站」豐洲（Y22），先搭向市中心的有樂町線，再改搭 JR 南下；地理上較繞，但若 A 班次沒接上，總時間仍可能更快。不是在東雲站換乘有樂町線。",
        "steps": ["飯店步行至豐洲站（有樂町線 Y22）", "搭往和光市方向到有樂町（Y18），離開 Metro 改進 JR 有樂町站", "JR 山手線往品川方向先至新橋站（依現場看板核對列車）", "新橋轉 JR 東海道線往橫濱／小田原方向，確認列車停大船"],
        "official": "https://www.tokyometro.jp/station/toyosu/index.html"
      }
    ],
    "steps": [
      "飯店步行約 14 分鐘至東雲站（臨海線 R02，B 出口）。",
      "搭臨海線『大崎／埼京線方面』至大崎站（R08）。",
      "大崎站轉 JR 湘南新宿線，確認南下列車標示『橫濱／大船／逗子／小田原方面』且實際停靠大船；月台看當日電子看板。",
      "抵達大船 JR 站後依『湘南モノレール』站外指標轉乘，不把 JR 月台當作單軌月台。"
    ],
    "note": "推薦主線：東雲 → 大崎 → 大船，避免為了轉乘而先往市中心繞行。06:15 飯店出發不保證搭上任何特定班次。",
    "official": "https://www.twr.co.jp/route/tabid/108/Default.aspx",
    "alternative": "備案可比較東雲 → 大井町（R07）→ JR 經品川／橫濱轉至大船，或豐洲→有樂町→JR；以當天候車與轉乘總時間決定。",
    "service": "大崎清晨南下班次可能較疏，轉乘至少留合理步行時間；勿以只有 3 分鐘的轉乘作主要方案。",
    "crowd": "12/3 週四通勤逐漸增加；臨海線及 JR 以現場擁擠狀況為準。"
  },
  "大船駅 湘南モノレール|湘南江の島駅": {
    "summary": "JR 大船站下車 → 依東口／湘南モノレール指標找單軌站（SMR1）→ 搭往終點湘南江之島（SMR8），純車程約 14 分鐘。",
    "steps": [
      "從 JR 大船站依站內指標離站，前往獨立的『湘南モノレール 大船站』。",
      "搭湘南單軌往終點『湘南江之島』，這段是指定體驗，不應被 Google Maps 改成 JR／小田急捷徑。"
    ],
    "note": "兩座站體並非同一月台；下車後還需步行到江之島、之後到江之電江之島站。",
    "official": "https://www.shonan-monorail.co.jp/ticket/",
    "service": "實際首末班、發車間隔請查湘南單軌官方時刻表；候車時間需計入。",
    "crowd": "湘南熱門觀光路線，上午仍可能有通勤或旅客人潮。"
  },
  "江ノ島駅|鎌倉駅": {
    "summary": "從海蠟燭步行回江之電「江ノ島站」（EN06）→ 搭江之電往鎌倉方向 → 鎌倉站（EN15）；注意不同於湘南單軌的湘南江之島站。",
    "steps": [
      "由江之島海蠟燭返回江之電『江ノ島站（EN06）』；注意它不同於湘南單軌『湘南江之島站』。",
      "進站看『鎌倉方面』月台／看板，搭江之電至終點『鎌倉站（EN15）』。",
      "鎌倉轉 JR 時，JR 連絡閘口自 2026/7/14 起僅適用符合規定的一張交通 IC 卡；其他票種走江之電西口，站外轉乘。"
    ],
    "note": "官方標示海蠟燭至江之電江之島站步行方向約 25 分鐘，還要另計從觀景台下山、排隊與等車。",
    "official": "https://www.enoden.co.jp/tc/train/station/enoshima/",
    "alternative": "Google Maps 可能改推小田急或其他較快路線，保留作備案，不取代原定江之電。",
    "service": "江之電江之島往鎌倉白天約每 14 分鐘一班，最新時刻及末班以官方時刻表為準。",
    "crowd": "熱門車廂及海景路段可能擁擠，不預設一定能坐到海側座位。"
  },
  "鎌倉駅|横浜ワールドポーターズ": {
    "summary": "鎌倉站 → JR 橫須賀線往橫濱方向 → 橫濱站轉 JR 根岸線至櫻木町 → 經汽車道步行約 10 分鐘到 World Porters；不用纜車。",
    "steps": [
      "鎌倉站從 JR 搭『橫濱方面』的橫須賀線等適當列車，至橫濱站。",
      "選一：橫濱轉 JR 京濱東北／根岸線到櫻木町，經汽車道步行約 10 分鐘至 World Porters。",
      "選二：橫濱轉港未來線至馬車道站，走 4 號出口，步行約 5 分鐘到 World Porters。"
    ],
    "note": "兩條都是鐵道＋步行；比較當時班次、轉乘月台距離與天氣決定。",
    "official": "https://www.yim.co.jp/static-pages/access",
    "crowd": "下午橫濱站轉乘人多，留意 JR 與港未來線並非同一個月台。"
  },
  "横浜ワールドポーターズ|横浜赤レンガ倉庫": {
    "summary": "World Porters → 直接步行到橫濱紅磚倉庫／聖誕市集；不需再搭電車或纜車。",
    "steps": [
      "World Porters 直接步行前往紅磚倉庫；兩地同在港未來新港區，不需為這一小段特別搭車。",
      "在 World Porters 外確認行人路線，前往紅磚倉庫 1／2 號館及聖誕市集入口。"
    ],
    "note": "走路較符合景點順序；人潮密集時預留過馬路與排隊緩衝。",
    "official": "https://www.yokohama-akarenga.jp/access/"
  },
  "横浜赤レンガ倉庫|ラゾーナ川崎プラザ": {
    "summary": "紅磚倉庫 → 步行約 15 分鐘至櫻木町站 → JR 京濱東北／根岸線往東京方向直達川崎站 → 步行至 LAZONA，無須轉乘。",
    "steps": [
      "由紅磚倉庫步行約 15 分鐘至 JR 櫻木町站（可經汽車道方向）。",
      "搭 JR 京濱東北／根岸線等往橫濱方向列車，依當天轉乘資訊往川崎；抵達川崎站後往 LAZONA 川崎側出口步行。",
      "若聖誕市集排隊延遲，川崎是可刪減項目，別為購物硬趕最後一段。"
    ],
    "note": "川崎屬 Day 2 A 延伸，不是必走景點。",
    "official": "https://www.yokohama-akarenga.jp/access/",
    "crowd": "17:30–19:30 為一般下班較忙時段，JR 櫻木町／橫濱轉乘可能擁擠。"
  },
  "川崎駅|hotel MONday Premium TOYOSU": {
    "summary": "川崎站 → JR 京濱東北線往東京／大宮方向至大井町 → 轉臨海線往新木場至東雲（R02）→ 步行回飯店。",
    "steps": [
      "川崎站搭 JR 京濱東北線往大井町。",
      "大井町轉臨海線（R07），搭『新木場方面』至東雲站（R02）。",
      "東雲 B 出口步行約 14 分鐘回飯店。"
    ],
    "note": "不必固定先往有樂町繞行；以川崎→大井町→東雲為主要參考。",
    "official": "https://www.twr.co.jp/route/tabid/108/Default.aspx",
    "alternative": "若錯過末班或路線停駛，Google Maps 可比較其他鐵道組合，但不預設公車。",
    "crowd": "川崎晚間通勤可能擁擠；末班須同時核對 JR 和臨海線。"
  },
  "横浜赤レンガ倉庫|hotel MONday Premium TOYOSU": {
    "summary": "紅磚倉庫 → 步行約 15 分鐘至櫻木町站 → JR 根岸／京濱東北線往東京至大井町 → 轉臨海線往新木場至東雲 → 步行回飯店。",
    "steps": [
      "紅磚倉庫步行約 15 分鐘至 JR 櫻木町站。",
      "搭 JR 京濱東北／根岸線往『東京／大宮方面』在大井町站下車。",
      "大井町轉臨海線（R07）『新木場方面』，至東雲站（R02）後步行回飯店。"
    ],
    "note": "原則不必繞有樂町。也可比較馬車道→橫濱→JR 的鐵道接續。",
    "official": "https://www.yokohama-akarenga.jp/access/",
    "alternative": "最快路線由 Google Maps 依即時班次查詢，可能含公車，僅供參考。",
    "crowd": "傍晚下班與聖誕市集時段人潮多，回程留候車及站外步行緩衝。"
  },
  "東京駅|川崎駅": {
    "summary": "東京站 → JR 東海道線往橫濱／小田原方向（非新幹線）→ 川崎站 → 依 LAZONA 商場指標步行。",
    "steps": [
      "東京站尋找 JR 東海道線等『橫濱／小田原方面』列車至川崎；依當天看板確認停靠。",
      "川崎站出站後依『LAZONA 川崎』商場指標前進。"
    ],
    "note": "不需要轉乘地鐵，東京站的 JR 月台位置以現場看板為準。",
    "crowd": "工作日 15:00 前後通常非主要通勤尖峰，但仍可能有人潮。"
  },
  "hotel MONday Premium TOYOSU|吉祥寺駅": {
    "summary": "飯店步行至東雲站（R02）→ 臨海線往大崎／新宿方向 → 新宿轉 JR 中央線快速往三鷹／高尾方向 → 吉祥寺站。",
    "steps": [
      "飯店步行至東雲站（R02），搭臨海線往大崎方向。",
      "若有直通 JR 埼京線至新宿的班次，可繼續搭乘；若不是直通車則於大崎轉 JR 往新宿。",
      "新宿站轉 JR 中央線快速往三鷹／高尾方向，確認停靠吉祥寺。"
    ],
    "note": "東京西側行程優先東雲方向；往新宿時注意列車是否直通埼京線。",
    "official": "https://www.twr.co.jp/route/tabid/108/Default.aspx",
    "crowd": "通勤時段新宿站轉乘人潮較多，需預留找 JR 中央線的時間。"
  },
  "吉祥寺駅|下北沢駅": {
    "summary": "吉祥寺站 → 京王井之頭線往澀谷方向 → 下北澤站；不用繞新宿。",
    "steps": [
      "吉祥寺站找京王井之頭線『澀谷方面』，在下北澤站下車。",
      "不用為了更快而改用 JR 繞新宿。"
    ],
    "note": "這是連接吉祥寺與下北澤最簡單的特色路線。",
    "crowd": "週四下午班次請依京王官方資訊查詢。"
  },
  "下北沢駅|渋谷駅": {
    "summary": "下北澤站 → 京王井之頭線往澀谷方向 → 終點澀谷站；轉 JR 時需依站內指標步行。",
    "steps": [
      "下北澤站搭京王井之頭線『澀谷方面』至終點澀谷。",
      "井之頭線與其他澀谷鐵道路線入口不同，回飯店前依 JR 埼京線指標移動。"
    ],
    "note": "繼續走井之頭線，不必繞到新宿。",
    "crowd": "17:30 起澀谷站可能開始下班時段擁擠。"
  },
  "渋谷駅|hotel MONday Premium TOYOSU": {
    "summary": "澀谷站 → JR 埼京線找臨海線直通「新木場方面」→ 東雲站（R02）→ 步行回飯店；未直通則於大崎轉車。",
    "steps": [
      "澀谷站依 JR 埼京線方向指標，找『臨海線直通／新木場方面』列車。",
      "有直通車時在東雲站（R02）下車；否則在大崎換乘臨海線『新木場方面』。",
      "東雲站 B 出口步行回飯店。"
    ],
    "note": "注意不是所有埼京線車次都直通臨海線，須看列車終點。",
    "official": "https://www.twr.co.jp/route/tabid/108/Default.aspx",
    "crowd": "20:30 左右仍可能有晚間返家旅客，出站步行時間不要忽略。"
  },
  "銀座一丁目駅|日本橋駅 東京": {
    "summary": "銀座一丁目站／商圈 → 步行到銀座線「銀座站」（不同車站）→ 銀座線往淺草方向至日本橋站；商店位置靠近東京站時可直接步行。",
    "steps": [
      "從銀座商圈步行到東京 Metro 銀座線『銀座站』。",
      "搭銀座線往淺草方面至『日本橋站』，再步行逛日本橋與東京站周邊。",
      "若百貨位置已靠近東京站，也可直接步行，未必需要搭車。"
    ],
    "note": "以實際購物區位置決定步行或搭地鐵，沒有必要硬湊一次轉乘。",
    "official": "https://www.tokyometro.jp/station/ginza-itchome/index.html"
  },
  "ホテル花いさわ|さくら温泉通り, 山梨県笛吹市石和町川中島": {
    "summary": "花石和飯店 → 依步行導航前往石和櫻花溫泉通燈飾入口 → 走一段後原路返回；不必走完全線。",
    "steps": [
      "花石和飯店步行往石和溫泉櫻花溫泉通的燈飾區。",
      "到達燈飾路段後只走想看的範圍，再照原路返回飯店。"
    ],
    "note": "活動全線距離較長，不代表需要走完全程；晚間務必注意寒冷與步行距離。",
    "official": "https://www.fuefuki-kanko.jp/scontents/illumination"
  },
  "ホテル花いさわ|イオン石和店": {
    "summary": "花石和飯店 → 步行至 AEON 石和店 → 原路返回；先確認店舖營業時間。",
    "steps": [
      "由花石和飯店步行至 AEON 石和店。",
      "是否前往以晚餐、泡湯與店舖營業時間為先，這是可取消的延伸行程。"
    ],
    "note": "全程步行，不需要安排巴士。"
  },
  "THE HEDISTAR HOTEL NARITA|イオンタウン成田富里": {
    "summary": "THE HEDISTAR 飯店 → 步行約 5 分鐘至 AEON TOWN 成田富里 → 原路回飯店。",
    "steps": [
      "飯店步行約 5 分鐘至 AEON TOWN 成田富里，勿與較遠的 AEON MALL 成田混淆。",
      "商場採買或晚餐後原路步行回飯店。"
    ],
    "note": "最推薦的 Day 4 晚間採買方案。",
    "official": "https://www.aeontown.co.jp/naritatomisato/"
  },
  "THE HEDISTAR HOTEL NARITA|京成成田駅": {
    "summary": "THE HEDISTAR 飯店 → 步行約 13 分鐘至京成成田站商圈 → 晚餐後步行回飯店。",
    "steps": [
      "飯店步行往京成成田站商圈，沿途找晚餐店家。",
      "吃完後步行回飯店；若抵達飯店太晚，改去 AEON TOWN 即可。"
    ],
    "note": "飯店到京成成田站約 13 分鐘步行參考，依實際出入口及天氣調整。"
  }
},
 sources:[
   {label:'長榮航空',url:'https://www.evaair.com/zh-tw/index.html'},
   {label:'hotel MONday Premium 豐洲',url:'https://hotel-monday.com/toyosu/'},
   {label:'花石和飯店',url:'https://hana-isawa.com/'},
   {label:'THE HEDISTAR HOTEL NARITA',url:'https://hedistarhotel.com/tw/'},
   {label:'江之島海蠟燭營業資訊',url:'https://enoshima-seacandle.com/opening-hours/'},
   {label:'橫濱紅磚倉庫 2026 聖誕市集',url:'https://www.yokohama-akarenga.jp/christmas/'},
   {label:'石和溫泉 2026–27 燈飾',url:'https://www.fuefuki-kanko.jp/scontents/illumination'},
   {label:'MONday 飯店交通／團體接駁限制',url:'https://hotel-monday.com/toyosu/access/'}
 ],
 flights:[
  {day:1,code:'BR198',from:'桃園國際機場 TPE',to:'成田國際機場 NRT',depart:'08:50',arrive:'12:55',note:'以航空公司與團體最後公告為準'},
  {day:5,code:'BR197',from:'成田國際機場 NRT',to:'桃園國際機場 TPE',depart:'14:00',arrive:'17:05',note:'以航空公司與團體最後公告為準'}
 ],
 hotels:[
  {id:'monday',nights:'12/2–12/3｜連住兩晚',title:'東京豐洲 MONday Premium 飯店',address:'東京都江東區東雲1-2-11',search:'hotel MONday Premium Toyosu, 1-2-11 Shinonome, Tokyo',url:'https://hotel-monday.com/toyosu/',desc:'東雲地區，飯店對面 AEON 食品區全天營業。豐洲站需步行一段距離；免費接駁車官方註明團體預訂不適用，請以步行或當日交通為準。',notes:['大浴場可於晚間使用，實際開放時間請以現場為準','12/3 清晨出發，建議前晚準備早餐、交通卡與暖衣','前台可詢問飯店周邊路線與巴士']},
  {id:'hana',nights:'12/4｜一晚',title:'ホテル花いさわ（花石和）',address:'山梨県笛吹市石和町松本1409',search:'ホテル花いさわ 山梨県笛吹市石和町松本1409',url:'https://hana-isawa.com/',desc:'人資確認的石和溫泉住宿，當晚公司安排會席料理／飯店晚餐。適合溫泉放鬆；家庭貸切湯池須確認團體住宿是否可用。',notes:['泡湯前先確認浴場規範、時間及毛巾提供方式','石和櫻花溫泉通 2026/11/15–2027/1/31 17:00–22:00 點燈','飯店餐敘時間與隔日出發時間依導遊公告']},
  {id:'hedistar',nights:'12/5｜一晚',title:'THE HEDISTAR HOTEL NARITA',address:'千葉県成田市東町168-1',search:'THE HEDISTAR HOTEL NARITA, 168-1 Azumacho, Narita',url:'https://hedistarhotel.com/tw/',desc:'成田市區飯店，步行可到 AEON TOWN 成田富里與成田站方向，適合最後一晚超市採買；隔天既定行程會走新勝寺與表參道。',notes:['整理最後購物行李，液體與免稅品依航空／海關規則','成田山表參道多數觀光商店晚上已休息','12/6 上午公司集合時間仍待旅行社確認']}
 ],
 places:{
  airportTPE:{title:'桃園國際機場',ja:'台湾桃園国際空港',map:'Taiwan Taoyuan International Airport',type:'機場',tips:['依旅行社指定航廈與集合時間報到']},
  airportNRT:{title:'成田國際機場',ja:'成田国際空港',map:'Narita International Airport Japan',type:'機場',tips:['入境及行李時間會影響第一晚行程']},
  meiji:{title:'明治神宮',ja:'明治神宮',map:'明治神宮, 渋谷区, 東京',type:'神社',site:'https://www.meijijingu.or.jp/',hours:'12 月約 06:40–16:00，請以官網公告為準',tips:['團體入境後前往，能參拜就以正殿與參道為重點','冬季天黑早、閉門早，不額外安排明治神宮御苑','大型遊覽車集合地點請以導遊為準']},
  senkyaku:{title:'豐洲千客萬來',ja:'豊洲 千客万来',map:'豊洲 千客万来, 東京都江東区豊洲6-5-1',type:'美食／觀光',site:'https://www.toyosu-senkyakubanrai.jp/',hours:'各店不同，部分商店傍晚休息；8 樓免費足湯須再核對現場開放',tips:['江戶風街景、海鮮小吃與伴手禮','8 樓免費足湯可視團體時間與開放情況體驗','旅行社 Day 1 已安排，晚上不必再特別重遊']},
  ginza:{title:'銀座・GINZA SIX',ja:'銀座 / GINZA SIX',map:'GINZA SIX, 6 Chome-10-1 Ginza, Tokyo',type:'購物',site:'https://ginza6.tokyo/',hours:'多數商店約至 20:30；以當日營業公告為準',tips:['商店結束較早，優先購物再吃飯看燈飾','銀座一丁目／有樂町線回豐洲較便利','想快速逛百貨可集中 GINZA SIX 或銀座三越']},
  marunouchi:{title:'丸之內仲通／東京車站',ja:'丸の内仲通り・東京駅',map:'丸の内仲通り, 東京都千代田区',type:'燈飾／夜景',site:'https://www.marunouchi.com/',hours:'冬季燈飾以 2026 官方當日公告為準',tips:['傍晚之後欣賞燈飾與東京站丸之內站房','KITTE 聖誕布置可視活動與營業時間順遊','回飯店可步行至有樂町站搭有樂町線']},
  lalaport:{title:'LaLaport 豐洲',ja:'アーバンドック ららぽーと豊洲',map:'アーバンドック ららぽーと豊洲',type:'購物／海景',site:'https://mitsui-shopping-park.com/lalaport/toyosu/',hours:'商店多至 21:00，餐廳依店家不同',tips:['大型商場、日用品、餐廳與港灣散步','晚到時比跨城前往銀座更省力']},
  ariake:{title:'有明 Garden',ja:'有明ガーデン',map:'有明ガーデン, 江東区有明2-1-8',type:'購物／燈飾',site:'https://www.shopping-sumitomo-rd.com/ariake/shopping',hours:'專門店常見至 21:00，活動點燈請確認 2026 官方資訊',tips:['適合冬季夜晚逛大型商場與戶外燈飾','從東雲周邊可利用電車或短程計程車，不保證步行最省時']},
  aeonToyosu:{title:'AEON 東雲',ja:'イオン東雲店',map:'イオン東雲店, 東京都江東区東雲1-9-10',type:'超市',site:'https://www.aeon.com/',hours:'食品區 24 小時；其他樓層依店鋪',tips:['飯店附近買早餐、飲料、零食與日用品']},
  hotelMonday:{title:'東京豐洲 MONday 飯店',ja:'hotel MONday Premium TOYOSU',map:'hotel MONday Premium Toyosu, Tokyo',type:'住宿',site:'https://hotel-monday.com/toyosu/',tips:['團體預訂通常不適用飯店免費接駁車']},
  ofuna:{title:'大船站／湘南單軌',ja:'大船駅・湘南モノレール',map:'大船駅, 神奈川県鎌倉市',type:'轉乘',site:'https://www.shonan-monorail.co.jp/',tips:['依車站指示前往湘南單軌月台','懸掛式列車約 14 分鐘至湘南江之島','如 Google Maps 推薦其他快速路線，仍以體驗單軌為優先']},
  shonan:{title:'湘南江之島站',ja:'湘南江の島駅',map:'湘南江の島駅, 藤沢市',type:'鐵道',site:'https://www.shonan-monorail.co.jp/',tips:['單軌終點離江之島海蠟燭仍須較長步行與上坡','先往江之島方向，不等於一下車就到山頂']},
  enoshima:{title:'江之島・海蠟燭',ja:'江の島・江の島シーキャンドル',map:'江の島シーキャンドル, 藤沢市',type:'海景／神社',site:'https://enoshima-seacandle.com/',hours:'海蠟燭通常 09:00 起；Escar 約 08:50 起，請再查營業日',tips:['先逛江島神社、仲見世通，晴天可登海蠟燭望相模灣與富士山','Escar 僅上行，下坡仍需步行，預留階梯與橋樑時間','此次只排白天，不等到夜間燈飾','若陰天能見度差，可略過觀景塔、增加海邊散步']},
  enoden:{title:'江之電海岸線',ja:'江ノ島電鉄・江ノ島駅',map:'江ノ島駅, 藤沢市',type:'特色鐵道',site:'https://www.enoden.co.jp/',tips:['江之島站 → 鎌倉站可看鎌倉高校前、七里濱等經典海景','不必下車追拍平交道；沿途及車站注意交通安全','江之電車站不在島上，須步行過橋回本土']},
  kamakura:{title:'鎌倉小町通',ja:'鎌倉 小町通り',map:'小町通り, 鎌倉市',type:'街道／美食',tips:['從鎌倉站東口走入商店街，以午餐、點心及伴手禮為主','許多商店上午 10–11 點才開始營業','2026 年 1 月實際去過鎌倉小町通，本次可以縮短重遊']},
  yokohamaMall:{title:'港未來・World Porters',ja:'みなとみらい・横浜ワールドポーターズ',map:'横浜ワールドポーターズ, 神奈川県横浜市中区新港2-2-1',type:'購物／港景',site:'https://www.yim.co.jp/',tips:['利用下午逛商場或港灣，不強求跑完所有商場','上次已搭過橫濱纜車，本次以新體驗為主']},
  redbrick:{title:'橫濱紅磚倉庫聖誕市集',ja:'横浜赤レンガ倉庫 クリスマスマーケット',map:'横浜赤レンガ倉庫, 横浜市中区新港1-1',type:'聖誕活動',site:'https://www.yokohama-akarenga.jp/christmas/',hours:'2026/12/3 11:00–21:00；16:00 起點燈；一般票 500 日圓起，另有免費區',tips:['2026 活動 11/20–12/25，傍晚適合看點燈與港灣夜景','可能排隊、限流或部分區域另需門票','上次只是一般紅磚倉庫，這次有實際聖誕活動']},
  kawasaki:{title:'LAZONA 川崎',ja:'ラゾーナ川崎プラザ',map:'ラゾーナ川崎プラザ, 川崎市幸区堀川町72-1',type:'購物',site:'https://mitsui-shopping-park.com/lazona-kawasaki/',hours:'多數商店約至 21:00，依店鋪公告',tips:['上次沒逛完，可集中在想補逛的商店','若橫濱玩太晚就直接取消，不必勉強','要 22:00 前回飯店，建議 20:30 左右離開']},
  shibuya:{title:'澀谷',ja:'渋谷',map:'渋谷駅, 東京',type:'逛街',tips:['年輕品牌、購物中心與街區；屬雨天／市區備案']},
  kichijoji:{title:'吉祥寺',ja:'吉祥寺',map:'吉祥寺駅, 武蔵野市',type:'商店街',tips:['2025 年 9 月實際去過；2026 年 1 月只列備案沒有去','商店街、百貨、井之頭周邊適合慢逛']},
  shimokita:{title:'下北澤',ja:'下北沢',map:'下北沢駅, 世田谷区',type:'街區',tips:['尚未去過；古著、個性小店、咖啡館為主','店面密集但不是大型百貨街，許多商店上午較晚開']},
  nihonbashi:{title:'日本橋／東京站',ja:'日本橋・東京駅',map:'日本橋駅, 中央区 東京',type:'購物',tips:['雨天適合商場與地下街，避開戶外海岸路線']},
  hakone:{title:'箱根神社／蘆之湖',ja:'箱根神社・芦ノ湖',map:'箱根神社, 足柄下郡箱根町',type:'神社／湖景',site:'https://hakonejinja.or.jp/',tips:['旅行社標示蘆之湖平和鳥居「遠觀」，不保證安排湖邊排隊合照','參道與正殿優先，不能自行遠離團體搭船','12 月湖畔風大、氣溫可能偏低']},
  gotemba:{title:'御殿場 Premium Outlets',ja:'御殿場プレミアム・アウトレット',map:'御殿場プレミアム・アウトレット, 静岡県御殿場市深沢1312',type:'Outlet',site:'https://www.premiumoutlets.co.jp/gotemba/',hours:'冬季多為 10:00–19:00，請以官網為準',tips:['大型露天園區，West/East/Hill Side 分區，先決定品牌','團體下車後先拍遊覽車位置與集合時間','午餐與購物同步分配，不必執著走遍全區','晴天可能眺望富士山，戶外需保暖']},
  oshino:{title:'忍野八海',ja:'忍野八海',map:'忍野八海, 山梨県南都留郡忍野村',type:'自然／村落',site:'https://www.vill.oshino.lg.jp/',tips:['2025 年 9 月去過，本次以清泉、小吃及風景重遊','冬季下午光線與天氣影響拍照，跟著集合時間走','不必硬要走遍全部池塘']},
  hotelHana:{title:'花石和溫泉飯店',ja:'ホテル花いさわ',map:'ホテル花いさわ, 山梨県笛吹市石和町松本1409',type:'住宿',site:'https://hana-isawa.com/',tips:['泡溫泉、飯店晚餐，團體旅客的貸切風呂條件需確認']},
  isawaLights:{title:'石和櫻花溫泉通燈飾',ja:'石和温泉郷さくら温泉通りイルミネーション',map:'さくら温泉通り, 山梨県笛吹市石和町川中島',type:'冬季燈飾',site:'https://www.fuefuki-kanko.jp/scontents/illumination',hours:'2026/11/15–2027/1/31，17:00–22:00，免費',tips:['光之步道全程約 3 公里，當晚只逛一小段即可','飯店前往入口可能需要步行一段距離，晚間注意保暖','若團體晚餐延後，先泡湯也完全合理']},
  aeonIsawa:{title:'石和當地 AEON／超市',ja:'イオン石和店',map:'イオン石和店, 山梨県笛吹市',type:'採買',tips:['生活型購物中心，確認當天實際店舖營業時間','此晚優先溫泉與燈飾，逛 AEON 只是備案']},
  chureito:{title:'新倉山淺間公園・忠靈塔',ja:'新倉山浅間公園・忠霊塔',map:'新倉山浅間公園, 富士吉田市',type:'富士山景',site:'https://fujiyoshida.net/',tips:['經典五重塔＋富士山同框的觀景處需爬約 398 階','視氣候及團體時間決定是否登頂','冬季清晨有機會結冰，注意止滑與保暖']},
  asakusa:{title:'淺草寺・雷門・仲見世',ja:'浅草寺・雷門・仲見世通り',map:'浅草寺, 東京都台東区浅草',type:'寺院／商店街',site:'https://www.senso-ji.jp/',tips:['週六人潮較多，雷門拍照與仲見世採買優先','曾多次造訪，重點放小吃與伴手禮即可','公司集合前不要自行延伸到晴空塔']},
  japanOffice:{title:'船井日本公司（車經）',ja:'船井日本公司（車窓見学）',map:null,type:'車經',tips:['旅行社明載車經，不等同可進公司參觀；沒有下車計畫']},
  hotelHedistar:{title:'THE HEDISTAR 成田飯店',ja:'THE HEDISTAR HOTEL NARITA',map:'THE HEDISTAR HOTEL NARITA, 千葉県成田市東町168-1',type:'住宿',site:'https://hedistarhotel.com/tw/',tips:['最後一晚整理行李與退稅品','飯店周邊可步行至 AEON TOWN 成田富里']},
  aeonNarita:{title:'AEON TOWN 成田富里',ja:'イオンタウン成田富里',map:'イオンタウン成田富里, 千葉県成田市東町133',type:'採買',site:'https://www.aeontown.co.jp/naritatomisato/',hours:'一般專門店約 21:00、食品超市約 22:00；以當日營業為準',tips:['從 THE HEDISTAR 飯店步行約 5 分鐘','可買零食、茶、咖哩包、日用品與飲料','與更遠的 AEON MALL 成田是不同商場']},
  keiseiNarita:{title:'京成成田站周邊',ja:'京成成田駅',map:'京成成田駅, 千葉県成田市',type:'用餐',tips:['飯店步行可達，晚上可以找拉麵或其他餐廳','若有公司聚餐或抵達較晚則不用安排']},
  naritasan:{title:'成田山新勝寺',ja:'成田山新勝寺',map:'成田山新勝寺, 千葉県成田市成田1',type:'寺院',site:'https://www.naritasan.or.jp/',tips:['最後一天跟團參拜，注意團體集合時間','觀賞仁王門、主殿、三重塔，時間不足就不延伸其他院落']},
  naritaStreet:{title:'成田山表參道',ja:'成田山表参道',map:'成田山表参道, 千葉県成田市',type:'商店街／美食',tips:['傳統小店、鰻魚飯與日式伴手禮','回程班機 14:00，排隊名店須衡量時間','部分商店開門較晚，依旅行社停留長度選擇']}
 },
 days:[
  {
   number:1,date:'2026-12-02',weekday:'三',region:'東京・豐洲',headline:'抵達東京，走進冬日街景',imageTag:'TOKYO / FIRST NIGHT',hotel:'monday',kind:'公司行程＋晚間自由',meal:'早餐自理｜午餐機上｜晚餐自理',tone:'city',short:'成田・明治神宮・豐洲千客萬來',
   keypoints:['明治神宮 12 月約 16:00 關門，團體行程較緊湊','飯店預估 17:30–18:30 抵達，不代表旅行社承諾','晚上購物必須先於戶外燈飾'],
   fixed:[
     item('08:50','長榮 BR198｜桃園起飛','airportTPE','flight','前往日本，團體集合與報到時間依旅行社通知。',{status:'confirmed',duration:'約 3 小時飛行'}),
     item('12:55','成田機場預計抵達','airportNRT','flight','入境、提領行李後，搭公司遊覽車前往東京。',{status:'confirmed',duration:'入境／巴士時間未定'}),
     item('下午','明治神宮','meiji','tour','參道、鳥居、正殿參拜。12 月閉門時間早，依導遊帶領參觀。',{status:'planned'}),
     item('下午～傍晚','豐洲千客萬來','senkyaku','tour','江戶風美食街、海鮮小吃；若停留夠久再考慮 8 樓免費足湯。',{status:'planned'}),
     item('傍晚｜待定','入住豐洲飯店','hotelMonday','hotel','實際完成入住時刻，將決定今晚採用銀座或近郊備案。',{status:'planned'})
   ]
  },
  {
   number:2,date:'2026-12-03',weekday:'四',region:'湘南・鎌倉・橫濱',headline:'搭上湘南列車，追著海走',imageTag:'SHONAN / YOUR OWN ROUTE',hotel:'monday',kind:'夫妻全天自由行',meal:'早餐可前晚採買｜午晚餐自理',tone:'sea',short:'湘南單軌・江之島・江之電・橫濱',
   keypoints:['清晨約 06:15 出發，減少與主要通勤尖峰重疊','江之島只排白天，不等夜間燈飾','橫濱紅磚倉庫 2026/12/3 16:00 起點燈','目標 22:00 前回飯店，川崎可隨時取消'],
   fixed:[item('全天','不參加迪士尼｜夫妻自行移動',null,'self','當天沒有參加公司的迪士尼或市區帶團方案；請事先確認退款及集合規範。',{status:'confirmed'})]
  },
  {
   number:3,date:'2026-12-04',weekday:'五',region:'箱根・御殿場・石和',headline:'富士山麓的湖景與溫泉',imageTag:'HAKONE / MOUNT FUJI',hotel:'hana',kind:'公司團體行程＋飯店夜遊',meal:'早餐飯店｜午餐 Outlet 自理｜晚餐飯店宴席',tone:'mountain',short:'箱根神社・御殿場 Outlet・忍野八海',
   keypoints:['團體車經多地，所有景點時間與順序仍依旅行社公告','箱根湖上平和鳥居在簡章標示「遠觀」','御殿場園區很大，先找品牌與集合地點','石和溫泉 2026 冬季燈飾有官方活動公告'],
   fixed:[
    item('早上｜待定','豐洲飯店早餐、搭車出發','hotelMonday','hotel','跟隨團體出發；出發時刻待旅行社公告。',{status:'planned'}),
    item('上午｜待定','箱根神社與蘆之湖','hakone','tour','神社參拜、湖畔與平和鳥居遠觀。',{status:'planned'}),
    item('中午～下午｜待定','御殿場 Premium Outlets','gotemba','tour','戶外暢貨購物園區；午餐於 Outlet 自理。',{status:'planned'}),
    item('下午｜待定','忍野八海','oshino','tour','富士山湧泉聚落散步、池水風景及小吃。',{status:'planned'}),
    item('晚上｜待定','花石和入住＋公司晚餐','hotelHana','hotel','人資確認入住「花石和」，晚間可泡湯休息。',{status:'planned'})
   ],
   evening:[
    item('晚餐後｜彈性','石和櫻花溫泉通燈飾','isawaLights','bonus','2026/11/15–2027/1/31，17:00–22:00 免費點燈。走一小段即可，不必全程。',{origin:'ホテル花いさわ',destination:'さくら温泉通り, 山梨県笛吹市石和町川中島',mode:'walking',status:'estimate'}),
    item('回飯店後','花石和溫泉放鬆','hotelHana','bonus','大浴場／露天溫泉。若想預約貸切風呂，先向飯店確認團體住房條件。',{status:'planned'}),
    item('有餘裕再去','石和在地 AEON','aeonIsawa','bonus','當地 AEON 採買屬可取消的延伸活動，優先度低於溫泉。',{origin:'ホテル花いさわ',destination:'イオン石和店',mode:'walking',status:'estimate'})
   ]
  },
  {
   number:4,date:'2026-12-05',weekday:'六',region:'富士吉田・淺草・成田',headline:'富士五重塔與東京下町',imageTag:'FUJI / OLD TOKYO',hotel:'hedistar',kind:'公司團體行程＋夜間採買',meal:'早餐飯店｜午餐公司安排燒肉放題｜晚餐自理',tone:'temple',short:'忠靈塔・淺草・成田',
   keypoints:['忠靈塔展望視角約需走 398 階，冬季注意結冰與時間','船井日本公司為車經，不代表可下車參訪','淺草星期六可能擁擠，勿遠離集合點','成田飯店附近 AEON TOWN 可作最後採買'],
   fixed:[
    item('早上｜待定','溫泉飯店早餐／搭車','hotelHana','hotel','早餐後整理行李、搭乘團體遊覽車。',{status:'planned'}),
    item('上午｜待定','新倉山淺間公園・忠靈塔','chureito','tour','晴天可欣賞富士山與五重塔同框；視體力爬坡及約 398 階樓梯。',{status:'planned'}),
    item('車程中','船井日本公司（車經）','japanOffice','coach','旅行社註記為車經，沒有正式參訪承諾。',{status:'planned'}),
    item('中午｜待定','團體安排燒肉放題',null,'meal','旅行社簡章標示日式燒肉放題與軟飲，菜色／餐費細節待確認。',{status:'planned'}),
    item('下午｜待定','淺草寺・雷門・仲見世','asakusa','tour','下町老街、小吃、伴手禮；導遊集合地點與停留時間待公告。',{status:'planned'}),
    item('晚上｜待定','入住 THE HEDISTAR 成田','hotelHedistar','hotel','飯店到附近 AEON TOWN 步行可達；晚餐自理。',{status:'planned'})
   ],
   evening:[
    item('晚間｜優先','AEON TOWN 成田富里','aeonNarita','bonus','距飯店步行約 5 分鐘；超市與生活雜貨很適合最後採買。',{origin:'THE HEDISTAR HOTEL NARITA',destination:'イオンタウン成田富里',mode:'walking',status:'estimate'}),
    item('有精神再去','京成成田站附近晚餐','keiseiNarita','bonus','可找拉麵、壽司或街邊餐廳；若抵達較晚就直接在 AEON 用餐。',{origin:'THE HEDISTAR HOTEL NARITA',destination:'京成成田駅',mode:'walking',status:'estimate'})
   ]
  },
  {
   number:5,date:'2026-12-06',weekday:'日',region:'成田・返台',headline:'在成田老街，為旅程收尾',imageTag:'NARITA / HOMEBOUND',hotel:null,kind:'公司團體行程',meal:'早餐飯店｜午餐機場可用餐費依旅行社說明｜晚餐自理',tone:'home',short:'成田山新勝寺・表參道・返台',
   keypoints:['BR197 預定 14:00 起飛，成田散步不可拖延','成田老街以參拜與伴手禮為主，鰻魚飯排隊可能耗時','機場集合與報到時間由旅行社最終通知'],
   fixed:[
    item('早上｜待定','飯店早餐、退房','hotelHedistar','hotel','確認護照、現金、伴手禮及行李後，隨公司出發。',{status:'planned'}),
    item('上午｜待定','成田山新勝寺','naritasan','tour','主殿參拜、傳統佛寺建築。',{status:'planned'}),
    item('上午｜待定','成田山表參道','naritaStreet','tour','鰻魚飯、日式點心、伴手禮；依集合時間決定停留。',{status:'planned'}),
    item('報到｜待定','前往成田機場','airportNRT','coach','公司遊覽車接駁並辦理國際線報到。',{status:'planned'}),
    item('14:00','長榮 BR197｜成田起飛','airportNRT','flight','回程航班預訂時間，依航空公司公告為準。',{status:'confirmed'}),
    item('17:05','抵達桃園機場','airportTPE','flight','返抵台灣；後續團體接駁依旅行社安排。',{status:'confirmed'})
   ]
  }
 ],
 plans:{
  1:[
   option('A','銀座＋丸之內','百貨購物先行，晚點欣賞冬季燈飾',[
    item('18:00–18:35','飯店出發 → 銀座','ginza','transit','豐洲站搭有樂町線往銀座一丁目；先確認實際入住時間。',{origin:'hotel MONday Premium TOYOSU',destination:'銀座一丁目駅',status:'estimate',duration:'約 25–35 分'}),
    item('18:35–20:00','銀座百貨與晚餐','ginza','self','優先逛百貨與品牌店；晚到時改以晚餐為主。',{status:'estimate'}),
    item('20:00–21:20','丸之內燈飾／東京車站','marunouchi','self','由銀座步行往丸之內仲通，欣賞燈飾與 KITTE／東京站夜景；先確認距離與商店關門時間。',{origin:'銀座一丁目駅',destination:'丸の内仲通り',mode:'walking',status:'estimate'}),
    item('21:20–22:00','返回豐洲飯店','hotelMonday','transit','有樂町（Y18）搭有樂町線往新木場至豐洲（Y22），再步行回飯店。',{origin:'有楽町駅',destination:'hotel MONday Premium TOYOSU',status:'estimate'})
   ],'建議飯店約 18:00 前辦完入住；若延遲，改選 B／C。'),
   option('B','LaLaport 豐洲','近距離購物＋海邊走走',[
    item('18:30 前後','飯店 → LaLaport 豐洲','lalaport','transit','以步行為優先；如時間太晚或天氣不佳，可改飯店周邊採買。',{origin:'hotel MONday Premium TOYOSU',destination:'アーバンドック ららぽーと豊洲',mode:'walking',status:'estimate'}),
    item('18:45–20:30','商場、餐廳與日用品','lalaport','self','挑有興趣店家慢慢逛，商店通常至 21:00。',{status:'estimate'}),
    item('20:30–21:30','晚餐＋港灣夜景','lalaport','self','天氣太冷可取消海邊散步。',{status:'estimate'}),
    item('21:30 後','返回飯店／AEON','aeonToyosu','self','從 LaLaport 步行回飯店，順路買隔天的早餐與飲料。',{origin:'アーバンドック ららぽーと豊洲',destination:'hotel MONday Premium TOYOSU',mode:'walking',status:'estimate'})
   ],'較少轉乘，適合中度疲累或時間不夠跑銀座。'),
   option('C','有明 Garden','大型商場＋冬季燈飾',[
    item('18:15–18:45','飯店 → 有明 Garden','ariake','transit','以步行到車站及鐵道為優先，先查實際轉乘；若抵達太晚可改逛豐洲或休息。',{origin:'hotel MONday Premium TOYOSU',destination:'有明ガーデン',status:'estimate'}),
    item('18:45–20:45','逛街、晚餐','ariake','self','商場與餐飲；冬季燈飾依官方公告與天候。',{status:'estimate'}),
    item('20:45–21:30','燈飾＋回飯店','ariake','self','回國際展示場站搭臨海線往新木場方向至東雲，或視天氣直接步行回飯店。',{origin:'有明ガーデン',destination:'hotel MONday Premium TOYOSU',status:'estimate'})
   ],'適合抵達較晚、想體驗新商場與燈飾。'),
   option('D','輕鬆休息','飯店附近採買、早點睡',[
    item('入住後','晚餐／飯店周邊','aeonToyosu','self','步行到飯店對面的 AEON 東雲採買與用餐，晚上注意路口。',{origin:'hotel MONday Premium TOYOSU',destination:'イオン東雲店',mode:'walking',status:'estimate'}),
    item('晚間','回飯店休息','hotelMonday','hotel','隔天清晨約 06:15 出發，提前整理好背包。',{status:'estimate'})
   ],'適合晚間 19:30 後才完成入住或旅途疲倦。')
  ],
  2:[
   option('A','湘南完整版＋川崎','雙特色鐵道・海景・小町通・橫濱・購物',[
    item('06:15–07:50','飯店 → 東雲 → 大崎 → 大船','ofuna','transit','飯店先步行至東雲站（R02），臨海線往大崎（R08）轉湘南新宿線至大船；實際班次與轉乘時間待核。',{origin:'hotel MONday Premium TOYOSU',destination:'大船駅',status:'estimate'}),
    item('07:50–08:20','湘南單軌 → 湘南江之島','shonan','transit','搭懸掛式湘南單軌約 14 分鐘；含候車緩衝。',{origin:'大船駅 湘南モノレール',destination:'湘南江の島駅',status:'estimate'}),
    item('08:20–10:45','江之島神社・海蠟燭','enoshima','self','湘南江之島站至海蠟燭官方步行約 26 分鐘，還須算排隊、Escar 上山與走回江之電江之島站；行程較緊湊。',{status:'estimate'}),
    item('10:45–11:30','江之電 江之島 → 鎌倉','enoden','transit','先走回江之電江之島站，再搭沿海段往鎌倉；中途不下車。',{origin:'江ノ島駅',destination:'鎌倉駅',status:'estimate'}),
    item('11:30–13:00','鎌倉小町通午餐','kamakura','self','逛商店街、選兩三家美食，較不趕。',{status:'estimate'}),
    item('13:00–14:30','鎌倉 → 橫濱港未來','yokohamaMall','transit','鎌倉站搭 JR 橫須賀線往橫濱，再轉港未來區域交通。',{origin:'鎌倉駅',destination:'横浜ワールドポーターズ',status:'estimate'}),
    item('14:30–16:00','港未來商場／港景','yokohamaMall','self','World Porters 與港灣短逛，不再排纜車或樂園。',{status:'estimate'}),
    item('16:00–18:00','紅磚倉庫聖誕市集','redbrick','self','16:00 點燈，逛攤位、吃德式餐點、港灣拍照。',{origin:'横浜ワールドポーターズ',destination:'横浜赤レンガ倉庫',mode:'walking',status:'estimate'}),
    item('18:00–19:00','橫濱 → 川崎','kawasaki','transit','步行至車站、搭 JR 到川崎，實際路線看 Google Maps。',{origin:'横浜赤レンガ倉庫',destination:'ラゾーナ川崎プラザ',status:'estimate'}),
    item('19:00–20:30','LAZONA 補逛','kawasaki','self','集中在上次沒逛到的區域；體力不夠就取消。',{status:'estimate'}),
    item('20:30–22:00','川崎 → 豐洲飯店','hotelMonday','transit','京濱東北線至有樂町轉有樂町線，步行回飯店。20:30 左右離開較有緩衝。',{origin:'川崎駅',destination:'hotel MONday Premium TOYOSU',status:'estimate'})
   ],'步調最豐富、也最容易被排隊與移動時間壓縮；建議旅行當天視狀況轉 B。'),
   option('B','湘南舒適版','保留海景、小町通與橫濱，不強求川崎',[
    item('06:15–07:50','飯店 → 東雲 → 大崎 → 大船','ofuna','transit','步行至東雲（R02）搭臨海線至大崎（R08），轉南下停大船的湘南新宿線；若班次銜接不佳可比較大井町轉 JR。',{origin:'hotel MONday Premium TOYOSU',destination:'大船駅',status:'estimate'}),
    item('07:50–08:20','湘南單軌','shonan','transit','大船 → 湘南江之島，約 14 分鐘特色列車。',{origin:'大船駅 湘南モノレール',destination:'湘南江の島駅',status:'estimate'}),
    item('08:20–11:00','江之島白天海景','enoshima','self','湘南江之島站至海蠟燭官方步行約 26 分鐘，仍須計入跨橋、上坡／Escar、排隊及走回江之電站的時間。',{status:'estimate'}),
    item('11:00–11:45','江之電沿海到鎌倉','enoden','transit','經鎌倉高校前、七里濱，不必下車。',{origin:'江ノ島駅',destination:'鎌倉駅',status:'estimate'}),
    item('11:45–13:30','小町通午餐與購物','kamakura','self','適度重遊鎌倉，不需要趕到每個角落。',{status:'estimate'}),
    item('13:30–15:00','鎌倉 → 橫濱','yokohamaMall','transit','交通及步行緩衝。',{origin:'鎌倉駅',destination:'横浜ワールドポーターズ',status:'estimate'}),
    item('15:00–16:30','港未來商場與港景','yokohamaMall','self','有興趣就多逛一會兒，天氣差可轉室內。',{status:'estimate'}),
    item('16:30–19:30','紅磚倉庫聖誕市集','redbrick','self','傍晚點燈、享受冬季限定活動與晚餐。',{origin:'横浜ワールドポーターズ',destination:'横浜赤レンガ倉庫',mode:'walking',status:'estimate'}),
    item('19:30–21:30','橫濱 → 豐洲飯店','hotelMonday','transit','從港未來往東京，預留足夠候車與步行時間。',{origin:'横浜赤レンガ倉庫',destination:'hotel MONday Premium TOYOSU',status:'estimate'})
   ],'目前建議預設方案：最能兼顧體驗與旅行品質。'),
   option('C','江之島延長版','放慢海景腳步；鎌倉只搭江之電通過',[
    item('06:15–07:50','飯店 → 東雲 → 大崎 → 大船','ofuna','transit','與 A／B 共用鐵道主線；在大船再換指定的湘南單軌。',{origin:'hotel MONday Premium TOYOSU',destination:'大船駅',status:'estimate'}),
    item('07:50–08:20','湘南單軌 → 湘南江之島','shonan','transit','從 JR 大船站走至湘南單軌站，搭指定的湘南單軌到湘南江之島。',{origin:'大船駅 湘南モノレール',destination:'湘南江の島駅',status:'estimate'}),
    item('08:20–12:00','江之島深度散步','enoshima','self','預留湘南江之島站到海蠟燭約 26 分鐘步行及回江之電站時間，再安排神社、午餐與海景。',{status:'estimate'}),
    item('12:00–13:00','江之電到鎌倉站','enoden','transit','體驗沿海段，在鎌倉轉 JR，不另逛小町通。',{origin:'江ノ島駅',destination:'鎌倉駅',status:'estimate'}),
    item('13:00–14:30','鎌倉 → 橫濱','yokohamaMall','transit','轉 JR 抵達港未來。',{origin:'鎌倉駅',destination:'横浜ワールドポーターズ',status:'estimate'}),
    item('14:30–16:30','橫濱商場、港景','yokohamaMall','self','下午商場購物、散步。',{status:'estimate'}),
    item('16:30–19:45','紅磚倉庫聖誕市集','redbrick','self','看點燈、吃晚餐後直接返回東京。',{origin:'横浜ワールドポーターズ',destination:'横浜赤レンガ倉庫',mode:'walking',status:'estimate'}),
    item('19:45–21:45','返回豐洲','hotelMonday','transit','不排川崎、澀谷。',{origin:'横浜赤レンガ倉庫',destination:'hotel MONday Premium TOYOSU',status:'estimate'})
   ],'若江之島很喜歡、或海蠟燭排隊較久，選這版最不會急。'),
   option('D','雨天室內購物','東京市區主軸，不強求海邊景色',[
    item('09:00–09:30','飯店 → 銀座','ginza','transit','飯店步行至豐洲站（Y22），有樂町線往和光市方向搭至銀座一丁目（Y19）。',{origin:'hotel MONday Premium TOYOSU',destination:'銀座一丁目駅',status:'estimate'}),
    item('09:30–11:45','銀座百貨與咖啡','ginza','self','雨天不急著六點出門；商店開門後再逛。',{status:'estimate'}),
    item('11:45–12:15','銀座 → 日本橋','nihonbashi','transit','依購物點位置，從銀座站搭銀座線往淺草至日本橋，或步行前往。',{origin:'銀座一丁目駅',destination:'日本橋駅 東京',status:'estimate'}),
    item('12:15–15:00','日本橋與東京車站周邊','nihonbashi','self','地下街、商場、午餐、伴手禮。',{status:'estimate'}),
    item('15:00–18:00','川崎 LAZONA','kawasaki','transit','室內購物、重遊想逛的區域。',{origin:'東京駅',destination:'川崎駅',status:'estimate'}),
    item('18:00–20:30','晚餐／回豐洲','hotelMonday','transit','可選擇多留在川崎或直接返回豐洲。',{origin:'川崎駅',destination:'hotel MONday Premium TOYOSU',status:'estimate'})
   ],'明顯下雨、海風太強或能見度很差時使用。'),
   option('E','東京街區散策','吉祥寺＋下北澤＋澀谷',[
    item('09:00–10:30','豐洲 → 吉祥寺','kichijoji','transit','上午先從飯店搭電車前往吉祥寺。',{origin:'hotel MONday Premium TOYOSU',destination:'吉祥寺駅',status:'estimate'}),
    item('10:30–13:30','吉祥寺慢逛','kichijoji','self','商店街、百貨、午餐，可彌補以前趕路的感覺。',{status:'estimate'}),
    item('13:30–14:00','井之頭線 → 下北澤','shimokita','transit','搭京王井之頭線直接前往。',{origin:'吉祥寺駅',destination:'下北沢駅',status:'estimate'}),
    item('14:00–17:30','下北澤小店與咖啡','shimokita','self','古著、雜貨、咖啡館，依興趣縮放時間。',{status:'estimate'}),
    item('17:30–18:00','井之頭線 → 澀谷','shibuya','transit','搭京王井之頭線前往澀谷。',{origin:'下北沢駅',destination:'渋谷駅',status:'estimate'}),
    item('18:00–20:30','澀谷晚餐與購物','shibuya','self','以商場及夜間街區為主。',{status:'estimate'}),
    item('20:30–22:00','澀谷 → 豐洲','hotelMonday','transit','預留轉乘與步行時間。',{origin:'渋谷駅',destination:'hotel MONday Premium TOYOSU',status:'estimate'})
   ],'不去湘南的整日替代方案；吉祥寺 2025 年去過、2026 年 1 月未去。')
  ]
 },
 check:[
  {id:'grp-time',label:'旅行社提供 Day 1 及 Day 3–5 各站停留／集合時間',type:'待確認'},
  {id:'hotel',label:'再次確認花石和與成田飯店的團體實際住房及房型',type:'待確認'},
  {id:'refund',label:'不參加迪士尼的登記與退款金額',type:'待確認'},
  {id:'rail',label:'12/3 大船、湘南單軌與江之電當日實際班次',type:'行前再查'},
  {id:'market',label:'聖誕市集入場方式、當日票價及排隊資訊',type:'行前再查'},
  {id:'sunny',label:'12/3 湘南天氣、海蠟燭開放與風勢',type:'行前再查'},
  {id:'onsen',label:'花石和團體住房能否使用貸切家族風呂',type:'待確認'},
  {id:'narita',label:'12/6 機場集合／報到時刻與行李規則',type:'待確認'}
 ]
};