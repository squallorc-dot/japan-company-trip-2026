import {guide} from './data.js?v=20261024-13';
import {scenes,dayScenes,overviewScenes,inspirations} from './media.js?v=20261024-13';

const qs = new URLSearchParams(location.search);
const stored = (key, fallback) => { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } };
const save = (key, value) => { try { localStorage.setItem(key, value); } catch { /* private browsing */ } };
const storedJSON = (key, fallback={}) => { try { return JSON.parse(stored(key, '{}')) ?? fallback; } catch { return fallback; } };
const jstDate = () => new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const todayNumber = () => guide.days.find(d => d.date === jstDate())?.number ?? null;
const initialDay = Math.max(1,Math.min(5,Number(qs.get('day')) || todayNumber() || 1));
const state = {
 day:initialDay,
 view:['overview','schedule','routes','info'].includes(qs.get('view'))?qs.get('view'):'schedule',
 plans:{1:qs.get('plan1')||stored('trip-plan1','A'),2:qs.get('plan2')||stored('trip-plan2','B')},
 expanded:new Set(),
 showAll:false,
 updateAvailable:false,
};
const app = document.getElementById('app');
const escapeHtml = text => String(text??'').replace(/[&<>"']/g, a => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[a]));
const enc = encodeURIComponent;
const placeOf = id => guide.places[id]||null;
const currentDay = () => guide.days[state.day-1];
const currentPlan = (day=state.day) => guide.plans[day]?.find(p=>p.id===state.plans[day]) || guide.plans[day]?.[0];
const mapURL = place => place?.map ? `https://www.google.com/maps/search/?api=1&query=${enc(place.map)}` : null;
const routeURL = (origin,destination,mode='transit') => `https://www.google.com/maps/dir/?api=1&origin=${enc(origin)}&destination=${enc(destination)}&travelmode=${mode==='walking'?'walking':'transit'}`;
const travelMode = e => e.mode==='walking'?'walking':'transit';
const travelLabel = e => travelMode(e)==='walking'?'步行導航':'查鐵道／轉乘';
const routeGuide = e => guide.transportGuides?.[e.origin+'|'+e.destination] || null;
const routeSummary = e => routeGuide(e)?.summary || e.desc;
// Complete rail alternatives, station exits and timetables live only in Transport.
// Itinerary shows the travel time/place with a contextual jump.
const routeOverview = (e,view='schedule') => {
 const g=routeGuide(e);
 if(g?.alternatives?.length===2 && g.alternatives.every(alt=>alt.short)) {
   return '<div class="route-pair" aria-label="此路段兩種車站出發方式">'+g.alternatives.map((alt,i)=>
     '<div class="route-pair-option"><b>'+escapeHtml(alt.label)+'</b><p>'+escapeHtml(alt.short)+'</p></div>'
   ).join('')+'<p class="route-pair-note">東雲與豐洲是不同出發車站；依當天班次、轉乘及步行時間選擇。</p></div>';
 }
 return '<p class="'+(view==='schedule'?'event-desc':'route-summary-text')+'">'+escapeHtml(routeSummary(e))+'</p>';
};
const transitDetails = e => {
 const g=routeGuide(e);if(!g)return '';
 const paragraph=(label,val)=>val?'<p><b>'+label+'：</b>'+escapeHtml(val)+'</p>':'';
 return '<details class="transit-guide"><summary>轉乘方向、出口與班次提醒 '+icon('chevron',16)+'</summary><div class="transit-guide-body">'+(g.alternatives?'<div class="route-alternatives">'+g.alternatives.map(alt=>'<section class="route-alternative"><b>'+escapeHtml(alt.label)+'</b><p>'+escapeHtml(alt.note)+'</p><ol>'+alt.steps.map(s=>'<li>'+escapeHtml(s)+'</li>').join('')+'</ol>'+(alt.official?'<a href="'+escapeHtml(alt.official)+'" target="_blank" rel="noopener noreferrer">官方路線資訊 ↗</a>':'')+'</section>').join('')+'</div>':'<ol>'+g.steps.map(s=>'<li>'+escapeHtml(s)+'</li>').join('')+'</ol>')+paragraph('規劃提醒',g.note)+paragraph('最快路線／備案',g.alternative)+paragraph('班距／首末班',g.service)+paragraph('擁擠度參考',g.crowd)+(g.official?'<a href="'+escapeHtml(g.official)+'" target="_blank" rel="noopener noreferrer">查官方車站／時刻資訊 '+icon('external',13)+'</a>':'')+'<small>時刻、月台與末班隨日期變動；以現場看板和官方當日資料為準。Google Maps 可能顯示公車或跳過特色鐵道。</small></div></details>';
};
const planTraits = {
  1:{A:['購物先行','冬夜燈飾'],B:['近郊輕鬆','商場'],C:['有明商場','晚間備案'],D:['最省體力','早點休息']},
  2:{A:['行程豐富','加逛川崎'],B:['推薦預設','步調舒適'],C:['海景慢遊','不逛小町通'],D:['雨天備案','室內購物'],E:['東京街區','咖啡與小店']}
};
const icon = (name,size=20) => {
 const icons={
  home:'<path d="m3 9 9-7 9 7v11a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6z"/>',
  info:'<circle cx="12" cy="12" r="10"/><path d="M12 11v6M12 7h.01"/>',
  pin:'<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  route:'<circle cx="6" cy="19" r="2"/><path d="M9 19h6a5 5 0 0 0 0-10H9a4 4 0 1 1 0-8h9"/><path d="m16 4 3-3 3 3"/>',
  train:'<rect x="5" y="2" width="14" height="17" rx="4"/><path d="M5 11h14M8 22l2-3m6 0 2 3M9 15h.01M15 15h.01"/>',
  arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
  arrowleft:'<path d="M19 12H5m6 6-6-6 6-6"/>',
  external:'<path d="M14 3h7v7m0-7-9 9"/><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/>',
  copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
  check:'<path d="m4 12 5 5L20 6"/>',
  chevron:'<path d="m6 9 6 6 6-6"/>',
  chevrons:'<path d="m6 6 6 6 6-6m-12 6 6 6 6-6"/>',
  close:'<path d="M18 6 6 18M6 6l12 12"/>',
  clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
  moon:'<path d="M20.9 13A9 9 0 0 1 11 3a9 9 0 1 0 9.9 10Z"/>',
  luggage:'<rect x="5" y="7" width="14" height="14" rx="2"/><path d="M9 7V4a3 3 0 0 1 6 0v3M9 21v1m6-1v1"/>',
  plane:'<path d="m22 2-9 20-2-9-9-2Z"/><path d="M22 2 11 13"/>',
  clipboard:'<rect x="5" y="4" width="14" height="18" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M9 12h6m-6 4h6"/>',
  sparkle:'<path d="m12 2 1.8 7 7.2 3-7.2 3L12 22l-1.8-7L3 12l7.2-3Z"/>',
  print:'<path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>',
  wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0m-11 3a5 5 0 0 1 8 0"/><circle cx="12" cy="19" r="1"/>',
  list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  sliders:'<path d="M4 7h9m4 0h3M4 17h3m4 0h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
  bed:'<path d="M3 19V8m18 11V8M3 16h18M5 10h14a2 2 0 0 1 2 2v4H3v-4a2 2 0 0 1 2-2ZM6 7h4v3H6zm8 0h4v3h-4z"/>',
  alert:'<path d="m12 2 10 18H2Z"/><path d="M12 9v4m0 4h.01"/>',
  share:'<path d="M12 16V2m-5 5 5-5 5 5M4 14v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/>'
 };
 return `<svg class="i" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]||icons.pin}</svg>`;
};
const schedule = (d=state.day) => {
 const day = guide.days[d-1];
 const plan = currentPlan(d);
 return [...day.fixed,...(plan?.events||[]),...(day.evening||[])];
};
const typeLabel = t => ({flight:'航班',tour:'公司景點',coach:'遊覽車',hotel:'住宿',self:'自由活動',transit:'電車／移動',bonus:'晚間延伸',meal:'團體餐食'}[t] || '行程');
const statusLabel = status => ({confirmed:'資料已確認',planned:'集合時間待通知',estimate:'參考時間'}[status]||'規劃中');
function todayShortcut(){const n=todayNumber();return !n?'':n===state.day?'<span class="today-indicator">今天</span>':`<button class="button button-outline today-shortcut" data-action="today">${icon('calendar',15)} 回到今天・12/${n+1}</button>`;}
function syncURL(){const u=new URL(location.href);u.searchParams.set('day',state.day);if(guide.plans[state.day])u.searchParams.set('plan'+state.day,state.plans[state.day]);u.searchParams.set('view',state.view);history.replaceState({},'',u);}
const primarySections=[['overview','home','總覽'],['schedule','calendar','行程'],['routes','route','交通'],['info','info','資訊']];
function header(){return `<header class="topbar"><a class="brand" href="./" aria-label="回旅遊手冊首頁"><span class="brand-mark">旅</span><span class="brand-name"><b>日本<span>冬日旅行</span></b><small>2026 · 冬日五天四夜</small></span></a><div class="top-actions"><span class="date-pill">DEC 02—06</span><button class="icon-button" data-action="share" title="分享目前方案" aria-label="分享目前方案">${icon('share',19)}</button></div></header>`;}
function sidebar(){return `<aside class="sidebar"><div class="sidebar-eyebrow">YOUR JOURNEY</div><nav class="desktop-sections" aria-label="網站功能">${primarySections.map(([value,ico,label])=>`<button class="desktop-section ${state.view===value?'active':''}" data-action="view" data-view="${value}" aria-current="${state.view===value?'page':'false'}">${icon(ico,18)}<span>${label}</span></button>`).join('')}</nav><div class="sidebar-title">五日行程</div><div class="day-nav">${guide.days.map(d=>`<button class="day-nav-item ${state.day===d.number?'is-active':''}" data-action="day" data-day="${d.number}" aria-current="${state.day===d.number?'page':'false'}"><span class="day-nav-num">${String(d.number).padStart(2,'0')}</span><span><b>${escapeHtml(d.region)}</b><small>12/${String(d.number+1).padStart(2,'0')}（${d.weekday}）</small></span><span class="nav-indicator"></span></button>`).join('')}</div><div class="sidebar-card"><div class="sidebar-mini">QUICK TIP</div><p>在日本旅行時，打開「今日行程」即可找到當天動線。地鐵班次以 Google Maps 當下查詢為準。</p>${todayNumber()?`<button class="text-link" data-action="today">${icon('calendar',15)} 跳到旅遊當日 ${icon('arrow',14)}</button>`:'<p class="sidebar-trip-note">12/2–12/6 旅行期間可快速回到當日行程。</p>'}</div><div class="sidebar-foot">慢慢走、好好看。<br>用喜歡的步調收集日本。</div></aside>`;}
function bottomNav(){return `<nav class="bottom-nav" aria-label="主要導覽">${primarySections.map(([value,ico,label])=>`<button data-action="view" data-view="${value}" class="${state.view===value?'active':''}" aria-current="${state.view===value?'page':'false'}">${icon(ico,20)}<span>${label}</span></button>`).join('')}</nav>`;}
function dayTabs(){return `<div class="day-tabs" role="tablist" aria-label="切換旅遊日期">${guide.days.map(d=>`<button role="tab" aria-selected="${state.day===d.number}" data-action="day" data-day="${d.number}" class="day-tab ${state.day===d.number?'active':''}"><span>DAY ${d.number}</span><b>12/${String(d.number+1).padStart(2,'0')}</b></button>`).join('')}</div>`;}
function hero(day){const photo=scenes[dayScenes[day.number]];return `<section class="hero hero-${day.tone} ${state.view==='overview'?'hero-feature':'hero-compact'}" aria-label="旅遊封面"><div class="hero-inner"><span class="eyebrow light">OUR WINTER JOURNEY · 2026</span><h1>一起，去日本走走。</h1><p class="hero-sub">五天的風景、兩個人的自由時間。從東京街道到湘南海風，再和富士山相遇。</p><div class="hero-meta"><span>${icon('calendar',17)} 12/2（三）—12/6（日）</span><span>${icon('sparkle',17)} ${escapeHtml(day.headline)}</span></div></div><div class="hero-photo-wrap"><img class="hero-art" src="${escapeHtml(photo.image)}" alt="${escapeHtml(photo.alt)}" fetchpriority="high" onerror="this.onerror=null;this.style.display='none';this.parentElement.classList.add('photo-unavailable')" /></div><span class="hero-photo-credit">${escapeHtml(photo.location)}</span></section>`;}
function topline(){const d=currentDay();const h=guide.hotels.find(x=>x.id===d.hotel);return `<div class="intro-heading"><div><span class="eyebrow">${escapeHtml(d.imageTag)}</span><h2>Day ${d.number}<span class="divider-dot">·</span>${escapeHtml(d.headline)}</h2><p>${escapeHtml(d.date.replaceAll('-','/'))}（${d.weekday}）・${escapeHtml(d.region)}</p></div>${todayShortcut()}<div class="day-kind">${icon('sun',16)} ${escapeHtml(d.kind)}</div></div><div class="fact-strip"><div>${icon('clock',18)}<span><small>旅遊日期</small><strong>12/${String(d.number+1).padStart(2,'0')}（${d.weekday}）</strong></span></div><div>${icon('bed',18)}<span><small>今晚住宿</small><strong>${escapeHtml(h?.title || '回到台灣')}</strong></span></div><div>${icon('luggage',18)}<span><small>餐食安排</small><strong>${escapeHtml(d.meal)}</strong></span></div></div>`;}
function planSwitcher(){const plans=guide.plans[state.day];if(!plans)return'';const current=currentPlan();return `<section class="plan-panel" aria-label="方案切換"><div class="section-top"><div><span class="eyebrow">CHOOSE YOUR ROUTE</span><h3>選擇你的行程方案</h3></div><button class="button button-quiet" data-action="compare">${icon('sliders',16)} 比較方案</button></div><div class="plan-options" role="radiogroup" aria-label="行程方案">${plans.map(p=>`<button role="radio" aria-checked="${current.id===p.id}" class="plan-option ${current.id===p.id?'active':''}" data-action="plan" data-plan="${p.id}"><b>${p.id}</b><span>${escapeHtml(p.name)}</span>${current.id===p.id?icon('check',15):''}</button>`).join('')}</div><div class="plan-desc"><div class="plan-desc-icon">${icon('route',20)}</div><div><div class="plan-traits">${(planTraits[state.day]?.[current.id]||[]).map(t=>`<span>${escapeHtml(t)}</span>`).join('')}</div><b>${escapeHtml(current.subtitle)}</b><p>${escapeHtml(current.note)}</p></div></div></section>`;}
function notice(day){return `<div class="notice"><div class="notice-mark">${icon('alert',19)}</div><div><strong>${day.number===2?'當天電車／停留均為預估':'團體停留時間與集合位置待旅行社通知'}</strong><p>${day.number===2?'交通請以 Google Maps 當天班次為準；江之島步行、排隊與天候可能影響後續行程。':'旅行社已排景點不代表已有每站的確切集合時刻。收到正式資料後會在新版中更新。'}</p></div></div>`;}
function spotEditorial(e,expanded){
 const g=guide.spotGuides?.[e.place];if(!g)return '';
 const tags=[...(g.eat||[]).slice(0,1).map(v=>'美食・'+v),...(g.buy||[]).slice(0,1).map(v=>'選物・'+v)];
 const hero=g.photo&&scenes[g.photo]?sceneImage(g.photo,'spot-real-photo'):'';
 const list=(title,items,cls)=>items?.length?'<div class="spot-detail-block '+cls+'"><b>'+title+'</b><ul>'+items.map(x=>'<li>'+escapeHtml(x)+'</li>').join('')+'</ul></div>':'';
 return '<div class="spot-editorial">'+(hero?'<div class="spot-cover">'+hero+'</div>':'')+'<p class="spot-why">'+escapeHtml(g.why)+'</p>'+(tags.length?'<div class="spot-preview-tags">'+tags.map(t=>'<span>'+escapeHtml(t)+'</span>').join('')+'</div>':'')+(expanded?'<div class="spot-expanded"><div class="spot-expanded-grid">'+list('值得看',g.see,'spot-see')+list('推薦美食',g.eat,'spot-eat')+list('特色購物／伴手禮',g.buy,'spot-buy')+'</div><p class="spot-reminder"><b>現場提醒：</b>'+escapeHtml(g.tip)+'</p><small>美食及商品屬在地特色建議，未保證特定店家有販售；照片為景點實景參考，季節及天氣可能不同。</small></div>':'')+'</div>';
}
function eventCard(e,i,section,showSpot=true){const p=placeOf(e.place);const unique=`${section}-${i}`;const expanded=state.showAll||state.expanded.has(unique);const classname=e.kind==='transit'?'transit':(['flight','tour','coach','hotel','meal'].includes(e.kind)?'company':e.kind==='bonus'?'bonus':'personal');const map=mapURL(p);
 let actions=[];
 if(map)actions.push(`<a class="mini-action" href="${map}" target="_blank" rel="noopener noreferrer">${icon('pin',15)} 地圖 ${icon('external',12)}</a>`);
 // Route links are visible beside each schedule item; do not repeat them in expanded details.
 if(p?.site)actions.push(`<a class="mini-action" href="${escapeHtml(p.site)}" target="_blank" rel="noopener noreferrer">${icon('external',14)} 官方資訊</a>`);
 const tips=(p?.tips||[]).map(t=>`<li>${escapeHtml(t)}</li>`).join('');
 const hasSpot=!!guide.spotGuides?.[e.place] && showSpot;
 const routeQuick=e.origin&&e.destination?`<div class="event-quick-route"><span>${travelMode(e)==='walking'?'步行移動':'鐵道移動'}</span><button class="event-guide-link" data-action="route-detail" data-origin="${escapeHtml(e.origin)}" data-destination="${escapeHtml(e.destination)}">${icon('train',15)} 查看這段交通 ${icon('arrow',14)}</button></div>`:'';
 const photos={meiji:'meiji',enoshima:'enoshima',seacandle:'enoshima',hakone:'hakone',chureito:'fuji',redbrick:'yokohama',naritaTemple:'narita',narita:'narita'};const sceneKey=photos[e.place];
 return `<article class="timeline-item ${classname}"><div class="timeline-rail"><span class="rail-circle"></span></div><div class="event-body"><div class="event-top"><div class="event-time">${escapeHtml(e.at)}</div><div class="event-tag">${escapeHtml(typeLabel(e.kind))}</div></div><button class="event-title-button" data-action="expand" data-id="${unique}" aria-expanded="${expanded}"><span class="event-title">${escapeHtml(e.title)}</span>${icon('chevron',19)}</button>${e.kind==='transit'&&e.origin?'':`<p class="event-desc">${escapeHtml(e.desc)}</p>`}<div class="event-meta"><span>${escapeHtml(statusLabel(e.status))}</span>${p?.ja?`<span class="japan-label">${escapeHtml(p.ja)}</span>`:''}</div>${routeQuick}${showSpot?spotEditorial(e,expanded):''}${expanded?`<div class="event-extra">${!hasSpot&&sceneKey?sceneImage(sceneKey,'event-photo'):''}${p?.hours?`<div class="hours">${icon('clock',15)} ${escapeHtml(p.hours)}</div>`:''}${tips?`<ul class="event-tips">${tips}</ul>`:''}${actions.length?`<div class="event-actions">${actions.join('')}</div>`:''}${!tips&&!actions.length?'<span class="minor">詳細集合資訊尚未提供。</span>':''}</div>`:''}</div></article>`;}
function timelineSection(title,caption,events,section){
 // Keep the travel/arrival step (and its route button) visible. Only the actual
 // visit shows photos, food, and shopping when the next event is the same place.
 const shouldShowSpot=(e,i)=>{
  const next=events[i+1],prev=events[i-1];
  if(e.kind==='transit' && next?.place===e.place && next.kind!=='transit')return false;
  if(e.kind!=='transit' && prev?.place===e.place && prev.kind!=='transit')return false;
  return true;
 };
 return `<section class="timeline-section"><div class="section-top"><div><span class="eyebrow">${escapeHtml(caption)}</span><h3>${escapeHtml(title)}</h3></div></div><div class="timeline">${events.map((e,i)=>eventCard(e,i,section,shouldShowSpot(e,i))).join('')}</div></section>`;
}
function livePanel(){
 const day=currentDay();if(jstDate()!==day.date)return '';
 const nowStr=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Tokyo',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date());
 const minute=Number(nowStr.slice(0,2))*60+Number(nowStr.slice(3,5));
 const timed=schedule().map(e=>{const m=e.at.match(/^(\d{2}):(\d{2})/);return m?{e,m:Number(m[1])*60+Number(m[2])}:null;}).filter(Boolean);
 const completed=timed.filter(row=>row.m<=minute);
 const active=completed.at(-1)?.e;
 const upcoming=timed.find(row=>row.m>minute)?.e;
 const label=active?.title||'行程即將開始';
 const current=active?'依預估時段：'+label:'目前可先確認行程與交通';
 return `<div class="live-panel" data-live-panel><div class="live-dot"></div><div><b>日本現在 ${nowStr} · 今日行程</b><p>${escapeHtml(current)}${upcoming?'　｜下一個預定時段：'+escapeHtml(upcoming.at)+' '+escapeHtml(upcoming.title):''}</p><small>按規劃時間顯示，不代表 GPS 定位或列車實際運行狀態。</small></div></div>`;
}
function sceneImage(key,style='scene-photo'){const x=scenes[key];if(!x)return '';return `<figure class="${style}"><div class="scene-frame"><img src="${escapeHtml(x.image)}" alt="${escapeHtml(x.alt)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.style.display='none';this.closest('.scene-frame')?.classList.add('photo-unavailable');this.closest('figure')?.querySelector('figcaption')?.insertAdjacentText('beforeend',' · 照片暫時無法顯示')"/></div><figcaption>${escapeHtml(x.location)}${x.remote?' · 外部授權圖片，離線使用備援照':''}</figcaption></figure>`;}
function storySection(d){const story=inspirations[d.number];const links=story.links||[];return `<section class="story-section" id="journey-stories"><div class="story-heading"><span class="eyebrow">TRAVEL INSPIRATION</span><h3>行前攻略與參考・${escapeHtml(d.region)}</h3><p>${escapeHtml(story.lead)}</p></div><div class="story-note">${icon('sparkle',18)} <span>${escapeHtml(story.note)}</span></div><details class="story-resources-collapse"><summary>展開景點官網、實拍影片與行前攻略 ${icon('chevron',16)}</summary><div class="resource-grid">${links.map(link=>`<a href="${escapeHtml(link.url)}" class="resource-card ${link.video?'resource-video':''}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(link.video?'在 YouTube 觀看：'+link.title:'開啟：'+link.title)}">${link.video?`<div class="resource-thumb"><img loading="lazy" decoding="async" src="https://i.ytimg.com/vi/${encodeURIComponent(link.video)}/hqdefault.jpg" alt="" onerror="this.onerror=null;this.src='./assets/video-poster-${d.number}.svg'"/><span class="video-play-icon" aria-hidden="true">▶</span><span class="video-channel">YouTube · ${escapeHtml(link.channel||'旅遊實拍')}</span></div>`:''}<div class="resource-content"><span class="resource-type">${escapeHtml(link.type)}</span><strong>${escapeHtml(link.title)}</strong><span class="resource-open">${link.video?'在 YouTube 觀看':'查看網站'} ${icon('external',15)}</span></div></a>`).join('')}</div></details></section>`;}
function handleAgenda(){const d=currentDay();return `<div class="content-grid"><main class="main-content">${topline()}${dayTabs()}${planSwitcher()}${livePanel()}${notice(d)}<p class="agenda-role-note">這裡查看時間、景點與停留安排；完整 A／B 鐵道路線、站號、出口和班次，請點「查看這段交通」。</p><div class="toolbar"><span>${icon('list',17)} ${d.number===2?'夫妻自助安排':'團體行程與延伸活動'}</span><div><button class="button button-quiet" data-action="toggle-all">${icon('chevrons',16)} ${state.showAll?'收合全部':'展開全部'}</button><button class="button button-quiet desktop-print" data-action="print">${icon('print',16)} 列印</button></div></div>${d.fixed.length?timelineSection('公司既定行程',d.number===2?'COMPANY ARRANGEMENT':'FIXED ITINERARY',d.fixed,'fixed'):''}${guide.plans[d.number]?timelineSection('夫妻自由行 · '+currentPlan().name,'YOUR PLAN',currentPlan().events,'plan'):''}${d.evening?.length?timelineSection('跟團結束後，附近還能去哪？','AFTER HOURS',d.evening,'evening'):''}${storySection(d)}<section class="mobile-bottom-space"></section></main>${rightRail(d)}</div>`;}
function rightRail(d){const h=guide.hotels.find(x=>x.id===d.hotel);return `<aside class="right-rail"><div class="sidebox"><span class="eyebrow">HIGHLIGHTS</span><h3>今日重點</h3><ul class="highlight-list">${d.keypoints.map(t=>`<li>${icon('check',15)}<span>${escapeHtml(t)}</span></li>`).join('')}</ul></div>${h?`<div class="sidebox hotel-side"><span class="eyebrow">TONIGHT'S STAY</span><h3>${escapeHtml(h.title)}</h3>${h.id==='monday'?'<p class="hotel-en">hotel MONday Premium TOYOSU</p>':''}<p>${escapeHtml(h.address)}</p><a class="button button-primary button-full" href="${mapURL({map:h.search})}" target="_blank" rel="noopener noreferrer">${icon('pin',16)} 飯店導航 ${icon('external',13)}</a><a class="text-link" href="${escapeHtml(h.url)}" target="_blank" rel="noopener noreferrer">飯店官網 ${icon('arrow',14)}</a></div>`:''}</aside>`;}
function overview(){return `<section class="page-section"><div class="page-heading"><span class="eyebrow">FIVE DAYS AT A GLANCE</span><h2>五天旅程，一眼掌握</h2><p>從東京灣開始，沿湘南海岸前往箱根與富士山，再從成田返家。</p>${todayNumber()?`<button class="button button-outline overview-today" data-action="today">${icon('calendar',16)} 查看今日行程・12/${todayNumber()+1}</button>`:''}</div><div class="overview-list">${guide.days.map((d,i)=>{const h=guide.hotels.find(x=>x.id===d.hotel);return `<button class="overview-card ${state.day===d.number?'selected':''}" data-action="overview-day" data-day="${d.number}"><div class="overview-index"><b>${String(d.number).padStart(2,'0')}</b><small>DEC ${String(d.number+1).padStart(2,'0')}</small></div><div class="overview-card-photo"><img loading="lazy" src="${escapeHtml(scenes[overviewScenes[d.number]].image)}" alt="${escapeHtml(scenes[overviewScenes[d.number]].alt)}" onerror="this.style.opacity='0'"/></div><div class="overview-text"><span>${escapeHtml(d.kind)}</span><h3>${escapeHtml(d.headline)}</h3><p>${escapeHtml(d.short)}</p><small>${icon('bed',13)} ${escapeHtml(h?.title||'返台')}</small></div><div class="overview-arrow">${icon('arrow',20)}</div></button>`;}).join('')}</div><div class="overview-summary"><div>${icon('clock',23)}<b>日本時間</b><span>所有時刻使用 JST（比台灣快 1 小時）</span></div><div>${icon('train',23)}<b>交通查詢</b><span>即時班次交由 Google Maps 處理</span></div><div>${icon('wifi',23)}<b>離線備份</b><span>先以手機開啟網站，可快取基本內容</span></div></div></section>`;}
function routes(){const d=currentDay();const events=schedule().filter(e=>e.place||e.origin);const routes=events.filter(e=>e.origin&&e.destination);const hotel=guide.hotels.find(x=>x.id===d.hotel);return `<section class="page-section"><div class="page-heading"><span class="eyebrow">RAIL & MAPS</span><h2>交通工具箱 · Day ${state.day}</h2><p>專門查自由移動：鐵道及步行路線、轉乘、方向、出口、A／B 備案、候車風險與即時導航；景點及時間規劃請回「行程」。</p></div>${dayTabs()}${guide.plans[state.day]?`<div class="route-plan-context"><div><small>目前行程方案</small><b>${escapeHtml(currentPlan().id)}｜${escapeHtml(currentPlan().name)}</b></div><button class="button button-outline" data-action="view" data-view="schedule">${icon('calendar',16)} 回行程調整</button></div>`:''}<div class="notice compact"><div class="notice-mark">${icon('train',19)}</div><div><strong>Google Maps 的大眾運輸結果可能包含公車</strong><p>請依下方車站及路線名稱選擇鐵道。Day 2 湘南單軌、江之電是特別安排的體驗；公司遊覽車不提供自行轉乘路線。${state.day===2?'豐洲 MONday 團體訂房不適用免費接駁；清晨須步行至車站。':''}</p></div></div><div class="route-jump-heading">${icon('list',17)} 本日移動段快速索引</div>${routes.length?`<nav class="route-jump-list" aria-label="選擇移動路段">${routes.map((e,i)=>`<button data-action="route-jump" data-index="${i}"><span>${i+1}</span>${escapeHtml(e.title)}</button>`).join('')}</nav>`:''}<div class="route-list">${routes.length?routes.map((e,i)=>`<div class="route-card" id="route-${i}" tabindex="-1"><div class="route-index">${i+1}</div><div class="route-info"><b>${escapeHtml(e.title)}</b><small>${escapeHtml(e.at)} · ${escapeHtml(e.origin)} → ${escapeHtml(e.destination)}</small><span class="route-method">${travelMode(e)==='walking'?'步行':'步行至車站＋鐵道'}</span>${routeOverview(e,'routes')}${transitDetails(e)}<a class="route-reference" href="${routeURL(e.origin,e.destination,e.mode)}" target="_blank" rel="noopener noreferrer">${icon(travelMode(e)==='walking'?'pin':'train',15)} ${travelMode(e)==='walking'?'Google Maps 步行導航':'Google Maps 最快路線參考'} ${icon('external',13)}</a></div></div>`).join(''):'<div class="empty-panel">這一天主要搭乘公司遊覽車，請依導遊通知集合時間與地點；無需自行搭電車。</div>'}</div>${hotel?`<div class="return-hotel"><div><small>一鍵回飯店</small><strong>${escapeHtml(hotel.title)}</strong><p>從目前所在地開啟 Google Maps 路線搜尋</p></div><a class="button button-primary" href="https://www.google.com/maps/dir/?api=1&destination=${enc(hotel.search)}&travelmode=transit" target="_blank" rel="noopener noreferrer">${icon('pin',17)} 回飯店</a></div>`:''}<div class="quick-sites"><h3>鐵路與導航官方入口</h3><a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">Google Maps ${icon('external',14)}</a><a href="https://www.jreast.co.jp/" target="_blank" rel="noopener noreferrer">JR 東日本 ${icon('external',14)}</a><a href="https://www.shonan-monorail.co.jp/" target="_blank" rel="noopener noreferrer">湘南單軌 ${icon('external',14)}</a><a href="https://www.enoden.co.jp/" target="_blank" rel="noopener noreferrer">江之電 ${icon('external',14)}</a><a href="https://transit.yahoo.co.jp/" target="_blank" rel="noopener noreferrer">Yahoo! 乗換案内 ${icon('external',14)}</a></div></section>`;}
function info(){const checked=storedJSON('trip-checked');return `<section class="page-section"><div class="page-heading"><span class="eyebrow">ESSENTIAL INFORMATION</span><h2>住宿、航班與行前確認</h2><p>航班、飯店、實用網址，一起收在口袋裡。</p></div><div class="info-subhead">${icon('plane',19)} 航班資訊</div><div class="flight-grid">${guide.flights.map(f=>`<div class="flight-card"><div class="flight-top"><span>Day ${f.day}</span><b>EVA AIR ${f.code}</b></div><div class="flight-time"><div><strong>${f.depart}</strong><small>${escapeHtml(f.from)}</small></div><span class="flight-line">✈</span><div><strong>${f.arrive}</strong><small>${escapeHtml(f.to)}</small></div></div><p>${escapeHtml(f.note)}</p></div>`).join('')}</div><div class="info-subhead">${icon('bed',19)} 四晚住宿</div><div class="hotel-stack">${guide.hotels.map(h=>`<article class="hotel-card"><div class="hotel-heading"><small>${escapeHtml(h.nights)}</small><h3>${escapeHtml(h.title)}</h3>${h.id==='monday'?'<p class="hotel-en">hotel MONday Premium TOYOSU</p>':''}<p>${escapeHtml(h.address)}</p></div><p>${escapeHtml(h.desc)}</p><ul>${h.notes.map(t=>`<li>${escapeHtml(t)}</li>`).join('')}</ul><div class="hotel-actions"><a class="button button-primary" href="${mapURL({map:h.search})}" target="_blank" rel="noopener noreferrer">${icon('pin',16)} 開啟地圖</a><button class="button button-outline" data-action="copy" data-copy="${escapeHtml(h.address)}">${icon('copy',16)} 複製地址</button><a class="button button-outline" href="${escapeHtml(h.url)}" target="_blank" rel="noopener noreferrer">官網 ${icon('external',14)}</a></div></article>`).join('')}</div><div class="info-subhead">${icon('clipboard',19)} 待確認與行前檢查</div><p class="check-caption">出發前想到的事，慢慢勾起來就好。</p><div class="check-list">${guide.check.map(c=>`<label class="check-row"><input type="checkbox" data-action="check" data-id="${escapeHtml(c.id)}" ${checked[c.id]?'checked':''}/><span class="check-text">${escapeHtml(c.label)}</span><span class="check-status">${escapeHtml(c.type)}</span></label>`).join('')}</div><div class="info-subhead">${icon('compass',19)} 旅行實用連結</div><div class="sources-card"><p>飯店、交通和景點官方資訊都放在這裡，需要時點開查看。</p>${guide.sources.filter(s=>s.url).map(s=>`<a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.label)} ${icon('external',14)}</a>`).join('')}</div></section>`;}
function footer(){return `<footer class="footer"><div class="footer-sign"><b>2026 · 東京・湘南・富士</b><span>行程規劃與製作｜家葦</span></div><details class="photo-credit-details"><summary>參考資訊與圖片出處</summary><div class="photo-credit-list"><strong>官方旅遊資訊</strong>${guide.sources.filter(s=>s.url).slice(0,6).map(s=>`<a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.label)} ↗</a>`).join('')}<strong>照片出處</strong>${Object.values(scenes).map(x=>`<a href="${escapeHtml(x.credit.source)}" target="_blank" rel="noopener noreferrer">${escapeHtml(x.location)} · ${escapeHtml(x.credit.author)} · ${escapeHtml(x.credit.license)}</a>`).join('')}</div></details><a class="site-refresh" href="./refresh.html" title="修復舊版快取並重新開啟新版">更新網站 ↻</a><button data-action="top">回到頂部 ↑</button></footer>`;}
function compareModal(){const plans=guide.plans[state.day];if(!plans||state.modal!=='compare')return'';return `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="compare-title"><div class="modal-header"><div><span class="eyebrow">PLAN COMPARISON</span><h2 id="compare-title">Day ${state.day} 方案快速比較</h2></div><button class="icon-button" data-action="close-modal" aria-label="關閉">${icon('close',21)}</button></div><div class="compare-grid">${plans.map(p=>`<article class="compare-card ${state.plans[state.day]===p.id?'chosen':''}"><div class="compare-card-head"><b>${p.id}｜${escapeHtml(p.name)}</b><div class="compare-traits">${(planTraits[state.day]?.[p.id]||[]).map(t=>`<span>${escapeHtml(t)}</span>`).join('')}</div><small>${escapeHtml(p.subtitle)}</small></div><ol>${p.events.filter(e=>e.kind!=='transit'||/湘南單軌|江之電/.test(e.title)).map(e=>`<li>${escapeHtml(e.title)} <span>${escapeHtml(e.at)}</span></li>`).join('')}</ol><p>${escapeHtml(p.note)}</p><button class="button ${state.plans[state.day]===p.id?'button-soft':'button-primary'}" data-action="pick-plan" data-plan="${p.id}">${state.plans[state.day]===p.id?'目前使用中':'採用此方案'}</button></article>`).join('')}</div></section></div>`;}
function render(){const d=currentDay();document.body.classList.toggle('dialog-open',state.modal==='compare');app.innerHTML=`<div class="site-shell">${header()}${hero(d)}<div class="workspace">${sidebar()}<div class="workspace-main">${state.view==='overview'?overview():state.view==='routes'?routes():state.view==='info'?info():handleAgenda()}</div></div>${footer()}${bottomNav()}${compareModal()}${state.updateAvailable?`<div class="update-banner">有新版本可用 <button data-action="update">更新手冊</button><button data-action="dismiss-update" aria-label="稍後再說">×</button></div>`:''}</div>`;document.title=`${d.region}｜Day ${d.number}｜2026 旅遊手冊`;}
function setDay(day){state.day=Math.max(1,Math.min(5,day));state.expanded.clear();state.showAll=false;state.modal=null;syncURL();render();window.scrollTo({top:0,behavior:'smooth'});}
function setView(view){state.view=view;state.expanded.clear();state.showAll=false;state.modal=null;syncURL();render();window.scrollTo({top:0,behavior:'smooth'});}
function choosePlan(id){const d=state.day;const plans=guide.plans[d];if(!plans?.some(p=>p.id===id))return;state.plans[d]=id;save('trip-plan'+d,id);state.expanded.clear();state.modal=null;syncURL();render();}
let toastTimer;
function toast(t){app.querySelector('.toast')?.remove();clearTimeout(toastTimer);const node=document.createElement('div');node.className='toast';node.setAttribute('role','status');node.textContent=t;app.querySelector('.site-shell')?.append(node);toastTimer=setTimeout(()=>node.remove(),2700);}
function shareURL(){const u=new URL(location.href);u.searchParams.set('day',state.day);u.searchParams.set('view',state.view);if(guide.plans[state.day])u.searchParams.set('plan'+state.day,state.plans[state.day]);return u.toString();}
async function share(){const url=shareURL();try {if(navigator.share&&matchMedia('(max-width:680px)').matches){await navigator.share({title:'2026 日本五日旅遊手冊',url});return;}if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(url);toast('已複製目前方案連結');return;}} catch(err){if(err.name==='AbortError')return;}window.prompt('複製這個行程網址',url);}
app.addEventListener('click', async ev => {const element=ev.target.closest('[data-action]');if(!element)return;const action=element.dataset.action;
 if(action==='day'||action==='overview-day'){setDay(Number(element.dataset.day));if(action==='overview-day')setView('schedule');return;}
 if(action==='view'){setView(element.dataset.view);return;}
 if(action==='route-jump'){
  const i=Number(element.dataset.index),card=app.querySelector('#route-'+i);
  if(card){card.scrollIntoView({block:'start',behavior:'smooth'});card.focus({preventScroll:true});}
  return;
 }
 if(action==='route-detail'){
  const from=element.dataset.origin,to=element.dataset.destination;
  const matches=schedule().filter(e=>e.origin&&e.destination);
  const targetIndex=matches.findIndex(e=>e.origin===from&&e.destination===to);
  state.view='routes';state.modal=null;state.expanded.clear();state.showAll=false;syncURL();render();
  if(targetIndex>=0){
   const card=document.getElementById('route-'+targetIndex);
   if(card){
    const guide=card.querySelector('details.transit-guide');if(guide)guide.open=true;
    card.scrollIntoView({block:'start',behavior:'smooth'});
    card.focus({preventScroll:true});
   }
  }else{window.scrollTo({top:0,behavior:'smooth'});}
  return;
 }
 if(action==='today'){const n=todayNumber();if(n){state.day=n;state.view='schedule';state.expanded.clear();state.showAll=false;state.modal=null;syncURL();render();window.scrollTo({top:0,behavior:'smooth'});}return;}
 if(action==='plan'||action==='pick-plan'){choosePlan(element.dataset.plan);return;}
 if(action==='expand'){const id=element.dataset.id;state.expanded.has(id)?state.expanded.delete(id):state.expanded.add(id);render();return;}
 if(action==='toggle-all'){state.showAll=!state.showAll;state.expanded.clear();render();return;}
 if(action==='compare'){state.modal='compare';render();app.querySelector('.modal [data-action="close-modal"]')?.focus();return;}
 if(action==='close-modal'){if(element.classList.contains('modal-backdrop')&&ev.target!==element)return;state.modal=null;render();app.querySelector('[data-action="compare"]')?.focus();return;}
 if(action==='print'){window.print();return;}
 if(action==='top'){window.scrollTo({top:0,behavior:'smooth'});return;}
 if(action==='share'){await share();return;}
 if(action==='copy'){const text=element.dataset.copy||'';try{await navigator.clipboard.writeText(text);toast('地址已複製');}catch{window.prompt('複製地址',text);}return;}
 if(action==='update'){const registration=await navigator.serviceWorker?.getRegistration('./');if(registration?.waiting){reloadAfterWorkerActivation=true;registration.waiting.postMessage({type:'SKIP_WAITING'});}else{location.reload();}return;}
 if(action==='dismiss-update'){state.updateAvailable=false;render();return;}
});
app.addEventListener('change',ev=>{const input=ev.target;if(input?.dataset.action==='check'){let a={};try{a=JSON.parse(stored('trip-checked','{}'));}catch{}a[input.dataset.id]=input.checked;save('trip-checked',JSON.stringify(a));}});
window.addEventListener('keydown',ev=>{
 if(!state.modal)return;
 if(ev.key==='Escape'){state.modal=null;render();app.querySelector('[data-action="compare"]')?.focus();return;}
 if(ev.key==='Tab'){
  const nodes=[...app.querySelectorAll('.modal button:not([disabled]),.modal a[href]')];
  if(!nodes.length)return;
  const first=nodes[0],last=nodes[nodes.length-1];
  if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last.focus();}
  else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first.focus();}
 }
});
window.addEventListener('popstate',()=>{const p=new URLSearchParams(location.search);const d=Number(p.get('day'));if(d>=1&&d<=5)state.day=d;state.view=['overview','schedule','routes','info'].includes(p.get('view'))?p.get('view'):'schedule';render();});
render();
// Update only the clock panel: preserve scroll, opened event cards and keyboard focus.
setInterval(()=>{const panel=app.querySelector('[data-live-panel]');if(!panel)return;const updated=livePanel();if(updated)panel.outerHTML=updated;else panel.remove();},60_000);
// Users should see online updates without manually clearing the browser's PWA cache.
// When a new worker takes control, offer a reload instead of wiping reading preferences.
let reloadAfterWorkerActivation=false;
if('serviceWorker' in navigator && location.protocol!=='file:'){
 window.addEventListener('load',async()=>{
  try {
    const wasControlled=!!navigator.serviceWorker.controller;
    let hasHadController=wasControlled;
    const r=await navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'});
    const showUpdate=()=>{if(!state.updateAvailable){state.updateAvailable=true;render();}};
    if(r.waiting && hasHadController) showUpdate();
    r.addEventListener('updatefound',()=>{
      const worker=r.installing;
      worker?.addEventListener('statechange',()=>{
        if(worker.state==='installed' && navigator.serviceWorker.controller) showUpdate();
      });
    });
    navigator.serviceWorker.addEventListener('controllerchange',()=>{
      if(!hasHadController){hasHadController=true;return;}
      if(reloadAfterWorkerActivation){location.reload();return;}
      showUpdate();
    });
    let lastCheck=0;
    const checkUpdates=()=>{
      if(!navigator.onLine || Date.now()-lastCheck<60_000) return;
      lastCheck=Date.now();
      r.update().catch(()=>{}); // Still displays the offline itinerary if disconnected.
    };
    checkUpdates();
    window.addEventListener('online',checkUpdates);
    window.addEventListener('focus',checkUpdates);
    document.addEventListener('visibilitychange',()=>{
      if(document.visibilityState==='visible')checkUpdates();
    });
    setInterval(checkUpdates,15*60_000);
  }catch(e){console.warn('離線快取未啟用',e);}
 });
}