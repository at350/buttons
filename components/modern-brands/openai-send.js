export default {
  id: 'mb-openai-send',
  credit: 'ChatGPT composer (2025) — "Ask anything" pill with +, dictate mic and the black voice-mode orb that swaps to the up-arrow send as you type, then to the stop square while the answer streams',
  size: 'wide',
  css: `
    :host { display: block; }
    .stage { padding: 22px; border-radius: 12px; background: #fff; border: 1px solid #ececec; font: 400 16px/1.4 ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Inter, sans-serif; color: #0d0d0d; }
    .bar { display: flex; align-items: center; gap: 4px; min-height: 56px; padding: 10px; border-radius: 28px; background: #fff; max-width: 100%;
      box-shadow: 0 4px 4px rgba(0,0,0,.04), 0 0 1px rgba(0,0,0,.62); transition: box-shadow .2s; }
    .ic { width: 36px; height: 36px; border-radius: 50%; border: 0; background: transparent; color: #0d0d0d; cursor: pointer; display: grid; place-items: center; flex: none;
      transition: background .15s; -webkit-tap-highlight-color: transparent; }
    .ic:hover { background: #f3f3f3; }
    .ic[aria-pressed="true"] { background: #e8f0fe; color: #0169cc; }
    .ic:focus-visible, .go:focus-visible { outline: 2px solid #0d0d0d; outline-offset: 2px; }
    .ic svg, .go svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    input { flex: 1; min-width: 0; height: 36px; padding: 0 6px; border: 0; outline: none; background: transparent; font: inherit; color: inherit; }
    input::placeholder { color: #8f8f8f; }
    .go { width: 36px; height: 36px; border-radius: 50%; border: 0; background: #0d0d0d; color: #fff; cursor: pointer; display: grid; place-items: center; flex: none;
      transition: background .15s, transform .15s, opacity .15s; -webkit-tap-highlight-color: transparent; }
    .go > * { grid-area: 1 / 1; transition: transform .2s cubic-bezier(.2,.8,.2,1), opacity .15s; }
    .go:hover { opacity: .8; }
    .go:active { transform: scale(.92); }
    .go .sq { width: 12px; height: 12px; border-radius: 2px; background: currentColor; }
    .go .up, .go .sq { opacity: 0; transform: scale(.4); }
    .go[data-s="send"] .vo, .go[data-s="stop"] .vo { opacity: 0; transform: scale(.4); }
    .go[data-s="send"] .up { opacity: 1; transform: none; }
    .go[data-s="stop"] .sq { opacity: 1; transform: none; }
  `,
  html: `
    <div class="stage">
      <div class="bar">
        <button class="ic" type="button" aria-label="Add photos and files"><svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
        <input type="text" placeholder="Ask anything" aria-label="Message ChatGPT">
        <button class="ic mic" type="button" aria-pressed="false" aria-label="Dictate"><svg viewBox="0 0 24 24"><path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/></svg></button>
        <button class="go" type="button" data-s="voice" aria-label="Start voice mode"><svg class="vo" viewBox="0 0 24 24"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/></svg><svg class="up" viewBox="0 0 24 24"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg><i class="sq"></i></button>
      </div>
    </div>`,
  init(root) {
    const input = root.querySelector('input'), go = root.querySelector('.go'), mic = root.querySelector('.mic');
    let t;
    const LABEL = { voice: 'Start voice mode', send: 'Send prompt', stop: 'Stop streaming' };
    const state = (s) => { go.dataset.s = s; go.setAttribute('aria-label', LABEL[s]); };
    const idle = () => state(input.value.trim() ? 'send' : 'voice');
    input.addEventListener('input', () => { if (go.dataset.s !== 'stop') idle(); });
    const act = () => {
      if (go.dataset.s === 'stop') { clearTimeout(t); idle(); return; }
      if (go.dataset.s === 'voice') { go.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }], { duration: 300, easing: 'cubic-bezier(.2,.8,.2,1)' }); input.focus(); return; }
      input.value = ''; state('stop'); t = setTimeout(idle, 2600);
    };
    go.addEventListener('click', act);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && go.dataset.s === 'send') { e.preventDefault(); act(); } });
    mic.addEventListener('click', () => mic.setAttribute('aria-pressed', String(mic.getAttribute('aria-pressed') !== 'true')));
    return () => clearTimeout(t);
  },
};
