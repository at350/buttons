// Material Design 2 radio (MDC Web mdc-radio + mdc-form-field): 20px ring, 2px border rgba(0,0,0,.54),
// checked = baseline secondary #018786; inner dot is a 20px circle with a 10px border scaled 0 → .5
// (120ms cubic-bezier(0,0,.2,1) in, 90ms cubic-bezier(.4,0,.6,1) out); 40px ripple / state layer
// (hover 4%, focus 12%, press 12%); Roboto 14px/.25px label at rgba(0,0,0,.87).
export default {
  id: 'in-dot-radio',
  credit: 'Material Design 2 radio button (MDC Web) — teal #018786 ring, inner dot scales in, 40px ripple, Roboto labels',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .g { display: inline-flex; gap: 8px; font: 400 14px/20px "Roboto Flex", Roboto, system-ui, sans-serif; letter-spacing: .25px; color: rgba(0,0,0,.87); }
    .f { display: inline-flex; align-items: center; padding-right: 8px; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; outline: 0; white-space: nowrap; }
    .r { position: relative; width: 40px; height: 40px; display: grid; place-items: center; }
    .r::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: #000; opacity: 0; transition: opacity 15ms linear, background-color 15ms linear; }
    .f[aria-checked="true"] .r::before { background: #018786; }
    .f:hover .r::before { opacity: .04; }
    .f:focus-visible .r::before { opacity: .12; }
    .f:active .r::before { opacity: .12; transition-duration: 75ms; }
    .ring { position: relative; width: 20px; height: 20px; border-radius: 50%; border: 2px solid rgba(0,0,0,.54); transition: border-color 120ms cubic-bezier(0,0,.2,1); }
    .ring::after {
      content: ''; position: absolute; left: -2px; top: -2px; width: 20px; height: 20px; border-radius: 50%; border: 10px solid #018786;
      box-sizing: border-box; transform: scale(0); transition: transform 90ms cubic-bezier(.4,0,.6,1);
    }
    .f[aria-checked="true"] .ring { border-color: #018786; }
    .f[aria-checked="true"] .ring::after { transform: scale(.5); transition: transform 120ms cubic-bezier(0,0,.2,1); }
  `,
  html: `<div class="g" role="radiogroup" aria-label="Size">
    <button class="f" type="button" role="radio" aria-checked="false"><span class="r"><span class="ring"></span></span>Small</button>
    <button class="f" type="button" role="radio" aria-checked="true"><span class="r"><span class="ring"></span></span>Medium</button>
    <button class="f" type="button" role="radio" aria-checked="false"><span class="r"><span class="ring"></span></span>Large</button>
  </div>`,
  init(root) {
    const g = root.querySelector('.g'), rs = [...root.querySelectorAll('.f')];
    let idx = 1;
    const set = (i, focus) => {
      idx = (i + rs.length) % rs.length;
      rs.forEach((r, j) => r.setAttribute('aria-checked', j === idx));
      if (focus) rs[idx].focus({ preventScroll: true });
    };
    rs.forEach((r, i) => r.addEventListener('click', () => set(i)));
    g.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); set(idx + 1, true); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); set(idx - 1, true); }
    });
  },
};
