export default {
  id: 'dp-dock-stack',
  credit: 'macOS Dock — Downloads stack in “Fan” view: click the folder and the files arc up and to the right out of the Dock, each with its name in a dark label, topped by “Open in Finder”',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      position: relative; width: 260px; height: 262px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(90% 70% at 20% 0%, #f9a8d4, transparent 70%), radial-gradient(90% 80% at 100% 30%, #818cf8, transparent 70%), linear-gradient(180deg, #6d5bd0, #c26bb5 70%, #f2a07b);
      font-family: system-ui, -apple-system, 'Inter', sans-serif;
    }
    .dock {
      position: absolute; left: 50%; bottom: 8px; transform: translateX(-50%); display: flex; align-items: flex-end; gap: 8px; padding: 6px 8px; border-radius: 18px;
      background: rgba(255, 255, 255, .26); -webkit-backdrop-filter: blur(20px) saturate(1.6); backdrop-filter: blur(20px) saturate(1.6);
      box-shadow: inset 0 0 0 .5px rgba(255, 255, 255, .55), 0 0 0 .5px rgba(0, 0, 0, .15), 0 8px 24px rgba(0, 0, 0, .2);
    }
    .ic {
      position: relative; width: 46px; height: 46px; border-radius: 10.5px; border: 0; padding: 0; cursor: pointer; display: grid; place-items: center;
      box-shadow: 0 1px 2px rgba(0, 0, 0, .2), 0 3px 8px rgba(0, 0, 0, .18); transition: transform .3s cubic-bezier(.32, .72, 0, 1);
      -webkit-tap-highlight-color: transparent;
    }
    .ic:active { filter: brightness(.8); }
    .ic::after { content: ''; position: absolute; left: 50%; bottom: -5px; width: 3px; height: 3px; margin-left: -1.5px; border-radius: 50%; background: rgba(0, 0, 0, .55); opacity: 0; }
    .ic.run::after { opacity: 1; }
    .safari { background: linear-gradient(180deg, #fff, #e8e8ec); }
    .safari svg { width: 38px; height: 38px; }
    .settings { background: linear-gradient(180deg, #a6a6ab, #6e6e73); color: #2b2b2e; }
    .settings svg { width: 34px; height: 34px; }
    .stack { background: transparent; box-shadow: none; }
    .fold { position: absolute; left: 1px; right: 1px; top: 6px; bottom: 4px; }
    .fold::before { content: ''; position: absolute; left: 0; top: -4px; width: 17px; height: 6px; border-radius: 2px 3px 0 0; background: #92ddff; clip-path: polygon(0 0, 78% 0, 100% 100%, 0 100%); }
    .fold i { position: absolute; inset: 0; border-radius: 2px 4px 4px 4px; background: #92ddff; }
    .fold b { position: absolute; left: 0; right: 0; bottom: 0; height: 30px; border-radius: 3px 3px 4px 4px; background: linear-gradient(180deg, #8bdafd 0, #67cbf8 8%, #7ad4fb 75%, #6dc5ed); box-shadow: inset 0 .5px 0 rgba(255, 255, 255, .6), 0 1px 2px rgba(0, 0, 0, .12); display: grid; place-items: center; color: #3faae5; }
    .fold b svg { width: 18px; height: 18px; }
    .ic:focus-visible, .it:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
    /* the fan */
    .fan { position: absolute; left: 50%; bottom: 66px; width: 0; height: 0; pointer-events: none; }
    .it {
      --k: 0; position: absolute; left: -20px; bottom: 0; width: 40px; height: 40px; border: 0; padding: 0; background: none; cursor: pointer;
      opacity: 0; transform-origin: 50% 100%;
      transform: translate(0, 30px) scale(.35);
      transition: transform .28s cubic-bezier(.4, 0, .6, 1) calc((3 - var(--k)) * 25ms), opacity .2s calc((3 - var(--k)) * 25ms);
    }
    .open .fan { pointer-events: auto; }
    .open .it {
      opacity: 1;
      transform: translate(calc(var(--k) * var(--k) * 4px), calc(var(--k) * -44px - 4px)) rotate(calc(var(--k) * 3deg));
      transition: transform .42s cubic-bezier(.32, 1.25, .5, 1) calc(var(--k) * 35ms), opacity .15s calc(var(--k) * 35ms);
    }
    .doc { position: absolute; left: 6px; top: 0; width: 30px; height: 38px; border-radius: 2px; background: #fff; box-shadow: 0 0 0 .5px rgba(0, 0, 0, .2), 0 2px 5px rgba(0, 0, 0, .25);
      clip-path: polygon(0 0, 72% 0, 100% 22%, 100% 100%, 0 100%); }
    .doc::after { content: ''; position: absolute; right: 0; top: 0; width: 28%; height: 22%; background: linear-gradient(225deg, transparent 50%, #d9d9de 50%); }
    .doc .tag { position: absolute; left: 3px; right: 3px; bottom: 5px; height: 9px; border-radius: 1.5px; color: #fff; font: 700 6.5px/9px system-ui, sans-serif; text-align: center; letter-spacing: .02em; }
    .doc .lines { position: absolute; left: 5px; right: 8px; top: 7px; height: 14px; background: repeating-linear-gradient(180deg, #c7c7cc 0 1px, transparent 1px 4px); }
    .pdf .tag { background: #e5352b; } .zip .tag { background: #8e8e93; } .m4a .tag { background: #fc3c44; }
    .pic { position: absolute; left: 1px; top: 4px; width: 38px; height: 30px; border-radius: 2px; border: 2px solid #fff; box-shadow: 0 2px 5px rgba(0, 0, 0, .3);
      background: linear-gradient(180deg, #7dd3fc 0 52%, #fcd34d 52% 58%, #16a34a 58%); }
    .finder { position: absolute; left: 6px; top: 4px; width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; color: #fff;
      background: rgba(40, 40, 44, .82); box-shadow: inset 0 0 0 .5px rgba(255, 255, 255, .25), 0 2px 6px rgba(0, 0, 0, .3); }
    .finder svg { width: 16px; height: 16px; }
    .lbl {
      position: absolute; right: 44px; top: 50%; transform: translateY(-50%); max-width: 106px; padding: 3px 7px; border-radius: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      background: rgba(30, 30, 32, .78); color: #fff; font: 500 11px/1.25 system-ui, -apple-system, 'Inter', sans-serif; letter-spacing: -.01em;
      -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); transition: background .12s;
    }
    .it:hover .lbl, .it[aria-current="true"] .lbl { background: #0a84ff; }
    .it:active .doc, .it:active .pic { filter: brightness(.85); }
  `,
  html: `
    <div class="stage">
      <div class="fan" role="menu" aria-label="Downloads">
        <button class="it" type="button" role="menuitem" style="--k:0" tabindex="-1"><span class="lbl">Report.pdf</span><span class="doc pdf"><span class="lines"></span><span class="tag">PDF</span></span></button>
        <button class="it" type="button" role="menuitem" style="--k:1" tabindex="-1"><span class="lbl">IMG_2048.heic</span><span class="pic"></span></button>
        <button class="it" type="button" role="menuitem" style="--k:2" tabindex="-1"><span class="lbl">Assets.zip</span><span class="doc zip"><span class="lines"></span><span class="tag">ZIP</span></span></button>
        <button class="it" type="button" role="menuitem" style="--k:3" tabindex="-1"><span class="lbl">Open in Finder</span><span class="finder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span></button>
      </div>
      <div class="dock">
        <button class="ic safari run" type="button" aria-label="Safari"><svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="dpdksaf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1ac8fc"/><stop offset="1" stop-color="#1f6ff2"/></linearGradient></defs><circle cx="12" cy="12" r="11.2" fill="url(#dpdksaf)"/><circle cx="12" cy="12" r="9.6" fill="none" stroke="#fff" stroke-opacity=".9" stroke-width=".6" stroke-dasharray=".35 .9"/><path d="M12 12 18.2 5.8 13.4 13.4z" fill="#ff3b30"/><path d="M12 12 5.8 18.2 10.6 10.6z" fill="#fff"/></svg></button>
        <button class="ic stack" type="button" aria-expanded="false" aria-haspopup="menu" aria-label="Downloads"><span class="fold"><i></i><b><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="m8 12 4 4 4-4"/></svg></b></span></button>
        <button class="ic settings" type="button" aria-label="System Settings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), s = root.querySelector('.stack'), items = [...root.querySelectorAll('.it')];
    const set = (o) => {
      s.setAttribute('aria-expanded', String(o)); stage.classList.toggle('open', o); s.classList.toggle('run', o);
      items.forEach((d) => { d.tabIndex = o ? 0 : -1; });
    };
    s.addEventListener('click', () => set(s.getAttribute('aria-expanded') !== 'true'));
    items.forEach((d) => d.addEventListener('click', () => { items.forEach((x) => x.removeAttribute('aria-current')); d.setAttribute('aria-current', 'true'); setTimeout(() => set(false), 220); }));
    stage.addEventListener('click', (e) => { if (!e.target.closest('.it, .ic')) set(false); });
    stage.addEventListener('keydown', (e) => { if (e.key === 'Escape') { set(false); s.focus(); } });
  },
};
