export default {
  id: 'cr-shake-nope',
  credit: 'macOS login window — wrong password makes the field shake its head (Sonoma/Sequoia lock screen capsule field)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      width: 260px; height: 176px; max-width: 100%; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
      background: #3a2a4a url(assets/real/wall-macos-sequoia-dark.jpg) center / cover; font-family: system-ui, -apple-system, sans-serif;
    }
    .av { display: block; width: 56px; height: 56px; border-radius: 50%; object-fit: cover; background: rgba(255, 255, 255, .25); box-shadow: 0 2px 10px rgba(0, 0, 0, .25); }
    .nm { margin-bottom: 2px; font-size: 13px; font-weight: 600; color: #fff; text-shadow: 0 1px 4px rgba(0, 0, 0, .35); }
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
  html: `<div class="stage"><img class="av" src="assets/portraits/men-32.jpg" alt="" width="56" height="56"><span class="nm">Jamie Rivera</span><div class="field"><input type="password" value="letmein" placeholder="Enter Password" aria-label="Password" autocomplete="off"><button class="go" type="button" aria-label="Log in"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m12 16 4-4-4-4"/><path d="M8 12h8"/></svg></button></div></div>`,
  init(root) {
    const f = root.querySelector('.field'), i = root.querySelector('input'), go = root.querySelector('.go');
    const nope = () => { f.classList.remove('shake'); void f.offsetWidth; f.classList.add('shake'); i.select(); };
    go.addEventListener('click', nope);
    i.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); nope(); } });
    f.addEventListener('animationend', () => f.classList.remove('shake'));
  },
};
