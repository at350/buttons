export default {
  id: 'mn-stepper',
  credit: 'Wizard progress stepper (1—2—3—4) with completed check marks — Material / Ant Steps',
  size: 'wide',
  css: `
    :host { display: block; }
    .st { display: flex; align-items: center; background: #fff; border-radius: 12px; padding: 18px 20px; font: 600 14px/1 -apple-system, system-ui, sans-serif; }
    .s { position: relative; width: 32px; height: 32px; border-radius: 50%; border: 2px solid #c7c7cc; background: #fff; color: #8e8e93; font: inherit; cursor: pointer; display: grid; place-items: center; flex: none; padding: 0; transition: background .25s, border-color .25s, color .25s, transform .15s; }
    .s:hover { transform: scale(1.08); }
    .s:focus-visible { outline: 2px solid #2563eb; outline-offset: 3px; }
    .s svg { display: none; }
    .s.done { background: #2563eb; border-color: #2563eb; color: #fff; }
    .s.done svg { display: block; } .s.done span { display: none; }
    .s.cur { border-color: #2563eb; color: #2563eb; box-shadow: 0 0 0 4px rgba(37,99,235,.15); }
    .ln { flex: 1; height: 2px; background: #e5e5ea; position: relative; overflow: hidden; margin: 0 8px; }
    .ln::after { content: ""; position: absolute; inset: 0; background: #2563eb; transform: scaleX(0); transform-origin: left; transition: transform .3s cubic-bezier(.2,.8,.2,1); }
    .ln.done::after { transform: scaleX(1); }
  `,
  html: `
    <div class="st">
      <button class="s" type="button" aria-label="Step 1"><span>1</span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 7.5l3 3 6-6.5"/></svg></button><span class="ln"></span>
      <button class="s" type="button" aria-label="Step 2"><span>2</span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 7.5l3 3 6-6.5"/></svg></button><span class="ln"></span>
      <button class="s" type="button" aria-label="Step 3"><span>3</span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 7.5l3 3 6-6.5"/></svg></button><span class="ln"></span>
      <button class="s" type="button" aria-label="Step 4"><span>4</span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 7.5l3 3 6-6.5"/></svg></button>
    </div>`,
  init(root) {
    const steps = [...root.querySelectorAll('.s')], lines = [...root.querySelectorAll('.ln')];
    const go = (i) => {
      steps.forEach((s, j) => { s.classList.toggle('done', j < i); s.classList.toggle('cur', j === i); s.setAttribute('aria-current', j === i ? 'step' : 'false'); });
      lines.forEach((l, j) => l.classList.toggle('done', j < i));
    };
    steps.forEach((s, i) => s.addEventListener('click', () => go(i)));
    go(1);
  },
};
