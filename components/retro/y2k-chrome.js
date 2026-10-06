export default {
  id: 'rt-y2k-chrome',
  credit: 'Y2K / vaporwave — liquid chrome metallic pill with holographic sheen on a pink perspective grid',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; padding: 20px 24px; border-radius: 12px; display: inline-block; overflow: hidden;
      background: linear-gradient(#ff77c8, #a35bff 60%, #2b1a6b); }
    .stage::after { content: ""; position: absolute; inset: 45% -40% -10%; transform: perspective(120px) rotateX(55deg);
      background: repeating-linear-gradient(90deg, rgba(255,255,255,.35) 0 1px, transparent 1px 22px), repeating-linear-gradient(0deg, rgba(255,255,255,.35) 0 1px, transparent 1px 14px); pointer-events: none; }
    .chrome { position: relative; z-index: 1; height: 44px; padding: 0 26px; border-radius: 22px; border: 2px solid #fff; cursor: pointer;
      background: linear-gradient(#fdfdfd 0%, #cfd6e0 22%, #6f7b8a 46%, #d9e1ea 50%, #4c5563 54%, #e8edf2 78%, #9aa5b1 100%);
      box-shadow: 0 0 0 1px #4c5563, 0 6px 16px rgba(0,0,0,.4), inset 0 1px 0 #fff; overflow: hidden; }
    .chrome span { position: relative; font: 900 20px Impact, "Arial Black", "Helvetica Neue", sans-serif; letter-spacing: 3px; text-transform: uppercase;
      background: linear-gradient(#1b1f26 0%, #5a6472 42%, #0f1116 50%, #6c7684 58%, #262b33 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent;
      filter: drop-shadow(0 1px 0 rgba(255,255,255,.85)) drop-shadow(0 0 1px rgba(255,255,255,.6)); }
    .chrome::after { content: ""; position: absolute; inset: -40% -60%; background: linear-gradient(115deg, transparent 40%, rgba(255,0,200,.35) 46%, rgba(0,255,255,.45) 50%, rgba(255,255,0,.35) 54%, transparent 60%);
      transform: translateX(-60%); transition: transform .5s ease; pointer-events: none; mix-blend-mode: screen; }
    .chrome:hover::after { transform: translateX(60%); }
    .chrome:active { filter: brightness(.9); transform: translateY(1px); }
    .chrome.on { background: linear-gradient(#ffd6f5 0%, #ff8ad8 22%, #8a2be2 46%, #e9c6ff 50%, #4a148c 54%, #ffe0f8 78%, #c177e8 100%); }
    .chrome:focus-visible { outline: 3px solid #0ff; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <button class="chrome" type="button" aria-pressed="false"><span>Enter</span></button>
    </div>`,
  init(root) {
    const b = root.querySelector('.chrome');
    b.addEventListener('click', () => { const on = b.classList.toggle('on'); b.setAttribute('aria-pressed', String(on)); });
  },
};
