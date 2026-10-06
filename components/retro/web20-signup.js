export default {
  id: 'rt-web20-signup',
  credit: 'Web 2.0 (c. 2007) — shiny green "Sign Up Free!" call-to-action with highlight stripe and arrow',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #f3f3f3; padding: 16px 20px; border-radius: 12px; display: inline-block; }
    .btn { position: relative; height: 46px; padding: 0 44px 0 22px; border: 1px solid #3c8a1c; border-radius: 8px; overflow: hidden; cursor: pointer;
      font: bold 19px "Trebuchet MS", "Lucida Grande", Verdana, sans-serif; color: #fff; text-shadow: 0 1px 1px rgba(0,0,0,.45);
      background: linear-gradient(#a9e66b 0%, #76c83a 50%, #5aae27 51%, #6fc33a 100%); box-shadow: inset 0 1px 0 rgba(255,255,255,.6), 0 2px 4px rgba(0,0,0,.25); }
    .btn::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 50%; background: linear-gradient(rgba(255,255,255,.55), rgba(255,255,255,.12)); pointer-events: none; }
    .btn::after { content: ""; position: absolute; top: -20%; bottom: -20%; width: 40px; left: -60px; transform: skewX(-25deg);
      background: linear-gradient(90deg, transparent, rgba(255,255,255,.65), transparent); pointer-events: none; }
    .btn:hover::after { animation: shine .7s ease-out; }
    .btn:hover { filter: brightness(1.06); }
    .btn:active, .btn.done { background: linear-gradient(#5aae27 0%, #76c83a 60%, #8bd84a 100%); box-shadow: inset 0 2px 5px rgba(0,0,0,.35); }
    .btn:focus-visible { outline: 3px solid #ffb400; outline-offset: 2px; }
    .txt { display: inline-grid; position: relative; } .txt > span { grid-area: 1 / 1; white-space: nowrap; } .txt .b { visibility: hidden; }
    .btn.done .txt .a { visibility: hidden; } .btn.done .txt .b { visibility: visible; }
    .arr { position: absolute; right: 14px; top: 50%; margin-top: -9px; width: 18px; height: 18px; border-radius: 50%; background: rgba(255,255,255,.9); display: grid; place-items: center; box-shadow: 0 1px 1px rgba(0,0,0,.3); }
    .arr svg { transition: transform .2s; }
    .btn.done .arr svg { transform: rotate(90deg); }
    @keyframes shine { to { left: 120%; } }
  `,
  html: `
    <div class="stage">
      <button class="btn" type="button" aria-pressed="false"><span class="txt"><span class="a">Sign Up Free!</span><span class="b">Welcome aboard!</span></span>
        <span class="arr"><svg width="10" height="10" viewBox="0 0 10 10"><path d="M3 1l4 4-4 4" fill="none" stroke="#3c8a1c" stroke-width="2.4" stroke-linecap="round"/></svg></span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => { const on = b.classList.toggle('done'); b.setAttribute('aria-pressed', String(on)); });
  },
};
