export default {
  id: 'mb-perplexity-ask',
  credit: 'Perplexity (dark) — the ask box with the Search / Research / Labs mode switch, attach and the teal submit square that wakes as you type and fires the arrow off when sent',
  size: 'wide',
  css: `
    :host { display: block; }
    .stage { padding: 22px; border-radius: 12px; background: #191a1a; font: 400 15px/1.4 Inter, -apple-system, system-ui, sans-serif; color: #e8e8e6; }
    .brand { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 16px; font-size: 22px; font-weight: 400; letter-spacing: -.03em; color: #e8e8e6; }
    .brand svg { width: 26px; height: 26px; fill: #20b8cd; }
    .box { border-radius: 16px; background: #202222; border: 1px solid #3a3d3d; padding: 12px 10px 10px 14px; max-width: 100%; transition: border-color .2s; }
    .box:focus-within { border-color: #575c5c; }
    textarea { display: block; width: 100%; height: 44px; resize: none; border: 0; outline: none; background: transparent; color: inherit; font: inherit; padding: 0; }
    textarea::placeholder { color: #8d9191; }
    .ctl { display: flex; align-items: center; gap: 6px; margin-top: 6px; }
    .seg { display: flex; padding: 2px; gap: 2px; border-radius: 10px; background: #191a1a; }
    .md { height: 30px; width: 36px; border: 1px solid transparent; border-radius: 8px; background: transparent; color: #8d9191; cursor: pointer; display: grid; place-items: center; transition: color .15s, background .15s, border-color .15s; -webkit-tap-highlight-color: transparent; }
    .md:hover { color: #e8e8e6; }
    .md[aria-checked="true"] { background: #2b2d2d; border-color: #3a3d3d; color: #20b8cd; }
    .md svg, .ib svg, .go svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .ib { margin-left: auto; width: 32px; height: 32px; border: 0; border-radius: 8px; background: transparent; color: #8d9191; cursor: pointer; display: grid; place-items: center; transition: color .15s, background .15s; }
    .ib:hover { background: #2b2d2d; color: #e8e8e6; }
    .md:focus-visible, .ib:focus-visible, .go:focus-visible { outline: 2px solid #20808d; outline-offset: 2px; }
    .go { width: 36px; height: 32px; border-radius: 8px; border: 0; background: #2b2d2d; color: #6b7070; cursor: default; display: grid; place-items: center; overflow: hidden;
      transition: background .2s, color .2s, transform .15s; -webkit-tap-highlight-color: transparent; }
    .go.live { background: #20808d; color: #fff; cursor: pointer; }
    .go.live:hover { background: #1a6c77; }
    .go.live:active { transform: scale(.94); }
    .go.fire svg { animation: off .5s cubic-bezier(.2,.8,.2,1); }
    @keyframes off { 0% { transform: none; } 45% { transform: translateX(26px); opacity: 0; } 46% { transform: translateX(-26px); opacity: 0; } 100% { transform: none; opacity: 1; } }
  `,
  html: `
    <div class="stage">
      <div class="brand"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z"/></svg>perplexity</div>
      <div class="box">
        <textarea rows="2" placeholder="Ask anything…" aria-label="Ask anything"></textarea>
        <div class="ctl">
          <div class="seg" role="radiogroup" aria-label="Mode">
            <button class="md" type="button" role="radio" aria-checked="true" aria-label="Search"><svg viewBox="0 0 24 24"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg></button>
            <button class="md" type="button" role="radio" aria-checked="false" aria-label="Research"><svg viewBox="0 0 24 24"><path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44"/><path d="m13.56 11.747 4.332-.924"/><path d="m16 21-3.105-6.21"/><path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z"/><path d="m6.158 8.633 1.114 4.456"/><path d="m8 21 3.105-6.21"/><circle cx="12" cy="13" r="2"/></svg></button>
            <button class="md" type="button" role="radio" aria-checked="false" aria-label="Labs"><svg viewBox="0 0 24 24"><path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"/><path d="M6.453 15h11.094"/><path d="M8.5 2h7"/></svg></button>
          </div>
          <button class="ib" type="button" aria-label="Attach"><svg viewBox="0 0 24 24"><path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"/></svg></button>
          <button class="go" type="button" aria-label="Submit" disabled><svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></button>
        </div>
      </div>
    </div>`,
  init(root) {
    const ta = root.querySelector('textarea'), go = root.querySelector('.go');
    const modes = [...root.querySelectorAll('.md')];
    const sync = () => { const ok = ta.value.trim().length > 0; go.classList.toggle('live', ok); go.disabled = !ok; };
    const fire = () => { if (go.disabled) return; go.classList.remove('fire'); void go.offsetWidth; go.classList.add('fire'); ta.value = ''; ta.placeholder = 'Ask a follow-up…'; sync(); };
    ta.addEventListener('input', sync);
    ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); fire(); } });
    go.addEventListener('click', fire);
    go.addEventListener('animationend', () => go.classList.remove('fire'));
    modes.forEach((m, i) => {
      m.addEventListener('click', () => modes.forEach((x) => x.setAttribute('aria-checked', String(x === m))));
      m.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const n = modes[(i + (e.key === 'ArrowRight' ? 1 : 2)) % 3]; n.focus(); n.click(); } });
    });
  },
};
