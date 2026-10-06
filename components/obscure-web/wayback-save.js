export default {
  id: 'ob-wayback-save',
  credit: 'Internet Archive Wayback Machine — "Save Page Now": URL field, the column-building logo spins while saving, then a 14-digit timestamp',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wb { width: 320px; max-width: 100%; background: #fff; border: 1px solid #ddd; border-radius: 12px; overflow: hidden; font: 13px/1.4 "Helvetica Neue", Helvetica, Arial, sans-serif; color: #333; }
    .hd { display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: #000; color: #fff; font: 700 13px "Helvetica Neue", Arial, sans-serif; letter-spacing: .5px; }
    .logo { width: 20px; height: 20px; fill: #fff; flex: none; }
    .wb.busy .logo { animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .bd { padding: 12px; display: grid; gap: 8px; }
    .url { height: 34px; border: 1px solid #ccc; border-radius: 3px; padding: 0 8px; font: 13px "JetBrains Mono", ui-monospace, monospace; color: #333; width: 100%; background: #fff; }
    .url:focus-visible { outline: 2px solid #428bca; outline-offset: 1px; }
    .save { height: 34px; border: 1px solid #357ebd; border-radius: 3px; background: #428bca; color: #fff; font: 700 13px "Helvetica Neue", Arial, sans-serif; cursor: pointer; transition: background .15s; }
    .save:hover { background: #3276b1; }
    .save:active { background: #285e8e; }
    .save:focus-visible { outline: 2px solid #000; outline-offset: 2px; }
    .save:disabled { background: #9ec1e0; border-color: #9ec1e0; cursor: progress; }
    .st { min-height: 18px; font: 11px "JetBrains Mono", ui-monospace, monospace; color: #666; display: flex; justify-content: space-between; }
    .st b { color: #2a7a2a; font-weight: 700; }
    .meter { height: 4px; background: #eee; border-radius: 2px; overflow: hidden; }
    .meter i { display: block; height: 100%; width: 0; background: #428bca; transition: width .3s; }
  `,
  html: `
    <div class="wb">
      <div class="hd"><svg class="logo" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2L2 7h20zM3 8h18v2H3zm1 3h3v7H4zm5 0h3v7H9zm5 0h3v7h-3zm5 0h2v7h-2zM2 20h20v2H2z"/></svg>WAYBACK MACHINE</div>
      <div class="bd">
        <input class="url" type="text" value="https://example.com/buttons" aria-label="URL">
        <button class="save" type="button">SAVE PAGE</button>
        <div class="meter" aria-hidden="true"><i></i></div>
        <div class="st" aria-live="polite"><span class="msg">&nbsp;</span><span class="ts"></span></div>
      </div>
    </div>`,
  init(root) {
    const wb = root.querySelector('.wb'), save = root.querySelector('.save'), msg = root.querySelector('.msg'), ts = root.querySelector('.ts'), bar = root.querySelector('.meter i');
    const steps = ['Fetching page...', 'Capturing outlinks...', 'Saving screenshot...', 'Writing to CDX...'];
    let iv = 0, i = 0;
    const stop = () => { clearInterval(iv); iv = 0; };
    save.addEventListener('click', () => {
      if (wb.classList.contains('done')) { wb.classList.remove('done'); msg.innerHTML = '&nbsp;'; ts.textContent = ''; bar.style.width = '0'; save.textContent = 'SAVE PAGE'; return; }
      wb.classList.add('busy'); save.disabled = true; i = 0; msg.textContent = steps[0]; bar.style.width = '10%';
      stop();
      iv = setInterval(() => {
        i++;
        if (i < steps.length) { msg.textContent = steps[i]; bar.style.width = (10 + i * 28) + '%'; return; }
        stop(); wb.classList.remove('busy'); wb.classList.add('done'); save.disabled = false; save.textContent = 'SAVE AGAIN';
        bar.style.width = '100%';
        const d = new Date(), p = (n) => String(n).padStart(2, '0');
        msg.innerHTML = '<b>Saved</b>'; ts.textContent = `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
      }, 600);
    });
    return stop;
  },
};
