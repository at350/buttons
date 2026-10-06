export default {
  id: 'rt-cassette-deck',
  credit: 'Hi-fi cassette deck — mechanical piano-key transport; one key latches down until Stop',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #2b2b2b; padding: 14px 16px 10px; border-radius: 12px; display: inline-block;
      background-image: linear-gradient(90deg, rgba(255,255,255,.04) 50%, transparent 50%); background-size: 3px 100%; }
    .keys { display: flex; gap: 3px; padding: 4px; background: #111; border-radius: 3px; box-shadow: inset 0 2px 4px #000; }
    .k { width: 44px; height: 34px; border: none; padding: 0; cursor: pointer; position: relative; border-radius: 2px 2px 3px 3px;
      background: linear-gradient(#8f8f8a, #6b6b66 60%, #55554f); box-shadow: 0 6px 0 #3a3a36, 0 7px 2px rgba(0,0,0,.6), inset 0 1px 0 #b8b8b2;
      transition: transform .08s, box-shadow .08s; display: grid; place-items: center; }
    .k svg { width: 16px; height: 12px; fill: #1a1a1a; }
    .k.rec svg { fill: #c62828; }
    .k:active, .k.down { transform: translateY(5px); box-shadow: 0 1px 0 #3a3a36, 0 2px 1px rgba(0,0,0,.6), inset 0 1px 0 #b8b8b2; background: linear-gradient(#7a7a75, #5a5a55); }
    .k:focus-visible { outline: 2px solid #ffb300; outline-offset: 2px; }
    .lbl { display: flex; gap: 3px; padding: 6px 4px 0; }
    .lbl span { width: 44px; text-align: center; font: 8px/1 Helvetica, Arial, sans-serif; letter-spacing: 1px; color: #b5b5ad; text-transform: uppercase; }
  `,
  html: `
    <div class="stage">
      <div class="keys">
        <button class="k rec" type="button" aria-label="Record" aria-pressed="false"><svg viewBox="0 0 16 12"><circle cx="8" cy="6" r="5"/></svg></button>
        <button class="k" type="button" aria-label="Rewind" aria-pressed="false"><svg viewBox="0 0 16 12"><path d="M8 0L0 6l8 6zM16 0L8 6l8 6z"/></svg></button>
        <button class="k" type="button" aria-label="Play" aria-pressed="false"><svg viewBox="0 0 16 12"><path d="M3 0l10 6-10 6z"/></svg></button>
        <button class="k" type="button" aria-label="Fast forward" aria-pressed="false"><svg viewBox="0 0 16 12"><path d="M0 0l8 6-8 6zM8 0l8 6-8 6z"/></svg></button>
        <button class="k stop" type="button" aria-label="Stop"><svg viewBox="0 0 16 12"><rect x="2" y="0" width="12" height="12"/></svg></button>
        <button class="k" type="button" aria-label="Pause" aria-pressed="false"><svg viewBox="0 0 16 12"><path d="M2 0h4v12H2zM10 0h4v12h-4z"/></svg></button>
      </div>
      <div class="lbl"><span>rec</span><span>rew</span><span>play</span><span>f.fwd</span><span>stop</span><span>pause</span></div>
    </div>`,
  init(root) {
    const keys = [...root.querySelectorAll('.k')];
    const clear = () => keys.forEach((k) => { k.classList.remove('down'); if (k.hasAttribute('aria-pressed')) k.setAttribute('aria-pressed', 'false'); });
    keys.forEach((k) => k.addEventListener('click', () => {
      if (k.classList.contains('stop')) return clear();
      const was = k.classList.contains('down'); clear();
      if (!was) { k.classList.add('down'); k.setAttribute('aria-pressed', 'true'); }
    }));
  },
};
