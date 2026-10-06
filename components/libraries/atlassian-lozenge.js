export default {
  id: 'lb-atlassian-lozenge',
  credit: 'Atlassian Design System (2025 refresh) / Jira — Primary (#1868DB) and Default buttons at 32px / 6px radius beside the issue status Lozenge dropdown (To do → In progress → Done)',
  size: 'auto',
  css: `
    :host { display: inline-block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .row { display: inline-flex; align-items: center; gap: 8px; font: 400 14px/20px "Atlassian Sans", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif; color: #292a2e; }
    .ak { position: relative; height: 32px; padding: 6px 12px; border-radius: 6px; border: 0; cursor: pointer; font: inherit; font-weight: 500; display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; transition: background .1s ease-out; -webkit-tap-highlight-color: transparent; }
    .ak:focus-visible, .trig:focus-visible { outline: 2px solid #4688ec; outline-offset: 2px; }
    .pri { background: #1868db; color: #fff; }
    .pri:hover { background: #1558bc; }
    .pri:active { background: #144794; }
    .def { background: transparent; color: #505258; }
    .def::after { content: ''; position: absolute; inset: 0; border-radius: inherit; border: 1px solid #0b120e24; pointer-events: none; }
    .def:hover { background: #0515240f; }
    .def:active { background: #0b120e24; }
    .def[aria-pressed="true"] { background: #e9f2fe; color: #1868db; }
    .def[aria-pressed="true"]::after { border-color: #1868db; }
    .ak svg, .trig svg, .it svg { width: 16px; height: 16px; fill: currentColor; flex: none; }
    .wrap { position: relative; }
    .trig { display: inline-flex; align-items: center; gap: 4px; height: 20px; padding: 2px 4px; border-radius: 4px; border: 1px solid var(--bd); background: var(--bg); color: var(--fg); cursor: pointer; font: 400 12px/16px "Atlassian Sans", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; white-space: nowrap; transition: background-color .15s cubic-bezier(.4,1,.6,1), border-color .15s; -webkit-tap-highlight-color: transparent; }
    .trig:hover { background: var(--bgh); }
    .trig:active { background: var(--bgp); }
    .trig svg { width: 12px; height: 12px; transition: transform .2s cubic-bezier(.4,0,0,1); }
    .trig[aria-expanded="true"] svg { transform: rotate(180deg); }
    .stack { display: grid; }
    .stack > span { grid-area: 1 / 1; visibility: hidden; text-align: left; }
    .stack > span.on { visibility: visible; }
    [data-s="todo"] { --bg: #0515240f; --bgh: #0b120e24; --bgp: #080f214a; --fg: #292a2e; --bd: #0b120e24; }
    [data-s="prog"] { --bg: #cfe1fd; --bgh: #adcbfb; --bgp: #8fb8f6; --fg: #123263; --bd: #8fb8f6; }
    [data-s="done"] { --bg: #d3f1a7; --bgh: #bde97c; --bgp: #b3df72; --fg: #37471f; --bd: #b3df72; }
    .lz { display: inline-flex; align-items: center; height: 20px; padding: 2px 4px; border-radius: 4px; border: 1px solid var(--bd); background: var(--bg); color: var(--fg); font: 400 12px/16px "Atlassian Sans", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; white-space: nowrap; }
    .menu { position: absolute; top: 28px; left: 0; min-width: 180px; padding: 6px 0; background: #fff; border-radius: 8px; box-shadow: 0 8px 12px #1e1f2126, 0 0 1px #1e1f214f; display: none; }
    .menu.r { left: auto; right: 0; }
    .menu.open { display: block; animation: in .15s cubic-bezier(.4,1,.6,1); }
    @keyframes in { from { opacity: 0; transform: translateY(-4px); } }
    .it { display: flex; align-items: center; justify-content: space-between; width: 100%; height: 36px; padding: 0 12px; border: 0; background: none; cursor: pointer; font: inherit; color: #292a2e; position: relative; }
    .it:hover, .it:focus-visible { background: #0515240f; outline: 0; }
    .it[aria-selected="true"] { background: #e9f2fe; }
    .it[aria-selected="true"]::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: #1868db; }
    .it svg { color: #1868db; opacity: 0; }
    .it[aria-selected="true"] svg { opacity: 1; }
  `,
  html: `
    <div class="row">
      <button class="ak pri" type="button"><svg viewBox="0 0 16 16"><path d="M8.75 1.5v5.75h5.75v1.5H8.75v5.75h-1.5V8.75H1.5v-1.5h5.75V1.5z"/></svg>Create</button>
      <button class="ak def" type="button" aria-pressed="false">Watch</button>
      <div class="wrap">
        <button class="trig" type="button" aria-haspopup="listbox" aria-expanded="false" data-s="todo"><span class="stack"><span class="on" data-v="todo">To do</span><span data-v="prog">In progress</span><span data-v="done">Done</span></span><svg viewBox="0 0 16 16"><path d="m14.53 6.03-6 6a.75.75 0 0 1-1.004.052l-.056-.052-6-6 1.06-1.06L8 10.44l5.47-5.47z"/></svg></button>
        <div class="menu" role="listbox" aria-label="Status">
          <button class="it" type="button" role="option" aria-selected="true" data-v="todo"><span class="lz" data-s="todo">To do</span><svg viewBox="0 0 16 16"><path d="m13.959 3.97-7.25 9a.75.75 0 0 1-1.163.007l-3.5-4.25 1.158-.954 2.914 3.539 6.673-8.283z"/></svg></button>
          <button class="it" type="button" role="option" aria-selected="false" data-v="prog"><span class="lz" data-s="prog">In progress</span><svg viewBox="0 0 16 16"><path d="m13.959 3.97-7.25 9a.75.75 0 0 1-1.163.007l-3.5-4.25 1.158-.954 2.914 3.539 6.673-8.283z"/></svg></button>
          <button class="it" type="button" role="option" aria-selected="false" data-v="done"><span class="lz" data-s="done">Done</span><svg viewBox="0 0 16 16"><path d="m13.959 3.97-7.25 9a.75.75 0 0 1-1.163.007l-3.5-4.25 1.158-.954 2.914 3.539 6.673-8.283z"/></svg></button>
        </div>
      </div>
    </div>`,
  init(root, host) {
    const trig = root.querySelector('.trig'), menu = root.querySelector('.menu');
    const labels = [...trig.querySelectorAll('.stack > span')], items = [...menu.querySelectorAll('.it')];
    const onDoc = (e) => { if (!e.composedPath().includes(host)) set(false); };
    const set = (v) => {
      if (v) menu.classList.toggle('r', trig.getBoundingClientRect().left + 190 > document.documentElement.clientWidth);
      trig.setAttribute('aria-expanded', v); menu.classList.toggle('open', v); host.toggleAttribute('data-open', v);
      document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true);
    };
    trig.addEventListener('click', () => set(trig.getAttribute('aria-expanded') !== 'true'));
    items.forEach((it) => it.addEventListener('click', () => {
      const v = it.dataset.v;
      items.forEach((x) => x.setAttribute('aria-selected', x === it));
      labels.forEach((l) => l.classList.toggle('on', l.dataset.v === v));
      trig.dataset.s = v; set(false); trig.focus({ preventScroll: true });
    }));
    root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && trig.getAttribute('aria-expanded') === 'true') { set(false); trig.focus({ preventScroll: true }); } });
    const w = root.querySelector('.def');
    w.addEventListener('click', () => w.setAttribute('aria-pressed', w.getAttribute('aria-pressed') !== 'true'));
    return () => set(false);
  },
};
