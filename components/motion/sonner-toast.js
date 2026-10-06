export default {
  id: 'mo-sonner-toast',
  credit: 'Sonner (Emil Kowalski) — toasts stack with scale/offset, newest in front, slide in from below',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 300px; height: 210px; max-width: 100%; border-radius: 12px; background: #f6f6f4; border: 1px solid #e3e3df; overflow: hidden; font-family: Inter, system-ui, sans-serif; }
    .trig { position: absolute; top: 14px; left: 14px; height: 34px; padding: 0 14px; border-radius: 8px; border: 1px solid #d9d9d4; background: #fff; color: #171717; font: 500 13px Inter, system-ui, sans-serif; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,.05); transition: background .15s, transform .1s; }
    .trig:hover { background: #fafafa; } .trig:active { transform: scale(.97); }
    .trig:focus-visible { outline: 2px solid #171717; outline-offset: 2px; }
    .toasts { position: absolute; left: 14px; right: 14px; bottom: 14px; height: 56px; }
    .toast {
      position: absolute; left: 0; right: 0; bottom: 0; height: 56px; display: flex; align-items: center; gap: 10px; padding: 0 14px;
      border-radius: 10px; background: #fff; border: 1px solid #e5e5e5; box-shadow: 0 4px 12px rgba(0,0,0,.08); font-size: 13px; color: #171717;
      transform: translateY(calc(var(--i) * -14px)) scale(calc(1 - var(--i) * .05)); transform-origin: bottom center; opacity: 1;
      transition: transform .4s cubic-bezier(.21, 1.02, .73, 1), opacity .4s; z-index: calc(10 - var(--i));
    }
    .toast.hidden { opacity: 0; }
    .toast.out { opacity: 0; transform: translateY(calc(var(--i) * -14px + 16px)) scale(calc(1 - var(--i) * .05)); }
    @starting-style { .toast { transform: translateY(100%); opacity: 0; } }
    .toast svg { width: 18px; height: 18px; flex: none; }
    .toast b { font-weight: 600; } .toast span { color: #737373; margin-left: auto; font-size: 12px; }
  `,
  html: `
    <div class="stage">
      <button class="trig" type="button">Show toast</button>
      <div class="toasts" aria-live="polite"></div>
    </div>`,
  init(root) {
    const box = root.querySelector('.toasts'), trig = root.querySelector('.trig');
    const msgs = ['Event has been created', 'File uploaded', 'Changes saved', 'Invite sent'];
    const timers = new Set();
    let n = 0;
    const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); };
    const relayout = () => {
      const live = [...box.children].filter((t) => !t.classList.contains('out')).reverse();
      live.forEach((t, i) => { t.style.setProperty('--i', i); t.classList.toggle('hidden', i > 2); });
    };
    const dismiss = (t) => { if (!t.isConnected || t.classList.contains('out')) return; t.classList.add('out'); later(() => { t.remove(); relayout(); }, 420); relayout(); };
    trig.addEventListener('click', () => {
      const t = document.createElement('div');
      t.className = 'toast'; t.style.setProperty('--i', 0);
      t.innerHTML = `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="#171717"/><path d="M6 10.5l2.8 2.5L14 7" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><b>${msgs[n++ % msgs.length]}</b><span>now</span>`;
      box.appendChild(t);
      relayout();
      later(() => dismiss(t), 4000);
    });
    return () => timers.forEach(clearTimeout);
  },
};
