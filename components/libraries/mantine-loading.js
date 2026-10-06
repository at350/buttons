export default {
  id: 'lb-mantine-loading',
  credit: 'Mantine — Button sm (36px, 18px padding, radius 8px): filled "Download" with a Tabler IconDownload right section shows the real loading state (label drops away, blurred white sheen slides in, 22px Oval loader); default "Gallery" and light "Visit gallery" beside it',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 12px; flex-wrap: wrap; font: 600 14px/1 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    .mt { position: relative; overflow: hidden; height: 36px; padding-inline: 18px; border-radius: 8px; border: 1px solid transparent; cursor: pointer; font: inherit; line-height: 1; display: inline-block; vertical-align: middle; user-select: none; -webkit-tap-highlight-color: transparent; }
    .mt:active:not([data-loading]) { transform: translateY(1px); }
    .mt:focus-visible { outline: 2px solid #228be6; outline-offset: 2px; }
    .mt::before { content: ''; pointer-events: none; position: absolute; inset: -1px; border-radius: inherit; background: rgba(255,255,255,.15); transform: translateY(-100%); opacity: 0; filter: blur(12px); transition: transform .15s ease, opacity .1s ease; }
    .in { display: flex; align-items: center; justify-content: center; height: 100%; transition: transform .15s ease, opacity .1s ease; }
    .sec { display: flex; align-items: center; }
    .sec.l { margin-inline-end: 10px; }
    .sec.r { margin-inline-start: 10px; }
    .mt svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .wl { padding-inline-start: 12px; }
    .wr { padding-inline-end: 12px; }
    .filled { background: #228be6; color: #fff; }
    .filled:hover:not([data-loading]) { background: #1c7ed6; }
    .filled[data-loading] { cursor: not-allowed; }
    .filled[data-loading]::before { transform: translateY(0); opacity: 1; }
    .filled[data-loading] .in { opacity: 0; transform: translateY(100%); }
    .ldr { position: absolute; left: 50%; top: 50%; width: 22px; height: 22px; margin: -11px 0 0 -11px; opacity: 0; transition: opacity .1s ease; }
    .ldr::after { content: ''; display: block; width: 22px; height: 22px; border-radius: 10000px; border: 2.75px solid #fff; border-left-color: transparent; animation: oval 1.2s linear infinite; }
    .filled[data-loading] .ldr { opacity: 1; }
    @keyframes oval { to { transform: rotate(360deg); } }
    .def { background: #fff; color: #000; border-color: #ced4da; }
    .def:hover { background: #f8f9fa; }
    .light { background: #d0ebff; color: #1864ab; }
    .light:hover { background: #a5d8ff; }
  `,
  html: `
    <div class="row">
      <button class="mt filled wr" type="button"><span class="in"><span>Download</span><span class="sec r"><svg viewBox="0 0 24 24"><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"/><path d="M7 11l5 5l5 -5"/><path d="M12 4l0 12"/></svg></span></span><span class="ldr" aria-hidden="true"></span></button>
      <button class="mt def wl" type="button"><span class="in"><span class="sec l"><svg viewBox="0 0 24 24"><path d="M15 8h.01"/><path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12"/><path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5"/><path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3"/></svg></span><span>Gallery</span></span></button>
      <button class="mt light wr" type="button"><span class="in"><span>Visit gallery</span><span class="sec r"><svg viewBox="0 0 24 24"><path d="M5 12l14 0"/><path d="M13 18l6 -6"/><path d="M13 6l6 6"/></svg></span></span></button>
    </div>`,
  init(root) {
    const f = root.querySelector('.filled');
    let t;
    f.addEventListener('click', () => {
      if (f.hasAttribute('data-loading')) return;
      f.setAttribute('data-loading', ''); f.setAttribute('aria-busy', 'true');
      clearTimeout(t); t = setTimeout(() => { f.removeAttribute('data-loading'); f.removeAttribute('aria-busy'); }, 1800);
    });
    return () => clearTimeout(t);
  },
};
