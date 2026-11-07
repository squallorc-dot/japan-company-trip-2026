/* Japan Travel GA4/GTM shared tracking adapter v1.0: passive until a real GTM ID is supplied. */
(function () {
 'use strict';
 const script=document.currentScript, tripId=script&&script.dataset.tripId;
 const gtmId=((script&&script.dataset.gtmId)||'').trim();
 if(!/^[a-z0-9_]{3,40}$/.test(tripId||''))return;
 const search=new URLSearchParams(location.search);
 let off=search.get('analytics')==='off';
 try{off=off||localStorage.getItem('travel_analytics_optout')==='1';}catch(_){}
 if(off)return;
 window.dataLayer=window.dataLayer||[];
 const allowed=new Set(['trip_page_open','trip_section_view','trip_day_view','trip_plan_select','trip_navigation_click','trip_resource_click','trip_share_click','trip_checklist_update','trip_shopping_toggle']);
 const dayValue=input=>{const m=String(input||'').match(/^(?:day[_-]?)?([1-9])$/i);return m?'day_'+m[1]:'unknown';};
 const currentDay=()=>{const q=new URLSearchParams(location.search),m=location.hash.match(/^#day([1-9])(?:$|[-_])/i);return dayValue(q.get('day')||(m&&m[1])||(tripId==='tokyo_2026'?'':'1'));};
 const currentSection=()=>{const v=new URLSearchParams(location.search).get('view')||(tripId==='tokyo_2026'?'article':'overview');return v==='routes'?'transport':v;};
 function push(name,params){
  if(!allowed.has(name))return;
  const e={event:name,trip_id:tripId,trip_day:currentDay(),trip_section:currentSection(),plan_id:undefined,navigation_type:undefined,resource_domain:undefined,share_method:undefined,check_state:undefined,shopping_state:undefined};
  for(const [k,v] of Object.entries(params||{})){
   if(!/^[a-z][a-z0-9_]{0,39}$/.test(k))continue;
   if(typeof v==='string'&&/^[a-zA-Z0-9_.-]{1,90}$/.test(v))e[k]=v;
   if(typeof v==='boolean')e[k]=v?'yes':'no';
  }
  window.dataLayer.push(e);
 }
 window.tripAnalytics={track:push,tripId};
 if(/^GTM-[A-Z0-9]{5,16}$/.test(gtmId) && location.hostname==='squallorc-dot.github.io'){
  window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});
  const node=document.createElement('script');node.async=true;
  node.src='https://www.googletagmanager.com/gtm.js?id='+encodeURIComponent(gtmId);
  (document.head||document.documentElement).appendChild(node);
 }
 push('trip_page_open');
 const isMap=url=>((/(^|\.)google\.[a-z.]+$/.test(url.hostname)&&url.pathname.startsWith('/maps'))||/^(maps\.app\.goo\.gl|maps\.google\.[a-z.]+|goo\.gl)$/.test(url.hostname));
 document.addEventListener('click',function(ev){
  if(ev.defaultPrevented)return;
  const el=ev.target instanceof Element?ev.target.closest('button,a'):null;if(!el)return;
  const d=el.dataset||{};
  if(d.day&&/^[1-9]$/.test(d.day))push('trip_day_view',{trip_day:'day_'+d.day});
  else if(el.matches('a[href^="#day"]')){const m=el.getAttribute('href').match(/^#day([1-9])$/);if(m)push('trip_day_view',{trip_day:'day_'+m[1]});}
  if(d.view)push('trip_section_view',{trip_section:d.view==='routes'?'transport':d.view});
  if(d.plan&&/^(plan|pick-plan)$/.test(d.action||''))push('trip_plan_select',{plan_id:d.plan});
  if(d.share!==undefined||d.action==='share')push('trip_share_click',{share_method:'site_button'});
  if(d.route||d.action==='route-detail'||d.action==='route-jump')push('trip_section_view',{trip_section:'transport'});
  if(d.productState){const st=d.productState;push('trip_shopping_toggle',{shopping_state:st==='已買'?'bought':st==='沒找到'?'unavailable':'not_bought'});}
  if(el.tagName!=='A')return;
  let url;try{url=new URL(el.href,location.href)}catch(_){return}
  if(!/^https?:$/.test(url.protocol))return;
  if(isMap(url)){
   const mode=url.searchParams.get('travelmode')||'map';
   push('trip_navigation_click',{navigation_type:['walking','transit','driving','bicycling'].includes(mode)?mode:'map'});
  }else if(url.hostname!==location.hostname){
   push('trip_resource_click',{resource_domain:url.hostname.slice(0,90).replace(/[^a-z0-9.-]/gi,'')||'external'});
  }
 },true);
 document.addEventListener('change',function(ev){
  const el=ev.target;
  if(el instanceof HTMLInputElement&&el.type==='checkbox'&&el.dataset.action==='check'){
   push('trip_checklist_update',{check_state:el.checked?'checked':'unchecked'});
  }
 },true);
})();
