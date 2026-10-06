export default {
  id: 'lb-origin-input',
  credit: 'Origin UI — Input with inline end button: h-9 shadow-xs field, 3px ring on focus, the "Subscribe" button wakes up once the email looks valid',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { position: relative; width: 300px; max-width: 100%; font: 14px/20px Inter, -apple-system, system-ui, sans-serif; color: #09090b; }
    .in { width: 100%; height: 36px; padding: 0 104px 0 36px; border-radius: 6px; border: 1px solid #e4e4e7; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.05); font: inherit; color: inherit; outline: 0; transition: border-color .15s, box-shadow .15s; }
    .in::placeholder { color: #71717a; }
    .in:focus-visible { border-color: #a1a1aa; box-shadow: 0 0 0 3px rgba(161,161,170,.5); }
    .in.ok { border-color: #22c55e; }
    .in.ok:focus-visible { box-shadow: 0 0 0 3px rgba(34,197,94,.3); }
    .ic { position: absolute; left: 12px; top: 10px; width: 16px; height: 16px; stroke: #71717a; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; pointer-events: none; }
    .bt { position: absolute; top: 4px; right: 4px; bottom: 4px; padding: 0 12px; border-radius: 4px; border: 0; background: #18181b; color: #fafafa; font: 500 13px Inter, system-ui, sans-serif; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: background .15s, opacity .15s; -webkit-tap-highlight-color: transparent; }
    .bt:hover { background: #27272a; }
    .bt:disabled { opacity: .5; cursor: not-allowed; }
    .bt:focus-visible { outline: 0; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #18181b; }
    .bt svg { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
    .bt.done { background: #16a34a; }
    .bt .a, .bt.done .s { display: none; }
    .bt.done .a { display: block; }
  `,
  html: `
    <div class="wrap">
      <svg class="ic" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
      <input class="in" type="email" placeholder="Email" autocomplete="off" spellcheck="false" aria-label="Email">
      <button class="bt" type="button" disabled><span class="l">Subscribe</span><svg class="s" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg><svg class="a" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></button>
    </div>`,
  init(root) {
    const inp = root.querySelector('.in'), bt = root.querySelector('.bt'), l = bt.querySelector('.l');
    let t;
    const check = () => { const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(inp.value); inp.classList.toggle('ok', ok); bt.disabled = !ok || bt.classList.contains('done'); };
    inp.addEventListener('input', check);
    inp.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !bt.disabled) bt.click(); });
    bt.addEventListener('click', () => {
      bt.classList.add('done'); l.textContent = 'Subscribed'; bt.disabled = true;
      clearTimeout(t); t = setTimeout(() => { bt.classList.remove('done'); l.textContent = 'Subscribe'; inp.value = ''; check(); }, 1800);
    });
    return () => clearTimeout(t);
  },
};
