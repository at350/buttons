export default {
  id: 'ty2-karaoke-mic',
  credit: 'Kids\' sing-along karaoke microphone — slide the power switch and the red LED and the rainbow light-up head come on; ECHO pulses the rings',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; position: relative; display: inline-block; width: 272px; height: 132px; border-radius: 12px; overflow: hidden; background: linear-gradient(135deg, #2a1846, #4b1d5e 60%, #1c1030); }
    .mic { position: absolute; left: 16px; top: 22px; width: 246px; height: 88px; }
    .head { position: absolute; left: 0; top: 0; width: 88px; height: 88px; border-radius: 50%;
      background: radial-gradient(circle, rgba(0,0,0,.35) 1.3px, transparent 1.8px) 0 0 / 6px 6px, radial-gradient(circle at 36% 30%, #ffffff, #c9ccd6 40%, #7d8191 80%);
      box-shadow: 0 0 0 5px #a855f7, 0 0 0 9px #6b21a8, 0 6px 10px rgba(0,0,0,.5); }
    .glow { position: absolute; inset: 0; border-radius: 50%; opacity: 0; mix-blend-mode: screen; transition: opacity .3s;
      background: conic-gradient(#ff3b3b, #ff8f1f, #ffe11f, #3ddc4a, #2f8cff, #9b4dff, #ff3b3b); filter: blur(4px); }
    .on .glow { opacity: .75; animation: spin 2.4s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .wave { position: absolute; left: 44px; top: 44px; width: 10px; height: 10px; margin: -5px; border-radius: 50%; border: 2px solid #f0abfc; opacity: 0; pointer-events: none; }
    .wave.go { animation: wave .9s ease-out forwards; }
    .wave.w2.go { animation-delay: .18s; } .wave.w3.go { animation-delay: .36s; }
    @keyframes wave { 0% { opacity: .9; transform: scale(1); } 100% { opacity: 0; transform: scale(9); } }
    .handle { position: absolute; left: 84px; top: 20px; width: 162px; height: 48px; border-radius: 10px 26px 26px 10px;
      background: linear-gradient(#f0abfc, #d946ef 40%, #a21caf 85%); box-shadow: 0 5px 8px rgba(0,0,0,.45), inset 0 2px 0 rgba(255,255,255,.5); }
    .led { position: absolute; left: 22px; top: 18px; width: 10px; height: 10px; border-radius: 50%; background: #5b0d12; box-shadow: inset 0 1px 2px rgba(0,0,0,.6); transition: background .15s, box-shadow .15s; }
    .on .led { background: #ff2a2a; box-shadow: 0 0 6px 2px rgba(255,40,40,.85), inset 0 -1px 2px rgba(0,0,0,.3); }
    .sw { position: absolute; left: 44px; top: 13px; width: 46px; height: 22px; border: 0; padding: 0; border-radius: 11px; cursor: pointer;
      background: #4a0f52; box-shadow: inset 0 2px 4px rgba(0,0,0,.6); }
    .sw i { position: absolute; left: 3px; top: 3px; width: 20px; height: 16px; border-radius: 8px; background: linear-gradient(#ffffff, #e5e7eb 60%, #b8bcc6);
      box-shadow: 0 2px 2px rgba(0,0,0,.4); transition: transform .18s cubic-bezier(.3,1.6,.5,1); }
    .sw[aria-checked="true"] i { transform: translateX(20px); }
    .echo { position: absolute; left: 102px; top: 11px; width: 26px; height: 26px; border: 0; padding: 0; border-radius: 50%; cursor: pointer;
      background: radial-gradient(circle at 40% 30%, #fde68a, #f7c600 55%, #b98f00); box-shadow: 0 3px 0 #7a5d00; transition: transform .05s, box-shadow .05s; }
    .echo:active { transform: translateY(2px); box-shadow: 0 1px 0 #7a5d00; }
    .echo svg { width: 14px; height: 14px; color: #6b4a00; }
    .sw:focus-visible, .echo:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
  `,
  html: `
    <div class="stage"><div class="mic">
      <div class="handle"><span class="led"></span>
        <button class="sw" type="button" role="switch" aria-checked="false" aria-label="power"><i></i></button>
        <button class="echo" type="button" aria-label="echo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg></button>
      </div>
      <div class="head"><span class="glow"></span></div>
      <span class="wave w1"></span><span class="wave w2"></span><span class="wave w3"></span>
    </div></div>`,
  init(root) {
    const mic = root.querySelector('.mic'), sw = root.querySelector('.sw'), waves = [...root.querySelectorAll('.wave')];
    sw.addEventListener('click', () => {
      const on = sw.getAttribute('aria-checked') !== 'true';
      sw.setAttribute('aria-checked', String(on)); mic.classList.toggle('on', on);
    });
    root.querySelector('.echo').addEventListener('click', () => {
      if (!mic.classList.contains('on')) return;
      waves.forEach((w) => { w.classList.remove('go'); void w.offsetWidth; w.classList.add('go'); });
    });
  },
};
