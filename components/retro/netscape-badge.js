export default {
  id: 'rt-netscape-badge',
  credit: '88×31 web buttons — "Best viewed with Netscape" and "800×600" badges',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #c0c0c0; padding: 12px; border-radius: 12px; display: inline-flex; gap: 8px; flex-wrap: wrap; }
    .b { width: 88px; height: 31px; padding: 0; border: 1px solid; cursor: pointer; position: relative; overflow: hidden; display: block;
      font-family: Verdana, Geneva, Arial, sans-serif; text-align: left; }
    .b:focus-visible { outline: 2px dotted #000; outline-offset: 1px; }
    .b:active { filter: brightness(.8); }
    .b.on { box-shadow: 0 0 0 2px #ffff00; }
    .ns { background: #000; border-color: #fff #808080 #808080 #fff; color: #fff; }
    .ns .top { position: absolute; left: 3px; top: 3px; font-size: 7px; letter-spacing: .3px; line-height: 7px; color: #ccc; }
    .ns .big { position: absolute; left: 3px; top: 12px; font: bold 13px Arial, Helvetica, sans-serif; color: #fff; letter-spacing: -.5px; }
    .ns .n { position: absolute; right: 3px; top: 4px; width: 22px; height: 22px; }
    .ns.on .n { animation: spin 1.2s linear infinite; }
    .res { background: #008080; border-color: #fff #004040 #004040 #fff; color: #fff; }
    .res .t { position: absolute; left: 0; right: 0; top: 2px; text-align: center; font-size: 7px; line-height: 8px; color: #fff; }
    .res .r { position: absolute; left: 0; right: 0; top: 13px; text-align: center; font: bold 12px Arial, sans-serif; color: #ffff00; text-shadow: 1px 1px #000; }
    .res.on { background: #800080; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `,
  html: `
    <div class="stage">
      <button class="b ns" type="button" aria-pressed="false">
        <span class="top">BEST VIEWED WITH</span><span class="big">Netscape</span>
        <svg class="n" viewBox="0 0 22 22" aria-hidden="true"><circle cx="11" cy="11" r="10" fill="#0a3d91"/><path d="M4 16c3-6 7-8 14-10" stroke="#9ec6ff" stroke-width="1.5" fill="none"/><circle cx="12" cy="9" r="3.4" fill="#fff"/><path d="M12 5.6l4 4.4h-8z" fill="#2f6fdf"/></svg>
      </button>
      <button class="b res" type="button" aria-pressed="false"><span class="t">THIS SITE IS BEST<br>VIEWED AT</span><span class="r">800 x 600</span></button>
    </div>`,
  init(root) {
    root.querySelectorAll('.b').forEach((b) => b.addEventListener('click', () => {
      const on = b.classList.toggle('on'); b.setAttribute('aria-pressed', String(on));
      if (b.classList.contains('res')) b.querySelector('.r').textContent = on ? '1024 x 768' : '800 x 600';
    }));
  },
};
