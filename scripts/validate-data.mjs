import {guide} from '../data.js';
import {scenes,overviewScenes,dayScenes} from '../media.js';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

assert.equal(guide.days.length,5,'five travel days');
assert.equal(guide.tripStart,'2026-12-02');
assert.equal(guide.tripEnd,'2026-12-06');
// Compare against the single version manifest, not a hard-coded release number.
const readProjectFile = path => readFileSync(new URL('../'+path,import.meta.url),'utf8');
const expectedVersion=JSON.parse(readProjectFile('version.json')).version;
const assetVersion=expectedVersion.replaceAll('.','');
assert.equal(guide.version,expectedVersion,'data.js and version.json must use the same release');
const html=readProjectFile('index.html');
const appSource=readProjectFile('app.js');
const tracking=readProjectFile('travel-tracking.js');
const worker=readProjectFile('sw.js');
assert.ok(html.includes('data-trip-id="company_2026"') && html.includes('data-gtm-id="GTM-5MK7X2XK"'), 'travel GTM loader missing');
assert.ok(worker.includes("'./travel-tracking.js'"), 'travel tracker not available offline');
assert.ok(tracking.includes("location.hostname==='squallorc-dot.github.io'"), 'GTM hostname guard missing');
for(const name of ['trip_page_open','trip_day_view','trip_plan_select','trip_navigation_click','trip_checklist_update'])assert.ok(tracking.includes(name),'Missing travel event: '+name);

assert.ok(appSource.includes('const hotelReturnMode = day => day===3||day===4'), 'Hotel return navigation modes missing');
assert.ok(appSource.includes('hotelReturnURL(hotel.search,selected)'), 'Overview return hotel must use day mode');
assert.ok(appSource.includes('hotelReturnURL(hotel.search,state.day)'), 'Transport return hotel must use day mode');
assert.ok(guide.places.redbrick.tips.some(t=>t.includes('Christmas Gate')), '2026 free Christmas Gate note missing');

const refreshPage=readProjectFile('refresh.html');
for(const ref of ['./styles.css?v='+assetVersion,'./app.js?v='+assetVersion]){
 assert.ok(html.includes(ref),'index.html has stale resource version: '+ref);
}
for(const ref of ['./data.js?v='+assetVersion,'./media.js?v='+assetVersion]){
 assert.ok(appSource.includes(ref),'app.js has stale import version: '+ref);
}
assert.ok(worker.includes('japan-trip-2026-v'+assetVersion),'sw.js has stale cache version');
assert.ok(readProjectFile('.github/workflows/deploy.yml').includes('python scripts/build-icons.py'),'512px icon must be generated for deployment');
assert.ok(worker.includes("'./assets/icon-512.png'"),'512px icon must be available offline');

assert.ok(refreshPage.includes('fresh='+assetVersion),'refresh.html has stale cache-busting version');
const places=new Set(Object.keys(guide.places));
const allowedStatuses=new Set(['confirmed','planned','estimate']);
const allowedModes=new Set(['walking','transit']);
let events=0;
for(const [i,day] of guide.days.entries()){
  assert.equal(day.number,i+1,'day numbers must be sequential');
  assert.equal(day.date,'2026-12-'+String(i+2).padStart(2,'0'),'date mismatch');
  assert.ok(day.headline && day.region && day.kind);
  const items=[...(day.fixed||[]),...(day.evening||[]),...(guide.plans[day.number]||[]).flatMap(p=>p.events)];
  for(const e of items){
    assert.ok(e.at && e.title && e.kind,'missing event details');
    assert.ok(allowedStatuses.has(e.status),'unknown event status: '+e.title);
    if(e.place)assert.ok(places.has(e.place),'unknown place: '+e.place);
    if(e.mode)assert.ok(allowedModes.has(e.mode),'invalid travel mode: '+e.title);
    if(e.mode)assert.ok(e.origin && e.destination,'mode requires an origin/destination: '+e.title);
    assert.equal(Boolean(e.origin),Boolean(e.destination),'incomplete navigation endpoints: '+e.title);
    events++;
  }
}
assert.equal(guide.plans[1].length,4,'Day 1 options');
assert.equal(guide.plans[2].length,5,'Day 2 options');
assert.ok(appSource.includes("const headline=daily?day.headline:'一起，去日本走走。'"),'Daily hero must be based on each day headline');
assert.ok(appSource.includes('function overviewShortcuts()'),'Travel shortcut controls not defined');
assert.ok(appSource.includes('${overviewShortcuts()}'),'Travel shortcuts not shown in Overview');
assert.ok(appSource.includes('${dayFocus(d)}'),'Daily focus not shown above itinerary');
assert.ok(appSource.includes('d.keypoints.slice(1).map('),'Daily focus should not repeat in the sidebar');
assert.ok(!readProjectFile('scripts/build-photos.py').includes('dest.write_bytes(fb.read_bytes())'),'A mismatched place photo cannot be substituted');
assert.ok(readProjectFile('scripts/build-photos.py').includes('Some attributed photos could not be downloaded'),'Missing source photos should block a faulty release');

