// Run with Playwright installed, or PLAYWRIGHT_MODULE set to its index.mjs file URL.
// Uses only an ephemeral browser profile and a localhost static server.
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile, mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {SECTIONS, PLACE_FIELDS, buildBrief, quoteAnswer} from '../assets/relevance-model.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root=path.resolve(fileURLToPath(new URL('../',import.meta.url)));
const qa=path.resolve(root,'..','questionnaire-qa'); await mkdir(qa,{recursive:true});
const types={'.html':'text/html','.css':'text/css','.mjs':'text/javascript','.js':'text/javascript','.svg':'image/svg+xml'};
const server=createServer(async(req,res)=>{
  const filename=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if(!filename.startsWith(root+path.sep) && filename!==root){res.writeHead(403).end();return;}
  try {res.writeHead(200,{'Content-Type':types[path.extname(filename)]||'application/octet-stream'});res.end(await readFile(filename));}
  catch {res.writeHead(404).end();}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'msedge',headless:true});
const checks=[];
try {
  const context=await browser.newContext({viewport:{width:1366,height:900},permissions:['clipboard-read','clipboard-write'],reducedMotion:'reduce'});
  const page=await context.newPage(); const errors=[]; const requests=[];
  page.on('pageerror',error=>errors.push(error.message)); page.on('request',request=>requests.push(request.url()));
  const goto=async()=>{await page.goto(origin+'/pages/your-relevance.html');await page.locator('#questionnaire').waitFor({state:'visible'});};
  await goto();
  if(process.env.RELEVANCE_FOCUS === 'top') {
    for(const width of [320,390,768,1366]) {
      await page.setViewportSize({width,height:844});
      await page.evaluate(()=>scrollTo(0,0));
      await page.waitForTimeout(100);
      assert.equal(await page.locator('#to-top').isVisible(),false);
      for(const fraction of [.2,.4,.6,.8,1]) {
        await page.evaluate(f=>scrollTo(0,(document.body.scrollHeight-innerHeight)*f),fraction);
        await page.waitForTimeout(100);
        assert.equal(await page.evaluate(()=>{
          const top=document.querySelector('#to-top'); if(top.hidden) return false;
          const box=top.getBoundingClientRect();
          return [...document.querySelectorAll('input,textarea,select,button,a,label,summary,[tabindex]')].filter(el=>el!==top&&el.getClientRects().length).some(el=>{
            const r=el.getBoundingClientRect();return r.left<box.right+8&&r.right>box.left-8&&r.top<box.bottom+8&&r.bottom>box.top-8;
          });
        }),false,'floating control overlap at '+width+'/'+fraction);
      }
      await page.locator('#to-top').waitFor({state:'visible'});
      await page.locator('#to-top').focus(); await page.keyboard.press('Enter');
      assert.equal(await page.evaluate(()=>document.activeElement.tagName),'H1');
      assert.ok(await page.evaluate(()=>scrollY<2));
    }
    await page.setViewportSize({width:390,height:844});
    await page.evaluate(()=>scrollTo(0,0)); await page.screenshot({path:path.join(qa,'mobile-top.png'),fullPage:false});
    await page.locator('#section-choice').selectOption('2');
    await page.screenshot({path:path.join(qa,'mobile-housing.png'),fullPage:false});
    assert.deepEqual(errors,[]);
    const evidence={checked:new Date().toISOString(),checks:['To top hidden at page top','No collision with controls at five scroll positions across 320/390/768/1366px','Keyboard activation returns scroll and focus to the heading','Mobile top and housing viewport screenshots'],errors};
    await writeFile(path.join(qa,'floating-checks.json'),JSON.stringify(evidence,null,2));
    console.log(JSON.stringify(evidence,null,2));
    await context.close();
  } else {
  assert.equal(await page.locator('#remember').isChecked(),false);
  assert.equal(await page.evaluate(()=>localStorage.length),0);
  assert.equal(await page.locator('.question-panel:visible').count(),1);
  await page.screenshot({path:path.join(qa,'desktop-start.png'),fullPage:true});
  checks.push('Default saving off; one visible section; desktop screenshot');

  // Actual DOM entry for every schema field, including each conditional branch.
  const input={};
  for(const [index,section] of SECTIONS.entries()) {
    await page.locator('#section-list button').nth(index).click();
    assert.equal(await page.evaluate(()=>document.activeElement?.id),section.id+'-heading');
    for(const field of section.fields) {
      if(field.type==='checks') {
        input[field.id]=[...field.options];
        const boxes=page.locator('[name="'+field.id+'"]');
        for(let i=0;i<field.options.length;i++) await boxes.nth(i).check();
      } else {
        input[field.id]='Answer-'+field.id;
        await page.locator('#'+field.id).fill(input[field.id]);
      }
    }
  }
  await page.locator('#section-list button').nth(0).click();
  input.places=[];
  for(const [index,jurisdiction] of ['QLD','NSW','ACT','OTHER','OVERSEAS','UNKNOWN'].entries()) {
    if(index) await page.locator('#add-place').click();
    const card=page.locator('.place-card').nth(index);
    for(const field of PLACE_FIELDS) {
      const controls=card.locator('[name$="-'+field.id+'"]');
      if(field.type==='checks') await controls.first().check();
      else if(field.type==='select') await controls.selectOption(jurisdiction);
      else await controls.fill(field.id+'-'+index);
    }
    input.places.push({purpose:['Living'],jurisdiction,locality:'locality-'+index,council:'council-'+index,activity:'activity-'+index});
  }
  assert.ok((await page.locator('.place-card').nth(2).innerText()).includes('ACT combines territory and local responsibilities'));
  assert.equal(await page.evaluate(()=>localStorage.length),0);
  await page.locator('#review-brief').click();
  assert.equal(await page.locator('#brief-output').inputValue(),buildBrief(input));
  checks.push('All question fields and six location routes exported; no implicit persistence');
  const cleanBrief=await page.locator('#brief-output').inputValue();
  await page.locator('#copy-brief').click();
  assert.equal((await page.evaluate(()=>navigator.clipboard.readText())).replace(/\r\n/g,'\n'),cleanBrief);
  const downloaded=page.waitForEvent('download'); await page.locator('#download-brief').click();
  const download=await downloaded;
  assert.equal(download.suggestedFilename(),'my-australian-law-research-brief.md');
  assert.equal(await readFile(await download.path(),'utf8'),cleanBrief);
  checks.push('Clipboard (normalising Windows line endings) and downloaded Markdown match visible brief');

  await page.locator('#remember').check();
  await page.reload(); await page.locator('#questionnaire').waitFor({state:'visible'});
  assert.equal(await page.locator('#remember').isChecked(),true);
  assert.equal(await page.locator('#brief-output').inputValue(),cleanBrief);
  const edited=cleanBrief+'\nReader edit to preserve.\n';
  await page.locator('#brief-output').fill(edited);
  await page.reload(); await page.locator('#questionnaire').waitFor({state:'visible'});
  assert.equal(await page.locator('#brief-output').inputValue(),edited);
  checks.push('Opt-in persistence restores all answers, section and edited brief');

  await page.locator('#section-list button').nth(3).click();
  const employee=page.locator('[name="workTypes"][value="Employee"]');
  await employee.uncheck();
  await page.locator('[name="workTypes"][value="Apprentice or trainee"]').uncheck();
  assert.equal(await page.locator('#employmentDetails').isVisible(),false);
  assert.ok(await page.locator('[data-retained="work"]').isVisible());
  await page.locator('#review-brief').click();
  assert.equal(await page.locator('#brief-output').inputValue(),edited);
  assert.ok((await page.locator('#brief-status').innerText()).includes('Answers changed'));
  page.once('dialog',dialog=>dialog.dismiss()); await page.locator('#rebuild-brief').click();
  assert.equal(await page.locator('#brief-output').inputValue(),edited);
  page.once('dialog',dialog=>dialog.accept()); await page.locator('#rebuild-brief').click();
  assert.ok((await page.locator('#brief-output').inputValue()).includes('earlier answer retained; follow-up currently hidden'));
  assert.ok((await page.locator('#brief-output').inputValue()).includes('Answer-employmentDetails'));
  checks.push('Conditional hiding retains and labels earlier answers; rebuild cancel/confirm protects edits');

  const beforeReset=await page.locator('#brief-output').inputValue();
  page.once('dialog',dialog=>dialog.dismiss()); await page.locator('[data-reset]').last().click();
  assert.equal(await page.locator('#brief-output').inputValue(),beforeReset);
  assert.equal(await page.locator('#remember').isChecked(),true);
  page.once('dialog',dialog=>dialog.accept()); await page.locator('[data-reset]').last().click();
  assert.equal(await page.locator('#remember').isChecked(),false);
  assert.equal(await page.evaluate(()=>localStorage.length),0);
  assert.equal(await page.locator('#priorities').inputValue(),'');
  await page.reload(); await page.locator('#questionnaire').waitFor({state:'visible'});
  assert.equal(await page.locator('#priorities').inputValue(),'');
  checks.push('Reset cancel keeps draft; confirm removes saved answers, edited brief and consent');

  const attack='<img src=x onerror="window.answerExecuted=true">\n# Heading\n[click](javascript:alert(1))\n```';
  await page.locator('#priorities').fill(attack);
  await page.locator('#review-brief').click();
  assert.ok((await page.locator('#brief-output').inputValue()).includes(quoteAnswer(attack)));
  assert.equal(await page.locator('#questionnaire img').count(),0);
  assert.equal(await page.evaluate(()=>window.answerExecuted),undefined);
  assert.ok(requests.every(url=>url.startsWith(origin+'/') && !url.includes('Answer-')));
  checks.push('HTML/Markdown answer escaping; no answer requests or third-party questionnaire requests');

  // Persistence opt-out removes only this tool's key, preserving unrelated site data.
  await page.evaluate(()=>localStorage.setItem('unrelated-test','keep'));
  await page.locator('#remember').check(); await page.locator('#remember').uncheck();
  assert.equal(await page.evaluate(()=>localStorage.getItem('lukes-relevance-reader-draft-v1')),null);
  assert.equal(await page.evaluate(()=>localStorage.getItem('unrelated-test')),'keep');
  await page.evaluate(()=>localStorage.removeItem('unrelated-test'));
  checks.push('Opt-out removes questionnaire draft and preserves unrelated storage');

  page.once('dialog',dialog=>dialog.accept()); await page.locator('[data-reset]').last().click();
  await page.setViewportSize({width:390,height:844});
  assert.equal(await page.locator('#section-choice').isVisible(),true);
  assert.equal(await page.locator('#section-list').isVisible(),false);
  await page.locator('#section-choice').selectOption('4');
  assert.equal(await page.evaluate(()=>document.activeElement.id),'business-heading');
  await page.locator('#businessActivity').focus(); await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(()=>document.activeElement.id),'businessRequirements');
  const outline=await page.evaluate(()=>getComputedStyle(document.activeElement).outlineStyle);
  assert.notEqual(outline,'none');
  for(const width of [320,390,768,1366]) {
    await page.setViewportSize({width,height:900});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth), 'horizontal overflow at '+width);
    assert.ok(await page.evaluate(()=>[...document.querySelectorAll('input,select,textarea,button')].filter(el=>el.getClientRects().length).every(el=>parseFloat(getComputedStyle(el).fontSize)>=16)), 'font size at '+width);
  }
  await page.setViewportSize({width:390,height:844});
  await page.locator('#section-choice').selectOption('0');
  await page.screenshot({path:path.join(qa,'mobile-form.png'),fullPage:true});
  await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));
  await page.locator('#to-top').click();
  assert.equal(await page.evaluate(()=>document.activeElement.tagName),'H1');
  assert.ok(await page.evaluate(()=>scrollY<2));
  checks.push('320/390/768/1366px without horizontal overflow; 16px controls; keyboard focus, hidden-field skipping and To top');

  // Every local link resolves. External links use the researched static directory.
  const localLinks=await page.locator('a[href]').evaluateAll(links=>[...new Set(links.map(a=>a.href).filter(href=>href.startsWith(location.origin)))].map(href=>href.split('#')[0]));
  for(const href of localLinks) assert.equal((await context.request.get(href)).status(),200,href);
  checks.push('Local navigation, licence, method and historical links resolve');
  assert.deepEqual(errors,[]);

  const blocked=await browser.newContext({viewport:{width:390,height:844}});
  await blocked.addInitScript(()=>{
    Storage.prototype.setItem=function(){throw new Error('blocked');};
    Storage.prototype.removeItem=function(){throw new Error('blocked');};
    Object.defineProperty(navigator,'clipboard',{value:{writeText:async()=>{throw new Error('blocked');}}});
  });
  const blockedPage=await blocked.newPage();
  await blockedPage.goto(origin+'/pages/your-relevance.html');
  await blockedPage.locator('#questionnaire').waitFor({state:'visible'});
  await blockedPage.locator('#priorities').fill('Keep tab answers'); await blockedPage.locator('#remember').check();
  assert.ok((await blockedPage.locator('#save-status').innerText()).includes('saving failed'));
  await blockedPage.locator('#review-brief').click(); await blockedPage.locator('#copy-brief').click();
  assert.ok((await blockedPage.locator('#export-status').innerText()).includes('manual copying'));
  assert.equal(await blockedPage.evaluate(()=>document.activeElement.id),'brief-output');
  blockedPage.once('dialog',dialog=>dialog.accept()); await blockedPage.locator('[data-reset]').last().click();
  assert.ok((await blockedPage.locator('#save-status').innerText()).includes('could not be removed'));
  checks.push('Blocked storage and clipboard report truthful recovery; form remains usable');
  await blocked.close(); await context.close();
  await writeFile(path.join(qa,'checks.json'),JSON.stringify({checked:new Date().toISOString(),checks,errors},null,2));
  console.log(JSON.stringify({checks,errors,qa},null,2));
  }
} finally {await browser.close(); await new Promise(resolve=>server.close(resolve));}
