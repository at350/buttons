export default {
  id: 'core-plain-range',
  credit: 'Browser default <input type="range">, untouched',
  size: 'full',
  css: `
    :host { display: block; }
    input { width: 100%; margin: 0; display: block; }
  `,
  html: `<input type="range" min="0" max="100" value="40" aria-label="range">`,
};
