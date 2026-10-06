export default {
  id: 'mo-grid-accordion',
  credit: 'Accordion animated with grid-template-rows 0fr → 1fr (Kevin Powell’s height-auto trick), chevron spins, content slides in',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .acc { width: 280px; max-width: 100%; height: 232px; border-radius: 14px; background: #fff; border: 1px solid #e5e5e0; overflow: hidden; font-family: Inter, system-ui, sans-serif; }
    .it { border-bottom: 1px solid #efefeb; }
    .it:last-child { border-bottom: 0; }
    .hd { width: 100%; height: 48px; padding: 0 16px; border: 0; background: transparent; display: flex; align-items: center; justify-content: space-between; cursor: pointer; font: 500 14px Inter, system-ui, sans-serif; color: #111; transition: background .2s, color .2s; }
    .hd:hover { background: #fafaf8; } .hd[aria-expanded="true"] { color: #2563eb; }
    .hd:focus-visible { outline: 2px solid #111; outline-offset: -3px; border-radius: 8px; }
    .hd svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; transition: transform .45s cubic-bezier(.34, 1.4, .64, 1); }
    .hd[aria-expanded="true"] svg { transform: rotate(180deg); }
    .bd { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .45s cubic-bezier(.3, .8, .3, 1); }
    .it.open .bd { grid-template-rows: 1fr; }
    .bd > div { overflow: hidden; min-height: 0; }
    .bd p { margin: 0; padding: 0 16px 14px; font-size: 13px; line-height: 1.55; color: #666; opacity: 0; transform: translateY(-6px); transition: opacity .3s, transform .4s cubic-bezier(.3, .8, .3, 1); }
    .it.open .bd p { opacity: 1; transform: none; transition-delay: .1s; }
  `,
  html: `
    <div class="acc">
      <div class="it open"><button class="hd" type="button" aria-expanded="true">Is it accessible?<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button><div class="bd"><div><p>Yes. It follows the WAI-ARIA accordion pattern and animates with grid rows, so no height is ever measured.</p></div></div></div>
      <div class="it"><button class="hd" type="button" aria-expanded="false">Is it styled?<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button><div class="bd"><div><p>It ships with sensible defaults that are easy to override from the outside.</p></div></div></div>
      <div class="it"><button class="hd" type="button" aria-expanded="false">Is it animated?<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button><div class="bd"><div><p>Open and close ease with the same curve, and the chevron overshoots slightly on its way around.</p></div></div></div>
    </div>`,
  init(root) {
    const items = [...root.querySelectorAll('.it')];
    items.forEach((it) => {
      const hd = it.querySelector('.hd');
      hd.addEventListener('click', () => {
        const open = !it.classList.contains('open');
        items.forEach((o) => { o.classList.toggle('open', o === it && open); o.querySelector('.hd').setAttribute('aria-expanded', String(o === it && open)); });
      });
    });
  },
};
