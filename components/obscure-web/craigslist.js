export default {
  id: 'ob-craigslist',
  credit: 'Craigslist — the bordered "post to classifieds" box, a plain 1px-border search input + button, and links that go purple when visited',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .cl { width: 300px; max-width: 100%; background: #fff; padding: 12px 14px; border-radius: 12px; font: 13px/1.5 "Times New Roman", Times, serif; color: #000; display: grid; gap: 8px; }
    .post { display: block; width: 150px; padding: 2px 6px; background: #eee; border: 1px solid #ccc; color: #00e; text-decoration: none; text-align: center; font: 13px/1.5 "Times New Roman", Times, serif; cursor: pointer; }
    .post:hover { background: #e4e4e4; text-decoration: underline; }
    .post.v { color: #551a8b; }
    .post:focus-visible, .lnk:focus-visible, .q:focus-visible, .go:focus-visible { outline: 1px dotted #000; outline-offset: 1px; }
    form { display: flex; gap: 4px; align-items: center; }
    .q { width: 150px; height: 20px; border: 1px solid #999; padding: 0 3px; font: 12px Arial, sans-serif; background: #fff; border-radius: 0; }
    .go { height: 20px; padding: 0 6px; border: 1px solid #999; background: #e9e9e9; font: 12px Arial, sans-serif; cursor: pointer; border-radius: 0; color: #000; }
    .go:hover { background: #ddd; }
    .go:active { background: #ccc; }
    .links { display: flex; gap: 14px; flex-wrap: wrap; }
    .lnk { color: #00e; text-decoration: underline; cursor: pointer; }
    .lnk.v { color: #551a8b; }
    .res { font: 11px Arial, sans-serif; color: #555; min-height: 14px; }
    .reply { display: inline-flex; align-items: center; gap: 5px; justify-self: start; padding: 3px 10px; border: 1px solid #5c7fbf; border-radius: 3px; background: linear-gradient(#7fa0d8, #5c7fbf); color: #fff; font: 700 12px Arial, sans-serif; cursor: pointer; text-shadow: 0 1px 0 #3d5a8f; }
    .reply svg { width: 12px; height: 12px; }
    .reply:hover { background: linear-gradient(#8fb0e8, #6c8fcf); }
    .reply.on { background: #ddd; border-color: #999; color: #333; text-shadow: none; }
    .reply:focus-visible { outline: 1px dotted #000; outline-offset: 1px; }
  `,
  html: `
    <div class="cl">
      <a class="post" href="#" role="button">post to classifieds</a>
      <form><input class="q" type="text" placeholder="search craigslist" aria-label="search craigslist"><button class="go" type="button">search</button></form>
      <div class="links"><a class="lnk" href="#">free stuff</a><a class="lnk" href="#">missed connections</a><a class="lnk" href="#">rants &amp; raves</a></div>
      <button class="reply" type="button" aria-pressed="false"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M1 2h10v6H5L2 11V8H1z" fill="#fff"/></svg>reply</button>
      <div class="res" aria-live="polite"></div>
    </div>`,
  init(root) {
    const post = root.querySelector('.post'), q = root.querySelector('.q'), go = root.querySelector('.go'), res = root.querySelector('.res'), form = root.querySelector('form');
    let posts = 0;
    form.addEventListener('submit', (e) => e.preventDefault());
    post.addEventListener('click', (e) => { e.preventDefault(); posts++; post.classList.add('v'); post.textContent = posts === 1 ? 'posted (1)' : `posted (${posts})`; });
    const search = () => { const v = q.value.trim(); res.textContent = v ? `${Math.floor(Math.random() * 900 + 100)} results for "${v}"` : 'nothing found'; };
    go.addEventListener('click', search);
    q.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); search(); } });
    root.querySelectorAll('.lnk').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); a.classList.toggle('v'); }));
    const reply = root.querySelector('.reply');
    reply.addEventListener('click', () => { const on = reply.classList.toggle('on'); reply.setAttribute('aria-pressed', String(on)); reply.lastChild.textContent = on ? 'show contact info' : 'reply'; });
  },
};
