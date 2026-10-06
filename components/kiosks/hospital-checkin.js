export default {
  id: 'ks-hospital-checkin',
  credit: 'Hospital lobby check-in kiosk (Epic Welcome style) — appointment or walk-in, confirm your visit, then "You\'re checked in" with a step tracker',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 12px; border-radius: 12px; background: linear-gradient(#f2f4f5, #cfd6da); box-shadow: inset 0 1px 0 #fff; }
    .scr { width: 280px; height: 236px; border-radius: 8px; overflow: hidden; background: #fff; box-shadow: 0 0 0 7px #24292e; font-family: 'DM Sans', Inter, system-ui, sans-serif; color: #1d2a36; display: flex; flex-direction: column; }
    .hd { display: flex; align-items: center; gap: 8px; padding: 9px 12px; background: #0067a5; color: #fff; font-weight: 700; font-size: 13px; }
    .hd svg { width: 18px; height: 18px; }
    .steps { display: flex; gap: 6px; padding: 8px 12px 0; }
    .steps i { flex: 1; height: 4px; border-radius: 2px; background: #dbe3ea; transition: background .3s; }
    .steps i.on { background: #0067a5; }
    .views { flex: 1; display: grid; padding: 10px 12px 12px; }
    .v { grid-area: 1 / 1; display: flex; flex-direction: column; gap: 8px; opacity: 0; visibility: hidden; transform: translateX(16px); transition: opacity .25s, transform .3s cubic-bezier(.2,.8,.2,1), visibility .25s; }
    .v.on { opacity: 1; visibility: visible; transform: none; }
    h4 { margin: 0; font-size: 15px; font-weight: 700; }
    .tile { flex: 1; display: flex; align-items: center; gap: 12px; padding: 0 14px; border: 1.5px solid #c9d5df; border-radius: 10px; background: #f7fafc; cursor: pointer; font: 600 13.5px/1.2 'DM Sans', Inter, sans-serif; color: #1d2a36; text-align: left; transition: border-color .12s, background .12s, transform .06s; }
    .tile svg { width: 26px; height: 26px; color: #0067a5; flex: none; }
    .tile:hover { border-color: #0067a5; background: #eef6fc; }
    .tile:active { transform: scale(.98); }
    .tile:focus-visible, .btn:focus-visible { outline: 2px solid #0067a5; outline-offset: 2px; }
    .card { display: flex; gap: 10px; align-items: center; padding: 10px 12px; border-radius: 10px; background: #eef6fc; font-size: 12.5px; line-height: 1.5; }
    .card img { flex: none; display: block; width: 46px; height: 46px; border-radius: 50%; object-fit: cover; background: #dbe3ea; box-shadow: 0 0 0 2px #fff; }
    .card div { min-width: 0; }
    .card b { font-size: 14px; }
    .row { display: flex; gap: 8px; margin-top: auto; }
    .btn { flex: 1; height: 40px; border: 0; border-radius: 20px; cursor: pointer; font: 700 13px/1 'DM Sans', Inter, sans-serif; transition: filter .1s, transform .06s; }
    .btn:hover { filter: brightness(1.08); } .btn:active { transform: scale(.98); }
    .pri { background: #0067a5; color: #fff; } .sec { background: #e6edf2; color: #1d2a36; flex: .6; }
    .ok { align-items: center; justify-content: center; text-align: center; }
    .ok .ck { width: 52px; height: 52px; border-radius: 50%; background: #e3f5ea; color: #13854a; display: grid; place-items: center; }
    .ok .ck svg { width: 28px; height: 28px; }
    .ok p { margin: 0; font-size: 12.5px; color: #4a5a68; }
    .ok .btn { flex: none; width: 120px; }
  `,
  html: `
    <div class="stage"><div class="scr">
      <div class="hd"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 7v4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M14 9h-4"/><path d="M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"/><path d="M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16"/></svg>Welcome</div>
      <div class="steps"><i class="on"></i><i></i><i></i></div>
      <div class="views">
        <div class="v on" data-s="0"><h4>How can we help today?</h4>
          <button class="tile" type="button" data-k="appt"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>I have an appointment</button>
          <button class="tile" type="button" data-k="walk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>Walk-in visit</button>
        </div>
        <div class="v" data-s="1"><h4>Is this your visit?</h4>
          <div class="card"><img class="doc" src="assets/portraits/women-02.jpg" alt="" width="46" height="46"><div><b class="what">Dr. Priya Patel</b><br><span class="when">Family Medicine · 10:30 AM</span><br>Suite 210, 2nd floor</div></div>
          <div class="row"><button class="btn sec" type="button" data-k="back">Back</button><button class="btn pri" type="button" data-k="yes">Yes, check me in</button></div>
        </div>
        <div class="v ok" data-s="2"><div class="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div><h4>You're checked in</h4><p>Please have a seat. We'll call you shortly.</p><button class="btn pri" type="button" data-k="done">Done</button></div>
      </div>
    </div></div>`,
  init(root) {
    const vs = [...root.querySelectorAll('.v')], dots = [...root.querySelectorAll('.steps i')], what = root.querySelector('.what'), when = root.querySelector('.when'), doc = root.querySelector('.doc');
    const go = (s) => { vs.forEach((v, i) => { v.classList.toggle('on', i === s); v.inert = i !== s; }); dots.forEach((d, i) => d.classList.toggle('on', i <= s)); };
    root.querySelectorAll('[data-k]').forEach((b) => b.addEventListener('click', () => {
      const k = b.dataset.k;
      if (k === 'appt') { what.textContent = 'Dr. Priya Patel'; when.textContent = 'Family Medicine · 10:30 AM'; doc.src = 'assets/portraits/women-02.jpg'; go(1); }
      else if (k === 'walk') { what.textContent = 'Dr. Marcus Reed'; when.textContent = 'Walk-in · est. wait 25 min'; doc.src = 'assets/portraits/men-20.jpg'; go(1); }
      else if (k === 'back' || k === 'done') go(0);
      else if (k === 'yes') go(2);
    }));
    go(0);
  },
};
