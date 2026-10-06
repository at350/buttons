export default {
  id: 'ob-club-penguin',
  credit: 'Club Penguin (2005) — glossy blue "PLAY NOW!" bubble with heavy rounded Burbank-style type beside the orange "LOG IN" button; squishes on press, snow bobs while playing',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 20px 26px; border-radius: 12px; background: linear-gradient(#8ad4ff, #3e9fe6); display: grid; place-items: center; gap: 12px; }
    .row { display: flex; gap: 12px; align-items: center; }
    .cp { position: relative; padding: 12px 26px; border: 3px solid #0a4f8f; border-radius: 999px; cursor: pointer; color: #fff; font: 800 18px/1 "Bricolage Grotesque", "Arial Rounded MT Bold", Arial, sans-serif; letter-spacing: .5px; text-shadow: 0 2px 0 #0a4f8f;
      background: linear-gradient(#5fb8ff 0, #1f8ae8 50%, #146fc4 51%, #1a84dd); box-shadow: 0 5px 0 #0a4f8f, 0 8px 14px rgba(0,0,0,.3), inset 0 2px 0 rgba(255,255,255,.5); transition: transform .08s, box-shadow .08s, background .2s; white-space: nowrap; }
    .cp::before { content: ""; position: absolute; left: 12%; right: 12%; top: 3px; height: 40%; border-radius: 999px; background: linear-gradient(rgba(255,255,255,.75), rgba(255,255,255,0)); pointer-events: none; }
    .cp:hover { background: linear-gradient(#7fc8ff 0, #2f98f5 50%, #1a7bd4 51%, #2290ec); }
    .cp:active { transform: translateY(4px) scaleX(1.03); box-shadow: 0 1px 0 #0a4f8f, 0 3px 6px rgba(0,0,0,.3), inset 0 2px 0 rgba(255,255,255,.5); }
    .cp:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }
    .cp.on { background: linear-gradient(#ffd96b 0, #ffb400 50%, #e69a00 51%, #f5a800); border-color: #8a5a00; text-shadow: 0 2px 0 #8a5a00; box-shadow: 0 5px 0 #8a5a00, 0 8px 14px rgba(0,0,0,.3), inset 0 2px 0 rgba(255,255,255,.5); }
    .cp.login { font-size: 14px; padding: 10px 18px; border-color: #8a3a00; text-shadow: 0 2px 0 #8a3a00; background: linear-gradient(#ffb36b 0, #ff7a1a 50%, #e65c00 51%, #f56a0a); box-shadow: 0 5px 0 #8a3a00, 0 8px 14px rgba(0,0,0,.3), inset 0 2px 0 rgba(255,255,255,.5); }
    .cp.login:hover { background: linear-gradient(#ffc38a 0, #ff8a33 50%, #ec6508 51%, #ff7a1a); }
    .cp.login:active { box-shadow: 0 1px 0 #8a3a00, 0 3px 6px rgba(0,0,0,.3), inset 0 2px 0 rgba(255,255,255,.5); }
    .cp.login.on { background: linear-gradient(#b9f09a 0, #5cc83a 50%, #3fa522 51%, #4db52b); border-color: #246a12; text-shadow: 0 2px 0 #246a12; box-shadow: 0 5px 0 #246a12, 0 8px 14px rgba(0,0,0,.3), inset 0 2px 0 rgba(255,255,255,.5); }
    .snow { display: flex; gap: 6px; }
    .snow i { width: 8px; height: 8px; border-radius: 50%; background: #fff; opacity: .5; transition: opacity .2s, transform .3s; }
    .stage.on .snow i { opacity: 1; animation: bob 1s ease-in-out infinite alternate; }
    .stage.on .snow i:nth-child(2) { animation-delay: -.3s; }
    .stage.on .snow i:nth-child(3) { animation-delay: -.6s; }
    @keyframes bob { to { transform: translateY(-6px); } }
  `,
  html: `
    <div class="stage">
      <div class="row">
        <button class="cp play" type="button" aria-pressed="false">PLAY NOW!</button>
        <button class="cp login" type="button" aria-pressed="false">LOG IN</button>
      </div>
      <span class="snow" aria-hidden="true"><i></i><i></i><i></i></span>
    </div>`,
  init(root) {
    const s = root.querySelector('.stage'), play = root.querySelector('.play'), login = root.querySelector('.login');
    play.addEventListener('click', () => { const on = play.classList.toggle('on'); s.classList.toggle('on', on); play.setAttribute('aria-pressed', String(on)); play.textContent = on ? 'WADDLE ON!' : 'PLAY NOW!'; });
    login.addEventListener('click', () => { const on = login.classList.toggle('on'); login.setAttribute('aria-pressed', String(on)); login.textContent = on ? 'LOGGED IN' : 'LOG IN'; });
  },
};
