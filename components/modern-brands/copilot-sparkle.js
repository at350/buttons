export default {
  id: 'mb-copilot-sparkle',
  credit: 'GitHub Copilot (Primer, dark) — Primer default buttons with the Copilot Octicon; asking makes the goggles blink while "Thinking" shimmers, then the button stays selected with the chat open',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 20px 22px; border-radius: 12px; background: #0d1117; display: flex; gap: 8px; align-items: center;
      font: 500 14px/1 -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Inter, Helvetica, Arial, sans-serif; }
    .btn { height: 32px; padding: 0 12px; border-radius: 6px; border: 1px solid #3d444d; background: #212830; color: #f0f6fc; cursor: pointer; font: inherit;
      display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 0 transparent; -webkit-tap-highlight-color: transparent;
      transition: background .08s cubic-bezier(.33,1,.68,1), border-color .08s cubic-bezier(.33,1,.68,1), color .08s; }
    .btn:hover { background: #262c36; border-color: #3d444d; }
    .btn:active { background: #2a313c; }
    .btn:focus-visible { outline: 2px solid #1f6feb; outline-offset: -2px; box-shadow: none; }
    .btn svg { width: 16px; height: 16px; fill: #9198a1; flex: none; }
    .cp[aria-expanded="true"] { background: #2a313c; border-color: #656c76; }
    .cp[aria-expanded="true"] svg { fill: #f0f6fc; }
    .lbl { display: grid; }
    .lbl span { grid-area: 1 / 1; white-space: nowrap; transition: opacity .08s; }
    .lbl .b { opacity: 0; }
    .cp.busy .lbl .a { opacity: 0; } .cp.busy .lbl .b { opacity: 1; }
    .cp.busy .lbl .b { background: linear-gradient(90deg, #9198a1 0%, #f0f6fc 45%, #9198a1 90%); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: shim 1.2s linear infinite; }
    @keyframes shim { from { background-position: 150% 0; } to { background-position: -50% 0; } }
    .cp .eyes { transform-box: fill-box; transform-origin: center; }
    .cp.busy .eyes { animation: blink 1.2s ease-in-out infinite; }
    .cp.busy svg { fill: #f0f6fc; }
    @keyframes blink { 0%, 40%, 100% { transform: scaleY(1); } 50% { transform: scaleY(.15); } 60% { transform: scaleY(1); } 75% { transform: translateX(-.8px); } 85% { transform: translateX(.8px); } }
    .att[aria-pressed="true"] { border-color: #1f6feb; background: rgba(56,139,253,.1); color: #4493f8; }
    .att[aria-pressed="true"] svg { fill: #4493f8; }
  `,
  html: `
    <div class="stage">
      <button class="btn cp" type="button" aria-expanded="false"><svg viewBox="0 0 16 16"><path d="M7.998 15.035c-4.562 0-7.873-2.914-7.998-3.749V9.338c.085-.628.677-1.686 1.588-2.065.013-.07.024-.143.036-.218.029-.183.06-.384.126-.612-.201-.508-.254-1.084-.254-1.656 0-.87.128-1.769.693-2.484.579-.733 1.494-1.124 2.724-1.261 1.206-.134 2.262.034 2.944.765.05.053.096.108.139.165.044-.057.094-.112.143-.165.682-.731 1.738-.899 2.944-.765 1.23.137 2.145.528 2.724 1.261.566.715.693 1.614.693 2.484 0 .572-.053 1.148-.254 1.656.066.228.098.429.126.612.012.076.024.148.037.218.924.385 1.522 1.471 1.591 2.095v1.872c0 .766-3.351 3.795-8.002 3.795Zm0-1.485c2.28 0 4.584-1.11 5.002-1.433V7.862l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.059-.327-2.71-.991A3.222 3.222 0 0 1 8 6.303a3.24 3.24 0 0 1-.544.743c-.65.664-1.563.991-2.71.991-.652 0-1.236-.081-1.727-.291l-.023.116v4.255c.419.323 2.722 1.433 5.002 1.433ZM6.762 2.83c-.193-.206-.637-.413-1.682-.297-1.019.113-1.479.404-1.713.7-.247.312-.369.789-.369 1.554 0 .793.129 1.171.308 1.371.162.181.519.379 1.442.379.853 0 1.339-.235 1.638-.54.315-.322.527-.827.617-1.553.117-.935-.037-1.395-.241-1.614Zm4.155-.297c-1.044-.116-1.488.091-1.681.297-.204.219-.359.679-.242 1.614.091.726.303 1.231.618 1.553.299.305.784.54 1.638.54.922 0 1.28-.198 1.442-.379.179-.2.308-.578.308-1.371 0-.765-.123-1.242-.37-1.554-.233-.296-.693-.587-1.713-.7Z"/><path d="M6.25 9.037a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75Zm4.25.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 1.5 0Z"/></svg><span class="lbl"><span class="a">Ask Copilot</span><span class="b">Thinking…</span></span></button>
      <button class="btn att" type="button" aria-pressed="false"><svg viewBox="0 0 16 16"><path d="M12.212 3.02a1.753 1.753 0 0 0-2.478.003l-5.83 5.83a3.007 3.007 0 0 0-.88 2.127c0 .795.315 1.551.88 2.116.567.567 1.333.89 2.126.89.79 0 1.548-.321 2.116-.89l5.48-5.48a.75.75 0 0 1 1.061 1.06l-5.48 5.48a4.492 4.492 0 0 1-3.177 1.33c-1.2 0-2.345-.487-3.187-1.33a4.483 4.483 0 0 1-1.32-3.177c0-1.195.475-2.341 1.32-3.186l5.83-5.83a3.25 3.25 0 0 1 5.553 2.297c0 .863-.343 1.691-.953 2.301L7.439 12.39c-.375.377-.884.59-1.416.593a1.998 1.998 0 0 1-1.412-.593 1.992 1.992 0 0 1 0-2.828l5.48-5.48a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-5.48 5.48a.492.492 0 0 0 0 .707.499.499 0 0 0 .352.154.51.51 0 0 0 .356-.154l5.833-5.827a1.755 1.755 0 0 0 0-2.481Z"/></svg>Attach</button>
    </div>`,
  init(root) {
    const b = root.querySelector('.cp'), att = root.querySelector('.att');
    b.querySelectorAll('svg path')[1].classList.add('eyes');
    let t;
    b.addEventListener('click', () => {
      if (b.classList.contains('busy')) return;
      if (b.getAttribute('aria-expanded') === 'true') { b.setAttribute('aria-expanded', 'false'); return; }
      b.classList.add('busy');
      t = setTimeout(() => { b.classList.remove('busy'); b.setAttribute('aria-expanded', 'true'); }, 1600);
    });
    att.addEventListener('click', () => att.setAttribute('aria-pressed', String(att.getAttribute('aria-pressed') !== 'true')));
    return () => clearTimeout(t);
  },
};
