export default {
  id: 'mb-resend-send',
  credit: 'Resend — pitch-black "Send email" button that lights a soft gradient sheen on hover; the envelope lifts off and a check lands',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 22px 26px; border-radius: 12px; background: #000; display: flex; gap: 10px; flex-wrap: wrap; }
    .rs { position: relative; height: 40px; padding: 0 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,.14); cursor: pointer; overflow: hidden; isolation: isolate;
      background: #000; color: #fff; font: 500 14px/1 Inter, -apple-system, system-ui, sans-serif; letter-spacing: -.01em;
      display: inline-flex; align-items: center; gap: 9px; -webkit-tap-highlight-color: transparent;
      transition: border-color .25s, transform .15s cubic-bezier(.2,.8,.2,1), box-shadow .3s; }
    .rs::before { content: ''; position: absolute; inset: 0; z-index: -1; opacity: 0; transition: opacity .35s;
      background: radial-gradient(120% 140% at 50% 120%, rgba(120,120,255,.45), rgba(255,120,200,.25) 40%, transparent 70%); }
    .rs:hover { border-color: rgba(255,255,255,.35); box-shadow: 0 0 0 1px rgba(255,255,255,.04), 0 10px 30px -10px rgba(140,120,255,.6); }
    .rs:hover::before { opacity: 1; }
    .rs:active { transform: scale(.97); }
    .rs:focus-visible { outline: none; box-shadow: 0 0 0 2px #000, 0 0 0 4px #fff; }
    .ico { position: relative; width: 16px; height: 16px; flex: none; }
    .ico svg { position: absolute; inset: 0; width: 100%; height: 100%; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .env { transition: transform .45s cubic-bezier(.2,.8,.2,1), opacity .3s; }
    .ok { opacity: 0; transform: scale(.4); transition: transform .4s .3s linear(0, 0.5 15%, 1.2 40%, 0.95 65%, 1), opacity .2s .3s; }
    .rs.sent .env { transform: translate(14px,-14px) rotate(-20deg); opacity: 0; }
    .rs.sent .ok { opacity: 1; transform: scale(1); }
    .rs.sent { border-color: rgba(255,255,255,.35); background: #fff; color: #000; }
    .rs.sent::before { opacity: 0; }
    .sec { background: transparent; border-color: transparent; color: #888; }
    .sec:hover { color: #fff; border-color: transparent; box-shadow: none; }
    .sec::before { display: none; }
    .sec svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; transition: transform .25s cubic-bezier(.2,.8,.2,1); }
    .sec:hover svg { transform: translateX(3px); }
  `,
  html: `
    <div class="stage">
      <button class="rs" type="button" aria-pressed="false">
        <span class="ico">
          <svg class="env" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/></svg>
          <svg class="ok" viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>
        </span>
        <span class="lbl">Send email</span>
      </button>
      <button class="rs sec" type="button">Documentation<svg viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button>
    </div>`,
  init(root) {
    const b = root.querySelector('.rs');
    const lbl = b.querySelector('.lbl');
    b.addEventListener('click', () => {
      const on = !b.classList.contains('sent');
      b.classList.toggle('sent', on);
      b.setAttribute('aria-pressed', String(on));
      lbl.textContent = on ? 'Delivered' : 'Send email';
    });
  },
};
