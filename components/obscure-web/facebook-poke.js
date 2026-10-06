// Facebook 2008 (from a web.archive.org capture of facebook.com): #3b5998 blue, 11px "lucida grande",
// the #eceff5 box header under a #94a3c4 rule, #3b5998 links, and the classic .inputsubmit button
// (#3b5998 with #d9dfea / #0e1f5b bevel borders) next to the grey .inputaux Cancel.
export default {
  id: 'ob-facebook-poke',
  credit: 'Facebook (2008) — the Pokes box: "Tom poked you." → poke back, confirm, and a moment later he pokes you again',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .fb { width: 300px; max-width: 100%; background: #fff; border-radius: 12px; overflow: hidden; font: 11px/1.36 "lucida grande", tahoma, verdana, arial, sans-serif; color: #333; padding-bottom: 10px; }
    .top { height: 30px; padding: 0 10px; background: #3b5998; color: #fff; font: 700 19px/30px Klavika, "lucida grande", tahoma, sans-serif; letter-spacing: -.6px; }
    .hd { margin: 10px 10px 0; padding: 3px 6px 4px; background: #eceff5; border-top: 1px solid #94a3c4; font-weight: 700; color: #333; display: flex; justify-content: space-between; }
    .hd span { font-weight: 400; color: #3b5998; }
    .bd { display: flex; gap: 8px; margin: 8px 10px 0; min-height: 50px; }
    .pic { width: 50px; height: 50px; flex: none; display: block; object-fit: cover; background: #e6eaf2; border: 1px solid #ccc; }
    .txt { flex: 1; min-width: 0; }
    .ln { min-height: 30px; }
    a { color: #3b5998; text-decoration: none; cursor: pointer; }
    a:hover { text-decoration: underline; }
    a:focus-visible, button:focus-visible { outline: 1px dotted #333; outline-offset: 1px; }
    .acts { display: flex; gap: 6px; align-items: center; height: 22px; }
    .inputsubmit { padding: 2px 15px 3px; border: 1px solid; border-color: #d9dfea #0e1f5b #0e1f5b #d9dfea; background: #3b5998; color: #fff; font: 700 11px "lucida grande", tahoma, verdana, arial, sans-serif; cursor: pointer; }
    .inputsubmit:active { background: #4f6aa3; border-color: #0e1f5b #d9dfea #d9dfea #0e1f5b; }
    .inputaux { padding: 2px 10px 3px; border: 1px solid; border-color: #e7e7e7 #666 #666 #e7e7e7; background: #f0f0f0; color: #000; font: 11px "lucida grande", tahoma, verdana, arial, sans-serif; cursor: pointer; }
    .v { display: none; } .s0 .v0, .s1 .v1, .s2 .v2 { display: flex; } .s0 .t0, .s1 .t1, .s2 .t2 { display: block; }
    .t0, .t1, .t2 { display: none; }
    .sep { color: #999; }
  `,
  html: `
    <div class="fb s0">
      <div class="top" aria-hidden="true">facebook</div>
      <div class="hd">Pokes<span class="cnt">1</span></div>
      <div class="bd">
        <img class="pic" src="assets/portraits/men-20.jpg" alt="" width="50" height="50">
        <div class="txt" aria-live="polite">
          <div class="ln t0"><a href="#">Tom Anderson</a> poked you.</div>
          <div class="ln t1">You are about to poke <a href="#">Tom Anderson</a>. Poke?</div>
          <div class="ln t2">You have poked <a href="#">Tom</a>.</div>
          <div class="acts v v0"><a href="#" class="pb" role="button">Poke back</a><span class="sep">-</span><a href="#" class="rm" role="button">Remove</a></div>
          <div class="acts v v1"><button class="inputsubmit" type="button">Poke</button><button class="inputaux" type="button">Cancel</button></div>
          <div class="acts v v2"><span class="sep">Waiting for Tom…</span></div>
        </div>
      </div>
    </div>`,
  init(root) {
    const fb = root.querySelector('.fb'), cnt = root.querySelector('.cnt');
    let t = 0, n = 0;
    const set = (s) => { fb.className = 'fb s' + s; };
    root.querySelectorAll('a').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
    root.querySelector('.pb').addEventListener('click', () => { set(1); root.querySelector('.inputsubmit').focus(); });
    root.querySelector('.rm').addEventListener('click', () => { set(2); cnt.textContent = '0'; clearTimeout(t); t = setTimeout(() => { set(0); cnt.textContent = '1'; }, 2500); });
    root.querySelector('.inputaux').addEventListener('click', () => { set(0); root.querySelector('.pb').focus(); });
    root.querySelector('.inputsubmit').addEventListener('click', () => {
      n++; set(2); cnt.textContent = '0';
      clearTimeout(t); t = setTimeout(() => { set(0); cnt.textContent = '1'; }, 1800);
    });
    return () => clearTimeout(t);
  },
};
