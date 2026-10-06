export default {
  id: 'bt-linear-status',
  credit: 'Linear — issue status dropdown (Backlog / Todo / In Progress / Done rings)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 16px 20px 20px; border-radius: 12px; background: #0f1011; }
    .wrap { position: relative; display: inline-block; font: 500 13px Inter, -apple-system, system-ui, sans-serif; }
    .pill {
      height: 28px; padding: 0 10px 0 8px; border-radius: 6px; border: 1px solid #2b2d31; background: #191a1c; color: #d0d2d8;
      display: inline-flex; align-items: center; gap: 8px; cursor: pointer; font: inherit; transition: background .12s, border-color .12s;
      -webkit-tap-highlight-color: transparent;
    }
    .pill:hover { background: #222327; border-color: #3a3c42; }
    .pill:focus-visible { outline: none; border-color: #5e6ad2; box-shadow: 0 0 0 3px rgba(94,106,210,.35); }
    .ic { width: 14px; height: 14px; flex: none; }
    .ic .r { fill: none; stroke-width: 1.8; }
    .ic .f { fill: none; stroke-width: 7; transform: rotate(-90deg); transform-origin: 50% 50%; stroke-dasharray: 22; transition: stroke-dashoffset .25s; }
    .menu {
      position: absolute; top: calc(100% + 6px); left: 0; z-index: 5; width: 200px; padding: 4px;
      background: #1c1d20; border: 1px solid #2b2d31; border-radius: 8px; box-shadow: 0 12px 32px rgba(0,0,0,.5);
      display: none; color: #d0d2d8;
    }
    .pill[aria-expanded="true"] + .menu { display: block; }
    .opt {
      display: flex; align-items: center; gap: 10px; width: 100%; height: 30px; padding: 0 8px; border: 0; border-radius: 5px;
      background: none; color: inherit; font: inherit; cursor: pointer; text-align: left;
    }
    .opt:hover, .opt:focus-visible { background: #2a2b30; outline: none; }
    .opt .k { margin-left: auto; color: #6b6f78; font-size: 11px; }
    .opt[aria-checked="true"] .k::before { content: '✓'; color: #d0d2d8; font-size: 12px; margin-right: 6px; }
  `,
  html: `
    <div class="stage">
      <div class="wrap">
        <button class="pill" type="button" aria-expanded="false" aria-haspopup="listbox">
          <svg class="ic" viewBox="0 0 14 14"><circle class="r" cx="7" cy="7" r="6" stroke="#e2e2e2"/><circle class="f" cx="7" cy="7" r="3.5" stroke="#e2e2e2" stroke-dashoffset="22"/></svg>
          <span class="lbl">Todo</span>
        </button>
        <div class="menu" role="listbox">
          <button class="opt" type="button" role="option" aria-checked="false" data-c="#6b6f78" data-d="22" data-dash="2 2"><svg class="ic" viewBox="0 0 14 14"><circle class="r" cx="7" cy="7" r="6" stroke="#6b6f78" stroke-dasharray="2 2"/></svg><span>Backlog</span><span class="k">1</span></button>
          <button class="opt" type="button" role="option" aria-checked="true" data-c="#e2e2e2" data-d="22"><svg class="ic" viewBox="0 0 14 14"><circle class="r" cx="7" cy="7" r="6" stroke="#e2e2e2"/></svg><span>Todo</span><span class="k">2</span></button>
          <button class="opt" type="button" role="option" aria-checked="false" data-c="#f2c94c" data-d="11"><svg class="ic" viewBox="0 0 14 14"><circle class="r" cx="7" cy="7" r="6" stroke="#f2c94c"/><circle class="f" cx="7" cy="7" r="3.5" stroke="#f2c94c" stroke-dashoffset="11"/></svg><span>In Progress</span><span class="k">3</span></button>
          <button class="opt" type="button" role="option" aria-checked="false" data-c="#5e6ad2" data-d="0"><svg class="ic" viewBox="0 0 14 14"><circle class="r" cx="7" cy="7" r="6" stroke="#5e6ad2"/><circle class="f" cx="7" cy="7" r="3.5" stroke="#5e6ad2" stroke-dashoffset="0"/></svg><span>Done</span><span class="k">4</span></button>
        </div>
      </div>
    </div>`,
  init(root) {
    const pill = root.querySelector('.pill');
    const lbl = root.querySelector('.lbl');
    const ring = pill.querySelector('.r');
    const fill = pill.querySelector('.f');
    const opts = [...root.querySelectorAll('.opt')];
    pill.addEventListener('click', () => pill.setAttribute('aria-expanded', pill.getAttribute('aria-expanded') !== 'true'));
    opts.forEach((o) => o.addEventListener('click', () => {
      opts.forEach((x) => x.setAttribute('aria-checked', x === o));
      lbl.textContent = o.children[1].textContent;
      ring.setAttribute('stroke', o.dataset.c);
      if (o.dataset.dash) ring.setAttribute('stroke-dasharray', o.dataset.dash); else ring.removeAttribute('stroke-dasharray');
      fill.setAttribute('stroke', o.dataset.c);
      fill.setAttribute('stroke-dashoffset', o.dataset.d);
      pill.setAttribute('aria-expanded', 'false');
    }));
    root.addEventListener('keydown', (e) => { if (e.key === 'Escape') pill.setAttribute('aria-expanded', 'false'); });
  },
};
