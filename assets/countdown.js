/*
 * Countdown to a fixed moment, condensed to one line.
 *
 * Mirrors the pattern used on the P4A state portal: the target sits in a
 * data-countdown attribute as an ISO timestamp with its own offset, so the
 * date is visible in the markup and correct from any timezone a reader
 * happens to be in.
 *
 * Progressive enhancement: the element ships with the date written out in
 * words, which is what a reader sees with JavaScript off.
 */
(() => {
  const clocks = Array.from(document.querySelectorAll('[data-countdown]'));
  if (!clocks.length) return;

  const two = n => String(n).padStart(2, '0');

  const render = element => {
    const target = Date.parse(element.getAttribute('data-countdown'));
    if (Number.isNaN(target)) {
      element.setAttribute('data-countdown-state', 'invalid');
      return;
    }

    const diff = target - Date.now();
    const abs = Math.abs(diff);
    const days = Math.floor(abs / 86400000);
    const hours = Math.floor((abs % 86400000) / 3600000);
    const minutes = Math.floor((abs % 3600000) / 60000);
    const seconds = Math.floor((abs % 60000) / 1000);

    if (diff <= 0) {
      // A past date counts up instead, which is how long a thing has been
      // running rather than how long until it starts.
      element.textContent = days < 1
        ? `${two(hours)}h ${two(minutes)}m ${two(seconds)}s ago`
        : `${days.toLocaleString()}d ${two(hours)}h ${two(minutes)}m`;
      element.setAttribute('data-countdown-state', 'past');
      return;
    }

    element.textContent =
      `${days.toLocaleString()}d ${two(hours)}h ${two(minutes)}m ${two(seconds)}s`;
    element.setAttribute('data-countdown-state', 'future');
  };

  const tick = () => clocks.forEach(render);
  tick();
  setInterval(tick, 1000);
})();
