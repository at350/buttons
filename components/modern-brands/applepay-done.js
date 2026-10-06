export default {
  id: 'mb-applepay-done',
  credit: 'Apple Pay (iOS) — payment sheet with the side-button "Double Click to Pay" cue; Face ID scans, the ring spins and lands on the blue Done check',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 248px; max-width: 100%; padding: 14px 12px 12px; border-radius: 12px; background: #000;
      font: 400 13px/1.2 -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif; color: #fff; -webkit-font-smoothing: antialiased; }
    .sheet { position: relative; border-radius: 22px; background: #1c1c1e; padding: 14px 14px 16px; display: grid; gap: 0; }
    .hd { display: flex; align-items: center; justify-content: space-between; height: 28px; }
    .ap { height: 34px; width: 34px; fill: #fff; }
    .x { position: absolute; right: 14px; top: 14px; width: 28px; height: 28px; border-radius: 50%; border: 0; padding: 0; background: #2c2c2e; color: #aeaeb2; cursor: pointer; display: grid; place-items: center;
      transition: background .2s, transform .35s cubic-bezier(.32,.72,0,1); }
    .x:hover { background: #3a3a3c; } .x:active { transform: scale(.9); }
    .x svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; }
    .row { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: .5px solid #38383a; }
    .cc { width: 38px; height: 25px; border-radius: 4px; flex: none; background: linear-gradient(135deg, #f5f5f7, #c7c7cc); box-shadow: inset 0 0 0 .5px rgba(0,0,0,.2); position: relative; }
    .row b { display: block; font-weight: 600; font-size: 13px; }
    .row small { color: #8e8e93; font-size: 12px; }
    .tot { display: flex; justify-content: space-between; align-items: baseline; padding: 10px 0 14px; }
    .tot span { color: #8e8e93; font-size: 12px; }
    .tot b { font-size: 20px; font-weight: 600; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
    .pay { display: grid; justify-items: center; gap: 10px; }
    .ring { position: relative; width: 60px; height: 60px; border-radius: 50%; border: 0; padding: 0; background: transparent; cursor: pointer; color: #fff; display: grid; place-items: center; -webkit-tap-highlight-color: transparent;
      transition: transform .4s cubic-bezier(.32,.72,0,1); }
    .ring:active { transform: scale(.92); }
    .ring:focus-visible { outline: 2px solid #0a84ff; outline-offset: 4px; }
    .ring > svg { position: absolute; inset: 0; width: 100%; height: 100%; }
    .prg { fill: none; stroke: #0a84ff; stroke-width: 3.5; stroke-linecap: round; stroke-dasharray: 44 200; transform-origin: 30px 30px; opacity: 0; transition: opacity .2s, stroke-dasharray .45s cubic-bezier(.32,.72,0,1); }
    .busy .prg { opacity: 1; animation: rot .9s linear infinite; }
    .done .prg { opacity: 1; stroke-dasharray: 176 200; transform: rotate(-90deg); }
    @keyframes rot { to { transform: rotate(360deg); } }
    .fid { position: relative; width: 40px; height: 40px; fill: none; stroke: #fff; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round;
      transition: opacity .25s, transform .45s cubic-bezier(.32,.72,0,1); }
    .ring:hover .fid { transform: scale(1.06); }
    .scan .fid { animation: scan .5s cubic-bezier(.32,.72,0,1) 2 alternate; }
    @keyframes scan { to { transform: rotateY(28deg) scale(.94); } }
    .busy .fid, .done .fid { opacity: 0; transform: scale(.5); }
    .chk { position: relative; width: 28px; height: 28px; fill: none; stroke: #0a84ff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 22; stroke-dashoffset: 22; }
    .done .chk { animation: draw .45s .1s cubic-bezier(.32,.72,0,1) forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    .st { display: grid; justify-items: center; font-size: 13px; font-weight: 500; color: #fff; }
    .st span { grid-area: 1 / 1; transition: opacity .2s; white-space: nowrap; }
    .st span:not(.on) { opacity: 0; }
    .side { position: absolute; right: 0; top: 34px; width: 5px; height: 46px; border-radius: 3px 0 0 3px; background: #fff; transform-origin: right;
      animation: nudge 1.4s cubic-bezier(.32,.72,0,1) infinite; transition: opacity .3s; }
    @keyframes nudge { 0%, 60%, 100% { transform: scaleX(1); opacity: .9; } 25% { transform: scaleX(1.8); opacity: 1; } }
    .stage.paid .side, .stage.paying .side { opacity: 0; animation: none; }
  `,
  html: `
    <div class="stage">
      <div class="sheet">
        <div class="hd"><svg class="ap" viewBox="0 0 24 24" role="img" aria-label="Apple Pay"><path d="M2.15 4.318a42.16 42.16 0 0 0-.454.003c-.15.005-.303.013-.452.04a1.44 1.44 0 0 0-1.06.772c-.07.138-.114.278-.14.43-.028.148-.037.3-.04.45A10.2 10.2 0 0 0 0 6.222v11.557c0 .07.002.138.003.207.004.15.013.303.04.452.027.15.072.291.142.429a1.436 1.436 0 0 0 .63.63c.138.07.278.115.43.142.148.027.3.036.45.04l.208.003h20.194l.207-.003c.15-.004.303-.013.452-.04.15-.027.291-.071.428-.141a1.432 1.432 0 0 0 .631-.631c.07-.138.115-.278.141-.43.027-.148.036-.3.04-.45.002-.07.003-.138.003-.208l.001-.246V6.221c0-.07-.002-.138-.004-.207a2.995 2.995 0 0 0-.04-.452 1.446 1.446 0 0 0-1.2-1.201 3.022 3.022 0 0 0-.452-.04 10.448 10.448 0 0 0-.453-.003zm0 .512h19.942c.066 0 .131.002.197.003.115.004.25.01.375.032.109.02.2.05.287.094a.927.927 0 0 1 .407.407.997.997 0 0 1 .094.288c.022.123.028.258.031.374.002.065.003.13.003.197v11.552c0 .065 0 .13-.003.196-.003.115-.009.25-.032.375a.927.927 0 0 1-.5.693 1.002 1.002 0 0 1-.286.094 2.598 2.598 0 0 1-.373.032l-.2.003H1.906c-.066 0-.133-.002-.196-.003a2.61 2.61 0 0 1-.375-.032c-.109-.02-.2-.05-.288-.094a.918.918 0 0 1-.406-.407 1.006 1.006 0 0 1-.094-.288 2.531 2.531 0 0 1-.032-.373 9.588 9.588 0 0 1-.002-.197V6.224c0-.065 0-.131.002-.197.004-.114.01-.248.032-.375.02-.108.05-.199.094-.287a.925.925 0 0 1 .407-.406 1.03 1.03 0 0 1 .287-.094c.125-.022.26-.029.375-.032.065-.002.131-.002.196-.003zm4.71 3.7c-.3.016-.668.199-.88.456-.191.22-.36.58-.316.918.338.03.675-.169.888-.418.205-.258.345-.603.308-.955zm2.207.42v5.493h.852v-1.877h1.18c1.078 0 1.835-.739 1.835-1.812 0-1.07-.742-1.805-1.808-1.805zm.852.719h.982c.739 0 1.161.396 1.161 1.089 0 .692-.422 1.092-1.164 1.092h-.979zm-3.154.3c-.45.01-.83.28-1.05.28-.235 0-.593-.264-.981-.257a1.446 1.446 0 0 0-1.23.747c-.527.908-.139 2.255.374 2.995.249.366.549.769.944.754.373-.014.52-.242.973-.242.454 0 .586.242.98.235.41-.007.667-.366.915-.733.286-.417.403-.82.41-.841-.007-.008-.79-.308-.797-1.209-.008-.754.615-1.113.644-1.135-.352-.52-.9-.578-1.09-.593a1.123 1.123 0 0 0-.092-.002zm8.204.397c-.99 0-1.606.533-1.652 1.256h.777c.072-.358.369-.586.845-.586.502 0 .803.266.803.711v.309l-1.097.064c-.951.054-1.488.484-1.488 1.184 0 .72.548 1.207 1.332 1.207.526 0 1.032-.281 1.264-.727h.019v.659h.788v-2.76c0-.803-.62-1.317-1.591-1.317zm1.94.072l1.446 4.009c0 .003-.073.24-.073.247-.125.41-.33.571-.711.571-.069 0-.206 0-.267-.015v.666c.06.011.267.019.335.019.83 0 1.226-.312 1.568-1.283l1.5-4.214h-.868l-1.012 3.259h-.015l-1.013-3.26zm-1.167 2.189v.316c0 .521-.45.917-1.024.917-.442 0-.731-.228-.731-.579 0-.342.278-.56.769-.593z"/></svg></div>
        <div class="row"><span class="cc"></span><span><b>Apple Card</b><small>•••• 4242</small></span></div>
        <div class="tot"><span>Pay Apple Inc.</span><b>$24.99</b></div>
        <div class="pay">
          <button class="ring" type="button" aria-label="Confirm with Face ID">
            <svg viewBox="0 0 60 60"><circle class="prg" cx="30" cy="30" r="28"/></svg>
            <svg class="fid" viewBox="0 0 24 24"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/></svg>
            <svg class="chk" viewBox="0 0 24 24" style="position:absolute"><path d="M5 12.5 10 17.5 19 7"/></svg>
          </button>
          <span class="st" aria-live="polite"><span class="on" data-s="idle">Double Click to Pay</span><span data-s="busy">Processing</span><span data-s="done">Done</span></span>
        </div>
        <button class="x" type="button" aria-label="Cancel"><svg viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
      </div>
      <span class="side" aria-hidden="true"></span>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), ring = root.querySelector('.ring'), pay = root.querySelector('.pay');
    const labels = root.querySelectorAll('.st span');
    const show = (s) => labels.forEach((l) => l.classList.toggle('on', l.dataset.s === s));
    let t1, t2;
    const reset = () => { clearTimeout(t1); clearTimeout(t2); pay.className = 'pay'; stage.classList.remove('paid', 'paying'); show('idle'); };
    ring.addEventListener('click', () => {
      if (stage.classList.contains('paying')) return;
      if (stage.classList.contains('paid')) { reset(); return; }
      stage.classList.add('paying'); pay.classList.add('scan');
      t1 = setTimeout(() => { pay.classList.add('busy'); show('busy'); }, 600);
      t2 = setTimeout(() => { pay.className = 'pay done'; stage.classList.replace('paying', 'paid'); show('done'); }, 1700);
    });
    root.querySelector('.x').addEventListener('click', reset);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  },
};
