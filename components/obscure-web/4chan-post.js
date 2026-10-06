// From s.4cdn.org/css/yotsubluenew.css (Yotsuba B): #eef2ff page with the fade-blue top, Tahoma 28px/-2px
// #af0a0f board title, postblock label cells #98e with a 1px #000 border, 1px #aaa inputs (#98e when focused),
// Subject + Post on one row, the rules list with #34345c links (#d00 on hover). After posting, the Post button
// counts down the flood timer like the Quick Reply does.
export default {
  id: 'ob-4chan-post',
  credit: '4chan (Yotsuba B) — the post form: #98e postblock labels, plain Post button and the flood-timer countdown after you post',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .pg { width: 336px; max-width: 100%; padding: 6px 10px 10px; border-radius: 12px; background: linear-gradient(#d1d5ee, #eef2ff 90px); font: 10pt arial, helvetica, sans-serif; color: #000; }
    .bt { text-align: center; color: #af0a0f; font: 700 28px/1.15 Tahoma, sans-serif; letter-spacing: -2px; white-space: nowrap; }
    hr { border: 0; border-top: 1px solid #b7c5d9; margin: 6px 0 8px; }
    table { border-collapse: separate; border-spacing: 1px; margin: 0 auto; }
    td { padding: 0; vertical-align: middle; }
    td.pb { background: #98e; border: 1px solid #000; font-weight: 700; padding: 0 5px; font-size: 10pt; white-space: nowrap; }
    input[type=text], textarea { margin: 0 2px 0 0; padding: 2px 4px 3px; border: 1px solid #aaa; font: 10pt arial, helvetica, sans-serif; color: #000; background: #fff; border-radius: 0; outline: none; }
    input[type=text]:focus, textarea:focus { border-color: #98e; }
    input.w { width: 216px; } input.s { width: 160px; }
    textarea { width: 216px; height: 64px; resize: none; display: block; }
    textarea::placeholder, input::placeholder { color: gray; }
    .post { display: inline-grid; vertical-align: middle; min-width: 52px; height: 22px; padding: 0 6px; font: 10pt arial, helvetica, sans-serif; color: #000; background: #efefef; border: 1px solid #767676; border-radius: 3px; cursor: pointer; }
    .post span { grid-area: 1 / 1; align-self: center; }
    .post:hover { background: #e5e5e5; border-color: #4f4f4f; }
    .post:active { background: #f5f5f5; }
    .post:disabled { color: #6d6d6d; border-color: #c3c3c3; background: #f3f3f3; cursor: default; }
    .post:focus-visible, a:focus-visible { outline: 2px solid #98e; outline-offset: 1px; }
    .post .w8 { visibility: hidden; font-variant-numeric: tabular-nums; }
    .post.cd .p { visibility: hidden; } .post.cd .w8 { visibility: visible; }
    ul { margin: 6px 0 0; padding: 0 0 0 18px; font-size: 8pt; color: #000; }
    a { color: #34345c; text-decoration: none; cursor: pointer; }
    a:hover { color: #dd0000; }
  `,
  html: `
    <div class="pg">
      <div class="bt">/g/ - Technology</div>
      <hr>
      <table>
        <tr><td class="pb">Name</td><td><input class="w" type="text" placeholder="Anonymous" aria-label="Name"></td></tr>
        <tr><td class="pb">Options</td><td><input class="w" type="text" aria-label="Options"></td></tr>
        <tr><td class="pb">Subject</td><td><input class="s" type="text" aria-label="Subject"><button class="post" type="button"><span class="p">Post</span><span class="w8">60</span></button></td></tr>
        <tr><td class="pb">Comment</td><td><textarea aria-label="Comment" placeholder="&gt;be me">&gt;be me
&gt;find a button
&gt;click it</textarea></td></tr>
      </table>
      <ul><li>Please read the <a href="#">Rules</a> and <a href="#">FAQ</a> before posting.</li></ul>
    </div>`,
  init(root) {
    const post = root.querySelector('.post'), w8 = root.querySelector('.w8'), ta = root.querySelector('textarea');
    let iv = 0, left = 0;
    const stop = () => { clearInterval(iv); iv = 0; };
    post.addEventListener('click', () => {
      left = 60; w8.textContent = String(left); post.classList.add('cd'); post.disabled = true; ta.value = '';
      stop();
      iv = setInterval(() => {
        left -= 1; w8.textContent = String(left);
        if (left <= 0) { stop(); post.classList.remove('cd'); post.disabled = false; }
      }, 1000);
    });
    root.querySelectorAll('a').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
    ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !post.disabled) post.click(); });
    return stop;
  },
};
