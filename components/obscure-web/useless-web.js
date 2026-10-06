// theuselessweb.com, from its live style.css scaled to fit: the TAKE ME / TO A / USELESS / WEBSITE stack in
// Josefin Slab #333 with a 2px 2px 4px #999 text-shadow on a white → #f2f2f2 radial page, and the deepPink
// PLEASE button with its stepped #be3077 / hotpink 3D shadow, #e21a62 hover, and the shift-down press.
export default {
  id: 'ob-useless-web',
  credit: 'The Useless Web — "Take me to a useless website → PLEASE ←": the deep-pink stepped-shadow button that flings you somewhere pointless',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .pg { width: 280px; max-width: 100%; padding: 16px 10px 12px; border-radius: 12px; background: radial-gradient(ellipse at center, #fff 0%, #f2f2f2 100%); font-family: "Josefin Slab", Rockwell, "Roboto Slab", Georgia, serif; text-align: center; }
    .h { margin: 0 auto; color: #333; text-shadow: 1px 1px 2px #999; line-height: 1.05; font-weight: 700; }
    .h1 { font-size: 30px; } .h2 { font-size: 13px; margin-bottom: 3px; } .h3 { font-size: 34px; } .h4 { font-size: 31px; }
    .h5 { font-size: 20px; display: flex; align-items: center; justify-content: center; gap: 2px; }
    .please { position: relative; margin: 6px 6px 4px; padding: 6px 7px 1px; border: 0; background: #ff1493; color: #fff; font: 400 22px/1.1 "Josefin Slab", Rockwell, "Roboto Slab", Georgia, serif; cursor: pointer; user-select: none; text-shadow: none;
      box-shadow: 1px 0 1px #be3077, 0 1px 1px hotpink, 2px 1px 1px #be3077, 1px 2px 1px hotpink, 3px 2px 1px #be3077, 2px 3px 1px hotpink, 4px 3px 1px #be3077, 3px 4px 1px hotpink, 5px 4px 1px #be3077, 4px 5px 1px hotpink, 6px 5px 1px #be3077; }
    .please:hover { background: #e21a62; }
    .please:active { top: 2px; left: 3px; box-shadow: 1px 0 1px #be3077, 0 1px 1px hotpink, 2px 1px 1px #be3077, 1px 2px 1px hotpink, 3px 2px 1px #be3077; }
    .please:focus-visible { outline: 2px solid #333; outline-offset: 4px; }
    .to { height: 16px; margin-top: 6px; font: 300 12px/16px "Helvetica Neue", Helvetica, Arial, sans-serif; color: #232323; }
    .to b { color: #ff1493; font-weight: 400; }
  `,
  html: `
    <div class="pg">
      <div class="h h1">TAKE ME</div>
      <div class="h h2">TO A</div>
      <div class="h h3">USELESS</div>
      <div class="h h4">WEBSITE</div>
      <div class="h h5"><span aria-hidden="true">→</span><button class="please" type="button">PLEASE</button><span aria-hidden="true">←</span></div>
      <div class="to" aria-live="polite"></div>
    </div>`,
  init(root) {
    const btn = root.querySelector('.please'), to = root.querySelector('.to');
    const sites = ['eelslap.com', 'cat-bounce.com', 'pointerpointer.com', 'heeeeeeeey.com', 'koalastothemax.com', 'ducksarethebest.com', 'hackertyper.net', 'corndog.io', 'staggeringbeauty.com', 'isitchristmas.com', 'zoomquilt.org', 'puginarug.com'];
    let last = -1;
    btn.addEventListener('click', () => {
      let k; do { k = Math.floor(Math.random() * sites.length); } while (k === last); last = k;
      to.innerHTML = 'opening <b>' + sites[k] + '</b>';
    });
  },
};
