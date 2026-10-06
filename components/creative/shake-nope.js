export default {
  id: 'cr-shake-nope',
  credit: 'macOS login window — wrong password makes the field shake its head (Sonoma/Sequoia lock screen capsule field)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      width: 260px; height: 120px; max-width: 100%; border-radius: 12px; display: grid; place-items: center;
      background: radial-gradient(120% 90% at 20% 10%, #4fa3d9, transparent 60%), radial-gradient(90% 90% at 90% 100%, #2f8f6d, transparent 60%), linear-gradient(160deg, #1f4e79, #163a52);
    }
    .field {
      position: relative; display: flex; align-items: center; width: 190px; height: 30px; border-radius: 15px; padding: 0 3px 0 12px;
      background: rgba(255, 255, 255, .22); box-shadow: inset 0 0 0 .5px rgba(255, 255, 255, .35), 0 1px 4px rgba(0, 0, 0, .12);
      -webkit-backdrop-filter: blur(20px) saturate(1.6); backdrop-filter: blur(20px) saturate(1.6);
      transition: box-shadow .2s ease;
    }
    .field:focus-within { box-shadow: inset 0 0 0 .5px rgba(255, 255, 255, .5), 0 0 0 3px rgba(255, 255, 255, .28); }
    .field.shake { animation: shake .5s cubic-bezier(.36, .07, .19, .97) both; }
    input {
      flex: 1; min-width: 0; height: 100%; border: 0; background: transparent; outline: 0; color: #fff;
      font: 400 13px/1 system-ui, -apple-system, sans-serif; letter-spacing: .1em;
    }
    input::placeholder { color: rgba(255, 255, 255, .7); letter-spacing: 0; }
    .go { display: grid; place-items: center; width: 24px; height: 24px; border: 0; border-radius: 50%; padding: 0; background: transparent; color: #fff; cursor: pointer; opacity: .9; transition: opacity .2s ease, transform .15s ease; }
    .go svg { width: 22px; height: 22px; }
    .go:hover { opacity: 1; }
    .go:active { transform: scale(.9); }
    .go:focus-visible { outline: 2px solid #fff; outline-offset: 1px; }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      12% { transform: translateX(-11px); }
      25% { transform: translateX(10px); }
      38% { transform: translateX(-8px); }
      51% { transform: translateX(6px); }
      64% { transform: translateX(-4px); }
      77% { transform: translateX(2px); }
    }
  `,
  html: `<div class="stage"><div class="field"><input type="password" value="letmein" placeholder="Enter Password" aria-label="Password" autocomplete="off"><button class="go" type="button" aria-label="Log in"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m12 16 4-4-4-4"/><path d="M8 12h8"/></svg></button></div></div>`,
  init(root) {
    const f = root.querySelector('.field'), i = root.querySelector('input'), go = root.querySelector('.go');
    const nope = () => { f.classList.remove('shake'); void f.offsetWidth; f.classList.add('shake'); i.select(); };
    go.addEventListener('click', nope);
    i.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); nope(); } });
    f.addEventListener('animationend', () => f.classList.remove('shake'));
  },
};