assert.ok(guide.days[1].meal.includes('早餐飯店'),'Day 2 breakfast missing from day summary');
assert.ok(guide.days[1].fixed.some(e=>e.title.includes('飯店早餐')),'Day 2 breakfast missing from schedule');
for (const plan of guide.plans[2]) {
 const first=plan.events[0];
 const match=first.at.match(/^(\d{2}):(\d{2})/);
 assert.ok(match, 'Unexpected Day 2 first time for '+plan.id);
 assert.ok(Number(match[1])*60+Number(match[2])>=7*60+25,'Day 2 plan leaves before breakfast: '+plan.id);
}
assert.ok(!readProjectFile('data.js').includes('06:15'),'Old 06:15 start note remains');

for(const day of [1,2]){
  const ids=guide.plans[day].map(p=>p.id);
  assert.equal(new Set(ids).size,ids.length,'duplicate plan ID');
}
assert.equal(guide.flights.length,2);
assert.equal(guide.hotels.length,3);
console.log('Validated '+events+' events, '+places.size+' places, and 9 self-guided options');

const guideKeys = Object.keys(guide.transportGuides||{});
assert.ok(guideKeys.length>=20,'transport guides should cover self-guided routes');
for(const [key,route] of Object.entries(guide.transportGuides||{})){
 assert.ok(key.includes('|'),'route key requires origin and destination');
 assert.ok(Array.isArray(route.steps) && route.steps.length>0,'route guide must include steps: '+key);
 assert.ok(route.steps.every(s=>typeof s==='string' && s.trim()),'route guide has empty step: '+key);
}
console.log('Validated '+guideKeys.length+' additional rail/walking guidance entries');

for(const [key,route] of Object.entries(guide.transportGuides||{})){
 assert.ok(route.summary && route.summary.length>=18,'missing actionable route summary: '+key);
 if(route.alternatives){
  assert.ok(route.alternatives.length>=2,'route alternatives need at least two options: '+key);
  for(const option of route.alternatives)assert.ok(option.label && option.note && option.steps?.length>=2,'incomplete alternative: '+key);
 }
}

const ofunaGuide=guide.transportGuides?.['hotel MONday Premium TOYOSU|大船駅'];
assert.ok(ofunaGuide,'Day 2 Ofuna departure choices missing');
assert.equal(ofunaGuide.alternatives?.length,2,'Both Ofuna routes must be present');
for(const [i,name] of ['東雲','豐洲'].entries()){
 const alt=ofunaGuide.alternatives[i];
 assert.ok(alt.label.includes(name),'Wrong origin in Ofuna option '+(i+1));
 assert.ok(alt.short?.includes(name) && alt.short.includes('大船'),'Both routes need full actionable summaries');
}
assert.ok(ofunaGuide.summary.includes('A｜') && ofunaGuide.summary.includes('B｜'),'Cached clients must also get complete A/B summary');

assert.ok(appSource.includes('agenda-role-note'),'itinerary purpose missing');
assert.ok(appSource.includes("if(action==='route-jump')"),'route quick index missing');
assert.ok(!appSource.includes("routeOverview(e,'schedule')"),'full transfer alternatives must remain in transport');
assert.ok(appSource.includes("routeOverview(e,'routes')"),'transport route detail missing');

