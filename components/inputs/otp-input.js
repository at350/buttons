// shadcn/ui InputOTP (built on input-otp): one real input laid transparently over six 36px slots in two groups of
// three joined by shared borders (border-y + border-r, rounded-l-md / rounded-r-md ends, shadow-sm), a Lucide minus
// separator, the active slot raised with a 1px ring-ring outline, and the fake caret (1px × 16px) blinking with
// caret-blink 1.25s. zinc tokens: border-input #e4e4e7, ring #18181b, foreground #09090b; Inter 14px.
export default {
  id: 'in-otp-input',
  credit: 'shadcn/ui Input OTP — six joined 36px slots in two groups, ring on the active slot, blinking fake caret',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .otp { position: relative; display: inline-flex; align-items: center; gap: 8px; padding: 4px; font: 400 14px/20px Inter, "Geist", system-ui, sans-serif; color: #09090b; }
    .grp { display: flex; align-items: center; }
    .slot {
      position: relative; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; background: #fff;
      border-top: 1px solid #e4e4e7; border-bottom: 1px solid #e4e4e7; border-right: 1px solid #e4e4e7; box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
      transition: box-shadow .15s cubic-bezier(.4,0,.2,1);
    }
    .slot:first-child { border-left: 1px solid #e4e4e7; border-radius: 6px 0 0 6px; }
    .slot:last-child { border-radius: 0 6px 6px 0; }
    .slot.act { z-index: 1; box-shadow: 0 0 0 1px #18181b; }
    .caret { display: none; width: 1px; height: 16px; background: #09090b; animation: blink 1.25s ease-out infinite; }
    .slot.act.empty .caret { display: block; }
    @keyframes blink { 0%, 70%, 100% { opacity: 1; } 20%, 50% { opacity: 0; } }
    .sep svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; display: block; }
    .otp:hover .slot:not(.act) { border-color: #d4d4d8; }
    input {
      position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; border: 0; padding: 0; font: inherit; letter-spacing: 2em; cursor: text;
      caret-color: transparent; background: transparent; color: transparent; outline: 0;
    }
  `,
  html: `<div class="otp">
    <div class="grp"><div class="slot"><span class="ch"></span><span class="caret"></span></div><div class="slot"><span class="ch"></span><span class="caret"></span></div><div class="slot"><span class="ch"></span><span class="caret"></span></div></div>
    <div class="sep" role="separator"><svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg></div>
    <div class="grp"><div class="slot"><span class="ch"></span><span class="caret"></span></div><div class="slot"><span class="ch"></span><span class="caret"></span></div><div class="slot"><span class="ch"></span><span class="caret"></span></div></div>
    <input inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]*" aria-label="One-time password" spellcheck="false">
  </div>`,
  init(root) {
    const inp = root.querySelector('input'), slots = [...root.querySelectorAll('.slot')];
    const paint = () => {
      const v = inp.value, focused = root.activeElement === inp;
      const at = Math.min(v.length, 5);
      slots.forEach((s, i) => {
        s.querySelector('.ch').textContent = v[i] || '';
        s.classList.toggle('empty', !v[i]);
        s.classList.toggle('act', focused && (i === at && (v.length < 6 || i === 5)));
      });
    };
    inp.addEventListener('input', () => { inp.value = inp.value.replace(/\D/g, '').slice(0, 6); inp.setSelectionRange(inp.value.length, inp.value.length); paint(); });
    inp.addEventListener('focus', paint); inp.addEventListener('blur', paint);
    inp.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Home' || e.key === 'End') e.preventDefault(); });
    paint();
  },
};
