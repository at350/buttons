// Sampled from a Dec 2006 digg.com capture: the 50px yellow digg box (#fff19a → #fffad7, olive #736926
// count, #93883f "diggs") over a white "digg it" button with a pale-blue #deeaf7 border and bold #105cb6 text,
// 17px bold underlined #105cb6 headline, #999 meta with the #a12a2a "made popular" time, Bury button.
export default {
  id: 'ob-digg',
  credit: 'Digg (2006) — the yellow "diggs" box over the "digg it" button; digging bumps the count and the button turns into "dugg!"',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: flex; gap: 10px; width: 360px; max-width: 100%; padding: 14px 14px 12px 10px; background: #fff; border-radius: 12px; font: 13px/1.4 Arial, Helvetica, sans-serif; color: #393733; }
    .dg { width: 50px; flex: none; display: flex; flex-direction: column; align-items: stretch; gap: 3px; }
    .box { height: 52px; border-radius: 6px 6px 0 0; background: linear-gradient(#fff19a, #fffad7); display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .n { font: 18px/1 Arial, Helvetica, sans-serif; color: #736926; font-variant-numeric: tabular-nums; }
    .box small { font: 11px/1.2 Arial, Helvetica, sans-serif; color: #93883f; margin-top: 3px; }
    .it { height: 24px; padding: 0; border: 1px solid #deeaf7; border-radius: 2px; background: #fff; color: #105cb6; font: 700 12px/1 Arial, Helvetica, sans-serif; cursor: pointer; display: grid; }
    .it span { grid-area: 1 / 1; align-self: center; }
    .it .b { visibility: hidden; }
    .it:hover { border-color: #a5c1e3; text-decoration: underline; }
    .it:focus-visible, .bury:focus-visible, a:focus-visible { outline: 1px dotted #000; outline-offset: 1px; }
    .dg.on .box { animation: dug .4s ease-out; }
    @keyframes dug { 0% { filter: brightness(1.15); } 100% { filter: none; } }
    .dg.on .it { cursor: default; border-color: #e5e5e5; color: #999; text-decoration: none; }
    .dg.on .it .a { visibility: hidden; } .dg.on .it .b { visibility: visible; }
    .txt { flex: 1; min-width: 0; }
    .ttl { display: block; color: #105cb6; font: 700 17px/1.2 Arial, Helvetica, sans-serif; text-decoration: underline; cursor: pointer; }
    .meta { margin-top: 4px; color: #999; font-size: 11px; display: flex; align-items: center; gap: 4px; white-space: nowrap; }
    .meta i { width: 14px; height: 14px; flex: none; border: 1px solid #ccc; background: #f4f4f4; }
    .meta a { color: #999; text-decoration: underline; }
    .meta b { color: #a12a2a; }
    .foot { margin-top: 6px; display: flex; align-items: center; gap: 6px; font-size: 11px; color: #999; white-space: nowrap; }
    .foot a { color: #578cca; text-decoration: underline; cursor: pointer; }
    .foot svg { width: 14px; height: 12px; flex: none; }
    .bury { display: grid; padding: 1px 5px; border: 1px solid #ddeaf6; background: #fff; color: #578cca; font: 11px Arial, Helvetica, sans-serif; cursor: pointer; }
    .bury span { grid-area: 1 / 1; } .bury .y { visibility: hidden; }
    .bury:hover { text-decoration: underline; }
    .bury[aria-pressed="true"] { color: #a12a2a; border-color: #f4e6e6; }
    .bury[aria-pressed="true"] .x { visibility: hidden; } .bury[aria-pressed="true"] .y { visibility: visible; }
  `,
  html: `
    <div class="row">
      <div class="dg">
        <div class="box" aria-live="polite"><span class="n">1337</span><small>diggs</small></div>
        <button class="it" type="button" aria-pressed="false"><span class="a">digg it</span><span class="b">dugg!</span></button>
      </div>
      <div class="txt">
        <a class="ttl" href="#">An Endless Page of Buttons</a>
        <div class="meta"><i aria-hidden="true"></i><a href="#">kevinrose</a> submitted, made popular <b>4 minutes ago</b></div>
        <div class="foot"><svg viewBox="0 0 14 12" aria-hidden="true"><path d="M1.5 1.5h11v7h-6l-3 2.5v-2.5h-2z" fill="#fff" stroke="#578cca"/><path d="M4 4h6M4 6h4" stroke="#578cca"/></svg><a href="#">23 comments</a> | <a href="#">Blog It</a> | <button class="bury" type="button" aria-pressed="false"><span class="x">Bury</span><span class="y">Buried</span></button></div>
      </div>
    </div>`,
  init(root) {
    const dg = root.querySelector('.dg'), it = root.querySelector('.it'), n = root.querySelector('.n'), bury = root.querySelector('.bury');
    let c = 1337, on = false;
    it.addEventListener('click', () => { on = !on; dg.classList.toggle('on', on); it.setAttribute('aria-pressed', String(on)); c += on ? 1 : -1; n.textContent = String(c); });
    bury.addEventListener('click', () => bury.setAttribute('aria-pressed', String(bury.getAttribute('aria-pressed') !== 'true')));
    root.querySelectorAll('a').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
  },
};
