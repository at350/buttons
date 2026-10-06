export default {
  id: 'ob-4chan-post',
  credit: '4chan (Yotsuba B) — the post form: lavender table cells, a bare OS "Post" button, and the 60-second cooldown timer after posting',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .pg { width: 300px; max-width: 100%; background: #eef2ff; padding: 10px; border-radius: 12px; font: 10pt arial, helvetica, sans-serif; color: #000; }
    .bn { color: #af0a0f; font: 700 10pt arial, sans-serif; text-align: center; margin-bottom: 6px; }
    table { border-collapse: collapse; margin: 0 auto; }
    td { padding: 0; border: 1px solid #b7c5d9; background: #d6daf0; vertical-align: middle; }
    td.lb { font: 700 10pt arial, sans-serif; padding: 0 4px; width: 62px; }
    td.fd { background: #fff; }
    input[type=text], textarea { width: 100%; border: 1px solid #aaa; padding: 2px 4px; font: 10pt arial, sans-serif; background: #fff; color: #000; border-radius: 0; margin: 2px; box-sizing: border-box; width: calc(100% - 4px); }
    textarea { height: 48px; resize: none; }
    input:focus-visible, textarea:focus-visible, .post:focus-visible { outline: 1px dotted #000; }
    .post { font: 10pt arial, sans-serif; padding: 1px 6px; cursor: pointer; margin: 2px; color: #000; background: #efefef; border: 1px solid #767676; border-radius: 3px; }
    .post:hover { background: #e5e5e5; }
    .post:active { background: #ccc; }
    .post:disabled { color: #888; cursor: default; }
    .rules { font-size: 8pt; color: #707070; text-align: center; margin-top: 6px; }
    .rules a { color: #34345c; text-decoration: none; cursor: pointer; }
    .rules a:hover { color: #d00; }
    .ok { color: #117743; font-weight: 700; }
  `,
  html: `
    <div class="pg">
      <div class="bn">/g/ - Technology</div>
      <table>
        <tr><td class="lb">Name</td><td class="fd"><input type="text" value="Anonymous" aria-label="Name"></td></tr>
        <tr><td class="lb">Options</td><td class="fd"><input type="text" placeholder="sage" aria-label="Options"></td></tr>
        <tr><td class="lb">Comment</td><td class="fd"><textarea aria-label="Comment">&gt;be me
&gt;click button</textarea></td></tr>
        <tr><td class="lb">&nbsp;</td><td class="fd"><button class="post" type="button">Post</button> <span class="msg" aria-live="polite"></span></td></tr>
      </table>
      <div class="rules"><a href="#" class="rl">Rules</a> - <a href="#" class="rl">FAQ</a></div>
    </div>`,
  init(root) {
    const post = root.querySelector('.post'), msg = root.querySelector('.msg'), ta = root.querySelector('textarea');
    let iv = 0, left = 0, n = 0;
    const stop = () => { clearInterval(iv); iv = 0; };
    post.addEventListener('click', () => {
      n++; left = 60; post.disabled = true; msg.textContent = `Post successful! (${left}s)`;
      stop();
      iv = setInterval(() => {
        left -= 1;
        if (left <= 0) { stop(); post.disabled = false; msg.innerHTML = `<span class="ok">No.${90000000 + n}</span>`; return; }
        msg.textContent = `Please wait ${left} seconds`;
      }, 1000);
    });
    root.querySelectorAll('.rl').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
    ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !post.disabled) post.click(); });
    return stop;
  },
};
