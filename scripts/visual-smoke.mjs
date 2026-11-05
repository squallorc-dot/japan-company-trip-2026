import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';

// Desktop and mobile checks follow the successful Okinawa test matrix.
const widths=[360,375,390,430,768,1024,1440,1680,1920];
const views=['overview','schedule','routes','info'];
const reports=[];
const issues=[];
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
await mkdir('artifacts/screenshots',{recursive:true});

function check(ok,message,context={}){
 if(!ok)issues.push({message,...context});
}

for(const width of widths){
 const page=await browser.newPage({viewport:{width,height:860},deviceScaleFactor:1,isMobile:width<=790,hasTouch:width<=790});
 const pageErrors=[];
 page.on('pageerror',e=>pageErrors.push(e.message));
 await page.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded'});
 await page.locator('.workspace-main').waitFor();

 for(const view of views){
  const nav=width<=790?'.bottom-nav button[data-view="'+view+'"]':'.desktop-sections button[data-view="'+view+'"]';
  await page.locator(nav).click();
  await page.waitForTimeout(100);
  const m=await page.evaluate(()=>({
   width:innerWidth,
   scrollWidth:document.documentElement.scrollWidth,
   textLength:document.querySelector('.workspace-main')?.innerText?.trim().length||0,
   mainVisible:!!document.querySelector('.workspace-main'),
   blankPhotos:document.querySelectorAll('.photo-unavailable').length,
   selectedView:new URL(location.href).searchParams.get('view')
  }));
  const row={width,view,...m,errors:[...pageErrors]};
  reports.push(row);
  check(m.scrollWidth<=m.width+2,'Horizontal overflow',row);
  check(m.textLength>90,'Empty or missing main content',row);
  check(m.selectedView===view,'Navigation view out of sync',row);
  check(pageErrors.length===0,'JavaScript error',row);
  if([390,1440].includes(width))await page.screenshot({path:'artifacts/screenshots/'+width+'-'+view+'.png',fullPage:true});
 }

 // Verify each day remains accessible and its heading actually changes.
 await page.locator(width<=790?'.bottom-nav button[data-view="schedule"]':'.desktop-sections button[data-view="schedule"]').click();
 for(let day=1;day<=5;day++){
  await page.locator((width<=790?'.day-tabs button[data-day="':'.day-nav-item[data-day="')+day+'"]').click();
  const heading=await page.locator('.hero h1').textContent();
  const entries=await page.locator('.timeline-item').count();
  check(heading!=='一起，去日本走走。','Daily hero did not change',{width,day,heading});
  check(entries>0,'No itinerary events',{width,day,entries});
  if(width===390 && [1,2,3,4,5].includes(day)){
    const c=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth}));
    check(c.scrollWidth<=c.width+2,'Day timeline overflow',{width,day,...c});
    if([2,4].includes(day))await page.screenshot({path:'artifacts/screenshots/390-day'+day+'.png',fullPage:true});
  }
 }

 // One pass at phone and desktop dimensions: all nine original plans and comparison dialog.
 if([390,1440].includes(width)){
  for(const [day,options] of [[1,['A','B','C','D']],[2,['A','B','C','D','E']]]){
   await page.locator((width<=790?'.day-tabs button[data-day="':'.day-nav-item[data-day="')+day+'"]').click();
   for(const plan of options){
    await page.locator('button[data-action="plan"][data-plan="'+plan+'"]').click();
    const selected=await page.locator('button[data-action="plan"][data-plan="'+plan+'"]').getAttribute('aria-checked');
    const entries=await page.locator('.timeline-item').count();
    const layout=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth}));
    check(selected==='true','Plan button not selected',{width,day,plan,selected});
    check(entries>1,'Plan events missing',{width,day,plan,entries});
    check(layout.scrollWidth<=layout.width+2,'Plan layout overflow',{width,day,plan,...layout});
    reports.push({width,view:'plan-'+day+'-'+plan,entries,selected});
   }
   await page.locator('button[data-action="compare"]').click();
   check((await page.locator('.modal').count())>0,'Comparison modal missing',{width,day});
   await page.locator('.modal button[data-action="close-modal"]').first().click();
  }

  await page.locator(width<=790?'.bottom-nav button[data-view="overview"]':'.desktop-sections button[data-view="overview"]').click();
  check(await page.locator('.overview-shortcut').count()===3,'Overview must have three quick shortcuts',{width});
  await page.locator('.overview-shortcut[data-view="routes"]').click();
  check(new URL(page.url()).searchParams.get('view')==='routes','Quick transit shortcut failed',{width});
 }

 await page.close();
}

await browser.close();
const summary={testedViewStates:widths.length*views.length,testedWidths:widths,reportEntries:reports.length,issues};
await writeFile('artifacts/report.json',JSON.stringify({summary,reports},null,2));
console.log('TRAVEL WEBSITE VISUAL TEST',JSON.stringify(summary,null,2));
if(process.env.GITHUB_STEP_SUMMARY){
 const md=['## Japan Trip visual smoke test','',widths.length+' screen widths; 4 pages; 5 days; 9 plan choices.','','Problems: '+issues.length,'',...issues.slice(0,30).map(x=>'- '+JSON.stringify(x))].join('\n');
 await writeFile(process.env.GITHUB_STEP_SUMMARY,md,{flag:'a'});
}
if(issues.length)process.exitCode=1;
