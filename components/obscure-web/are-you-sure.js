export default {
  id: 'ob-are-you-sure',
  credit: 'The "Are you sure?" dialog that never stops asking — each Yes shakes the box and rephrases the question; No is the only way out',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 300px; max-width: 100%; height: 150px; display: grid; place-items: center; border-radius: 12px; background: #6b7280; }
    .dlg { width: 260px; background: #fff; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,.35); overflow: hidden; font: 13px/1.4 Inter, system-ui, sans-serif; color: #111; }
    .dlg.shake { animation: shake .35s; }
    @keyframes shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-8px) rotate(-1deg); } 40% { transform: translateX(8px) rotate(1deg); } 60% { transform: translateX(-6px); } 80% { transform: translateX(6px); } }
    .tb { display: flex; align-items: center; gap: 6px; padding: 6px 10px; background: #f3f4f6; border-bottom: 1px solid #e5e7eb; }
    .tb i { width: 10px; height: 10px; border-radius: 50%; display: block; } .tb i:nth-child(1) { background: #ff5f57; } .tb i:nth-child(2) { background: #febc2e; } .tb i:nth-child(3) { background: #28c840; }
    .bd { padding: 14px 14px 12px; display: flex; gap: 10px; align-items: flex-start; }
    .ic { width: 28px; height: 28px; flex: none; border-radius: 50%; background: #fde68a; color: #92400e; font: 900 18px/28px Inter, system-ui, sans-serif; text-align: center; }
    .dlg.danger .ic { background: #fecaca; color: #991b1b; }
    .q { font-weight: 600; min-height: 36px; }
    .ft { display: flex; justify-content: flex-end; gap: 8px; padding: 0 14px 12px; }
    .b { padding: 6px 14px; border-radius: 6px; border: 1px solid #d1d5db; background: #fff; color: #111; cursor: pointer; font: 600 13px Inter, system-ui, sans-serif; transition: background .15s, transform .1s; }
    .b:hover { background: #f3f4f6; }
    .b:active { transform: scale(.97); }
    .b:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }
    .yes { background: #dc2626; border-color: #dc2626; color: #fff; }
    .yes:hover { background: #b91c1c; }
    .dlg.done .yes { display: none; }
  `,
  html: `
    <div class="stage">
      <div class="dlg" role="alertdialog" aria-labelledby="q">
        <div class="tb" aria-hidden="true"><i></i><i></i><i></i></div>
        <div class="bd"><span class="ic" aria-hidden="true">!</span><div class="q" id="q">Delete everything?</div></div>
        <div class="ft"><button class="b no" type="button">No</button><button class="b yes" type="button">Yes</button></div>
      </div>
    </div>`,
  init(root) {
    const dlg = root.querySelector('.dlg'), q = root.querySelector('.q'), yes = root.querySelector('.yes'), no = root.querySelector('.no');
    const qs = ['Delete everything?', 'Are you sure?', 'Are you really sure?', 'Like, REALLY sure?', 'This cannot be undone. Sure?', 'Last chance. Sure?', 'Have you thought about this?', 'OK. Deleted. (Nothing happened.)'];
    let i = 0;
    const show = () => { q.textContent = qs[i]; dlg.classList.toggle('danger', i >= 3); dlg.classList.toggle('done', i === qs.length - 1); no.textContent = i === qs.length - 1 ? 'OK' : 'No'; yes.textContent = i === 0 ? 'Yes' : ['Yes', 'Yes!', 'YES', 'Just do it', 'DELETE', 'I\'m sure'][i % 6]; };
    yes.addEventListener('click', () => { i = Math.min(qs.length - 1, i + 1); dlg.classList.remove('shake'); void dlg.offsetWidth; dlg.classList.add('shake'); show(); });
    no.addEventListener('click', () => { i = 0; dlg.classList.remove('shake'); show(); });
    show();
  },
};
