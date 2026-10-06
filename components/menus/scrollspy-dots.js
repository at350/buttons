export default {
  id: 'mn-scrollspy-dots',
  credit: 'Scroll-spy section dots (fullPage.js / Apple product page side nav)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { display: flex; align-items: center; gap: 14px; background: #fff; border-radius: 12px; padding: 14px 16px; }
    .dots { display: flex; flex-direction: column; gap: 10px; }
    .d { position: relative; width: 20px; height: 20px; border: 0; background: none; cursor: pointer; padding: 0; display: grid; place-items: center; border-radius: 50%; }
    .d::before { content: ""; width: 8px; height: 8px; border-radius: 4px; background: #c7c7cc; transition: height .25s cubic-bezier(.2,.8,.2,1), background .2s, transform .15s; }
    .d:hover::before { transform: scale(1.3); background: #8e8e93; }
    .d[aria-current="true"]::before { height: 20px; background: #111; transform: none; }
    .d:focus-visible { outline: 2px solid #111; outline-offset: 1px; }
    .d[aria-current="true"] { height: 32px; }
    .pane { width: 120px; height: 160px; border-radius: 8px; background: linear-gradient(180deg, #f2f2f7, #e5e5ea); overflow: hidden; position: relative; }
    .pane span { position: absolute; left: 0; right: 0; height: 160px; display: grid; place-items: center; transition: transform .45s cubic-bezier(.2,.8,.2,1); }
    .pane span i { width: 56px; height: 56px; border-radius: 16px; display: block; }
  `,
  html: `
    <div class="wrap">
      <div class="pane">
        <span style="top:0"><i style="background:#ff6b6b"></i></span>
        <span style="top:160px"><i style="background:#ffd93d"></i></span>
        <span style="top:320px"><i style="background:#6bcb77"></i></span>
        <span style="top:480px"><i style="background:#4d96ff"></i></span>
        <span style="top:640px"><i style="background:#c77dff"></i></span>
      </div>
      <nav class="dots" aria-label="Sections">
        <button class="d" type="button" aria-current="true" aria-label="Section 1"></button>
        <button class="d" type="button" aria-label="Section 2"></button>
        <button class="d" type="button" aria-label="Section 3"></button>
        <button class="d" type="button" aria-label="Section 4"></button>
        <button class="d" type="button" aria-label="Section 5"></button>
      </nav>
    </div>`,
  init(root) {
    const dots = [...root.querySelectorAll('.d')], slides = [...root.querySelectorAll('.pane span')];
    const go = (i) => { dots.forEach((d, j) => (j === i ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current'))); slides.forEach((s) => (s.style.transform = `translateY(${-i * 160}px)`)); };
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
  },
};
