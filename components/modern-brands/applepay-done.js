export default {
  id: 'mb-applepay-done',
  credit: 'Apple Pay sheet — "Double Click to Pay" side-button prompt; confirm and the Face ID ring processes, the check draws in and the sheet says Done',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 230px; max-width: 100%; padding: 16px; border-radius: 12px; background: #000; font: 500 13px/1 -apple-system, Inter, system-ui, sans-serif; }
    .sheet { border-radius: 18px; background: #1c1c1e; padding: 16px 16px 14px; color: #fff; display: grid; justify-items: center; gap: 12px; }
    .hd { width: 100%; display: flex; justify-content: space-between; align-items: center; color: #8e8e93; font-size: 12px; }
    .hd b { color: #fff; font-size: 15px; letter-spacing: -.01em; }
    .ring { position: relative; width: 64px; height: 64px; border-radius: 50%; border: 0; padding: 0; background: #2c2c2e; cursor: pointer; display: grid; place-items: center; -webkit-tap-highlight-color: transparent;
      transition: transform .2s cubic-bezier(.2,.8,.2,1), background .3s; }
    .ring:hover { background: #3a3a3c; }
    .ring:active { transform: scale(.94); }
    .ring:focus-visible { outline: 2px solid #0a84ff; outline-offset: 3px; }
    .ring svg { position: absolute; inset: 0; width: 100%; height: 100%; }
    .trk { fill: none; stroke: #3a3a3c; stroke-width: 3; }
    .prg { fill: none; stroke: #0a84ff; stroke-width: 3; stroke-linecap: round; stroke-dasharray: 182; stroke-dashoffset: 182; transform: rotate(-90deg); transform-origin: 50% 50%; }
    .sheet.busy .prg { animation: spin 1.1s cubic-bezier(.2,.8,.2,1) forwards; }
    @keyframes spin { to { stroke-dashoffset: 0; } }
    .fid { width: 28px; height: 28px; fill: none; stroke: #fff; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: opacity .2s, transform .3s; }
    .sheet.done .fid { opacity: 0; transform: scale(.6); }
    .chk { position: absolute; width: 30px; height: 30px; fill: none; stroke: #fff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 30; stroke-dashoffset: 30; inset: auto; }
    .sheet.done .ring { background: #30d158; }
    .sheet.done .chk { animation: draw .45s .05s cubic-bezier(.2,.8,.2,1) forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    .sheet.done .prg { stroke: #30d158; stroke-dashoffset: 0; }
    .st { color: #8e8e93; font-size: 13px; min-height: 16px; transition: color .3s; }
    .sheet.done .st { color: #30d158; font-weight: 600; }
  `,
  html: `
    <div class="stage">
      <div class="sheet">
        <div class="hd"><span>Apple Card</span><b>$24.99</b></div>
        <button class="ring" type="button" aria-label="Confirm with Face ID">
          <svg viewBox="0 0 64 64"><circle class="trk" cx="32" cy="32" r="29"/><circle class="prg" cx="32" cy="32" r="29"/></svg>
          <svg class="fid" viewBox="0 0 24 24"><path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M4 16v2a2 2 0 0 0 2 2h2M16 20h2a2 2 0 0 0 2-2v-2M9 9.5v1M15 9.5v1M12 9.5v4h-1M9 15.5a4 4 0 0 0 6 0"/></svg>
          <svg class="chk" viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>
        </button>
        <span class="st">Double Click to Pay</span>
      </div>
    </div>`,
  init(root) {
    const sheet = root.querySelector('.sheet'), ring = root.querySelector('.ring'), st = root.querySelector('.st');
    let t;
    ring.addEventListener('click', () => {
      if (sheet.classList.contains('busy')) return;
      if (sheet.classList.contains('done')) { sheet.classList.remove('done'); st.textContent = 'Double Click to Pay'; return; }
      sheet.classList.add('busy'); st.textContent = 'Processing';
      t = setTimeout(() => { sheet.classList.remove('busy'); sheet.classList.add('done'); st.textContent = 'Done'; }, 1200);
    });
    return () => clearTimeout(t);
  },
};
