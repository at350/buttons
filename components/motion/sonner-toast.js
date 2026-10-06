// Sonner (Emil Kowalski) — values lifted from sonner/dist/styles.css:
// --gap 14px, stacked toasts translateY(-gap * n) scale(1 - .05n), content of back toasts fades to 0,
// enter from translateY(100%), `transition: transform 400ms, opacity 400ms` (default ease), 3 visible,
// hover expands the stack to real offsets, swipe down to dismiss, 4s duration paused while expanded.
const SUCCESS = '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/></svg>';
const INFO = '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"/></svg>';

export default {
  id: 'mo-sonner-toast',
  credit: 'Sonner by Emil Kowalski — toasts stack 14px apart and scale by 5%, enter from below with its 400ms transition, fan out to full height on hover, swipe down to dismiss',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      position: relative; width: 340px; height: 334px; max-width: 100%; border-radius: 12px; background: #fafafa; border: 1px solid hsl(0, 0%, 91%);
      overflow: hidden; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; --gap: 14px;
    }
    .trig {
      position: absolute; top: 14px; left: 14px; height: 34px; padding: 0 14px; border-radius: 6px; border: 1px solid hsl(0, 0%, 88.7%); background: #fff; color: hsl(0, 0%, 9%);
      font: 500 13px ui-sans-serif, system-ui, sans-serif; cursor: pointer; transition: background .2s, border-color .2s, transform .16s ease-out;
    }
    .trig:hover { background: hsl(0, 0%, 97.3%); border-color: hsl(0, 0%, 85.8%); } .trig:active { transform: scale(.97); }
    .trig:focus-visible { outline: 2px solid hsl(0, 0%, 9%); outline-offset: 2px; }
    ol { position: absolute; left: 14px; right: 14px; bottom: 16px; height: var(--front-h, 70px); margin: 0; padding: 0; list-style: none; }
    li {
      position: absolute; left: 0; right: 0; bottom: 0; display: flex; align-items: center; gap: 6px; padding: 16px; border-radius: 8px; background: #fff;
      border: 1px solid hsl(0, 0%, 93%); color: hsl(0, 0%, 9%); box-shadow: 0 4px 12px rgba(0, 0, 0, .1); font-size: 13px; touch-action: none; cursor: grab;
      --y: translateY(100%); transform: var(--y) translateY(var(--swipe, 0px)); opacity: 0; z-index: var(--z);
      transition: transform 400ms, opacity 400ms, height 400ms, box-shadow 200ms;
    }
    li::after { content: ''; position: absolute; left: 0; width: 100%; bottom: 100%; height: calc(var(--gap) + 1px); }
    li > * { transition: opacity 400ms; }
    li[data-mounted] { --y: translateY(0); opacity: 1; }
    ol:not([data-expanded]) li[data-mounted]:not([data-front]) { --y: translateY(calc(var(--gap) * -1 * var(--before))) scale(calc(1 - var(--before) * .05)); }
    ol:not([data-expanded]) li:not([data-front]) > * { opacity: 0; }
    ol[data-expanded] li[data-mounted] { --y: translateY(calc(var(--offset) * -1)); }
    li[data-hidden] { opacity: 0; pointer-events: none; }
    li[data-removed][data-front] { --y: translateY(100%); opacity: 0; }
    li[data-removed]:not([data-front]) { --y: translateY(40%); opacity: 0; transition: transform 500ms, opacity 200ms; }
    ol[data-expanded] li[data-removed]:not([data-front]) { --y: translateY(calc(var(--offset) * -1 + 100%)); }
    li[data-swiping] { transition: none; cursor: grabbing; }
    li:focus-visible { outline: none; box-shadow: 0 4px 12px rgba(0, 0, 0, .1), 0 0 0 2px rgba(0, 0, 0, .2); }
    .ic { display: flex; width: 16px; height: 16px; flex: none; margin-right: 4px; } .ic svg { width: 20px; height: 20px; margin: -2px; }
    .ct { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
    .t { font-weight: 500; line-height: 1.5; } .d { font-weight: 400; line-height: 1.4; }
    .act { margin-left: auto; height: 24px; padding: 0 8px; border: 0; border-radius: 4px; background: hsl(0, 0%, 9%); color: #fff; font: 500 12px ui-sans-serif, system-ui, sans-serif; cursor: pointer; flex: none; }
    .act:focus-visible { box-shadow: 0 0 0 2px rgba(0, 0, 0, .4); outline: none; }
  `,
  html: `
    <div class="stage">
      <button class="trig" type="button">Render a toast</button>
      <ol aria-live="polite" aria-label="Notifications"></ol>
    </div>`,
  init(root) {
    const ol = root.querySelector('ol'), trig = root.querySelector('.trig');
    const kinds = [
      { icon: '', title: 'Event has been created', desc: 'Monday, January 3rd at 6:00pm', action: 'Undo' },
      { icon: SUCCESS, title: 'Event has been created', desc: 'Sunday, December 03 at 9:00 AM' },
      { icon: INFO, title: 'Be at the area 10 minutes before', desc: 'The doors close at 6:10pm' },
    ];
    const toasts = []; // newest first
    const timers = new Set();
    const later = (fn, ms) => { const id = setTimeout(() => { timers.delete(id); fn(); }, ms); timers.add(id); return id; };
    let n = 0, expanded = false;
    const layout = () => {
      toasts.forEach((t) => { if (!t.h) { t.el.style.height = ''; t.h = t.el.offsetHeight; } });
      const live = toasts.filter((t) => !t.removed);
      const frontH = (live[0] && live[0].h) || 70;
      ol.style.setProperty('--front-h', frontH + 'px');
      let offset = 0;
      toasts.forEach((t) => {
        const i = live.indexOf(t);
        t.el.style.setProperty('--before', Math.max(0, i));
        t.el.style.setProperty('--z', 100 - Math.max(0, i));
        t.el.style.setProperty('--offset', offset + 'px');
        if (!t.removed) offset += t.h + 14;
        t.el.toggleAttribute('data-front', i === 0 || (t.removed && t.wasFront));
        t.el.toggleAttribute('data-hidden', i >= 3);
        t.el.style.height = !t.h ? '' : (!expanded && i > 0) ? frontH + 'px' : t.h + 'px';
      });
    };
    const arm = (t) => { clearTimeout(t.timer); if (expanded || t.removed) return; t.start = Date.now(); t.timer = later(() => dismiss(t), t.left); };
    const pauseAll = () => toasts.forEach((t) => { if (t.removed) return; clearTimeout(t.timer); t.left = Math.max(1000, t.left - (Date.now() - t.start)); });
    const dismiss = (t) => {
      if (t.removed) return;
      t.wasFront = toasts.filter((x) => !x.removed)[0] === t;
      t.removed = true; clearTimeout(t.timer);
      t.el.setAttribute('data-removed', '');
      layout();
      later(() => { t.el.remove(); toasts.splice(toasts.indexOf(t), 1); layout(); }, 500);
    };
    const setExpanded = (v) => { if (v === expanded) return; expanded = v; ol.toggleAttribute('data-expanded', v); if (v) pauseAll(); else toasts.forEach(arm); layout(); };
    ol.addEventListener('pointerenter', () => setExpanded(true));
    ol.addEventListener('pointerleave', (e) => { if (!e.buttons) setExpanded(false); });
    ol.addEventListener('focusin', () => setExpanded(true));
    ol.addEventListener('focusout', (e) => { if (!ol.contains(e.relatedTarget)) setExpanded(false); });
    const add = () => {
      const k = kinds[n++ % kinds.length];
      const el = document.createElement('li');
      el.tabIndex = 0;
      el.innerHTML = (k.icon ? `<span class="ic">${k.icon}</span>` : '') + `<div class="ct"><div class="t">${k.title}</div><div class="d">${k.desc}</div></div>` + (k.action ? `<button class="act" type="button">${k.action}</button>` : '');
      el.style.height = 'auto';
      ol.appendChild(el);
      const t = { el, h: el.offsetHeight, left: 4000, start: 0, timer: 0, removed: false, wasFront: false };
      toasts.unshift(t);
      while (toasts.filter((x) => !x.removed).length > 4) dismiss(toasts.filter((x) => !x.removed).pop());
      layout();
      requestAnimationFrame(() => requestAnimationFrame(() => el.setAttribute('data-mounted', '')));
      arm(t);
      el.querySelector('.act')?.addEventListener('click', () => dismiss(t));
      let sy = 0, st = 0, dy = 0;
      el.addEventListener('pointerdown', (e) => { if (e.target.closest('.act') || t.removed) return; el.setPointerCapture(e.pointerId); sy = e.clientY; st = Date.now(); dy = 0; el.setAttribute('data-swiping', ''); });
      el.addEventListener('pointermove', (e) => { if (!el.hasAttribute('data-swiping')) return; const d = e.clientY - sy; dy = d > 0 ? d : -Math.pow(-d, .5); el.style.setProperty('--swipe', dy + 'px'); });
      const up = () => {
        if (!el.hasAttribute('data-swiping')) return;
        el.removeAttribute('data-swiping');
        const v = dy / Math.max(1, Date.now() - st);
        el.style.setProperty('--swipe', '0px');
        if (dy > 45 || v > .11) dismiss(t);
      };
      el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    };
    trig.addEventListener('click', add);
    // start with one toast already on screen (no timer until the stack is first touched)
    add(); { const t0 = toasts[0]; clearTimeout(t0.timer); t0.el.setAttribute('data-mounted', ''); }
    root.querySelector('.stage').addEventListener('keydown', (e) => { if (e.key === 'Escape') { const t = toasts.find((x) => !x.removed); if (t) dismiss(t); } });
    return () => timers.forEach(clearTimeout);
  },
};
