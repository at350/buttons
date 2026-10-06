export default {
  id: 'cr-shake-nope',
  credit: 'Shake "nope" button — macOS login-window wrong-password head shake',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      display: inline-flex; align-items: center; gap: 8px; cursor: pointer;
      font: 600 15px/1 system-ui, sans-serif; color: #fff; background: #ef4444; border: 0; border-radius: 10px;
      padding: 14px 24px; box-shadow: 0 2px 6px rgba(239, 68, 68, .4); transition: background .2s, box-shadow .2s;
    }
    .btn:hover { background: #dc2626; box-shadow: 0 4px 14px rgba(239, 68, 68, .45); }
    .btn:active { transform: scale(.97); }
    .btn.shake { animation: shake .55s cubic-bezier(.36, .07, .19, .97) both; background: #991b1b; }
    .btn svg { width: 16px; height: 16px; }
    .btn.shake svg { animation: wig .55s ease both; }
    .btn:focus-visible { outline: 2px solid #991b1b; outline-offset: 3px; }
    @keyframes shake {
      10%, 90% { transform: translateX(-2px); }
      20%, 80% { transform: translateX(4px); }
      30%, 50%, 70% { transform: translateX(-8px); }
      40%, 60% { transform: translateX(8px); }
    }
    @keyframes wig { 0%, 100% { transform: rotate(0); } 50% { transform: rotate(90deg); } }
  `,
  html: `<button class="btn" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>Delete</button>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => { b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake'); });
    b.addEventListener('animationend', () => b.classList.remove('shake'));
  },
};
