export default {
  id: 'lb-sonner-toast',
  credit: 'Sonner (Emil Kowalski) via shadcn/ui — "Render toast" stacks toasts bottom-right; hover the stack to fan them out',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 400px; max-width: 100%; height: 240px; border-radius: 12px; background: #fafafa; border: 1px solid #e5e5e5; overflow: hidden; font: 14px/20px Inter, -apple-system, system-ui, sans-serif; color: #171717; }
    .trig { position: absolute; top: 16px; left: 16px; height: 36px; padding: 0 16px; border-radius: 6px; border: 1px solid #e4e4e7; background: #fff; font: 500 14px Inter, system-ui, sans-serif; color: #18181b; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,.05); transition: background .15s; }
    .trig:hover { background: #f4f4f5; }
    .trig:active { transform: translateY(.5px); }
    .trig:focus-visible { outline: 0; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #18181b; }
    .toaster { position: absolute; right: 16px; bottom: 16px; width: 300px; max-width: calc(100% - 32px); height: 190px; }
    .toast { --y: 0px; --s: 1; position: absolute; left: 0; right: 0; bottom: 0; display: flex; align-items: center; gap: 10px; padding: 14px 16px; min-height: 56px; background: #fff; border: 1px solid #e5e5e5; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,.1); transform: translateY(var(--y)) scale(var(--s)); transform-origin: center bottom; transition: transform .4s cubic-bezier(.21,1.02,.73,1), opacity .4s; }
    .toast .tx { display: flex; flex-direction: column; min-width: 0; }
    .toast .t { font-weight: 500; font-size: 13px; line-height: 18px; }
    .toast .d { color: #737373; font-size: 13px; line-height: 18px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .toast svg { width: 16px; height: 16px; flex: none; color: #16a34a; }
    .toast .a { margin-left: auto; flex: none; height: 24px; padding: 0 8px; border-radius: 4px; border: 0; background: #171717; color: #fafafa; font: 500 12px Inter, system-ui, sans-serif; cursor: pointer; }
    .toast .a:hover { background: #333; }
    .toast .a:focus-visible { outline: 2px solid #171717; outline-offset: 1px; }
    .toast.in { animation: slide .35s cubic-bezier(.21,1.02,.73,1); }
    @keyframes slide { from { transform: translateY(100%); opacity: 0; } }
    .toast.out { opacity: 0; transform: translateY(100%) scale(1); pointer-events: none; }
    .toast.hide { opacity: 0; pointer-events: none; }
  `,
  html: `
    <div class="stage">
      <button class="trig" type="button">Render toast</button>
      <div class="toaster" aria-live="polite"></div>
    </div>`,
  init(root) {
    const trig = root.querySelector('.trig');
    const box = root.querySelector('.toaster');
    const check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
    const msgs = [
      ['Event has been created', 'Sunday, December 03, 2023 at 9:00 AM', true],
      ['Copied to clipboard', '', false, true],
      ['Settings saved', 'Your preferences were updated.', false, true],
      ['File uploaded', 'report-final.pdf · 2.4 MB', true],
    ];
    let n = 0, expanded = false;
    const timers = new Set();
    const live = () => [...box.querySelectorAll('.toast:not(.out)')].reverse();
    const layout = () => {
      live().forEach((t, i) => {
        if (i > 2) t.classList.add('hide'); else t.classList.remove('hide');
        if (expanded) { t.style.setProperty('--y', -(i * (t.offsetHeight + 12)) + 'px'); t.style.setProperty('--s', 1); }
        else { t.style.setProperty('--y', -(i * 14) + 'px'); t.style.setProperty('--s', String(1 - i * .05)); }
      });
    };
    const dismiss = (t) => { t.classList.add('out'); const k = setTimeout(() => { t.remove(); timers.delete(k); layout(); }, 400); timers.add(k); layout(); };
    const add = () => {
      const [title, desc, action, ok] = msgs[n++ % msgs.length];
      const t = document.createElement('div');
      t.className = 'toast in';
      t.innerHTML = `${ok ? check : ''}<div class="tx"><span class="t">${title}</span>${desc ? `<span class="d">${desc}</span>` : ''}</div>${action ? '<button class="a" type="button">Undo</button>' : ''}`;
      t.querySelector('.a')?.addEventListener('click', () => dismiss(t));
      box.appendChild(t);
      live().slice(4).forEach((x) => x.remove());
      layout();
      const k = setTimeout(() => { timers.delete(k); if (!expanded) dismiss(t); else t.dataset.due = '1'; }, 4000);
      timers.add(k);
    };
    trig.addEventListener('click', add);
    box.addEventListener('pointerenter', () => { expanded = true; layout(); });
    box.addEventListener('pointerleave', () => { expanded = false; layout(); live().filter((t) => t.dataset.due).forEach(dismiss); });
    return () => timers.forEach(clearTimeout);
  },
};
