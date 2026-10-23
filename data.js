// 行程唯一資料來源：只需在此修改公司時間、景點與自由行方案。
// 所有時間均為日本當地時間 JST (UTC+9)。
// status: confirmed = 航班/指定住宿或官方活動已確認；planned = 旅行社既定但集合時間待定；estimate = 自助預估。
const item = (at, title, place, kind, desc, options = {}) => ({ at,title,place,kind,desc,...options });
const option = (id,name,subtitle,events,note) => ({id,name,subtitle,events,note});

export const guide = {
 version:'2026.10.23-07', verified:'2026-10-23', timezone:'Asia/Tokyo',
 tripStart:'2026-12-02', tripEnd:'2026-12-06', title:'東京・湘南・富士 五日',
 subTitle:'2026 日本員工旅遊｜夫妻自由行互動手冊',
 intro:'五天有公司安排的風景，也有兩個人自己決定的旅行。把當下需要的資訊，留在最容易找到的位置。',
 warning:'旅行社可能調整路線及集合時間；網站內的自由行時刻是規劃參考。電車班次、天氣、營業狀態請於旅行當天再次確認。',
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
    item('晚餐後｜彈性','石和櫻花溫泉通燈飾','isawaLights','bonus','2026/11/15–2027/1/31，17:00–22:00 免費點燈。走一小段即可，不必全程。',{status:'confirmed'}),
    item('回飯店後','花石和溫泉放鬆','hotelHana','bonus','大浴場／露天溫泉。若想預約貸切風呂，先向飯店確認團體住房條件。',{status:'planned'}),
    item('有餘裕再去','石和在地 AEON','aeonIsawa','bonus','當地生活商場與超市採買，優先度低於溫泉。',{status:'estimate'})
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
    item('晚間｜優先','AEON TOWN 成田富里','aeonNarita','bonus','距飯店步行約 5 分鐘；超市與生活雜貨很適合最後採買。',{status:'estimate'}),
    item('有精神再去','京成成田站附近晚餐','keiseiNarita','bonus','可找拉麵、壽司或街邊餐廳；若抵達較晚就直接在 AEON 用餐。',{status:'estimate'})
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
    item('20:00–21:20','丸之內燈飾／東京車站','marunouchi','self','沿仲通漫步、KITTE／東京站夜景彈性順遊。',{status:'estimate'}),
    item('21:20–22:00','返回豐洲飯店','hotelMonday','transit','由有樂町站搭有樂町線回豐洲，步行回飯店。',{origin:'有楽町駅',destination:'豊洲駅',status:'estimate'})
   ],'建議飯店約 18:00 前辦完入住；若延遲，改選 B／C。'),
   option('B','LaLaport 豐洲','近距離購物＋海邊走走',[
    item('18:30 前後','飯店 → LaLaport 豐洲','lalaport','transit','步行或依現場天氣選擇短程交通。',{origin:'hotel MONday Premium TOYOSU',destination:'アーバンドック ららぽーと豊洲',status:'estimate'}),
    item('18:45–20:30','商場、餐廳與日用品','lalaport','self','挑有興趣店家慢慢逛，商店通常至 21:00。',{status:'estimate'}),
    item('20:30–21:30','晚餐＋港灣夜景','lalaport','self','天氣太冷可取消海邊散步。',{status:'estimate'}),
    item('21:30 後','返回飯店／AEON','aeonToyosu','self','順路買第二天早起需要的早餐與飲料。',{status:'estimate'})
   ],'較少轉乘，適合中度疲累或時間不夠跑銀座。'),
   option('C','有明 Garden','大型商場＋冬季燈飾',[
    item('18:15–18:45','飯店 → 有明 Garden','ariake','transit','電車或短程計程車；出發前查現場交通。',{origin:'hotel MONday Premium TOYOSU',destination:'有明ガーデン',status:'estimate'}),
    item('18:45–20:45','逛街、晚餐','ariake','self','商場與餐飲；冬季燈飾依官方公告與天候。',{status:'estimate'}),
    item('20:45–21:30','燈飾＋回飯店','ariake','self','不必特別跑遠，提早休息準備隔天。',{status:'estimate'})
   ],'適合抵達較晚、想體驗新商場與燈飾。'),
   option('D','輕鬆休息','飯店附近採買、早點睡',[
    item('入住後','晚餐／飯店周邊','aeonToyosu','self','飯店附近簡單吃飯、採買。',{status:'estimate'}),
    item('晚間','回飯店休息','hotelMonday','hotel','隔天清晨約 06:15 出發，提前整理好背包。',{status:'estimate'})
   ],'適合晚間 19:30 後才完成入住或旅途疲倦。')
  ],
  2:[
   option('A','湘南完整版＋川崎','雙特色鐵道・海景・小町通・橫濱・購物',[
    item('06:15–07:50','豐洲 → 大船','ofuna','transit','飯店步行至豐洲站，有樂町線至有樂町／JR 轉乘到大船。早出發減少尖峰擁擠。',{origin:'hotel MONday Premium TOYOSU',destination:'大船駅',status:'estimate'}),
    item('07:50–08:20','湘南單軌 → 湘南江之島','shonan','transit','搭懸掛式湘南單軌約 14 分鐘；含候車緩衝。',{origin:'大船駅 湘南モノレール',destination:'湘南江の島駅',status:'estimate'}),
    item('08:20–10:45','江之島神社・海蠟燭','enoshima','self','步行上島、神社、白天觀景塔；09:00 才開始登塔。行程緊湊，需控制停留。',{status:'estimate'}),
    item('10:45–11:30','江之電 江之島 → 鎌倉','enoden','transit','先走回江之電江之島站，再搭沿海段往鎌倉；中途不下車。',{origin:'江ノ島駅',destination:'鎌倉駅',status:'estimate'}),
    item('11:30–13:00','鎌倉小町通午餐','kamakura','self','逛商店街、選兩三家美食，較不趕。',{status:'estimate'}),
    item('13:00–14:30','鎌倉 → 橫濱港未來','yokohamaMall','transit','鎌倉站搭 JR 橫須賀線往橫濱，再轉港未來區域交通。',{origin:'鎌倉駅',destination:'横浜ワールドポーターズ',status:'estimate'}),
    item('14:30–16:00','港未來商場／港景','yokohamaMall','self','World Porters 與港灣短逛，不再排纜車或樂園。',{status:'estimate'}),
    item('16:00–18:00','紅磚倉庫聖誕市集','redbrick','self','16:00 點燈，逛攤位、吃德式餐點、港灣拍照。',{status:'estimate'}),
    item('18:00–19:00','橫濱 → 川崎','kawasaki','transit','步行至車站、搭 JR 到川崎，實際路線看 Google Maps。',{origin:'横浜赤レンガ倉庫',destination:'ラゾーナ川崎プラザ',status:'estimate'}),
    item('19:00–20:30','LAZONA 補逛','kawasaki','self','集中在上次沒逛到的區域；體力不夠就取消。',{status:'estimate'}),
    item('20:30–22:00','川崎 → 豐洲飯店','hotelMonday','transit','京濱東北線至有樂町轉有樂町線，步行回飯店。20:30 左右離開較有緩衝。',{origin:'川崎駅',destination:'hotel MONday Premium TOYOSU',status:'estimate'})
   ],'步調最豐富、也最容易被排隊與移動時間壓縮；建議旅行當天視狀況轉 B。'),
   option('B','湘南舒適版','保留海景、小町通與橫濱，不強求川崎',[
    item('06:15–07:50','豐洲 → 大船','ofuna','transit','飯店步行到豐洲站，早起走 JR 東海道線到大船。',{origin:'hotel MONday Premium TOYOSU',destination:'大船駅',status:'estimate'}),
    item('07:50–08:20','湘南單軌','shonan','transit','大船 → 湘南江之島，約 14 分鐘特色列車。',{origin:'大船駅 湘南モノレール',destination:'湘南江の島駅',status:'estimate'}),
    item('08:20–11:00','江之島白天海景','enoshima','self','參拜、仲見世通、Escar 上山與海蠟燭。',{status:'estimate'}),
    item('11:00–11:45','江之電沿海到鎌倉','enoden','transit','經鎌倉高校前、七里濱，不必下車。',{origin:'江ノ島駅',destination:'鎌倉駅',status:'estimate'}),
    item('11:45–13:30','小町通午餐與購物','kamakura','self','適度重遊鎌倉，不需要趕到每個角落。',{status:'estimate'}),
    item('13:30–15:00','鎌倉 → 橫濱','yokohamaMall','transit','交通及步行緩衝。',{origin:'鎌倉駅',destination:'横浜ワールドポーターズ',status:'estimate'}),
    item('15:00–16:30','港未來商場與港景','yokohamaMall','self','有興趣就多逛一會兒，天氣差可轉室內。',{status:'estimate'}),
    item('16:30–19:30','紅磚倉庫聖誕市集','redbrick','self','傍晚點燈、享受冬季限定活動與晚餐。',{status:'estimate'}),
    item('19:30–21:30','橫濱 → 豐洲飯店','hotelMonday','transit','從港未來往東京，預留足夠候車與步行時間。',{origin:'横浜赤レンガ倉庫',destination:'hotel MONday Premium TOYOSU',status:'estimate'})
   ],'目前建議預設方案：最能兼顧體驗與旅行品質。'),
   option('C','江之島延長版','放慢海景腳步；鎌倉只搭江之電通過',[
    item('06:15–08:20','飯店 → 大船 → 湘南單軌','shonan','transit','早出發，搭湘南單軌到江之島。',{origin:'hotel MONday Premium TOYOSU',destination:'湘南江の島駅',status:'estimate'}),
    item('08:20–12:00','江之島深度散步','enoshima','self','海蠟燭、神社、午餐與海景；不排夜間。',{status:'estimate'}),
    item('12:00–13:00','江之電到鎌倉站','enoden','transit','體驗沿海段，在鎌倉轉 JR，不另逛小町通。',{origin:'江ノ島駅',destination:'鎌倉駅',status:'estimate'}),
    item('13:00–14:30','鎌倉 → 橫濱','yokohamaMall','transit','轉 JR 抵達港未來。',{origin:'鎌倉駅',destination:'横浜ワールドポーターズ',status:'estimate'}),
    item('14:30–16:30','橫濱商場、港景','yokohamaMall','self','下午商場購物、散步。',{status:'estimate'}),
    item('16:30–19:45','紅磚倉庫聖誕市集','redbrick','self','看點燈、吃晚餐後直接返回東京。',{status:'estimate'}),
    item('19:45–21:45','返回豐洲','hotelMonday','transit','不排川崎、澀谷。',{origin:'横浜赤レンガ倉庫',destination:'hotel MONday Premium TOYOSU',status:'estimate'})
   ],'若江之島很喜歡、或海蠟燭排隊較久，選這版最不會急。'),
   option('D','雨天室內購物','東京市區主軸，不強求海邊景色',[
    item('09:30–11:45','銀座百貨與咖啡','ginza','self','雨天不急著六點出門；商店開門後再逛。',{status:'estimate'}),
    item('12:00–15:00','日本橋與東京車站周邊','nihonbashi','self','地下街、商場、午餐、伴手禮。',{status:'estimate'}),
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