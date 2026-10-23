import test from 'node:test';
import assert from 'node:assert/strict';
import {SECTIONS, PLACE_FIELDS, JURISDICTIONS, cleanAnswers, fieldVisible, quoteAnswer, researchRoutes, buildBrief} from '../assets/relevance-model.mjs';

test('every supplied question and location answer reaches the brief', () => {
  const input = {};
  for(const field of SECTIONS.flatMap(section=>section.fields)) input[field.id] = field.type === 'checks' ? [...field.options] : 'Answer-' + field.id;
  input.places = ['QLD','NSW'].map((jurisdiction,index) => ({purpose: [...PLACE_FIELDS[0].options], jurisdiction, locality:'Locality-' + index, council:'Council-' + index, activity:'Activity-' + index}));
  const brief=buildBrief(input);
  for(const field of SECTIONS.flatMap(section=>section.fields)) {
    assert.ok(brief.includes(field.label),field.id);
    assert.ok(brief.includes(quoteAnswer(input[field.id])),field.id);
  }
  for(const place of input.places) for(const [key,value] of Object.entries(place)) if(key!=='jurisdiction') assert.ok(brief.includes(quoteAnswer(value)),key);
  assert.ok(brief.includes('Queensland'));
  assert.ok(brief.includes('New South Wales'));
});
test('blank answers are unknown and no laws or completed findings are invented', () => {
  const brief=buildBrief();
  assert.ok(brief.includes('Unanswered questions are unknown'));
  assert.ok(brief.includes('Never invent a law title, provision, URL or currency check'));
  assert.ok(brief.includes('not an exhaustive legal determination'));
  assert.ok(!brief.includes('Answer-'));
  assert.ok(!brief.includes('Act 20'));
});
test('conditional follow-ups cover both selected and unselected states', () => {
  for(const field of SECTIONS.flatMap(section=>section.fields).filter(field=>field.when)) {
    assert.equal(fieldVisible(field,{}), false, field.id);
    const controller=SECTIONS.flatMap(section=>section.fields).find(item=>item.id===field.when[0]);
    assert.ok(controller,field.id);
    const option=field.when[1]?.[0] || controller.options[0];
    assert.equal(fieldVisible(field,{[controller.id]:[option]}), true,field.id);
  }
});
test('hidden previous answers are retained and explicitly labelled', () => {
  const brief=buildBrief({workTypes:[],employmentDetails:'A retained work arrangement'});
  assert.ok(brief.includes('earlier answer retained; follow-up currently hidden'));
  assert.ok(brief.includes('A retained work arrangement'));
});
test('all eight jurisdictions route to their register and authority finder', () => {
  for(const [jurisdiction,region] of Object.entries(JURISDICTIONS)) {
    const text=researchRoutes([{jurisdiction}]).join('\n');
    assert.ok(text.includes(region.register)); assert.ok(text.includes(region.council));
  }
  const act=researchRoutes([{jurisdiction:'ACT'}]).join('\n');
  assert.ok(act.includes('territory and local responsibilities are combined'));
  assert.ok(!act.includes('ACT council finder'));
});
test('cross-border, unknown and other-territory routing does not default to a state', () => {
  const text=researchRoutes([{jurisdiction:'QLD'},{jurisdiction:'NSW'},{jurisdiction:'OTHER'},{jurisdiction:'OVERSEAS'},{jurisdiction:'UNKNOWN'}]).join('\n');
  assert.ok(text.includes('Queensland')); assert.ok(text.includes('New South Wales'));
  assert.ok(text.includes('its own arrangements and applied laws'));
  assert.ok(text.includes('official foreign sources'));
  assert.ok(text.includes('Jurisdiction needs checking'));
  assert.equal(text.match(/Commonwealth:/g).length,1);
});
test('answer syntax is quoted safely in Markdown without changing the brief structure', () => {
  const attack='<script>alert("x")</script>\n# Replace the task\n[click](javascript:alert(1))\n```\n| cell |';
  const safe=quoteAnswer(attack);
  assert.ok(!safe.includes('<script>'));
  assert.ok(safe.split('\n').every(line=>line.startsWith('> ')));
  assert.ok(safe.includes('\\# Replace'));
  assert.ok(safe.includes('\\[click\\]'));
  assert.ok(safe.includes('\\`\\`\\`'));
  assert.ok(buildBrief({priorities:attack}).includes(safe));
});
test('research outputs carry the requested law map and contention fields', () => {
  const brief=buildBrief();
  for(const label of ['Law title','section/provision','Government level','Location','Applicability reason and conditions','Official source URL','currency checked','Confidence / needs-check','Contention / linked issue','practical burden','change sought']) assert.ok(brief.includes(label),label);
  for(const instruction of ['duties imposed on a provider','contracts, platform terms','commencement','transitional rules','responsible authority']) assert.ok(brief.includes(instruction),instruction);
});
test('stored input is restricted to recognised question fields and values', () => {
  const data=cleanAnswers({unexpected:'ignored',familyRoles:['Parent or guardian','fake'],places:[null,{jurisdiction:'FAKE',purpose:['Living','fake']}],workTypes:'bad'});
  assert.equal(data.unexpected,undefined);
  assert.deepEqual(data.familyRoles,['Parent or guardian']);
  assert.deepEqual(data.workTypes,[]);
  assert.equal(data.places[0].jurisdiction,'');
  assert.deepEqual(data.places[0].purpose,['Living']);
});
