export default {
  id: 'ob-poolsuite-radio',
  credit: 'Poolsuite FM — 1-bit Mac System 7 radio window: bevelled station buttons, the selected one inverts and the EQ bars dance',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .win { width: 280px; max-width: 100%; background: #fff; border: 2px solid #000; box-shadow: 3px 3px 0 #000; font: 12px/1 "Chicago", "Geneva", "Helvetica Neue", Arial, sans-serif; color: #000; }
    .tb { height: 20px; display: flex; align-items: center; padding: 0 4px; gap: 6px; border-bottom: 2px solid #000; background: repeating-linear-gradient(#000 0 1px, #fff 1px 3px); }
    .tb .close { width: 12px; height: 12px; border: 1px solid #000; background: #fff; flex: none; box-shadow: 1px 1px 0 #fff inset, 0 0 0 1px #fff; }
    .tb .ttl { background: #fff; padding: 0 6px; font-weight: 700; letter-spacing: .3px; }
    .body { padding: 10px; display: grid; gap: 6px; }
    .st { display: flex; align-items: center; gap: 8px; height: 26px; padding: 0 8px; background: #fff; border: 1px solid #000; border-radius: 6px; box-shadow: 2px 2px 0 #000; cursor: pointer; font: 700 12px "Chicago", "Geneva", "Helvetica Neue", Arial, sans-serif; color: #000; text-align: left; transition: transform .05s; }
    .st:hover { background: #f2f2f2; }
    .st:active { transform: translate(2px, 2px); box-shadow: 0 0 0 #000; }
    .st:focus-visible { outline: 2px dotted #000; outline-offset: 2px; }
    .st.on { background: #000; color: #fff; }
    .st .n { flex: 1; }
    .eq { display: flex; align-items: flex-end; gap: 2px; height: 12px; width: 18px; }
    .eq i { flex: 1; background: currentColor; height: 20%; }
    .st.on .eq i { animation: bar .5s ease-in-out infinite alternate; }
    .st.on .eq i:nth-child(2) { animation-delay: -.15s; } .st.on .eq i:nth-child(3) { animation-delay: -.3s; } .st.on .eq i:nth-child(4) { animation-delay: -.45s; }
    @keyframes bar { from { height: 15%; } to { height: 100%; } }
    .foot { display: flex; justify-content: space-between; align-items: center; padding: 4px 10px 8px; font-size: 11px; }
    .pp { width: 46px; height: 20px; border: 1px solid #000; border-radius: 4px; background: #fff; box-shadow: 1px 1px 0 #000; cursor: pointer; font: 700 11px "Geneva", Arial, sans-serif; }
    .pp:active { transform: translate(1px, 1px); box-shadow: none; }
    .pp:focus-visible { outline: 2px dotted #000; outline-offset: 2px; }
  `,
  html: `
    <div class="win">
      <div class="tb"><span class="close" aria-hidden="true"></span><span class="ttl">Poolsuite FM</span></div>
      <div class="body" role="radiogroup">
        <button class="st on" type="button" role="radio" aria-checked="true"><span class="n">Poolsuite FM</span><span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span></button>
        <button class="st" type="button" role="radio" aria-checked="false"><span class="n">Hangover Club</span><span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span></button>
        <button class="st" type="button" role="radio" aria-checked="false"><span class="n">Indie Summer</span><span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span></button>
        <button class="st" type="button" role="radio" aria-checked="false"><span class="n">Tokyo Disco</span><span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span></button>
      </div>
      <div class="foot"><span class="time">▶ 0:00</span><button class="pp" type="button" aria-pressed="true">Pause</button></div>
    </div>`,
  init(root) {
    const sts = [...root.querySelectorAll('.st')], pp = root.querySelector('.pp'), time = root.querySelector('.time');
    let playing = true, cur = 0, secs = 0, iv = 0;
    const tick = () => { secs++; time.textContent = `▶ ${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`; };
    const run = () => { clearInterval(iv); iv = 0; if (playing && root.host.matches(':hover')) iv = setInterval(tick, 1000); };
    const render = () => {
      sts.forEach((b, i) => { const on = playing && i === cur; b.classList.toggle('on', on); b.setAttribute('aria-checked', String(i === cur)); });
      pp.textContent = playing ? 'Pause' : 'Play'; pp.setAttribute('aria-pressed', String(playing));
      if (!playing) time.textContent = `❚❚ ${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;
      run();
    };
    sts.forEach((b, i) => b.addEventListener('click', () => { if (i !== cur) secs = 0; cur = i; playing = true; render(); }));
    pp.addEventListener('click', () => { playing = !playing; render(); });
    root.host.addEventListener('mouseenter', run);
    root.host.addEventListener('mouseleave', () => { clearInterval(iv); iv = 0; });
    return () => clearInterval(iv);
  },
};
