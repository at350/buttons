// MUI <Stepper alternativeLabel> + HorizontalLinearStepper controls. Completed icon = MUI's internal CheckCircle.
const STEPS = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
const icon = (n) => `<svg class="ico" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><circle class="num" cx="12" cy="12" r="12"/><text class="tx" x="12" y="12" text-anchor="middle" dominant-baseline="central">${n}</text><path class="chk" d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"/></svg>`;
const step = (l, i) => `<li class="step">${i ? '<span class="con"><span></span></span>' : ''}<span class="lab">${icon(i + 1)}<span class="txt"><span class="a">${l}</span><span class="b" aria-hidden="true">${l}</span></span>${i === 1 ? '<span class="opt">Optional</span>' : '<span class="opt" aria-hidden="true">&nbsp;</span>'}</span></li>`;

export default {
  id: 'mn-stepper',
  credit: 'MUI (Material UI) — horizontal linear Stepper with alternative labels, Back / Skip / Next',
  size: 'wide',
  css: `
    :host { display: block; }
    .sizer { width: 460px; max-width: 100%; height: 0; }
    .card { width: 100%; background: #fff; border-radius: 12px; padding: 24px 16px 16px; font-family: 'Roboto Flex', Roboto, 'Helvetica Neue', Arial, sans-serif; color: rgba(0,0,0,.87); }
    ol { display: flex; margin: 0; padding: 0; list-style: none; }
    .step { position: relative; flex: 1; min-width: 0; padding: 0 8px; }
    .con { position: absolute; top: 12px; left: calc(-50% + 20px); right: calc(50% + 20px); }
    .con span { display: block; border-top: 1px solid #bdbdbd; }
    .lab { display: flex; flex-direction: column; align-items: center; }
    .ico { display: block; flex: none; color: rgba(0,0,0,.38); transition: color 150ms cubic-bezier(.4,0,.2,1); }
    .ico .num, .ico .chk { fill: currentColor; }
    .ico .chk { display: none; }
    .ico .tx { fill: #fff; font: 400 12px 'Roboto Flex', Roboto, sans-serif; }
    .step.active .ico, .step.done .ico { color: #1976d2; }
    .step.done .num, .step.done .tx { display: none; }
    .step.done .chk { display: block; }
    .txt { display: grid; margin-top: 16px; text-align: center; font-size: 14px; line-height: 1.43; letter-spacing: .01071em; }
    .txt > span { grid-area: 1 / 1; }
    .txt .a { color: rgba(0,0,0,.6); font-weight: 400; transition: color 150ms; }
    .txt .b { visibility: hidden; font-weight: 500; }
    .step.active .txt .a, .step.done .txt .a { color: rgba(0,0,0,.87); font-weight: 500; }
    .opt { font-size: 12px; line-height: 1.66; letter-spacing: .03333em; color: rgba(0,0,0,.6); text-align: center; }
    .body { margin: 16px 0 8px; padding: 0 8px; font-size: 16px; line-height: 1.5; letter-spacing: .00938em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .acts { display: flex; align-items: center; padding-top: 8px; }
    .sp { flex: 1; }
    .btn { position: relative; display: inline-grid; place-items: center; min-width: 64px; padding: 6px 8px; margin-left: 8px; border: 0; border-radius: 4px; background: transparent; color: rgba(0,0,0,.87); font: 500 14px/1.75 'Roboto Flex', Roboto, sans-serif; letter-spacing: .02857em; text-transform: uppercase; cursor: pointer; overflow: hidden; outline: none; transition: background-color 250ms cubic-bezier(.4,0,.2,1); -webkit-tap-highlight-color: transparent; }
    .btn:first-child { margin: 0; }
    .btn:hover { background: rgba(0,0,0,.04); }
    .btn.pri { color: #1976d2; }
    .btn.pri:hover { background: rgba(25,118,210,.04); }
    .btn:focus-visible { background: rgba(0,0,0,.12); }
    .btn.pri:focus-visible { background: rgba(25,118,210,.12); }
    .btn:disabled { color: rgba(0,0,0,.26); cursor: default; background: transparent; }
    .btn[hidden] { display: inline-grid; visibility: hidden; }
    .btn > span:not(.rp) { grid-area: 1 / 1; }
    .btn .alt { visibility: hidden; }
    .rp { position: absolute; border-radius: 50%; background: currentColor; opacity: .3; transform: scale(0); animation: rp 550ms cubic-bezier(.4,0,.2,1) forwards; transition: opacity 550ms cubic-bezier(.4,0,.2,1); pointer-events: none; }
    @keyframes rp { to { transform: scale(1); } }
  `,
  html: `
    <div class="sizer"></div>
    <div class="card">
      <ol aria-label="Progress">${STEPS.map(step).join('')}</ol>
      <div class="body" aria-live="polite">Step 1</div>
      <div class="acts">
        <button class="btn back" type="button" disabled>Back</button>
        <span class="sp"></span>
        <button class="btn skip pri" type="button" hidden>Skip</button>
        <button class="btn next pri" type="button"><span class="cur">Next</span><span class="alt" aria-hidden="true">Finish</span><span class="alt" aria-hidden="true">Reset</span></button>
      </div>
    </div>`,
  init(root) {
    const steps = [...root.querySelectorAll('.step')];
    const body = root.querySelector('.body'), back = root.querySelector('.back'), skip = root.querySelector('.skip'), next = root.querySelector('.next'), cur = next.querySelector('.cur');
    const timers = new Set();
    let at = 0; const skipped = new Set();
    const render = () => {
      const done = at >= steps.length;
      steps.forEach((s, i) => { s.classList.toggle('active', i === at); s.classList.toggle('done', (i < at && !skipped.has(i))); if (i === at) s.setAttribute('aria-current', 'step'); else s.removeAttribute('aria-current'); });
      body.textContent = done ? 'All steps completed - you’re finished' : `Step ${at + 1}`;
      back.disabled = at === 0; back.hidden = done;
      skip.hidden = at !== 1;
      cur.textContent = done ? 'Reset' : at === steps.length - 1 ? 'Finish' : 'Next';
    };
    next.addEventListener('click', () => { if (at >= steps.length) { at = 0; skipped.clear(); } else { skipped.delete(at); at++; } render(); });
    back.addEventListener('click', () => { if (at > 0) { at--; render(); } });
    skip.addEventListener('click', () => { skipped.add(at); at++; render(); });
    root.querySelectorAll('.btn').forEach((b) => b.addEventListener('pointerdown', (e) => {
      if (b.disabled) return;
      const r = b.getBoundingClientRect(); const x = e.clientX - r.left, y = e.clientY - r.top;
      const d = 2 * Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y));
      const s = document.createElement('span'); s.className = 'rp';
      s.style.cssText = `width:${d}px;height:${d}px;left:${x - d / 2}px;top:${y - d / 2}px`;
      b.append(s);
      const up = () => { ['pointerup', 'pointerleave', 'pointercancel'].forEach((k) => b.removeEventListener(k, up)); s.style.opacity = '0'; const tm = setTimeout(() => { s.remove(); timers.delete(tm); }, 560); timers.add(tm); };
      ['pointerup', 'pointerleave', 'pointercancel'].forEach((k) => b.addEventListener(k, up));
    }));
    render();
    return () => timers.forEach(clearTimeout);
  },
};
