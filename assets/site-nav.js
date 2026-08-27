/*
 * Site chrome for Australian Law 2012: Luke's Relevance.
 * One data file describes every room. The header, full-screen index,
 * breadcrumbs, next-room links and footer explore-columns are generated
 * from it, so a new page only needs an entry here to appear everywhere.
 * Progressive enhancement: without JS, the static brand link and the
 * noscript footer list still cover the whole site.
 */
(() => {
  document.documentElement.classList.add('js');

  /* Resolve the site root from the styles.css link, so this works from
     index.html and pages/ alike. */
  const styleLink = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  const P = styleLink ? styleLink.getAttribute('href').split('assets/styles.css')[0] : './';

  const SECTIONS = [
    {
      id: 'start', num: '01', label: 'Start here',
      blurb: 'The front door, the cabinet itself, and the method anyone can copy.',
      links: [
        { href: 'index.html', title: 'Home', note: 'The 2013 story and the map of every room.' },
        { href: 'pages/filing-cabinet.html', title: 'The filing cabinet', note: 'All 61 documents from the 2012 collection, as a ledger.' },
        { href: 'pages/the-method.html', title: 'The method', note: 'The Relevance Ladder: gather, chomp, sort, plan, act.' },
        { href: 'pages/site-map.html', title: 'Site map', note: 'Every room on one page, no JavaScript needed.' }
      ]
    },
    {
      id: 'engine', num: '02', label: 'The engine',
      blurb: 'The robot lawyer that never gets tired, and the bar it has to clear.',
      links: [
        { href: 'pages/the-engine.html', title: 'The legal engine', note: 'The design: from nine statute books to grounded, cited answers.' },
        { href: 'pages/nine-registers.html', title: 'Nine registers', note: 'Where Australian law actually lives, tier by tier.' },
        { href: 'pages/honesty.html', title: 'The honesty chip', note: 'Not legal advice. What "gets it right" has to mean.' }
      ]
    },
    {
      id: 'yourlaw', num: '03', label: 'Your law',
      blurb: 'Relevance-first: start from your own wallet, not from A.',
      links: [
        { href: 'pages/your-relevance.html', title: 'Your relevance', note: 'Life domains mapped to the acts that touch them.' },
        { href: 'pages/sort-bench.html', title: 'The sorting bench', note: 'Serves, bites, broken, missing. Dials, not verdicts.' }
      ]
    },
    {
      id: 'change', num: '04', label: 'Change it',
      blurb: 'From gripe to statute, inside the rules the whole way.',
      links: [
        { href: 'pages/change-the-law.html', title: 'Change the law', note: 'The reform ladder: forms, submissions, members, referendums.' },
        { href: 'pages/gamify-democracy.html', title: 'Gamify democracy', note: 'The rulebook is hidden. Good games publish theirs.' },
        { href: 'pages/cyber-republic.html', title: 'Cyber republic', note: 'The long game: reflect through all law, then ask the country.' }
      ]
    },
    {
      id: 'neighbours', num: '05', label: 'Neighbours',
      blurb: 'The rooms next door and the terms of use.',
      links: [
        { href: 'pages/workbench-bridge.html', title: 'Neighbouring rooms', note: 'The Legal Memory Workbench and the wider shelf.' },
        { href: 'licence.html', title: 'Licence', note: 'The Strange But True Public Source Licence, in plain words.' }
      ]
    }
  ];

  const FLAT = SECTIONS.flatMap(s => s.links.map(l => ({ ...l, section: s })));
  const here = location.pathname.split('/').pop() || 'index.html';
  const hereIdx = FLAT.findIndex(l => l.href.split('/').pop() === here);

  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const MARK = '<svg class="brand-mark" viewBox="0 0 26 26" aria-hidden="true"><rect x="1" y="7" width="24" height="18" rx="3" fill="#a97ef5"/><path d="M1 10a3 3 0 0 1 3-3h7l2-3h9" fill="none" stroke="#e0b04f" stroke-width="2" stroke-linecap="round"/><rect x="5" y="12" width="16" height="2" rx="1" fill="#160f20"/><rect x="5" y="16" width="12" height="2" rx="1" fill="#160f20"/></svg>';

  /* ---- header ---- */
  const head = document.querySelector('.site-head');
  if (head) {
    head.innerHTML =
      '<a class="brand" href="' + P + 'index.html">' + MARK +
      '<span>Luke’s Relevance<span class="brand-sub">Australian Law 2012</span></span></a>' +
      '<nav class="head-links" aria-label="Quick links">' +
      '<a class="hide-sm" href="' + P + 'pages/filing-cabinet.html">Cabinet</a>' +
      '<a class="hide-sm" href="' + P + 'pages/the-engine.html">Engine</a>' +
      '<a class="hide-sm" href="' + P + 'pages/change-the-law.html">Change it</a>' +
      '<button class="index-toggle" type="button" aria-expanded="false">Index</button>' +
      '</nav>';
  }

  /* ---- full-screen index ---- */
  const overlay = document.createElement('div');
  overlay.className = 'site-index';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Site index');
  overlay.innerHTML =
    '<button class="index-close" type="button">Close</button>' +
    '<div class="index-grid">' +
    SECTIONS.map(s =>
      '<div class="index-col">' +
      '<h3><span class="col-num">' + s.num + '</span>' + esc(s.label) + '</h3>' +
      '<p class="col-blurb">' + esc(s.blurb) + '</p>' +
      '<ul>' + s.links.map(l =>
        '<li><a href="' + P + l.href + '">' + esc(l.title) + '</a>' +
        '<span class="note">' + esc(l.note) + '</span></li>').join('') +
      '</ul></div>').join('') +
    '</div>';
  document.body.appendChild(overlay);

  const toggle = document.querySelector('.index-toggle');
  const close = overlay.querySelector('.index-close');
  const setOpen = open => {
    overlay.classList.toggle('open', open);
    if (toggle) toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  if (toggle) toggle.addEventListener('click', () => setOpen(!overlay.classList.contains('open')));
  close.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });

  /* ---- breadcrumbs ---- */
  const crumbs = document.querySelector('.crumbs');
  if (crumbs && hereIdx > -1 && here !== 'index.html') {
    const l = FLAT[hereIdx];
    crumbs.innerHTML =
      '<a href="' + P + 'index.html">Home</a><span class="sep">/</span>' +
      '<span>' + esc(l.section.label) + '</span><span class="sep">/</span>' +
      '<span aria-current="page">' + esc(l.title) + '</span>';
  }

  /* ---- next room ---- */
  const nextRoom = document.querySelector('.next-room');
  if (nextRoom && hereIdx > -1) {
    const prev = FLAT[(hereIdx - 1 + FLAT.length) % FLAT.length];
    const next = FLAT[(hereIdx + 1) % FLAT.length];
    nextRoom.innerHTML =
      '<a href="' + P + prev.href + '"><span class="dir">Previous room</span>' + esc(prev.title) + '</a>' +
      '<a href="' + P + next.href + '" style="text-align:right"><span class="dir">Next room</span>' + esc(next.title) + '</a>';
  }

  /* ---- footer ---- */
  const foot = document.querySelector('.site-foot');
  if (foot) {
    foot.innerHTML =
      '<div class="foot-inner">' +
      '<div class="foot-cols">' +
      SECTIONS.map(s =>
        '<div><h3><span class="col-num">' + s.num + '</span> ' + esc(s.label) + '</h3><ul>' +
        s.links.map(l => '<li><a href="' + P + l.href + '">' + esc(l.title) + '</a></li>').join('') +
        '</ul></div>').join('') +
      '<div><h3>Next door</h3><ul>' +
      '<li><a href="https://auraofintelligence.github.io/legal-memory-workbench/" rel="noopener">Legal Memory Workbench</a></li>' +
      '<li><a href="https://p4a.xyz/pages/site-map.html" rel="noopener">P4A site map</a></li>' +
      '<li><a href="https://auraofintelligence.github.io/strange-but-true/" rel="noopener">Strange But True</a></li>' +
      '<li><a href="https://auraofintelligence.github.io/" rel="noopener">Aura of Intelligence</a></li>' +
      '</ul></div>' +
      '</div>' +
      '<div class="foot-sig">' +
      '<span class="sig">A Luke × Claude build · Minjerribah, Quandamooka Country</span>' +
      '<span>Legal information, never legal advice · <a href="' + P + 'licence.html">Licence</a> · <a href="https://github.com/auraofintelligence/australian-law-2012-lukes-relevance" rel="noopener">Source</a></span>' +
      '</div></div>';
  }
})();
