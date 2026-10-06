export default {
  id: 'mb-notion-ai',
  credit: 'Notion — the text-selection toolbar: purple "Ask AI" (label shimmers while it thinks), "Text" block menu and the B / i / U / S marks that toggle on the selected words',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 18px 20px 22px; border-radius: 12px; background: #fff; border: 1px solid #e9e9e7;
      font: 400 14px/1.2 ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, Inter, sans-serif; color: #37352f; -webkit-font-smoothing: antialiased; }
    .tb { display: inline-flex; align-items: center; height: 36px; padding: 0 4px; border-radius: 8px; background: #fff;
      box-shadow: rgba(15,15,15,.05) 0 0 0 1px, rgba(15,15,15,.1) 0 3px 6px, rgba(15,15,15,.2) 0 9px 24px; }
    .it { height: 28px; padding: 0 7px; border: 0; border-radius: 4px; background: transparent; color: #37352f; cursor: pointer; font: inherit; font-size: 14px; display: inline-flex; align-items: center; gap: 5px;
      transition: background 20ms ease-in; -webkit-tap-highlight-color: transparent; }
    .it:hover { background: rgba(55,53,47,.08); }
    .it:active { background: rgba(55,53,47,.16); }
    .it:focus-visible { outline: none; box-shadow: inset 0 0 0 2px rgba(35,131,226,.57); }
    .it svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .sep { width: 1px; height: 20px; margin: 0 3px; background: rgba(55,53,47,.16); }
    .ai { color: #9065b0; font-weight: 500; }
    .ai svg { fill: rgba(144,101,176,.18); }
    .ai .lbl { display: grid; } .ai .lbl span { grid-area: 1 / 1; white-space: nowrap; } .ai .lbl .b { visibility: hidden; }
    .ai.busy .lbl .a { visibility: hidden; } .ai.busy .lbl .b { visibility: visible; background: linear-gradient(90deg, #c4a6dc, #9065b0 50%, #c4a6dc); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: shim 1.1s linear infinite; }
    .ai.busy svg { animation: tw 1.1s ease-in-out infinite; }
    @keyframes shim { from { background-position: 150% 0; } to { background-position: -50% 0; } }
    @keyframes tw { 50% { transform: scale(.82) rotate(12deg); } }
    .blk svg { width: 12px; height: 12px; opacity: .55; }
    .mk { width: 28px; padding: 0; justify-content: center; }
    .mk[aria-pressed="true"] { color: #2383e2; }
    .txt { margin-top: 14px; padding-left: 4px; font-size: 16px; line-height: 1.5; }
    .sel { background: rgba(35,131,226,.28); transition: font-weight .1s; }
    .txt.b .sel { font-weight: 600; } .txt.i .sel { font-style: italic; } .txt.u .sel { text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(55,53,47,.4); } .txt.s .sel { text-decoration: line-through; }
    .txt.u.s .sel { text-decoration: underline line-through; }
  `,
  html: `
    <div class="stage">
      <div class="tb" role="toolbar" aria-label="Formatting">
        <button class="it ai" type="button" aria-live="polite"><svg viewBox="0 0 24 24"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/></svg><span class="lbl"><span class="a">Ask AI</span><span class="b">Thinking…</span></span></button>
        <span class="sep"></span>
        <button class="it blk" type="button">Text<svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></button>
        <span class="sep"></span>
        <button class="it mk" type="button" aria-pressed="false" data-m="b" aria-label="Bold"><svg viewBox="0 0 24 24"><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/></svg></button>
        <button class="it mk" type="button" aria-pressed="false" data-m="i" aria-label="Italicize"><svg viewBox="0 0 24 24"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg></button>
        <button class="it mk" type="button" aria-pressed="false" data-m="u" aria-label="Underline"><svg viewBox="0 0 24 24"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/></svg></button>
        <button class="it mk" type="button" aria-pressed="false" data-m="s" aria-label="Strike-through"><svg viewBox="0 0 24 24"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" x2="20" y1="12" y2="12"/></svg></button>
      </div>
      <div class="txt">Ship the <span class="sel">launch notes</span> today</div>
    </div>`,
  init(root) {
    const ai = root.querySelector('.ai'), txt = root.querySelector('.txt');
    let t;
    ai.addEventListener('click', () => { if (ai.classList.contains('busy')) return; ai.classList.add('busy'); t = setTimeout(() => ai.classList.remove('busy'), 1600); });
    root.querySelectorAll('.mk').forEach((m) => m.addEventListener('click', () => {
      const on = m.getAttribute('aria-pressed') !== 'true'; m.setAttribute('aria-pressed', String(on)); txt.classList.toggle(m.dataset.m, on);
    }));
    return () => clearTimeout(t);
  },
};
