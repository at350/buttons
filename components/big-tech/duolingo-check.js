// Duolingo lesson footer: chunky "SKIP" and "CHECK" buttons with a 4px hard bottom edge that press flat.
// Checking turns the footer into the green "correct" banner (check badge + "CONTINUE"); both states share one
// grid cell, so the footer never changes size.
export default {
  id: 'bt-duolingo-check',
  credit: 'Duolingo — lesson footer "CHECK" button (3D press) that turns into the green correct-answer banner',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .foot { display: grid; align-items: center; padding: 16px clamp(12px, 4vw, 20px); border-radius: 12px; background: #fff; border-top: 2px solid #e5e5e5; transition: background-color .2s; }
    .foot.ok { background: #d7ffb8; border-top-color: #d7ffb8; }
    .side { grid-area: 1 / 1; display: flex; align-items: center; }
    .badge { display: flex; align-items: center; justify-content: center; width: 54px; height: 54px; border-radius: 50%; background: #fff; visibility: hidden; transform: scale(.4); opacity: 0; transition: transform .3s cubic-bezier(.34,1.56,.64,1), opacity .15s; }
    .badge svg { width: 30px; height: 30px; fill: none; stroke: #58a700; stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round; }
    .foot.ok .badge { visibility: visible; transform: none; opacity: 1; }
    .foot.ok .skip { visibility: hidden; }
    .row { grid-area: 1 / 1; display: flex; gap: clamp(12px, 6vw, 48px); align-items: center; justify-content: space-between; min-width: 0; }
    .duo {
      position: relative; height: 50px; min-width: 150px; padding: 0 16px 4px; border: 0; border-radius: 16px; cursor: pointer;
      font: 700 15px/1 "din-round", "DIN Round Pro", "DM Sans", sans-serif; letter-spacing: .8px; text-transform: uppercase;
      transition: filter .1s; -webkit-tap-highlight-color: transparent;
    }
    .duo::before { content: ''; position: absolute; inset: 0 0 4px; border-radius: 16px; background: var(--top); transition: transform .08s; }
    .duo span { position: relative; display: block; transition: transform .08s; }
    .duo:hover { filter: brightness(1.1); }
    .duo:active::before, .duo:active span { transform: translateY(4px); }
    .duo:active { background: transparent; }
    .duo:focus-visible { outline: 3px solid #1cb0f6; outline-offset: 3px; }
    .check { --top: #58cc02; background: #58a700; color: #fff; }
    .skip { --top: #fff; background: #e5e5e5; color: #afafaf; }
    .skip::before { box-shadow: inset 0 0 0 2px #e5e5e5; }
    .stk { display: grid; }
    .stk > i { grid-area: 1 / 1; font-style: normal; }
    .stk .b { visibility: hidden; }
    .foot.ok .stk .a { visibility: hidden; }
    .foot.ok .stk .b { visibility: visible; }
  `,
  html: `
    <div class="foot">
      <div class="row">
        <span class="side">
          <button class="duo skip" type="button"><span>Skip</span></button>
        </span>
        <button class="duo check" type="button" aria-pressed="false"><span class="stk"><i class="a">Check</i><i class="b">Continue</i></span></button>
      </div>
      <span class="side badge-wrap" style="pointer-events:none"><span class="badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span></span>
    </div>`,
  init(root) {
    const foot = root.querySelector('.foot');
    const c = root.querySelector('.check');
    const s = root.querySelector('.skip');
    c.addEventListener('click', () => { const on = foot.classList.toggle('ok'); c.setAttribute('aria-pressed', String(on)); });
    s.addEventListener('click', () => { foot.classList.remove('ok'); c.setAttribute('aria-pressed', 'false'); });
  },
};
