// VALORANT (playvalorant.com / client): #ff4655 slab inside a hairline #ece8e1 frame whose side rules are cut,
// the tiny corner square, condensed Tungsten-style caps in #ece8e1; hover slides the #0f1923 fill across
// (Riot's 300ms cubic-bezier), click enters queue with a red flash.
export default {
  id: 'gm-valorant-button',
  credit: 'Riot Games VALORANT — the #ff4655 "PLAY" slab in its cut hairline frame with the corner square; hover slides the dark fill across, click enters queue',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 26px 26px; border-radius: 12px; display: flex; gap: 18px; align-items: center; background: #0f1923;
      background-image: linear-gradient(rgba(236,232,225,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(236,232,225,.035) 1px, transparent 1px); background-size: 22px 22px; }
    .v { position: relative; border: none; background: none; cursor: pointer; padding: 6px; color: #ece8e1; }
    .v::before, .v::after { content: ""; position: absolute; left: 0; right: 0; height: calc(50% - 6px); border: 1px solid rgba(236,232,225,.5); pointer-events: none; transition: border-color 300ms; }
    .v::before { top: 0; border-bottom: 0; } .v::after { bottom: 0; border-top: 0; }
    .v:hover::before, .v:hover::after { border-color: #ece8e1; }
    .in { position: relative; display: grid; place-items: center; height: 46px; min-width: 156px; padding: 0 26px; overflow: hidden; background: #ff4655; }
    .in::before { content: ""; position: absolute; top: 0; bottom: 0; left: -10%; width: 0; background: #0f1923; transform: skewX(-45deg); transition: width 300ms cubic-bezier(.65,.05,.36,1); }
    .v:hover .in::before, .v.on .in::before { width: 125%; }
    .sq { position: absolute; right: 0; bottom: 0; width: 6px; height: 6px; background: #0f1923; transition: background 300ms; }
    .v:hover .sq, .v.on .sq { background: #ff4655; }
    .lbl { position: relative; grid-area: 1 / 1; font: 700 22px/1 'Bricolage Grotesque', 'Inter', system-ui, sans-serif; font-variation-settings: 'wdth' 75; letter-spacing: 1.5px; text-transform: uppercase; white-space: nowrap; }
    .lbl[hidden] { display: block; visibility: hidden; }
    .v:active .in { transform: scale(.98); }
    .v.flash .in { animation: fl 260ms steps(2); }
    @keyframes fl { 50% { background: #fff; } }
    .v:focus-visible { outline: 2px solid #ff4655; outline-offset: 3px; }
    .ghost .in { background: transparent; box-shadow: inset 0 0 0 1px rgba(236,232,225,.5); min-width: 110px; }
    .ghost .in::before { background: #ece8e1; }
    .ghost:hover .lbl { color: #0f1923; }
    .ghost .sq { background: #ece8e1; } .ghost:hover .sq { background: #0f1923; }
    .ghost .lbl { transition: color 300ms; }
  `,
  html: `
    <div class="stage">
      <button class="v play" type="button" aria-pressed="false"><span class="in"><span class="lbl a">Play</span><span class="lbl b" hidden>In Queue</span><span class="sq"></span></span></button>
      <button class="v ghost" type="button"><span class="in"><span class="lbl">Store</span><span class="sq"></span></span></button>
    </div>`,
  init(root) {
    const v = root.querySelector('.play'), a = v.querySelector('.a'), b = v.querySelector('.b'); let t;
    v.addEventListener('click', () => { const on = v.classList.toggle('on'); v.setAttribute('aria-pressed', String(on)); a.hidden = on; b.hidden = !on; v.classList.remove('flash'); void v.offsetWidth; v.classList.add('flash'); clearTimeout(t); t = setTimeout(() => v.classList.remove('flash'), 300); });
    return () => clearTimeout(t);
  },
};
