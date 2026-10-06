export default {
  id: 'ob-wikipedia-edit',
  credit: 'Wikipedia (Vector) — a section heading with its bracketed [ edit ] link that turns the heading editable, plus the blue "Donate" pill and a [citation needed]',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wp { width: 320px; max-width: 100%; background: #fff; padding: 12px 16px 14px; border-radius: 12px; font: 14px/1.6 sans-serif; color: #202122; display: grid; gap: 8px; }
    h2 { margin: 0; padding-bottom: 3px; border-bottom: 1px solid #a2a9b1; font: 400 19px/1.3 "Linux Libertine", Georgia, Times, serif; display: flex; align-items: baseline; gap: 6px; }
    h2 .ht { flex: 1; outline: none; min-width: 0; }
    h2 .ht.editing { background: #fff; border: 1px solid #a2a9b1; box-shadow: inset 0 0 0 1px #36c; font: 400 14px/1.4 monospace; padding: 2px 4px; }
    .ed { font: 12px/1 sans-serif; color: #0645ad; text-decoration: none; cursor: pointer; white-space: nowrap; }
    .ed:hover { text-decoration: underline; }
    .ed::before { content: "["; color: #54595d; } .ed::after { content: "]"; color: #54595d; }
    .ed:focus-visible, .cn:focus-visible, .don:focus-visible, .pub:focus-visible { outline: 2px solid #36c; outline-offset: 1px; }
    p { margin: 0; font-size: 13px; }
    .cn { color: #0645ad; font-size: 10px; text-decoration: none; vertical-align: super; cursor: pointer; }
    .cn::before { content: "["; } .cn::after { content: "]"; }
    .cn:hover { text-decoration: underline; }
    .cn.ok { color: #202122; }
    .row { display: flex; gap: 8px; align-items: center; }
    .don { display: inline-flex; align-items: center; gap: 6px; background: #36c; color: #fff; border: 1px solid #36c; border-radius: 2px; padding: 5px 12px; font: 700 14px sans-serif; cursor: pointer; }
    .don:hover { background: #447ff5; border-color: #447ff5; }
    .don:active { background: #2a4b8d; border-color: #2a4b8d; }
    .don.did { background: #fff; color: #202122; border-color: #a2a9b1; }
    .don svg { width: 14px; height: 14px; fill: currentColor; }
    .pub { display: none; background: #36c; color: #fff; border: 1px solid #36c; border-radius: 2px; padding: 5px 12px; font: 700 14px sans-serif; cursor: pointer; }
    .pub.show { display: inline-block; }
    .pub:hover { background: #447ff5; }
  `,
  html: `
    <div class="wp">
      <h2><span class="ht">Button (computing)</span><a class="ed" href="#" role="button">edit</a></h2>
      <p>A button is a graphical control element that provides the user a simple way to trigger an event.<a class="cn" href="#" role="button">citation needed</a></p>
      <div class="row">
        <button class="don" type="button" aria-pressed="false"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 18l-1.4-1.3C3.5 12.1 1 9.8 1 6.9 1 4.5 2.9 2.7 5.3 2.7c1.4 0 2.7.6 3.5 1.6L10 5.6l1.2-1.3c.8-1 2.1-1.6 3.5-1.6C17.1 2.7 19 4.5 19 6.9c0 2.9-2.5 5.2-7.6 9.8z"/></svg><span class="dt">Donate</span></button>
        <button class="pub" type="button">Publish changes</button>
      </div>
    </div>`,
  init(root) {
    const ht = root.querySelector('.ht'), ed = root.querySelector('.ed'), cn = root.querySelector('.cn'), don = root.querySelector('.don'), dt = root.querySelector('.dt'), pub = root.querySelector('.pub');
    let editing = false, orig = ht.textContent;
    const setEdit = (on) => {
      editing = on; ht.contentEditable = on ? 'plaintext-only' : 'false'; ht.classList.toggle('editing', on);
      pub.classList.toggle('show', on); ed.textContent = on ? 'cancel' : 'edit';
      if (on) { orig = ht.textContent; ht.focus(); }
    };
    ed.addEventListener('click', (e) => { e.preventDefault(); if (editing) ht.textContent = orig; setEdit(!editing); });
    pub.addEventListener('click', () => { if (!ht.textContent.trim()) ht.textContent = orig; setEdit(false); });
    ht.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); pub.click(); } if (e.key === 'Escape') ed.click(); });
    cn.addEventListener('click', (e) => { e.preventDefault(); const ok = cn.classList.toggle('ok'); cn.textContent = ok ? '1' : 'citation needed'; });
    don.addEventListener('click', () => { const did = don.classList.toggle('did'); don.setAttribute('aria-pressed', String(did)); dt.textContent = did ? 'Thank you' : 'Donate'; });
  },
};
