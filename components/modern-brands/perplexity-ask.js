export default {
  id: 'mb-perplexity-ask',
  credit: 'Perplexity — ask box with the "Pro" toggle and the teal submit arrow that wakes up as you type and slides off when sent',
  size: 'wide',
  css: `
    :host { display: block; }
    .stage { padding: 22px; border-radius: 12px; background: #191a1a; font: 450 14px/1 Inter, -apple-system, system-ui, sans-serif; }
    .box { border-radius: 14px; background: #202222; border: 1px solid #2d2f2f; padding: 12px 12px 10px; transition: border-color .2s, box-shadow .25s; }
    .box:focus-within { border-color: #20808d; box-shadow: 0 0 0 1px rgba(32,128,141,.35); }
    textarea { width: 100%; height: 44px; resize: none; border: 0; outline: none; background: transparent; color: #e8e8e6; font: inherit; font-size: 15px; line-height: 22px; padding: 0 4px; display: block; }
    textarea::placeholder { color: #8d9191; }
    .ctl { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
    .pro { height: 30px; padding: 0 10px 0 6px; border-radius: 8px; border: 0; background: transparent; color: #8d9191; cursor: pointer; font: 500 13px/1 Inter, system-ui, sans-serif;
      display: inline-flex; align-items: center; gap: 7px; transition: color .2s, background .2s; -webkit-tap-highlight-color: transparent; }
    .pro:hover { background: #2a2c2c; }
    .pro:focus-visible, .go:focus-visible { outline: 2px solid #20808d; outline-offset: 2px; }
    .sw { width: 26px; height: 16px; border-radius: 8px; background: #3a3d3d; position: relative; transition: background .25s; }
    .sw::after { content: ''; position: absolute; top: 2px; left: 2px; width: 12px; height: 12px; border-radius: 50%; background: #e8e8e6; transition: transform .3s linear(0, 0.5 12%, 1.15 35%, 0.98 60%, 1); }
    .pro[aria-pressed="true"] { color: #20b8cd; }
    .pro[aria-pressed="true"] .sw { background: #20808d; }
    .pro[aria-pressed="true"] .sw::after { transform: translateX(10px); }
    .go { margin-left: auto; width: 32px; height: 32px; border-radius: 50%; border: 0; background: #3a3d3d; color: #8d9191; cursor: default; display: grid; place-items: center; overflow: hidden; position: relative;
      transition: background .25s, color .25s, transform .2s cubic-bezier(.2,.8,.2,1), box-shadow .3s; -webkit-tap-highlight-color: transparent; }
    .go.live { background: #20808d; color: #fff; cursor: pointer; }
    .go.live:hover { background: #1a6b76; box-shadow: 0 0 0 4px rgba(32,128,141,.2); }
    .go.live:active { transform: scale(.92); }
    .go svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
    .go.fire svg { animation: slide .55s cubic-bezier(.2,.8,.2,1); }
    @keyframes slide { 0% { transform: translateX(0); } 45% { transform: translateX(28px); opacity: 0; } 50% { transform: translateX(-28px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
    .go.fire { box-shadow: 0 0 0 8px rgba(32,128,141,0); animation: ring .6s ease-out; }
    @keyframes ring { from { box-shadow: 0 0 0 0 rgba(32,128,141,.6); } to { box-shadow: 0 0 0 12px rgba(32,128,141,0); } }
  `,
  html: `
    <div class="stage">
      <div class="box">
        <textarea placeholder="Ask anything..." aria-label="Ask anything" rows="2"></textarea>
        <div class="ctl">
          <button class="pro" type="button" aria-pressed="false"><span class="sw"></span>Pro</button>
          <button class="go" type="button" aria-label="Submit" disabled><svg viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button>
        </div>
      </div>
    </div>`,
  init(root) {
    const ta = root.querySelector('textarea'), go = root.querySelector('.go'), pro = root.querySelector('.pro');
    const sync = () => { const ok = ta.value.trim().length > 0; go.classList.toggle('live', ok); go.disabled = !ok; };
    ta.addEventListener('input', sync);
    const fire = () => { if (go.disabled) return; go.classList.remove('fire'); void go.offsetWidth; go.classList.add('fire'); ta.value = ''; ta.placeholder = 'Ask a follow-up...'; sync(); };
    go.addEventListener('click', fire);
    ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); fire(); } });
    go.addEventListener('animationend', () => go.classList.remove('fire'));
    pro.addEventListener('click', () => pro.setAttribute('aria-pressed', String(pro.getAttribute('aria-pressed') !== 'true')));
  },
};
