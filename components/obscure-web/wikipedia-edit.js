// Vector 2022 as rendered on en.wikipedia.org today: Linux Libertine/Georgia page title and h2 with a
// 1px #a2a9b1 rule, the Article/Talk + Read/Edit/View history tabs (selected tab #202122 with a 2px underline),
// "[ edit ]" section link with #54595d brackets, #36c links, superscript [citation needed], and the
// blue progressive "Publish changes" button the editor shows.
export default {
  id: 'ob-wikipedia-edit',
  credit: 'Wikipedia (Vector 2022) — Read / Edit tabs and the [ edit ] section link: edit the heading in place, then "Publish changes"',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wp { width: 360px; max-width: 100%; background: #fff; padding: 12px 16px 14px; border-radius: 12px; font: 14px/1.6 -apple-system, "Helvetica Neue", Arial, sans-serif; color: #202122; }
    h1 { margin: 0; font: 400 28px/1.3 "Linux Libertine", Georgia, Times, serif; }
    .tabs { display: flex; gap: 14px; margin-top: 4px; border-bottom: 1px solid #a2a9b1; font-size: 13px; line-height: 1; white-space: nowrap; }
    .tabs .sp { flex: 1; }
    .tab { padding: 6px 0 7px; border: 0; background: none; color: #36c; font: inherit; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; }
    .tab:hover { color: #3056a9; text-decoration: underline; }
    .tab[aria-selected="true"] { color: #202122; border-bottom-color: #202122; text-decoration: none; cursor: default; }
    h2 { margin: 12px 0 6px; padding-bottom: 2px; border-bottom: 1px solid #a2a9b1; display: flex; align-items: baseline; gap: 8px; font: 400 22px/1.3 "Linux Libertine", Georgia, Times, serif; }
    .ht { outline: none; min-width: 40px; white-space: nowrap; overflow: hidden; }
    .wp.editing .ht { box-shadow: 0 0 0 1px #36c; border-radius: 2px; background: #eaf3ff; padding: 0 2px; }
    .es { font: 14px/1 -apple-system, "Helvetica Neue", Arial, sans-serif; color: #54595d; white-space: nowrap; }
    .es a { color: #36c; text-decoration: none; cursor: pointer; margin: 0 3px; }
    .es a:hover { text-decoration: underline; }
    p { margin: 0; }
    p a { color: #36c; text-decoration: none; }
    sup { font-size: 11px; line-height: 1; white-space: nowrap; }
    .cn { color: #36c; font-style: italic; text-decoration: none; cursor: pointer; }
    .cn:hover { text-decoration: underline; }
    .cn.ok { font-style: normal; }
    .ft { display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px; height: 32px; }
    .ft button { visibility: hidden; height: 32px; padding: 0 12px; border-radius: 2px; font: 700 14px -apple-system, "Helvetica Neue", Arial, sans-serif; cursor: pointer; transition: background .1s; }
    .wp.editing .ft button { visibility: visible; }
    .cancel { background: #f8f9fa; color: #202122; border: 1px solid #a2a9b1; }
    .cancel:hover { background: #fff; }
    .pub { background: #36c; color: #fff; border: 1px solid #36c; }
    .pub:hover { background: #447ff5; border-color: #447ff5; }
    .pub:active { background: #2a4b8d; border-color: #2a4b8d; }
    .tab:focus-visible, a:focus-visible, .ft button:focus-visible { outline: 0; box-shadow: 0 0 0 2px #36c; border-radius: 2px; }
  `,
  html: `
    <div class="wp">
      <h1>Button (computing)</h1>
      <div class="tabs" role="tablist"><button class="tab" type="button" role="tab" aria-selected="true">Article</button><button class="tab" type="button" role="tab" aria-selected="false">Talk</button><span class="sp"></span><button class="tab rd" type="button" role="tab" aria-selected="true">Read</button><button class="tab edt" type="button" role="tab" aria-selected="false">Edit</button><button class="tab" type="button" role="tab" aria-selected="false">View history</button></div>
      <h2><span class="ht">Overview</span><span class="es">[<a href="#" class="ed" role="button">edit</a>]</span></h2>
      <p>A typical button is a rectangle or rounded rectangle, wider than it is tall.<sup>[<a href="#" class="cn" role="button">citation needed</a>]</sup></p>
      <div class="ft"><button class="cancel" type="button">Cancel</button><button class="pub" type="button">Publish changes</button></div>
    </div>`,
  init(root) {
    const wp = root.querySelector('.wp'), ht = root.querySelector('.ht'), ed = root.querySelector('.ed'), cn = root.querySelector('.cn');
    const rd = root.querySelector('.rd'), edt = root.querySelector('.edt'), pub = root.querySelector('.pub'), cancel = root.querySelector('.cancel');
    const tabs = [...root.querySelectorAll('.tab')];
    let orig = ht.textContent;
    const setEdit = (on) => {
      wp.classList.toggle('editing', on); ht.contentEditable = on ? 'plaintext-only' : 'false';
      rd.setAttribute('aria-selected', String(!on)); edt.setAttribute('aria-selected', String(on));
      if (on) { orig = ht.textContent; ht.focus(); }
    };
    ed.addEventListener('click', (e) => { e.preventDefault(); setEdit(true); });
    edt.addEventListener('click', () => setEdit(true));
    rd.addEventListener('click', () => { ht.textContent = orig; setEdit(false); });
    cancel.addEventListener('click', () => { ht.textContent = orig; setEdit(false); });
    pub.addEventListener('click', () => { if (!ht.textContent.trim()) ht.textContent = orig; setEdit(false); });
    tabs.slice(0, 2).forEach((t, i) => t.addEventListener('click', () => { tabs[0].setAttribute('aria-selected', String(i === 0)); tabs[1].setAttribute('aria-selected', String(i === 1)); }));
    ht.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); pub.click(); } if (e.key === 'Escape') cancel.click(); });
    cn.addEventListener('click', (e) => { e.preventDefault(); const ok = cn.classList.toggle('ok'); cn.textContent = ok ? '1' : 'citation needed'; });
  },
};
