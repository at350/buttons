export default {
  id: 'lb-shiny-text',
  credit: 'Magic UI — Animated Shiny Text announcement pill: a 100px black/80 highlight sweeps through the neutral-600/70 label via background-clip:text (8s, holds at 30–60%); Radix ArrowRightIcon nudges on hover; click for the dark variant',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 24px 32px; border-radius: 12px; background: #fff; display: inline-block; transition: background .3s; }
    .stage.dark { background: #0a0a0a; }
    .pill { display: block; padding: 0; border-radius: 9999px; border: 1px solid rgba(0,0,0,.05); background: #f5f5f5; cursor: pointer; font: 400 16px/24px Inter, -apple-system, system-ui, sans-serif; transition: all .15s cubic-bezier(.4,0,1,1); -webkit-tap-highlight-color: transparent; }
    .pill:hover { background: #e5e5e5; }
    .pill:focus-visible { outline: 2px solid #a1a1a1; outline-offset: 3px; }
    .dark .pill { border-color: rgba(255,255,255,.05); background: #171717; }
    .dark .pill:hover { background: #262626; }
    .sh { --shiny-width: 100px; --shine: linear-gradient(to right, transparent, rgba(0,0,0,.8) 50%, transparent);
      display: inline-flex; align-items: center; justify-content: center; padding: 4px 16px; color: rgba(82,82,82,.7);
      background-image: var(--shine); background-size: var(--shiny-width) 100%; background-position: 0 0; background-repeat: no-repeat;
      -webkit-background-clip: text; background-clip: text; animation: shiny-text 8s infinite; transition: color .15s cubic-bezier(0,0,.2,1); white-space: nowrap; }
    .pill:hover .sh { color: #525252; transition-duration: .3s; }
    .dark .sh { color: rgba(163,163,163,.7); --shine: linear-gradient(to right, transparent, rgba(255,255,255,.8) 50%, transparent); }
    .dark .pill:hover .sh { color: #a3a3a3; }
    @keyframes shiny-text { 0%, 90%, 100% { background-position: calc(-100% - var(--shiny-width)) 0; } 30%, 60% { background-position: calc(100% + var(--shiny-width)) 0; } }
    /* Same sweep on the compositor. The label span's glyphs become a mask (its own text made transparent) over a layer the
       size of .sh carrying the 100px highlight, slid from -100% to +100% with transform (= the background-position keyframes
       above, same easing). The visible label is redrawn on top by .sh::after (same text, font and spot, hidden from
       assistive tech), so the highlight still sits under the semi-transparent text exactly like background-clip:text.
       Browsers without mask-clip:text or content alt text keep the version above. */
    @supports (-webkit-mask-clip: text) and (content: "x" / "") {
      .sh { position: relative; overflow: hidden; background: none; animation: none; }
      .sh > span { color: transparent; -webkit-mask-image: linear-gradient(#000, #000); -webkit-mask-clip: text; }
      .sh > span::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: var(--shine) 0 0 / var(--shiny-width) 100% no-repeat; animation: shiny-x 8s infinite; }
      .sh::after { content: "✨ Introducing Magic UI" / ""; position: absolute; top: 4px; left: 16px; pointer-events: none; }
      @keyframes shiny-x { 0%, 90%, 100% { transform: translateX(-100%); } 30%, 60% { transform: translateX(100%); } }
    }
    .sh svg { width: 12px; height: 12px; margin-left: 4px; transition: transform .3s cubic-bezier(.4,0,.2,1); }
    .pill:hover .sh svg { transform: translateX(2px); }
  `,
  html: `
    <div class="stage">
      <button class="pill" type="button" aria-pressed="false"><span class="sh"><span>✨ Introducing Magic UI</span><svg viewBox="0 0 15 15" fill="none"><path d="M8.14648 3.14669C8.31735 2.97583 8.58131 2.95407 8.77539 3.08224L8.85352 3.14669L12.8535 7.14669C13.0488 7.34195 13.0488 7.65846 12.8535 7.85372L8.85352 11.8537C8.65825 12.049 8.34175 12.049 8.14648 11.8537C7.95122 11.6585 7.95122 11.342 8.14648 11.1467L11.293 8.00021H2.5C2.22386 8.00021 2 7.77635 2 7.50021C2 7.22406 2.22386 7.00021 2.5 7.00021H11.293L8.14648 3.85372L8.08203 3.7756C7.95387 3.58152 7.97562 3.31756 8.14648 3.14669Z" fill="currentColor"/></svg></span></button>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), b = root.querySelector('.pill');
    b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); st.classList.toggle('dark', on); });
  },
};
