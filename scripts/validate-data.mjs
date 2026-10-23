import {guide} from '../data.js';
import assert from 'node:assert/strict';

assert.equal(guide.days.length,5,'five travel days');
assert.equal(guide.tripStart,'2026-12-02');
assert.equal(guide.tripEnd,'2026-12-06');
assert.equal(guide.version,'2026.10.24-02');
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
