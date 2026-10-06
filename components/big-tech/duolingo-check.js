export default {
  id: 'bt-duolingo-check',
  credit: 'Duolingo — chunky 3D green "CHECK" button with hard bottom edge that presses flat',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: flex; gap: 14px; align-items: flex-start; flex-wrap: wrap; }
    .duo {
      height: 50px; min-width: 150px; padding: 0 24px; border: 0; border-radius: 16px; cursor: pointer;
      font: 700 15px/46px "din-round", Nunito, -apple-system, "Segoe UI", system-ui, sans-serif; letter-spacing: .8px; text-transform: uppercase;
      transform: translateY(0); transition: transform .08s, box-shadow .08s, background .15s, color .15s; -webkit-tap-highlight-color: transparent;
    }
    .duo:focus-visible { outline: 3px solid #1cb0f6; outline-offset: 3px; }
    .check { background: #58cc02; color: #fff; box-shadow: 0 4px 0 #58a700; }
    .check:hover { background: #61e002; }
    .check:active, .duo.pressed { transform: translateY(4px); box-shadow: 0 0 0 #58a700; }
    .check.done { background: #ffc800; color: #4b3b00; box-shadow: 0 4px 0 #e5a500; }
    .check .lbl::after { content: 'Check'; }
    .check.done .lbl::after { content: 'Continue'; }
    .skip { background: #fff; color: #afafaf; box-shadow: 0 4px 0 #e5e5e5; border: 2px solid #e5e5e5; line-height: 42px; }
    .skip:hover { background: #f7f7f7; }
    .skip:active { transform: translateY(4px); box-shadow: 0 0 0 #e5e5e5; }
  `,
  html: `
    <div class="row">
      <button class="duo skip" type="button">Skip</button>
      <button class="duo check" type="button" aria-pressed="false"><span class="lbl"></span></button>
    </div>`,
  init(root) {
    const c = root.querySelector('.check');
    const s = root.querySelector('.skip');
    c.addEventListener('click', () => { const on = c.classList.toggle('done'); c.setAttribute('aria-pressed', on); });
    s.addEventListener('click', () => { c.classList.remove('done'); c.setAttribute('aria-pressed', 'false'); });
  },
};