const spotEntries=Object.entries(guide.spotGuides||{});
assert.ok(spotEntries.length>=25,'insufficient trip editorial content');
for(const [key,g] of spotEntries){
 assert.ok(places.has(key),'unknown editorial place '+key);
 assert.ok(g.why?.length>=12 && g.tip?.length>=10,'incomplete editorial notes '+key);
 for(const list of ['see','eat','buy'])assert.ok(Array.isArray(g[list]),'missing spot list '+key+' '+list);
 if(g.photo)assert.ok(Object.hasOwn(scenes,g.photo),'unknown photo scene '+g.photo+' for '+key);
}
assert.ok(appSource.includes('spotEditorial(e,expanded)'),'spot editorial is not displayed');

const mediaSource=readProjectFile('media.js');
assert.ok(mediaSource.includes('overviewScenes'),'overview images must be independent from itinerary images');
assert.ok(mediaSource.includes("assets/photos/shonanTrain.webp"),'new photos must use local assets');
assert.ok(!/image:'https:\/\/commons\\.wikimedia\\.org/.test(mediaSource),'direct hotlinked source image not allowed');
const gallery=JSON.parse(readProjectFile('assets/photo-sources.json'));
assert.ok(gallery.photos.length>=9,'insufficient local image sources');
for(const x of gallery.photos)assert.ok(x.id&&x.file&&x.source&&x.author&&x.license,'missing photo provenance');

assert.ok(!appSource.includes('read-size-button'),'obsolete text-size toggle should be removed');
assert.ok(!appSource.includes('scenePreview(d)'),'duplicate scene block should be removed');
assert.ok(appSource.includes('story-resources-collapse'),'travel guide resources must stay available');

for(const day of guide.days){
  assert.ok(Object.hasOwn(scenes,overviewScenes[day.number]),'overview photo missing on Day '+day.number);
  assert.ok(Object.hasOwn(scenes,dayScenes[day.number]),'itinerary photo missing on Day '+day.number);
  assert.notEqual(overviewScenes[day.number],dayScenes[day.number],'overview and itinerary must use different photos on Day '+day.number);
}
for(const photo of gallery.photos){
  const scene=scenes[photo.id];
  assert.ok(scene,'gallery source has no media scene: '+photo.id);
  assert.equal(scene.image,'./assets/photos/'+photo.id+'.webp','gallery image must use local WebP: '+photo.id);
}

const shonanSource=gallery.photos.find(x=>x.id==='shonanTrain');
assert.equal(shonanSource?.file,'ShonanMonorail-M8689.jpg','Do not silently restore the control-panel photo');
assert.notEqual(overviewScenes[2],dayScenes[2],'Day 2 overview and itinerary must show different scenery');
assert.equal(dayScenes[2],'enoshimaPanorama','Day 2 main photo should be the complete island panorama');
assert.equal(guide.spotGuides.redbrick.photo,'yokohamaMarket','Red Brick should show a documented Christmas Market scene');
assert.ok(gallery.photos.some(p=>p.id==='enoshimaPanorama'&&p.license==='CC BY 4.0'),'Enoshima panorama attribution missing');
assert.ok(gallery.photos.some(p=>p.id==='yokohamaMarket'&&p.license==='CC BY 2.0'),'Christmas market attribution missing');

for(const d of guide.days)assert.ok(!Object.hasOwn(d,'photo'),'Accidental photo property attached to a day entry: '+d.number);
assert.equal(guide.spotGuides.naritaStreet?.photo,'naritaStreet','Narita photo belongs to spot guide, not Day 1');
assert.ok(appSource.includes('showSpot?spotEditorial(e,expanded)'), 'Repeated same-place photo suppression missing');

for(const [key,pin] of Object.entries(guide.stationPins||{})){
 assert.ok(pin.label&&pin.query&&pin.note,'incomplete station pin '+key);
 assert.ok(pin.query.includes('駅'),'station pin needs Japanese station '+key);
}
let pinnedRoutes=0;
for(const [key,r] of Object.entries(guide.transportGuides)){
 if(!r.walkTo)continue;
 assert.ok(Array.isArray(r.walkTo)&&r.walkTo.length>0,'empty station walk route '+key);
 for(const pin of r.walkTo)assert.ok(Object.hasOwn(guide.stationPins,pin),'unknown station pin '+pin+' in '+key);
 pinnedRoutes++;
}
assert.ok(pinnedRoutes>=17,'station walk routes missing');
assert.ok(appSource.includes('walkStationButtons(e)'),'station navigation not displayed');

const walkingIds=new Set(Object.keys(guide.walkingDestinations||{}));
let seenWalking=0;
for(const day of guide.days){
 const all=[...(day.fixed||[]),...(day.evening||[]),...(guide.plans[day.number]||[]).flatMap(p=>p.events)];
 for(const e of all){
  if(e.mode!=='walking')continue;
  assert.ok(walkingIds.has(e.destination),'Missing fixed pedestrian destination: '+e.destination);
  seenWalking++;
 }
}
assert.ok(seenWalking>=10,'Expected all pedestrian events');
assert.ok(appSource.includes('walkingShortcuts(e)'),'Pedestrian shortcuts missing from UI');

assert.ok(appSource.includes("const itineraryNavigation = e =>"),'Itinerary contextual navigation missing');
assert.ok(appSource.includes("const itineraryNav=itineraryNavigation(e)"),'Event cards must use a single context-aware action');
assert.ok(!appSource.includes("${routeQuick}${walkingShortcuts(e)}"),'Itinerary must not duplicate full Transport navigation');
assert.ok(appSource.includes("if(map&&!itineraryNav)"),'Company stops retain maps without doubling free-activity navigation');
assert.ok(appSource.includes("e.mode==='walking'?walkingShortcuts(e):''"),'Transport must retain full A-to-B walking options');

const expectedShareImage = 'https://squallorc-dot.github.io/japan-company-trip-2026/assets/og-cover-'+assetVersion+'.jpg';
assert.ok(html.includes('<meta property="og:image" content="'+expectedShareImage+'"'),'OG image URL must change with release');
assert.ok(html.includes('<meta name="twitter:image" content="'+expectedShareImage+'"'),'Twitter image must match current OG image');
assert.ok(worker.includes('./assets/og-cover-'+assetVersion+'.jpg'),'Current OG image should be in offline assets');
assert.ok(appSource.includes("u.searchParams.set('share',guide.version.replaceAll('.',''))"),'Share URL must avoid old LINE cache');
const socialBuilder=readProjectFile('scripts/build-social-image.py');
assert.ok(socialBuilder.includes("'og-cover-'+RELEASE+'.jpg'"),'Versioned OG image must be created by build script');

const railMapIds=Object.keys(guide.railMaps||{});
assert.equal(railMapIds.length,5,'expected exactly five official Chinese railway references');
for(const [id,r] of Object.entries(guide.railMaps)){
 assert.ok(r.title&&r.type&&r.usage&&r.note&&r.url.startsWith('https://'),'incomplete rail map: '+id);
 assert.ok(/繁體中文|繁中|中文/.test(r.type),'not a Chinese-language resource: '+id);
}
for(const [day,plans] of Object.entries(guide.railMapPlans||{})){
 for(const [plan,ids] of Object.entries(plans)){
  assert.ok(guide.plans[Number(day)]?.some(p=>p.id===plan),'unknown map plan '+day+'/'+plan);
  assert.ok(ids.every(id=>railMapIds.includes(id)),'unknown rail map in '+day+'/'+plan);
 }
}
assert.deepEqual(guide.railMapPlans[1].B,[],'walking-only option should not show rail maps');
assert.deepEqual(guide.railMapPlans[1].D,[],'hotel-only option should not show rail maps');
assert.ok(!guide.railMapPlans[2].E.includes('shonan'),'alternative E has no monorail');
assert.ok(appSource.includes('railMapPanel()'),'rail map panel not rendered');
assert.ok(appSource.includes('onsite+'),'onsite guides not shown');
const actionRoutes=Object.values(guide.transportGuides).filter(g=>g.stationSigns);
assert.ok(actionRoutes.length>=10,'insufficient onsite Chinese transfer notes');
for(const g of actionRoutes)assert.ok(g.stationSigns.every(x=>x.length>=15),'empty station instruction');

const railPanelPosition=appSource.indexOf('${railMapPanel()}');
const railListPosition=appSource.indexOf('<div class="route-list">');
const railIndexPosition=appSource.indexOf('<div class="route-jump-heading">');
assert.ok(railPanelPosition>railIndexPosition&&railPanelPosition<railListPosition,'Rail maps should appear after route index but before long list');
assert.equal(appSource.split('${railMapPanel()}').length-1,1,'Rail maps should render once');
assert.ok(appSource.includes('版本 ${escapeHtml(guide.version)}'),'Version must be visible for cache diagnosis');
