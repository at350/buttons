const C = { W: '#ffffff', Y: '#ffd500', R: '#b71234', O: '#ff5800', B: '#0046ad', G: '#009b48' };
const face = (cls) => `<div class="face ${cls}">${Array.from({ length: 9 }, () => '<i></i>').join('')}</div>`;

export default {
  id: 'ty2-rubiks-face',
  credit: "Rubik's Cube (Ernő Rubik, 1974) — official sticker colours; click a row on the front to turn that layer a quarter",
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; display: inline-block; padding: 22px 30px 30px; border-radius: 12px; overflow: hidden; background: radial-gradient(circle at 50% 40%, #fdfdfb, #d9d9d2); perspective: 600px; }
    .cube { position: relative; width: 108px; height: 108px; margin: 18px 22px 8px 6px; transform-style: preserve-3d; transform: rotateX(-24deg) rotateY(-34deg); }
    .face { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; padding: 3px; border-radius: 8px; background: #111; }
    .face i { border-radius: 5px; background: var(--c); box-shadow: inset 0 0 0 1px rgba(0,0,0,.25), inset 0 6px 8px -4px rgba(255,255,255,.55); transition: background .12s; }
    .F { transform: translateZ(54px); }
    .R { transform: rotateY(90deg) translateZ(54px); filter: brightness(.82); }
    .U { transform: rotateX(90deg) translateZ(54px); filter: brightness(1.04); }
    .rows { position: absolute; inset: 0; transform: translateZ(54.5px); display: grid; grid-template-rows: repeat(3, 1fr); padding: 3px; gap: 3px; }
    .row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; border: 0; padding: 0; background: none; cursor: pointer; border-radius: 6px; }
    .row i { border-radius: 5px; background: var(--c); box-shadow: inset 0 0 0 1px rgba(0,0,0,.25), inset 0 6px 8px -4px rgba(255,255,255,.6); }
    .row:hover i { filter: brightness(1.08); }
    .row:focus-visible { outline: 3px solid #0046ad; outline-offset: 1px; }
    .row.turn i { animation: turn .26s cubic-bezier(.3,0,.3,1); }
    @keyframes turn { 0% { transform: none; } 50% { transform: scaleX(.15) translateX(-30px); filter: brightness(.6); } 100% { transform: none; } }
  `,
  html: `
    <div class="stage"><div class="cube">
      ${face('U')}${face('R')}
      <div class="rows">
        <button class="row" type="button" aria-label="turn top row"><i></i><i></i><i></i></button>
        <button class="row" type="button" aria-label="turn middle row"><i></i><i></i><i></i></button>
        <button class="row" type="button" aria-label="turn bottom row"><i></i><i></i><i></i></button>
      </div>
    </div></div>`,
  init(root) {
    const S = { F: 'G', R: 'R', B: 'B', L: 'O', U: 'W' };
    const st = {}; for (const f of 'FRBLU') st[f] = Array(9).fill(S[f]);
    const rowsEl = [...root.querySelectorAll('.row')], R = [...root.querySelectorAll('.R i')], U = [...root.querySelectorAll('.U i')];
    const paint = () => {
      rowsEl.forEach((r, ri) => [...r.children].forEach((c, ci) => c.style.setProperty('--c', C[st.F[ri * 3 + ci]])));
      R.forEach((c, i) => c.style.setProperty('--c', C[st.R[i]]));
      U.forEach((c, i) => c.style.setProperty('--c', C[st.U[i]]));
    };
    const turn = (r) => {
      const take = (f) => st[f].slice(r * 3, r * 3 + 3), put = (f, v) => st[f].splice(r * 3, 3, ...v);
      const f = take('F'); put('F', take('R')); put('R', take('B')); put('B', take('L')); put('L', f);
      if (r === 0) { const u = st.U.slice(); st.U = [6, 3, 0, 7, 4, 1, 8, 5, 2].map((i) => u[i]); }
    };
    // a cube mid-solve: a few layer turns plus a scrambled top
    st.U = ['W', 'Y', 'W', 'R', 'W', 'B', 'W', 'O', 'W'];
    st.B = ['B', 'Y', 'B', 'B', 'B', 'W', 'Y', 'B', 'B'];
    turn(0); turn(2); turn(2); turn(2); turn(1); turn(1);
    paint();
    let t = 0;
    rowsEl.forEach((row, r) => row.addEventListener('click', () => {
      row.classList.remove('turn'); void row.offsetWidth; row.classList.add('turn');
      clearTimeout(t); t = setTimeout(() => { turn(r); paint(); }, 130);
      setTimeout(() => row.classList.remove('turn'), 280);
    }));
    return () => clearTimeout(t);
  },
};
