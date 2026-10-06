export default {
  id: 'mn-discord-channels',
  credit: 'Discord server channel list — collapsible categories, unread pills, hover highlight',
  size: 'wide',
  css: `
    :host { display: block; }
    .sb { max-width: 240px; background: #2b2d31; color: #949ba4; border-radius: 12px; overflow: hidden; font: 500 15px/20px "gg sans", -apple-system, system-ui, sans-serif; }
    .hd { display: flex; align-items: center; justify-content: space-between; height: 48px; padding: 0 16px; border-bottom: 1px solid #1f2023; color: #f2f3f5; font-weight: 600; background: none; border-left: 0; border-right: 0; border-top: 0; width: 100%; cursor: pointer; font-size: 15px; }
    .hd:hover { background: #35373c; }
    .hd:focus-visible, .cat:focus-visible, .ch:focus-visible { outline: 2px solid #5865f2; outline-offset: -2px; }
    .body { padding: 10px 8px 12px; }
    .cat { display: flex; align-items: center; gap: 2px; width: 100%; padding: 16px 0 4px 2px; border: 0; background: none; color: #949ba4; font: inherit; font-size: 12px; font-weight: 700; letter-spacing: .02em; text-transform: uppercase; cursor: pointer; text-align: left; }
    .cat:hover { color: #dbdee1; }
    .cat svg { transition: transform .2s; }
    .cat[aria-expanded="false"] svg { transform: rotate(-90deg); }
    .grp.closed .ch:not(.un):not([aria-current]) { display: none; }
    .ch { position: relative; display: flex; align-items: center; gap: 6px; width: 100%; height: 32px; margin: 1px 0; padding: 0 8px; border: 0; border-radius: 4px; background: none; color: #80848e; font: inherit; cursor: pointer; text-align: left; }
    .ch:hover { background: #35373c; color: #dbdee1; }
    .ch[aria-current="true"] { background: #404249; color: #fff; }
    .ch svg { flex: none; }
    .ch.un { color: #f2f3f5; }
    .ch.un::before { content: ""; position: absolute; left: -8px; top: 12px; width: 4px; height: 8px; border-radius: 0 4px 4px 0; background: #f2f3f5; }
    .ch .n { margin-left: auto; min-width: 16px; height: 16px; padding: 0 5px; border-radius: 8px; background: #f23f43; color: #fff; font-size: 12px; font-weight: 700; display: none; place-items: center; }
    .ch.ment .n { display: grid; }
    .ch .act { margin-left: auto; display: none; gap: 4px; }
    .ch:hover .act { display: flex; }
    .ch:hover .n { display: none; }
    .act svg { color: #b5bac1; }
    .act svg:hover { color: #dbdee1; }
    .ch .tx { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  `,
  html: `
    <nav class="sb">
      <button class="hd" type="button" aria-expanded="false">Buttons HQ<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"/></svg></button>
      <div class="body">
        <button class="cat" type="button" aria-expanded="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 9l6 6 6-6"/></svg>Text Channels</button>
        <div class="grp"><div>
          <button class="ch" type="button" aria-current="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M5.9 21l.7-4H3l.3-2h3.6l.8-6H4.3l.3-2h3.6l.7-4h2l-.7 4h5l.7-4h2l-.7 4H21l-.3 2h-3.6l-.8 6h3.4l-.3 2h-3.4l-.7 4h-2l.7-4h-5l-.7 4zm3-6h5l.8-6h-5z"/></svg><span class="tx">general</span><span class="act"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 11a4 4 0 10-8 0M4 20a8 8 0 0116 0M19 8v4M21 10h-4"/></svg><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg></span></button>
          <button class="ch un ment" type="button"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M5.9 21l.7-4H3l.3-2h3.6l.8-6H4.3l.3-2h3.6l.7-4h2l-.7 4h5l.7-4h2l-.7 4H21l-.3 2h-3.6l-.8 6h3.4l-.3 2h-3.4l-.7 4h-2l.7-4h-5l-.7 4zm3-6h5l.8-6h-5z"/></svg><span class="tx">announcements</span><span class="n">3</span></button>
          <button class="ch un" type="button"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M5.9 21l.7-4H3l.3-2h3.6l.8-6H4.3l.3-2h3.6l.7-4h2l-.7 4h5l.7-4h2l-.7 4H21l-.3 2h-3.6l-.8 6h3.4l-.3 2h-3.4l-.7 4h-2l.7-4h-5l-.7 4zm3-6h5l.8-6h-5z"/></svg><span class="tx">design</span></button>
          <button class="ch" type="button"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M5.9 21l.7-4H3l.3-2h3.6l.8-6H4.3l.3-2h3.6l.7-4h2l-.7 4h5l.7-4h2l-.7 4H21l-.3 2h-3.6l-.8 6h3.4l-.3 2h-3.4l-.7 4h-2l.7-4h-5l-.7 4zm3-6h5l.8-6h-5z"/></svg><span class="tx">off-topic</span></button>
        </div></div>
        <button class="cat" type="button" aria-expanded="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 9l6 6 6-6"/></svg>Voice Channels</button>
        <div class="grp"><div>
          <button class="ch" type="button"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4zM15.5 8.5a5 5 0 010 7M19 5a10 10 0 010 14"/></svg><span class="tx">Lounge</span></button>
          <button class="ch" type="button"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4zM15.5 8.5a5 5 0 010 7M19 5a10 10 0 010 14"/></svg><span class="tx">Standup</span></button>
        </div></div>
      </div>
    </nav>`,
  init(root) {
    const chans = [...root.querySelectorAll('.ch')];
    chans.forEach((c) => c.addEventListener('click', () => { chans.forEach((x) => (x === c ? x.setAttribute('aria-current', 'true') : x.removeAttribute('aria-current'))); c.classList.remove('un', 'ment'); }));
    root.querySelectorAll('.cat').forEach((cat) => cat.addEventListener('click', () => { const v = cat.getAttribute('aria-expanded') !== 'true'; cat.setAttribute('aria-expanded', v); cat.nextElementSibling.classList.toggle('closed', !v); }));
    const hd = root.querySelector('.hd');
    hd.addEventListener('click', () => hd.setAttribute('aria-expanded', hd.getAttribute('aria-expanded') !== 'true'));
  },
};
