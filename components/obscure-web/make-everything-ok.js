export default {
  id: 'ob-make-everything-ok',
  credit: 'make-everything-ok.com — one grey button that says "Make Everything OK"; a progress bar runs, and then everything is OK',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .pg { width: 280px; max-width: 100%; padding: 22px 20px; border-radius: 12px; background: #fff; border: 1px solid #ddd; display: grid; gap: 14px; justify-items: center; font: 14px/1.3 Arial, Helvetica, sans-serif; color: #333; }
    .btn { padding: 12px 30px; border: 1px solid #aaa; border-radius: 4px; background: linear-gradient(#fefefe, #dcdcdc); color: #333; cursor: pointer; font: 700 16px Arial, Helvetica, sans-serif; box-shadow: 0 1px 2px rgba(0,0,0,.15); transition: background .15s, transform .08s; }
    .btn:hover { background: linear-gradient(#fff, #e8e8e8); }
    .btn:active { transform: translateY(1px); box-shadow: none; }
    .btn:focus-visible { outline: 2px solid #4a90e2; outline-offset: 2px; }
    .btn:disabled { color: #999; cursor: progress; }
    .btn.ok { background: linear-gradient(#7fe08a, #3cb94c); border-color: #2b8a37; color: #fff; text-shadow: 0 1px 0 #2b8a37; }
    .bar { width: 100%; height: 14px; border: 1px solid #bbb; border-radius: 7px; background: #eee; overflow: hidden; opacity: 0; transition: opacity .2s; }
    .bar.show { opacity: 1; }
    .bar i { display: block; height: 100%; width: 0; background: linear-gradient(#8fd4ff, #2a8ad4); transition: width .3s linear; }
    .msg { min-height: 18px; color: #555; text-align: center; }
    .msg.ok { color: #2b8a37; font-weight: 700; }
  `,
  html: `
    <div class="pg">
      <button class="btn" type="button">Make Everything OK</button>
      <div class="bar" aria-hidden="true"><i></i></div>
      <div class="msg" aria-live="polite">&nbsp;</div>
    </div>`,
  init(root) {
    const btn = root.querySelector('.btn'), bar = root.querySelector('.bar'), fill = root.querySelector('.bar i'), msg = root.querySelector('.msg');
    const steps = ['Making everything OK...', 'Fixing the economy...', 'Untangling headphones...', 'Calling your mom...', 'Watering the plants...'];
    let iv = 0, i = 0, ok = false;
    const stop = () => { clearInterval(iv); iv = 0; };
    btn.addEventListener('click', () => {
      stop();
      if (ok) { ok = false; btn.classList.remove('ok'); btn.textContent = 'Make Everything OK'; msg.className = 'msg'; msg.innerHTML = '&nbsp;'; bar.classList.remove('show'); fill.style.width = '0'; return; }
      btn.disabled = true; i = 0; bar.classList.add('show'); msg.textContent = steps[0]; fill.style.width = '12%';
      iv = setInterval(() => {
        i++;
        if (i < steps.length) { msg.textContent = steps[i]; fill.style.width = (12 + i * 20) + '%'; return; }
        stop(); ok = true; btn.disabled = false; btn.classList.add('ok'); btn.textContent = 'Everything is OK'; fill.style.width = '100%'; msg.className = 'msg ok'; msg.textContent = 'Everything is OK now.';
      }, 550);
    });
    return stop;
  },
};
