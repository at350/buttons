// The Awwwards ribbon winning sites pin to their right edge: a 53×171 black tab with the real Awwwards
// "W." mark (Simple Icons path) and the award name running vertically. Hover pulls it out a few pixels;
// clicking upgrades "Nominee" to "Site of the Day" and slides out the jury score — all inside the page stage.
export default {
  id: 'ob-awwwards-sotd',
  credit: 'Awwwards — the black "Site of the Day" ribbon on the right edge of a winning site; click it to go from Nominee to SOTD',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .site { position: relative; width: 220px; height: 200px; border-radius: 12px; overflow: hidden; background: #f4f3ef; }
    .shot { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 30% 50%; display: block; }
    .nav { position: absolute; left: 0; right: 0; top: 0; display: flex; align-items: center; justify-content: space-between; padding: 14px 70px 0 16px; color: #fff; text-shadow: 0 1px 6px rgba(0,0,0,.35); }
    .nav b { font: 500 13px/1 'Instrument Serif', Georgia, serif; letter-spacing: 3px; }
    .nav svg { width: 16px; height: 10px; }
    .score { position: absolute; right: 53px; top: 50%; width: 92px; height: 74px; margin-top: -37px; padding: 10px 12px; background: #fff; box-shadow: -2px 2px 12px rgba(0,0,0,.12); font: 600 10px/1.2 Inter, system-ui, sans-serif; color: #222; letter-spacing: .3px; text-transform: uppercase;
      transform: translateX(100%); opacity: 0; transition: transform .45s cubic-bezier(.2,.8,.2,1), opacity .3s; pointer-events: none; }
    .score b { display: block; margin-top: 6px; font: 800 26px/1 Inter, system-ui, sans-serif; letter-spacing: -1px; text-transform: none; }
    .score small { font: 500 11px Inter, system-ui, sans-serif; color: #888; letter-spacing: 0; }
    .rib { position: absolute; right: 0; top: 50%; width: 53px; height: 171px; margin-top: -85.5px; padding: 12px 0 14px; border: 0; background: #000; color: #fff; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 12px; transition: transform .3s cubic-bezier(.2,.8,.2,1), background .2s, color .2s; }
    .rib:hover { transform: translateX(-4px); }
    .rib:focus-visible { outline: 2px solid #ff4c3b; outline-offset: -4px; }
    .rib svg { width: 30px; height: 30px; flex: none; fill: currentColor; }
    .lbl { flex: 1; display: grid; place-items: center; }
    .lbl span { grid-area: 1 / 1; writing-mode: vertical-rl; transform: rotate(180deg); font: 700 11px/1 Inter, system-ui, sans-serif; letter-spacing: 1.2px; text-transform: uppercase; white-space: nowrap; transition: opacity .2s; }
    .lbl .won { opacity: 0; }
    .site.on .lbl .nom { opacity: 0; } .site.on .lbl .won { opacity: 1; }
    .site.on .score { transform: none; opacity: 1; }
  `,
  html: `
    <div class="site">
      <img class="shot" src="assets/wide/29.webp" alt="" width="220" height="200">
      <div class="nav" aria-hidden="true"><b>TENUTA</b><svg viewBox="0 0 16 10"><path d="M0 1h16M0 5h16M0 9h16" stroke="#fff" stroke-width="1.4"/></svg></div>
      <div class="score" aria-hidden="true">Score<b>7.85</b><small>/ 10 jury</small></div>
      <button class="rib" type="button" aria-pressed="false" aria-label="Awwwards Site of the Day">
        <svg viewBox="0 5 24 14" aria-hidden="true"><path d="m14.72 5.6-2.24 8.68-2.12-8.68H7.47l-2.12 8.68L3.11 5.6H0l4.01 12.65h2.74l2.17-8.18 2.16 8.18h2.74L17.83 5.6zm5.1 10.7c0 1.2.9 2.1 2.09 2.1 1.2 0 2.09-.9 2.09-2.1s-.9-2.12-2.1-2.12c-1.19 0-2.08.9-2.08 2.11"/></svg>
        <span class="lbl" aria-hidden="true"><span class="nom">Nominee</span><span class="won">Site of the Day</span></span>
      </button>
    </div>`,
  init(root) {
    const site = root.querySelector('.site'), rib = root.querySelector('.rib');
    rib.addEventListener('click', () => { const on = site.classList.toggle('on'); rib.setAttribute('aria-pressed', String(on)); });
  },
};
