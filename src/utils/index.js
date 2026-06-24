export const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

export const navDelay = 1000;
export const loaderDelay = 2000;

// Wraps numeric metrics (e.g. "14+", "$15k", "250+", "$40,000") in a styled
// span so numbers pop in body copy. Only touches text nodes — never markup
// inside tags/attributes — and skips bare numbers without a $/+/k suffix so
// plain years like "2024" stay untouched.
export const highlightMetrics = (html = '') =>
  html.replace(/>([^<]+)</g, (match, text) => {
    const replaced = text.replace(
      /(^|[^A-Za-z0-9])(\$\d[\d,]*(?:\.\d+)?[kKmM]?\+?|\d[\d,]*(?:\.\d+)?(?:[kKmM]\+?|\+))/g,
      '$1<span class="metric">$2</span>',
    );
    return `>${replaced}<`;
  });

export const KEY_CODES = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_LEFT_IE11: 'Left',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_RIGHT_IE11: 'Right',
  ARROW_UP: 'ArrowUp',
  ARROW_UP_IE11: 'Up',
  ARROW_DOWN: 'ArrowDown',
  ARROW_DOWN_IE11: 'Down',
  ESCAPE: 'Escape',
  ESCAPE_IE11: 'Esc',
  TAB: 'Tab',
  SPACE: ' ',
  SPACE_IE11: 'Spacebar',
  ENTER: 'Enter',
};
