export default {
  id: 'bt-x-follow',
  credit: 'X / Twitter — "Follow" pill that becomes "Following", and turns red "Unfollow" on hover',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
    .xf {
      height: 32px; min-width: 96px; padding: 0 16px; border-radius: 16px; border: 1px solid #0f1419; background: #0f1419; color: #fff; cursor: pointer;
      font: 700 14px/30px -apple-system, "Segoe UI", TwitterChirp, system-ui, sans-serif;
      transition: background .2s, color .2s, border-color .2s; -webkit-tap-highlight-color: transparent;
    }
    .xf:hover { background: #272c30; }
    .xf:focus-visible { outline: 2px solid #1d9bf0; outline-offset: 2px; }
    .xf .lbl::after { content: 'Follow'; }
    .xf[aria-pressed="true"] { background: #fff; color: #0f1419; border-color: #cfd9de; }
    .xf[aria-pressed="true"] .lbl::after { content: 'Following'; }
    .xf[aria-pressed="true"]:hover { background: rgba(244,33,46,.1); color: #f4212e; border-color: #fdc9ce; }
    .xf[aria-pressed="true"]:hover .lbl::after { content: 'Unfollow'; }
    .post {
      height: 36px; padding: 0 16px; border: 0; border-radius: 18px; background: #0f1419; color: #fff; cursor: pointer;
      font: 700 15px/36px -apple-system, "Segoe UI", TwitterChirp, system-ui, sans-serif; transition: background .2s; -webkit-tap-highlight-color: transparent;
    }
    .post:hover { background: #272c30; }
    .post:active { background: #3f4447; }
    .post:focus-visible { outline: 2px solid #1d9bf0; outline-offset: 2px; }
    .post[aria-pressed="true"] { background: #1d9bf0; }
  `,
  html: `
    <div class="row">
      <button class="xf" type="button" aria-pressed="false"><span class="lbl"></span></button>
      <button class="post" type="button" aria-pressed="false">Post</button>
    </div>`,
  init(root) {
    root.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true')));
  },
};
