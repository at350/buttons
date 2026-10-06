export default {
  id: 'mb-lovable-generate',
  credit: 'Lovable — the hero prompt box over the blue-pink-orange aurora: "+" attach, "Build" mode chip and the round up-arrow send that wakes when you type and turns into a stop square while it builds',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 340px; max-width: 100%; padding: 26px 18px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(70% 90% at 10% 0%, #4b73ff 0%, transparent 70%), radial-gradient(70% 80% at 60% 110%, #ff66f4 0%, transparent 70%),
                  radial-gradient(60% 70% at 100% 70%, #ff6119 0%, transparent 70%), #fcfbf8;
      font: 400 15px/1.4 Inter, -apple-system, system-ui, sans-serif; color: #1c1c1c; }
    .box { border-radius: 24px; background: #fcfbf8; padding: 14px 12px 10px 16px; box-shadow: 0 0 0 1px rgba(28,28,28,.06), 0 12px 32px -8px rgba(40,20,80,.3); transition: box-shadow .2s; }
    .box:focus-within { box-shadow: 0 0 0 1px rgba(28,28,28,.14), 0 12px 32px -8px rgba(40,20,80,.35); }
    textarea { display: block; width: 100%; height: 46px; resize: none; border: 0; outline: none; background: transparent; font: inherit; color: inherit; padding: 0; }
    textarea::placeholder { color: #8a8780; }
    .ctl { display: flex; align-items: center; gap: 6px; margin-top: 6px; }
    .ib { height: 32px; min-width: 32px; padding: 0 10px; border-radius: 999px; border: 1px solid #e6e3dc; background: transparent; color: #5f5c55; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 5px;
      font: 500 13px/1 Inter, system-ui, sans-serif; transition: background .15s, color .15s, border-color .15s; -webkit-tap-highlight-color: transparent; }
    .ib.sq { padding: 0; }
    .ib:hover { background: #f1efe9; color: #1c1c1c; }
    .md svg { width: 14px; height: 14px; opacity: .6; }
    .ml { display: grid; } .ml span { grid-area: 1 / 1; } .ml .b { visibility: hidden; }
    .md[aria-pressed="true"] .a { visibility: hidden; } .md[aria-pressed="true"] .b { visibility: visible; }
    .md[aria-pressed="true"] { background: #eef1ff; border-color: #c9d3ff; color: #3053e6; }
    .ib svg, .go svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .ib:focus-visible, .go:focus-visible { outline: 2px solid #4b73ff; outline-offset: 2px; }
    .go { position: relative; margin-left: auto; width: 32px; height: 32px; border-radius: 50%; border: 0; background: #1c1c1c; color: #fcfbf8; cursor: pointer; display: grid; place-items: center;
      transition: opacity .2s, transform .2s cubic-bezier(.2,.8,.2,1), background .15s; -webkit-tap-highlight-color: transparent; }
    .go > * { grid-area: 1 / 1; transition: transform .25s cubic-bezier(.2,.8,.2,1), opacity .2s; }
    .go:disabled { opacity: .25; cursor: default; }
    .go:not(:disabled):hover { background: #3a3a3a; }
    .go:not(:disabled):active { transform: scale(.9); }
    .go .sq { width: 10px; height: 10px; border-radius: 2px; background: currentColor; transform: scale(0); opacity: 0; }
    .go.busy svg { transform: scale(0); opacity: 0; } .go.busy .sq { transform: scale(1); opacity: 1; }
    .go.busy::after { content: ''; position: absolute; inset: -3px; border-radius: 50%; border: 2px solid transparent; border-top-color: #ff66f4; border-right-color: #4b73ff; animation: rot .9s linear infinite; }
    @keyframes rot { to { transform: rotate(360deg); } }
  `,
  html: `
    <div class="stage">
      <div class="box">
        <textarea rows="2" placeholder="Ask Lovable to create a landing page for my…" aria-label="Prompt"></textarea>
        <div class="ctl">
          <button class="ib sq" type="button" aria-label="Attach"><svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
          <button class="ib md" type="button" aria-pressed="false" aria-label="Mode"><span class="ml"><span class="a">Build</span><span class="b">Plan</span></span><svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></button>
          <button class="go" type="button" aria-label="Send" disabled><svg viewBox="0 0 24 24"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg><i class="sq"></i></button>
        </div>
      </div>
    </div>`,
  init(root) {
    const ta = root.querySelector('textarea'), go = root.querySelector('.go'), vis = root.querySelector('.ib[aria-pressed]');
    let t;
    const sync = () => { if (!go.classList.contains('busy')) go.disabled = !ta.value.trim(); };
    const stop = () => { clearTimeout(t); go.classList.remove('busy'); go.setAttribute('aria-label', 'Send'); sync(); };
    const send = () => {
      if (go.classList.contains('busy')) { stop(); return; }
      if (!ta.value.trim()) return;
      ta.value = ''; go.classList.add('busy'); go.disabled = false; go.setAttribute('aria-label', 'Stop');
      t = setTimeout(stop, 2400);
    };
    ta.addEventListener('input', sync);
    ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } });
    go.addEventListener('click', send);
    vis.addEventListener('click', () => vis.setAttribute('aria-pressed', String(vis.getAttribute('aria-pressed') !== 'true')));
    return () => clearTimeout(t);
  },
};
