export default {
  id: 'lb-sonner-toast',
  credit: 'Sonner (Emil Kowalski) via shadcn/ui — "Show Toast" stacks real Sonner toasts bottom-right inside the stage: 14px lift + 5% scale per toast behind, back toasts take the front height with content hidden, hover expands the stack, 4s auto-dismiss paused on hover, 400ms transforms',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 420px; max-width: 100%; height: 260px; border-radius: 12px; background: #fff; border: 1px solid #e5e5e5; overflow: hidden; font: 400 13px/1.5 Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: hsl(0, 0%, 9%); }
    .trig { position: absolute; top: 16px; left: 16px; display: inline-flex; align-items: center; height: 36px; padding: 8px 16px; border-radius: 8px; border: 1px solid #e5e5e5; background: #fff; font: 500 14px/20px Inter, system-ui, sans-serif; color: #0a0a0a; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,.05); transition: all .15s cubic-bezier(.4,0,.2,1); }
    .trig:hover { background: #f5f5f5; color: #171717; }
    .trig:focus-visible { outline: 0; border-color: #a1a1a1; box-shadow: 0 0 0 3px rgba(161,161,161,.5); }
    .toaster { position: absolute; right: 16px; bottom: 16px; margin: 0; padding: 0; list-style: none; width: min(356px, calc(100% - 32px)); height: 0; }
    .toaster::before { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: var(--hit, 0px); }
    .toast { --y: translateY(100%); position: absolute; right: 0; bottom: 0; width: 100%; box-sizing: border-box; display: flex; align-items: center; gap: 6px; padding: 16px; background: #fff; border: 1px solid hsl(0, 0%, 93%); border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,.1); opacity: 0; overflow-wrap: anywhere; transform: var(--y); transform-origin: center bottom; transition: transform .4s, opacity .4s, height .4s, box-shadow .2s; }
    .toast > * { transition: opacity .4s; }
    .toast.mounted { opacity: 1; }
    .toast.back > * { opacity: 0; }
    .toast.hidden, .toast.removed { opacity: 0; pointer-events: none; }
    .ico { display: flex; flex: none; width: 16px; height: 16px; margin-left: -3px; margin-right: 4px; align-items: center; }
    .ico svg { width: 20px; height: 20px; flex: none; fill: currentColor; }
    .ct { display: flex; flex: 1; min-width: 0; flex-direction: column; gap: 2px; }
    .t { font-weight: 500; line-height: 1.5; }
    .d { font-weight: 400; line-height: 1.4; color: #3f3f3f; }
    .btn { display: flex; flex: none; align-items: center; height: 24px; margin-left: auto; padding: 0 8px; border: 0; border-radius: 4px; background: hsl(0, 0%, 9%); color: #fff; font: 500 12px/1 Inter, system-ui, sans-serif; cursor: pointer; outline: none; transition: opacity .4s, box-shadow .2s; }
    .btn:focus-visible { box-shadow: 0 0 0 2px rgba(0,0,0,.4); }
  `,
  html: `
    <div class="stage">
      <button class="trig" type="button">Show Toast</button>
      <ol class="toaster" aria-label="Notifications" aria-live="polite"></ol>
    </div>`,
  init(root) {
    const trig = root.querySelector('.trig'), box = root.querySelector('.toaster');
    const GAP = 14, VISIBLE = 3;
    const ok = '<svg viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/></svg>';
    const msgs = [
      { t: 'Event has been created', d: 'Sunday, December 03, 2023 at 9:00 AM', a: 'Undo' },
      { t: 'Event has been created', icon: ok },
      { t: 'Event has been created', d: 'Monday, January 3rd at 6:00pm' },
    ];
    let n = 0, expanded = false;
    const toasts = [];
    const timers = new Set();
    const later = (fn, ms) => { const k = setTimeout(() => { timers.delete(k); fn(); }, ms); timers.add(k); return k; };
    const layout = () => {
      const live = toasts.filter((x) => !x.removed);
      const frontH = live[0] ? live[0].h : 0;
      let offset = 0;
      live.forEach((x, i) => {
        const el = x.el;
        el.classList.toggle('back', !expanded && i > 0);
        el.classList.toggle('hidden', i >= VISIBLE);
        el.style.zIndex = String(live.length - i);
        if (!x.mounted) return;
        if (expanded) { el.style.setProperty('--y', `translateY(${-offset}px)`); el.style.height = x.h + 'px'; }
        else { el.style.setProperty('--y', `translateY(${-GAP * i}px) scale(${1 - i * 0.05})`); el.style.height = (i === 0 ? x.h : frontH) + 'px'; }
        offset += x.h + GAP;
      });
      box.style.setProperty('--hit', (expanded ? offset : frontH + GAP * Math.min(live.length - 1, VISIBLE - 1)) + 'px');
    };
    const remove = (x) => {
      if (x.removed) return;
      x.removed = true; clearTimeout(x.timer);
      x.el.classList.add('removed');
      x.el.style.setProperty('--y', x === toasts[0] ? 'translateY(100%)' : 'translateY(40%)');
      later(() => { x.el.remove(); toasts.splice(toasts.indexOf(x), 1); }, 400);
      layout();
    };
    const arm = (x, ms) => { x.start = Date.now(); x.left = ms; x.timer = later(() => remove(x), ms); };
    const add = () => {
      const m = msgs[n++ % msgs.length];
      const el = document.createElement('li'); el.className = 'toast'; el.setAttribute('role', 'status');
      el.innerHTML = `${m.icon ? `<span class="ico">${m.icon}</span>` : ''}<div class="ct"><div class="t">${m.t}</div>${m.d ? `<div class="d">${m.d}</div>` : ''}</div>${m.a ? `<button class="btn" type="button">${m.a}</button>` : ''}`;
      box.appendChild(el);
      const x = { el, h: el.offsetHeight, mounted: false, removed: false };
      el.querySelector('.btn')?.addEventListener('click', () => remove(x));
      toasts.unshift(x);
      toasts.filter((y) => !y.removed).slice(VISIBLE + 1).forEach(remove);
      layout();
      requestAnimationFrame(() => requestAnimationFrame(() => { x.mounted = true; el.classList.add('mounted'); layout(); }));
      arm(x, 4000);
      if (expanded) { clearTimeout(x.timer); x.left = 4000; }
    };
    trig.addEventListener('click', add);
    box.addEventListener('pointerenter', () => { expanded = true; toasts.forEach((x) => { clearTimeout(x.timer); x.left = Math.max(0, x.left - (Date.now() - x.start)); }); layout(); });
    box.addEventListener('pointerleave', () => { expanded = false; toasts.filter((x) => !x.removed).forEach((x) => arm(x, Math.max(x.left, 800))); layout(); });
    return () => timers.forEach(clearTimeout);
  },
};
