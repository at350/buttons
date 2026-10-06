export default {
  id: 'ob-facebook-poke',
  credit: 'Facebook (2008) — the "Poke" button: pale blue gradient, Lucida Grande; poke, get poked back, repeat',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .fb { width: 280px; max-width: 100%; background: #fff; border: 1px solid #ccc; border-top: 3px solid #3b5998; border-radius: 0 0 12px 12px; font: 11px/1.4 "Lucida Grande", Tahoma, Verdana, Arial, sans-serif; color: #333; overflow: hidden; }
    .hd { display: flex; align-items: center; gap: 8px; padding: 8px 10px; background: #f7f7f7; border-bottom: 1px solid #e5e5e5; }
    .av { width: 32px; height: 32px; background: #d8dfea; border: 1px solid #b7c1d6; display: grid; place-items: center; }
    .av svg { width: 22px; height: 22px; fill: #fff; }
    .nm { color: #3b5998; font-weight: 700; font-size: 12px; }
    .bd { padding: 10px; display: flex; align-items: center; gap: 8px; }
    .poke { padding: 2px 8px 3px; border: 1px solid; border-color: #d9dfea #0e1f5b #0e1f5b #d9dfea; background: #3b5998; color: #fff; cursor: pointer; font: 700 11px "Lucida Grande", Tahoma, Verdana, Arial, sans-serif; }
    .poke:hover { background: #4b6bb8; }
    .poke:active { border-color: #0e1f5b #d9dfea #d9dfea #0e1f5b; }
    .poke:focus-visible { outline: 1px dotted #000; outline-offset: 1px; }
    .poke.lite { background: #eceff5; color: #3b5998; border-color: #d8dfea #899bc1 #899bc1 #d8dfea; }
    .poke.lite:hover { background: #dfe5f0; }
    .st { color: #666; flex: 1; }
    .st b { color: #333; }
    .hand { font-size: 14px; display: inline-block; transition: transform .2s; }
    .fb.poked .hand { animation: poke .4s ease-out; }
    @keyframes poke { 0% { transform: translateX(0); } 40% { transform: translateX(10px) rotate(-10deg); } 100% { transform: translateX(0); } }
  `,
  html: `
    <div class="fb">
      <div class="hd"><span class="av" aria-hidden="true"><svg viewBox="0 0 22 22"><circle cx="11" cy="8" r="4.5"/><path d="M2 21c0-5 4-8 9-8s9 3 9 8z"/></svg></span><span class="nm">Tom Anderson</span></div>
      <div class="bd"><span class="hand" aria-hidden="true">👉</span><button class="poke" type="button">Poke</button><span class="st" aria-live="polite"></span></div>
    </div>`,
  init(root) {
    const fb = root.querySelector('.fb'), poke = root.querySelector('.poke'), st = root.querySelector('.st');
    let n = 0, t = 0;
    poke.addEventListener('click', () => {
      n++; clearTimeout(t);
      fb.classList.remove('poked'); void fb.offsetWidth; fb.classList.add('poked');
      poke.textContent = 'Poked'; poke.classList.add('lite');
      st.innerHTML = `You poked <b>Tom</b>.${n > 1 ? ` (${n})` : ''}`;
      t = setTimeout(() => { st.innerHTML = '<b>Tom</b> poked you back.'; poke.textContent = 'Poke Back'; poke.classList.remove('lite'); }, 1600);
    });
    return () => clearTimeout(t);
  },
};
