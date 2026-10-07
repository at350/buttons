export default {
  id: 'mb-arc-tab',
  credit: 'Arc browser (The Browser Company) — tinted sidebar with traffic lights, URL pill and favicon tabs; the white highlight springs between tabs and "+ New Tab" drops the Command Bar',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 320px; max-width: 100%; height: 222px; border-radius: 12px; overflow: hidden;
      background: linear-gradient(165deg, #f4a3c4 0%, #c9a6f2 55%, #9fc9f7 100%);
      font: 500 13px/1 -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif; color: rgba(30,14,48,.82); -webkit-font-smoothing: antialiased; }
    .side { position: absolute; left: 8px; top: 10px; bottom: 10px; width: 150px; display: flex; flex-direction: column; }
    .lights { display: flex; gap: 8px; padding: 2px 6px 0; height: 16px; }
    .lights i { width: 12px; height: 12px; border-radius: 50%; box-shadow: inset 0 0 0 .5px rgba(0,0,0,.18); }
    .url { height: 30px; margin: 10px 0 8px; border-radius: 8px; background: rgba(255,255,255,.32); display: flex; align-items: center; padding: 0 10px; color: rgba(30,14,48,.7); font-weight: 500; white-space: nowrap; overflow: hidden; }
    .new { height: 30px; border: 0; border-radius: 8px; background: transparent; color: rgba(30,14,48,.62); cursor: pointer; display: flex; align-items: center; gap: 9px; padding: 0 9px; font: inherit; text-align: left; -webkit-tap-highlight-color: transparent; transition: background .15s, color .15s; }
    .new:hover { background: rgba(255,255,255,.28); color: rgba(30,14,48,.9); }
    .new svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
    .tabs { position: relative; display: grid; gap: 2px; margin-top: 2px; }
    .pill { position: absolute; left: 0; right: 0; top: 0; height: 32px; border-radius: 8px; background: rgba(255,255,255,.78); box-shadow: 0 1px 2px rgba(60,20,90,.12), 0 0 0 .5px rgba(60,20,90,.06);
      transition: transform .5s linear(0, 0.22 6%, 0.6 15%, 0.88 25%, 1.03 35%, 1.06 43%, 1.03 55%, 0.995 72%, 1); }
    .tab { position: relative; height: 32px; padding: 0 9px; border: 0; border-radius: 8px; background: transparent; color: inherit; cursor: pointer; font: inherit;
      display: flex; align-items: center; gap: 9px; text-align: left; -webkit-tap-highlight-color: transparent; transition: background .15s, color .15s; }
    .tab:not([aria-selected="true"]):hover { background: rgba(255,255,255,.28); }
    .tab[aria-selected="true"] { color: #1d0f2e; }
    .tab:focus-visible, .new:focus-visible { outline: 2px solid #fff; outline-offset: -2px; }
    .fav { width: 16px; height: 16px; flex: none; display: grid; place-items: center; }
    .fav svg { width: 16px; height: 16px; }
    .win { position: absolute; left: 166px; top: 8px; right: 8px; bottom: 8px; border-radius: 9px; background: #fff; box-shadow: 0 1px 3px rgba(60,20,90,.18), 0 8px 24px rgba(60,20,90,.14); overflow: hidden; }
    .pg { position: absolute; inset: 0; display: none; flex-direction: column; font: 500 8px/1.25 Inter, -apple-system, system-ui, sans-serif; color: #1e1e1e; }
    .win[data-p="figma"] .figma, .win[data-p="linear"] .linear, .win[data-p="notion"] .notion { display: flex; }
    .pg svg { flex: none; }
    /* figma.com — editor */
    .fg-top { display: flex; align-items: center; gap: 7px; height: 20px; padding: 0 7px; background: #2c2c2c; color: #fff; }
    .fg-top svg { width: 9px; height: 9px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .fg-top .on { padding: 2px; margin: -2px; border-radius: 3px; background: #0d99ff; }
    .fg-top b { margin-left: auto; padding: 2px 5px; border-radius: 3px; background: #0d99ff; font-size: 7px; font-weight: 600; }
    .fg-body { flex: 1; display: flex; min-height: 0; }
    .fg-layers { width: 46px; padding: 6px 0; border-right: 1px solid #e6e6e6; display: grid; align-content: start; gap: 1px; font-size: 7px; color: #333; }
    .fg-layers span { display: flex; align-items: center; gap: 3px; padding: 2px 5px; white-space: nowrap; overflow: hidden; }
    .fg-layers span:first-child { background: #e5f4ff; }
    .fg-layers svg { width: 7px; height: 7px; fill: none; stroke: #8c8c8c; stroke-width: 2.4; stroke-linecap: round; }
    .fg-canvas { flex: 1; min-width: 0; background: #f5f5f5; padding: 10px 8px; display: grid; align-content: start; gap: 3px; }
    .fg-canvas small { font-size: 6.5px; color: #8c8c8c; }
    .fg-frame { background: #fff; box-shadow: 0 0 0 1px #0d99ff; display: grid; gap: 4px; padding: 6px; }
    .fg-frame img { display: block; width: 100%; height: 46px; object-fit: cover; border-radius: 2px; }
    .fg-frame strong { font-size: 9px; font-weight: 700; letter-spacing: -.01em; }
    .fg-frame em { justify-self: start; font-style: normal; padding: 3px 6px; border-radius: 3px; background: #1e1e1e; color: #fff; font-size: 6.5px; font-weight: 600; }
    /* linear.app — issue list */
    .linear { background: #0f1011; color: #e2e4e7; }
    .ln-hd { display: flex; align-items: center; gap: 5px; height: 22px; padding: 0 8px; border-bottom: 1px solid #23252a; font-weight: 600; }
    .ln-hd span { color: #8a8f98; font-weight: 500; }
    .ln-row { display: flex; align-items: center; gap: 5px; height: 21px; padding: 0 8px; border-bottom: 1px solid #1a1b1e; white-space: nowrap; }
    .ln-row i { font-style: normal; color: #8a8f98; font-size: 7px; }
    .ln-row b { font-weight: 500; overflow: hidden; text-overflow: ellipsis; }
    .ln-row svg { width: 8px; height: 8px; }
    /* notion.so — page */
    .notion { background: #fff; color: #37352f; }
    .nt-cover { height: 44px; background: url(assets/wide/12.webp) 50% 60% / cover; }
    .nt-ico { margin: -9px 0 0 12px; font-size: 17px; line-height: 1; }
    .nt-body { padding: 3px 12px 0; display: grid; gap: 4px; }
    .nt-body h4 { margin: 0 0 1px; font: 700 12px/1.2 Inter, -apple-system, system-ui, sans-serif; letter-spacing: -.01em; }
    .nt-todo { display: flex; align-items: center; gap: 4px; white-space: nowrap; }
    .nt-todo i { width: 7px; height: 7px; flex: none; border: 1px solid #37352f; border-radius: 1px; }
    .nt-todo.done i { background: #2383e2; border-color: #2383e2; }
    .nt-todo.done span { color: #9b9a97; text-decoration: line-through; }
    .cmd { position: absolute; left: 50%; top: 40px; width: 220px; border-radius: 12px; background: rgba(255,255,255,.97); padding: 6px;
      box-shadow: 0 0 0 .5px rgba(60,20,90,.12), 0 24px 48px -8px rgba(60,20,90,.4); transform: translateX(-50%) scale(.92); opacity: 0; pointer-events: none;
      transition: transform .38s cubic-bezier(.32,.72,0,1), opacity .18s; }
    .cmd.on { transform: translateX(-50%) scale(1); opacity: 1; pointer-events: auto; }
    .cmd label { display: flex; align-items: center; gap: 8px; height: 34px; padding: 0 8px; border-bottom: 1px solid #f0ecf4; margin-bottom: 4px; }
    .cmd label svg { width: 16px; height: 16px; flex: none; }
    .cmd input { flex: 1; min-width: 0; border: 0; outline: none; background: transparent; font: 500 13px/1 -apple-system, system-ui, sans-serif; color: #1d0f2e; }
    .cmd input::placeholder { color: #9b90a8; }
    .sg { display: flex; align-items: center; gap: 8px; height: 28px; padding: 0 8px; border-radius: 7px; color: #4a3d5c; font-size: 12px; }
    .sg:first-of-type { background: #f2edf8; color: #1d0f2e; }
    .sg svg { width: 14px; height: 14px; }
  `,
  html: `
    <div class="stage">
      <div class="side">
        <div class="lights" aria-hidden="true"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i></div>
        <div class="url" aria-hidden="true">figma.com</div>
        <button class="new" type="button" aria-expanded="false" aria-haspopup="dialog"><svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5v14"/></svg>New Tab</button>
        <div class="tabs" role="tablist" aria-label="Today">
          <span class="pill"></span>
          <button class="tab" type="button" role="tab" aria-selected="true" data-url="figma.com"><span class="fav"><svg viewBox="0 0 38 57"><path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/><path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/><path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/><path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/><path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/></svg></span>Figma</button>
          <button class="tab" type="button" role="tab" aria-selected="false" data-url="linear.app"><span class="fav"><svg viewBox="0 0 24 24"><path fill="#5e6ad2" d="M2.886 4.18A11.982 11.982 0 0 1 11.99 0C18.624 0 24 5.376 24 12.009c0 3.64-1.62 6.903-4.18 9.105L2.887 4.18ZM1.817 5.626l16.556 16.556c-.524.33-1.075.62-1.65.866L.951 7.277c.247-.575.537-1.126.866-1.65ZM.322 9.163l14.515 14.515c-.71.172-1.443.282-2.195.322L0 11.358a12 12 0 0 1 .322-2.195Zm-.17 4.862 9.823 9.824a12.02 12.02 0 0 1-9.824-9.824Z"/></svg></span>Linear</button>
          <button class="tab" type="button" role="tab" aria-selected="false" data-url="notion.so"><span class="fav"><svg viewBox="0 0 24 24"><path fill="#000" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/></svg></span>Notion</button>
        </div>
      </div>
      <div class="win" data-p="figma" aria-hidden="true">
        <div class="pg figma">
          <div class="fg-top"><svg class="on" viewBox="0 0 24 24"><path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/></svg><svg viewBox="0 0 24 24"><line x1="22" x2="2" y1="6" y2="6"/><line x1="22" x2="2" y1="18" y2="18"/><line x1="6" x2="6" y1="2" y2="22"/><line x1="18" x2="18" y1="2" y2="22"/></svg><svg viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/></svg><svg viewBox="0 0 24 24"><path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"/><path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"/><path d="m2.3 2.3 7.286 7.286"/><circle cx="11" cy="11" r="2"/></svg><svg viewBox="0 0 24 24"><path d="M12 4v16"/><path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"/><path d="M9 20h6"/></svg><b>Share</b></div>
          <div class="fg-body"><div class="fg-layers"><span><svg viewBox="0 0 24 24"><line x1="22" x2="2" y1="6" y2="6"/><line x1="22" x2="2" y1="18" y2="18"/><line x1="6" x2="6" y1="2" y2="22"/><line x1="18" x2="18" y1="2" y2="22"/></svg>Desktop</span><span><svg viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>Hero</span><span><svg viewBox="0 0 24 24"><path d="M12 4v16"/><path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"/></svg>Title</span><span><svg viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>Button</span></div>
          <div class="fg-canvas"><small>Desktop</small><div class="fg-frame"><img src="assets/wide/32.webp" alt="" width="80" height="46" draggable="false"><strong>Ship faster</strong><em>Get started</em></div></div></div>
        </div>
        <div class="pg linear">
          <div class="ln-hd">Active issues <span>12</span></div>
          <div class="ln-row"><i>ENG-142</i><svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.5" fill="none" stroke="#8a8f98" stroke-width="1.5"/></svg><b>Fix sync on reconnect</b></div>
          <div class="ln-row"><i>ENG-143</i><svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.5" fill="none" stroke="#f2c94c" stroke-width="1.5"/><path d="M7 3.5a3.5 3.5 0 0 1 0 7z" fill="#f2c94c"/></svg><b>Command menu keyboard nav</b></div>
          <div class="ln-row"><i>ENG-139</i><svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="6.25" fill="#5e6ad2"/><path d="m4.4 7.1 1.8 1.8 3.4-3.6" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg><b>Dark theme contrast</b></div>
          <div class="ln-row"><i>ENG-137</i><svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.5" fill="none" stroke="#f2c94c" stroke-width="1.5"/><path d="M7 3.5a3.5 3.5 0 0 1 0 7z" fill="#f2c94c"/></svg><b>Faster issue search</b></div>
          <div class="ln-row"><i>ENG-131</i><svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.5" fill="none" stroke="#8a8f98" stroke-width="1.5"/></svg><b>Cycle burn-up chart</b></div>
          <div class="ln-row"><i>ENG-128</i><svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="6.25" fill="#5e6ad2"/><path d="m4.4 7.1 1.8 1.8 3.4-3.6" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg><b>Inbox snooze</b></div>
          <div class="ln-row"><i>ENG-120</i><svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.5" fill="none" stroke="#8a8f98" stroke-width="1.5"/></svg><b>Triage rules</b></div>
        </div>
        <div class="pg notion">
          <div class="nt-cover"></div>
          <div class="nt-ico">🚀</div>
          <div class="nt-body"><h4>Launch plan</h4>
            <div class="nt-todo done"><i></i><span>Draft announcement</span></div>
            <div class="nt-todo done"><i></i><span>Record demo video</span></div>
            <div class="nt-todo"><i></i><span>Update pricing page</span></div>
            <div class="nt-todo"><i></i><span>Email beta users</span></div>
          </div>
        </div>
      </div>
      <div class="cmd" role="dialog" aria-label="Command Bar">
        <label><svg viewBox="0 0 24 24"><defs><linearGradient id="arcg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff4f5e"/><stop offset="1" stop-color="#3a4bff"/></linearGradient></defs><path fill="url(#arcg)" d="M23.9371 8.5089c.1471-.7147.0367-1.4661-.3364-2.0967-.4203-.7094-1.1035-1.1876-1.9075-1.3506a2.9178 2.9178 0 0 0-.5623-.0578h-.0105c-1.3768 0-2.5329.988-2.8061 2.3385-.1629.7935-.4782 1.5607-.9196 2.2701a.263.263 0 0 1-.2363.1205.2627.2627 0 0 1-.2209-.1468l-2.8587-5.9906c-.3626-.762-1.0142-1.361-1.8235-1.5975-1.3873-.4099-2.8166.2838-3.4052 1.524L5.897 9.7333c-.0788.1629-.31.1576-.3784-.0053v-.0052a2.8597 2.8597 0 0 0-2.6642-1.7972c-.3784 0-.7515.0736-1.1088.2207-1.4714.6148-2.1283 2.349-1.5187 3.8203.557 1.3295 1.4714 2.5855 2.659 3.668.084.0788.1103.1997.063.3048l-.9563 2.0074c-.6727 1.4188-.1314 3.1477 1.2664 3.8571.4099.2049.846.31 1.298.31 1.1035 0 2.123-.6411 2.5959-1.6395l.825-1.7289a.254.254 0 0 1 .3048-.1366c1.0037.2732 2.0127.4204 3.0058.4204 1.1193 0 2.2229-.1682 3.2896-.4782a.2626.2626 0 0 1 .3101.1366l.8145 1.7131c.4834 1.0195 1.4924 1.7131 2.6169 1.7184.4572 0 .8986-.0999 1.3138-.3101 1.403-.7094 1.939-2.4435 1.2664-3.8676L19.875 15.787c-.0473-.1051-.0263-.226.0578-.3048 1.9864-1.8497 3.4525-4.2723 4.0043-6.9733ZM6.2121 20.0172a1.835 1.835 0 0 1-.6764.7622 1.8352 1.8352 0 0 1-.9788.2835c-.2733 0-.5518-.063-.8093-.1891-.9038-.4467-1.2454-1.5713-.8093-2.4804l.7935-1.6658c.0684-.1471.2575-.1997.3837-.1051.1681.1209.3415.2365.5202.3521.6989.4467 1.4293.825 2.1808 1.1351.1419.0578.205.2154.1419.352l-.7462 1.5555Zm5.0763-2.0442c-4.2092 0-8.6548-2.8534-10.1262-6.4951a1.8286 1.8286 0 0 1 1.009-2.3805c.2259-.0893.4571-.1366.683-.1366.7252 0 1.4084.431 1.6974 1.1456.9196 2.2806 4.0043 4.2092 6.7368 4.2092.4204 0 .8408-.042 1.256-.1156a.2643.2643 0 0 1 .2837.1419l1.3768 2.9007c.0683.1471-.0105.3205-.1629.3626-.8986.2365-1.8182.3678-2.7536.3678Zm-.599-4.9291.6358-1.3348c.0526-.1051.205-.1051.2575 0l.6201 1.3033c.042.0841-.0158.1891-.1051.2049-.268.0368-.536.0578-.7988.0578a5.0634 5.0634 0 0 1-.4887-.0263c-.1103-.0157-.1629-.1208-.1208-.2049Zm8.4604 7.8246a1.831 1.831 0 0 1-2.0329-.2788 1.8292 1.8292 0 0 1-.4316-.5778l-4.987-10.4836c-.0998-.2102-.3994-.2102-.4939 0l-1.545 3.2529a.2623.2623 0 0 1-.3205.1366c-1.051-.3626-2.0495-.9774-2.7904-1.7184a.2552.2552 0 0 1-.0473-.2943l3.3421-7.031c.1156-.247.2943-.4677.5203-.6201 1.051-.6884 2.2806-.2575 2.7378.7041l6.8577 14.4248c.4309.9144.0946 2.0389-.8093 2.4856Zm-1.4451-9.6481a.258.258 0 0 1 .0315-.2732c.783-1.0037 1.3558-2.1756 1.6028-3.421.1734-.867.9354-1.4714 1.7919-1.4714.1472 0 .2943.0158.4467.0526.9722.2417 1.5344 1.2507 1.3295 2.2333-.4835 2.3017-1.6816 4.3879-3.3159 6.0222-.1313.1314-.3468.0946-.4256-.0683l-1.4609-3.0742Z"/></svg><input type="text" placeholder="Search or Enter URL…" aria-label="Search or Enter URL"></label>
        <div class="sg"><svg viewBox="0 0 24 24"><path fill="#5e6ad2" d="M2.886 4.18A11.982 11.982 0 0 1 11.99 0C18.624 0 24 5.376 24 12.009c0 3.64-1.62 6.903-4.18 9.105L2.887 4.18ZM1.817 5.626l16.556 16.556c-.524.33-1.075.62-1.65.866L.951 7.277c.247-.575.537-1.126.866-1.65ZM.322 9.163l14.515 14.515c-.71.172-1.443.282-2.195.322L0 11.358a12 12 0 0 1 .322-2.195Zm-.17 4.862 9.823 9.824a12.02 12.02 0 0 1-9.824-9.824Z"/></svg>linear.app</div>
        <div class="sg"><svg viewBox="0 0 24 24"><path fill="#000" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/></svg>notion.so</div>
      </div>
    </div>`,
  init(root, host) {
    const pill = root.querySelector('.pill'), url = root.querySelector('.url'), win = root.querySelector('.win');
    const tabs = [...root.querySelectorAll('.tab')];
    const nb = root.querySelector('.new'), cmd = root.querySelector('.cmd'), input = cmd.querySelector('input');
    tabs.forEach((t, i) => t.addEventListener('click', () => {
      tabs.forEach((x, j) => x.setAttribute('aria-selected', String(i === j)));
      pill.style.transform = `translateY(${i * 34}px)`;
      url.textContent = t.dataset.url; win.dataset.p = t.dataset.url.split('.')[0];
    }));
    const toggle = (on) => { nb.setAttribute('aria-expanded', String(on)); cmd.classList.toggle('on', on); if (on) input.focus(); else input.value = ''; };
    nb.addEventListener('click', () => toggle(nb.getAttribute('aria-expanded') !== 'true'));
    const outside = (e) => { if (nb.getAttribute('aria-expanded') === 'true' && !e.composedPath().some((n) => n === cmd || n === nb)) toggle(false); };
    root.addEventListener('pointerdown', outside);
    root.addEventListener('keydown', (e) => { if (e.key === 'Escape' || e.key === 'Enter') { toggle(false); nb.focus(); } });
  },
};
