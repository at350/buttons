export default {
  id: 'mb-bluesky-follow',
  credit: 'Bluesky — blue "Follow" pill with the butterfly that flaps its wings on hover; the like heart pops pink with scattered dots',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 18px 22px; border-radius: 12px; background: #fff; border: 1px solid #e8ebee; display: flex; align-items: center; gap: 14px; font: 600 14px/1 Inter, -apple-system, system-ui, sans-serif; }
    .fl { height: 34px; padding: 0 14px 0 10px; border-radius: 999px; border: 0; background: #1185fe; color: #fff; cursor: pointer; display: inline-flex; align-items: center; gap: 7px;
      transition: background .2s, transform .15s cubic-bezier(.2,.8,.2,1), box-shadow .25s; -webkit-tap-highlight-color: transparent; }
    .fl:hover { background: #0e6fd6; box-shadow: 0 6px 18px -6px rgba(17,133,254,.7); }
    .fl:active { transform: scale(.96); }
    .fl:focus-visible, .lk:focus-visible { outline: 2px solid #1185fe; outline-offset: 2px; }
    .fl[aria-pressed="true"] { background: #e8ebee; color: #0b0f14; box-shadow: none; }
    .fl[aria-pressed="true"]:hover { background: #dde2e7; }
    .bf { width: 18px; height: 18px; overflow: visible; }
    .bf path { fill: currentColor; transform-origin: 50% 55%; transition: transform .3s cubic-bezier(.2,.8,.2,1); }
    .fl:hover .bf .l { animation: flapL .6s ease-in-out infinite; }
    .fl:hover .bf .r { animation: flapR .6s ease-in-out infinite; }
    @keyframes flapL { 50% { transform: rotateY(55deg) scaleX(.7); } }
    @keyframes flapR { 50% { transform: rotateY(-55deg) scaleX(.7); } }
    .bf { perspective: 60px; }
    .lk { position: relative; height: 34px; min-width: 34px; padding: 0 8px; border-radius: 999px; border: 0; background: transparent; color: #6b7a8a; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; font: 500 14px/1 Inter, system-ui, sans-serif; -webkit-tap-highlight-color: transparent; transition: background .15s; }
    .lk:hover { background: #fff0f6; color: #ec4899; }
    .lk svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linejoin: round; transition: transform .35s linear(0, 0.4 12%, 1.3 35%, 0.9 55%, 1.05 75%, 1), fill .15s; }
    .lk[aria-pressed="true"] { color: #ec4899; }
    .lk[aria-pressed="true"] svg { fill: #ec4899; stroke: #ec4899; transform: scale(1.12); }
    .lk .n { font-variant-numeric: tabular-nums; }
    .lk i { --r: 0deg; position: absolute; left: 50%; top: 50%; width: 4px; height: 4px; margin: -2px 0 0 -14px; border-radius: 50%; background: #ec4899; opacity: 0; pointer-events: none; }
    .lk.pop i { animation: fly .6s cubic-bezier(.2,.8,.2,1) forwards; }
    .lk i:nth-of-type(2) { --r: 60deg; } .lk i:nth-of-type(3) { --r: 120deg; } .lk i:nth-of-type(4) { --r: 180deg; } .lk i:nth-of-type(5) { --r: 240deg; } .lk i:nth-of-type(6) { --r: 300deg; }
    @keyframes fly { 0% { opacity: 1; transform: rotate(var(--r)) translateY(0); } 100% { opacity: 0; transform: rotate(var(--r)) translateY(-22px); } }
  `,
  html: `
    <div class="stage">
      <button class="fl" type="button" aria-pressed="false"><svg class="bf" viewBox="0 0 24 24"><path class="l" d="M12 10.5c-1.2-2.6-4.3-7.3-7.4-8.4C2.3 1.4 2 2.7 2 3.6c0 1 .6 7.9 1 9.1.6 2.4 2.8 2.9 4.9 2.6-3.1.5-3.9 2.3-2.2 4 3.2 3.4 4.6-.8 5.6-3.2.2-.4.5-.8.7-1.2z"/><path class="r" d="M12 10.5c1.2-2.6 4.3-7.3 7.4-8.4C21.7 1.4 22 2.7 22 3.6c0 1-.6 7.9-1 9.1-.6 2.4-2.8 2.9-4.9 2.6 3.1.5 3.9 2.3 2.2 4-3.2 3.4-4.6-.8-5.6-3.2-.2-.4-.5-.8-.7-1.2z"/></svg><span class="lbl">Follow</span></button>
      <button class="lk" type="button" aria-pressed="false" aria-label="Like"><svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.7a4.3 4.3 0 0 1 7.5 2.8c0 5.4-7.5 10-7.5 10z"/></svg><span class="n">42</span><i></i><i></i><i></i><i></i><i></i><i></i></button>
    </div>`,
  init(root) {
    const fl = root.querySelector('.fl'), lk = root.querySelector('.lk');
    fl.addEventListener('click', () => { const on = fl.getAttribute('aria-pressed') !== 'true'; fl.setAttribute('aria-pressed', String(on)); fl.querySelector('.lbl').textContent = on ? 'Following' : 'Follow'; });
    lk.addEventListener('click', () => {
      const on = lk.getAttribute('aria-pressed') !== 'true'; const n = lk.querySelector('.n');
      lk.setAttribute('aria-pressed', String(on)); n.textContent = String(+n.textContent + (on ? 1 : -1));
      lk.classList.remove('pop'); if (on) { void lk.offsetWidth; lk.classList.add('pop'); }
    });
  },
};
