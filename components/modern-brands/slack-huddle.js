export default {
  id: 'mb-slack-huddle',
  credit: 'Slack huddle — headphones toggle in the channel header; joining turns it huddle-green and a live sound wave starts bouncing',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 16px 20px; border-radius: 12px; background: #fff; border: 1px solid #ddd; display: flex; align-items: center; gap: 10px; font: 700 15px/1 "Lato", Inter, -apple-system, system-ui, sans-serif; color: #1d1c1d; }
    .ch { display: inline-flex; align-items: center; gap: 4px; margin-right: auto; }
    .ch svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; }
    .hud { position: relative; display: inline-flex; align-items: stretch; height: 30px; border-radius: 6px; border: 1px solid #ddd; background: #fff; overflow: hidden; transition: border-color .2s, box-shadow .25s, background .25s; }
    .hud:hover { border-color: #bbb; }
    .hud.on { border-color: #007a5a; background: #007a5a; box-shadow: 0 0 0 3px rgba(0,122,90,.15); }
    .tg, .ch2 { border: 0; background: transparent; color: #1d1c1d; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; padding: 0 9px; font: 600 13px/1 Inter, system-ui, sans-serif; transition: background .15s, color .15s; -webkit-tap-highlight-color: transparent; }
    .tg:hover, .ch2:hover { background: #f6f6f6; }
    .hud.on .tg, .hud.on .ch2 { color: #fff; }
    .hud.on .tg:hover, .hud.on .ch2:hover { background: #006a4e; }
    .ch2 { border-left: 1px solid #ddd; padding: 0 6px; }
    .hud.on .ch2 { border-left-color: rgba(255,255,255,.3); }
    .tg:focus-visible, .ch2:focus-visible { outline: 2px solid #1264a3; outline-offset: -3px; }
    .tg svg, .ch2 svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .ch2 svg { width: 12px; height: 12px; transition: transform .3s cubic-bezier(.2,.8,.2,1); }
    .ch2[aria-expanded="true"] svg { transform: rotate(180deg); }
    .wave { display: none; gap: 2px; align-items: center; height: 16px; }
    .wave i { width: 3px; height: 4px; border-radius: 2px; background: #fff; animation: w .8s ease-in-out infinite alternate; }
    .wave i:nth-child(2) { animation-delay: -.2s; } .wave i:nth-child(3) { animation-delay: -.4s; } .wave i:nth-child(4) { animation-delay: -.6s; }
    @keyframes w { from { height: 4px; } to { height: 16px; } }
    .hud.on .wave { display: inline-flex; }
    .hud.on .tg svg { display: none; }
  `,
  html: `
    <div class="stage">
      <span class="ch"><svg viewBox="0 0 24 24"><path d="M9 3 7 21M17 3l-2 18M4 9h17M3 15h17"/></svg>design</span>
      <div class="hud">
        <button class="tg" type="button" aria-pressed="false" aria-label="Start huddle"><svg viewBox="0 0 24 24"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="13" width="5" height="7" rx="2"/><rect x="16" y="13" width="5" height="7" rx="2"/></svg><span class="wave"><i></i><i></i><i></i><i></i></span><span class="lbl">Huddle</span></button>
        <button class="ch2" type="button" aria-expanded="false" aria-label="Huddle options"><svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const hud = root.querySelector('.hud'), tg = root.querySelector('.tg'), ch2 = root.querySelector('.ch2'), lbl = root.querySelector('.lbl');
    tg.addEventListener('click', () => { const on = tg.getAttribute('aria-pressed') !== 'true'; tg.setAttribute('aria-pressed', String(on)); hud.classList.toggle('on', on); lbl.textContent = on ? 'Live' : 'Huddle'; tg.setAttribute('aria-label', on ? 'Leave huddle' : 'Start huddle'); });
    ch2.addEventListener('click', () => ch2.setAttribute('aria-expanded', String(ch2.getAttribute('aria-expanded') !== 'true')));
  },
};
