/*
 * Election clocks for Australia and Oceania.
 *
 * The dates are not copied here. This reads the same two data files the
 * P4A boards run on, live, so when an election date is corrected there it
 * is corrected here too. Nothing to keep in step by hand.
 *
 *   window.P4A_STATE_DATA   from p4a.xyz
 *   window.OCEANIA_PULSE    from the Oceania board
 *
 * The Oceania file carries its own rule about confidence, and this keeps
 * it: a country only gets a ticking clock where the term length is a
 * known fixed cycle. Where the cycle is soft, contested or overdue for
 * checking, it gets the due window in words and no clock, because a
 * ticking number on a soft date claims more than anyone knows.
 */
(() => {
  const two = n => String(n).padStart(2, '0');

  const remaining = target => {
    const diff = Date.parse(target) - Date.now();
    if (Number.isNaN(diff)) return null;
    const abs = Math.abs(diff);
    const days = Math.floor(abs / 86400000);
    const hours = Math.floor((abs % 86400000) / 3600000);
    const minutes = Math.floor((abs % 3600000) / 60000);
    return {
      past: diff <= 0,
      text: `${days.toLocaleString()}d ${two(hours)}h ${two(minutes)}m`,
      days,
    };
  };

  // The source files use dashes this site does not.
  const plain = text => String(text)
    .replace(/[\u2014\u2013]/g, ':')
    .replace(/\s*:\s*:/g, ':');

  const row = (name, when, note, state) => {
    const cls = state ? ` class="${state}"` : '';
    return `<tr${cls}><td>${plain(name)}</td><td class="num">${when}</td>` +
           `<td class="small muted">${plain(note)}</td></tr>`;
  };

  /* ---- Australia: states and territories ---- */

  const australia = () => {
    const host = document.querySelector('[data-clocks="australia"]');
    if (!host) return;
    const data = window.P4A_STATE_DATA;
    if (!Array.isArray(data) || !data.length) {
      host.innerHTML = '<p class="small muted">The election dates come from ' +
        'the P4A board and could not be loaded just now. They are all on ' +
        '<a href="https://p4a.xyz/pages/states.html" target="_blank" ' +
        'rel="noopener">the state and territory portal</a>.</p>';
      return;
    }

    const rows = [];

    // The federal date lives in the Oceania file, because that board
    // treats Australia as one country among many. It belongs at the top
    // here: it is the parliament that puts a referendum question.
    const federal = (window.OCEANIA_PULSE?.entries || [])
      .find(e => e.id === 'australia');
    if (federal?.lastElection && federal.termYears) {
      const due = new Date(federal.lastElection);
      due.setFullYear(due.getFullYear() + federal.termYears);
      const left = remaining(due.toISOString());
      if (left && !left.past) {
        rows.push({
          days: -1,
          html: row('Federal', left.text,
            `${federal.dueWindow || 'Due'} · worked out from the last federal ` +
            `election and a ${federal.termYears}-year term, not an announced date`),
        });
      }
    }

    data.forEach(place => {
      const elections = (place.elections || [])
        .filter(e => e.scope === 'general' && Date.parse(e.date) > Date.now())
        .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
      const next = elections[0];
      if (!next) return;
      const left = remaining(next.date);
      if (!left) return;
      const when = new Date(next.date).toLocaleDateString('en-AU',
        { day: 'numeric', month: 'short', year: 'numeric' });
      rows.push({
        days: left.days,
        html: row(place.name, left.text, `${when} · ${next.status || 'Scheduled'}`),
      });
    });

    rows.sort((a, b) => a.days - b.days);
    host.innerHTML = rows.length
      ? '<div class="ledger-wrap"><table class="ledger"><thead><tr>' +
        '<th>Where</th><th class="num">Until the vote</th><th>Election day</th>' +
        '</tr></thead><tbody>' + rows.map(r => r.html).join('') +
        '</tbody></table></div>'
      : '<p class="small muted">No scheduled general elections in the data.</p>';
  };

  /* ---- Oceania ---- */

  const oceania = () => {
    const host = document.querySelector('[data-clocks="oceania"]');
    if (!host) return;
    const data = window.OCEANIA_PULSE;
    if (!data || !Array.isArray(data.entries)) {
      host.innerHTML = '<p class="small muted">The regional cycles come from ' +
        'the P4A Oceania board and could not be loaded just now. They are on ' +
        '<a href="https://auraofintelligence.github.io/p4a-oceania-cinema/pages/pulse.html" ' +
        'target="_blank" rel="noopener">the pulse board</a>.</p>';
      return;
    }

    const ticking = [];
    const windows = [];

    data.entries.forEach(entry => {
      // Only a known fixed term earns a clock. This is the Oceania board's
      // own rule and it is worth keeping: a countdown implies a date.
      // Australia sits in the section above.
      if (entry.id === 'australia') return;
      if (entry.termYears && entry.lastElection && !entry.followup) {
        const due = new Date(entry.lastElection);
        due.setFullYear(due.getFullYear() + entry.termYears);
        const left = remaining(due.toISOString());
        if (left && !left.past) {
          ticking.push({
            days: left.days,
            html: row(entry.name, left.text,
              `${entry.dueWindow || 'Term-length estimate'} · counted from ` +
              `${entry.lastLabel || 'the last election'}, ${entry.termYears}-year term`),
          });
          return;
        }
      }
      windows.push({
        name: entry.name,
        note: entry.dueWindow || 'Cycle needs checking',
        soft: entry.followup ? 'Needs checking' : 'No fixed cycle',
      });
    });

    ticking.sort((a, b) => a.days - b.days);

    let html = '';
    if (ticking.length) {
      html += '<div class="ledger-wrap"><table class="ledger"><thead><tr>' +
        '<th>Where</th><th class="num">Until it is due</th><th>How that is worked out</th>' +
        '</tr></thead><tbody>' + ticking.map(r => r.html).join('') +
        '</tbody></table></div>' +
        '<p class="small muted">These are worked out from the last election ' +
        'and the length of the term, not from an announced date. They move ' +
        'when a date is called.</p>';
    }
    if (windows.length) {
      html += '<h3>Counted differently</h3><p class="measure small muted">' +
        'These ones get a window rather than a clock, because the cycle is ' +
        'soft, contested, or overdue for a check. A ticking number here ' +
        'would say more than anybody knows.</p><p>' +
        windows.map(w => `<span class="chip">${plain(w.name)}: ${plain(w.note)}</span>`).join(' ') +
        '</p>';
    }
    host.innerHTML = html;
  };

  const start = () => { australia(); oceania(); };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
