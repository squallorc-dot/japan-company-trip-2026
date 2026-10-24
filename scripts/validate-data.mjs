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
const worker=readProjectFile('sw.js');
const refreshPage=readProjectFile('refresh.html');
for(const ref of ['./styles.css?v='+assetVersion,'./app.js?v='+assetVersion]){
 assert.ok(html.includes(ref),'index.html has stale resource version: '+ref);
}
for(const ref of ['./data.js?v='+assetVersion,'./media.js?v='+assetVersion]){
 assert.ok(appSource.includes(ref),'app.js has stale import version: '+ref);
}
assert.ok(worker.includes('japan-trip-2026-v'+assetVersion),'sw.js has stale cache version');
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
