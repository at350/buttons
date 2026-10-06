export default {
  id: 'mb-m3-expressive',
  credit: 'Google Material 3 Expressive — medium connected button group (Material Symbols Rounded): the selected toggle springs from 8dp inner corners into a full pill, pressing squeezes the corners, 8%/12% state layers',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 22px 24px; border-radius: 12px; background: #fef7ff; }
    .grp { display: flex; gap: 2px; width: 262px; }
    .m3 { --ri: 8px; --ro: 28px; position: relative; isolation: isolate; height: 56px; flex: 1 1 0; min-width: 0; border: 0; padding: 0; cursor: pointer; display: grid; place-items: center;
      background: #f3edf7; color: #49454f; -webkit-tap-highlight-color: transparent;
      border-radius: var(--ri); transition: border-radius .5s linear(0, 0.18 5%, 0.55 13%, 0.88 22%, 1.06 31%, 1.1 38%, 1.06 47%, 1 60%, 0.99 72%, 1), background .2s cubic-bezier(.2,0,0,1), color .2s cubic-bezier(.2,0,0,1),
        flex-grow .5s linear(0, 0.18 5%, 0.55 13%, 0.88 22%, 1.06 31%, 1.1 38%, 1.06 47%, 1 60%, 0.99 72%, 1); }
    .m3:first-child { border-radius: var(--ro) var(--ri) var(--ri) var(--ro); }
    .m3:last-child { border-radius: var(--ri) var(--ro) var(--ro) var(--ri); }
    .m3::before { content: ''; position: absolute; inset: 0; border-radius: inherit; background: currentColor; opacity: 0; z-index: -1; transition: opacity .15s linear; }
    .m3:hover::before { opacity: .08; }
    .m3:active::before { opacity: .12; }
    .m3:active { --ri: 4px; flex-grow: 1.3; }
    .m3:focus-visible { outline: 3px solid #625b71; outline-offset: 2px; }
    .m3[aria-checked="true"] { --ri: 28px; background: #6750a4; color: #fff; }
    .m3 svg { width: 24px; height: 24px; fill: currentColor; }
  `,
  html: `
    <div class="stage">
      <div class="grp" role="radiogroup" aria-label="Text alignment">
        <button class="m3" type="button" role="radio" aria-checked="true" aria-label="Align left"><svg viewBox="0 -960 960 960"><path d="M150-120q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm0-165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h420q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm0-165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm0-165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h420q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm0-165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Z"/></svg></button>
        <button class="m3" type="button" role="radio" aria-checked="false" aria-label="Align center"><svg viewBox="0 -960 960 960"><path d="M150-120q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm160-165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h340q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H310ZM150-450q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm160-165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h340q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H310ZM150-780q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Z"/></svg></button>
        <button class="m3" type="button" role="radio" aria-checked="false" aria-label="Align right"><svg viewBox="0 -960 960 960"><path d="M150-780q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm240 165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h420q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H390ZM150-450q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm240 165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h420q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H390ZM150-120q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Z"/></svg></button>
        <button class="m3" type="button" role="radio" aria-checked="false" aria-label="Justify"><svg viewBox="0 -960 960 960"><path d="M150-120q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm0-165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm0-165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm0-165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm0-165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Z"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const btns = [...root.querySelectorAll('.m3')];
    const pick = (i) => btns.forEach((b, j) => { b.setAttribute('aria-checked', String(i === j)); b.tabIndex = i === j ? 0 : -1; });
    btns.forEach((b, i) => {
      b.addEventListener('click', () => pick(i));
      b.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault(); const n = (i + (e.key === 'ArrowRight' ? 1 : btns.length - 1)) % btns.length; btns[n].focus(); pick(n);
      });
    });
    pick(0);
  },
};
