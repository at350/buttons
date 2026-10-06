export default {
  id: 'in-otp-input',
  credit: 'One-time code input — four boxes that auto-advance, backspace steps back, paste fills all; turns green when complete',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .otp { display: inline-flex; gap: 10px; }
    input {
      width: 46px; height: 54px; border: 2px solid #d4d4d8; border-radius: 12px; background: #fff; text-align: center; font: 600 24px ui-monospace, Menlo, monospace; color: #111;
      outline: 0; transition: border-color .15s, box-shadow .15s, transform .15s, background .2s; caret-color: #4f46e5; -moz-appearance: textfield;
    }
    input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; }
    input:hover { border-color: #a1a1aa; }
    input:focus { border-color: #4f46e5; box-shadow: 0 0 0 4px rgba(79,70,229,.15); transform: translateY(-2px); }
    input.has { border-color: #4f46e5; }
    .otp.done input { border-color: #16a34a; background: #f0fdf4; color: #15803d; animation: tick .3s ease-out; }
    .otp.done input:nth-child(2) { animation-delay: .05s; } .otp.done input:nth-child(3) { animation-delay: .1s; } .otp.done input:nth-child(4) { animation-delay: .15s; }
    @keyframes tick { 50% { transform: translateY(-4px); } }
  `,
  html: `<div class="otp" role="group" aria-label="One-time code">
    <input inputmode="numeric" maxlength="1" autocomplete="one-time-code" aria-label="Digit 1">
    <input inputmode="numeric" maxlength="1" aria-label="Digit 2">
    <input inputmode="numeric" maxlength="1" aria-label="Digit 3">
    <input inputmode="numeric" maxlength="1" aria-label="Digit 4">
  </div>`,
  init(root) {
    const wrap = root.querySelector('.otp'), ins = [...root.querySelectorAll('input')];
    const check = () => { ins.forEach((i) => i.classList.toggle('has', !!i.value)); wrap.classList.toggle('done', ins.every((i) => i.value)); };
    ins.forEach((inp, i) => {
      inp.addEventListener('input', () => {
        inp.value = inp.value.replace(/\D/g, '').slice(-1);
        if (inp.value && i < ins.length - 1) ins[i + 1].focus({ preventScroll: true });
        check();
      });
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !inp.value && i > 0) { ins[i - 1].value = ''; ins[i - 1].focus({ preventScroll: true }); check(); e.preventDefault(); }
        if (e.key === 'ArrowLeft' && i > 0) { e.preventDefault(); ins[i - 1].focus({ preventScroll: true }); }
        if (e.key === 'ArrowRight' && i < ins.length - 1) { e.preventDefault(); ins[i + 1].focus({ preventScroll: true }); }
      });
      inp.addEventListener('paste', (e) => {
        const t = (e.clipboardData.getData('text') || '').replace(/\D/g, '');
        if (!t) return;
        e.preventDefault();
        for (let k = 0; k < ins.length - i && k < t.length; k++) ins[i + k].value = t[k];
        ins[Math.min(i + t.length, ins.length - 1)].focus({ preventScroll: true }); check();
      });
      inp.addEventListener('focus', () => inp.select());
    });
  },
};
