import {guide} from '../data.js';
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
