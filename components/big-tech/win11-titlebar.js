export default {
  id: 'bt-win11-titlebar',
  credit: 'Microsoft Windows 11 — Settings app Mica title bar: back button, app icon + title, and the caption buttons (minimize, maximize / restore, red close)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .bar {
      display: inline-flex; align-items: center; height: 32px; padding-left: 0; border-radius: 8px 8px 0 0;
      background: #f3f3f3; border: 1px solid #e5e5e5; border-bottom: 0; min-width: 340px;
      box-shadow: 0 2px 8px rgba(0,0,0,.08);
    }
    .bar.max { border-radius: 0; }
    .app { width: 16px; height: 16px; flex: none; margin-left: 2px; }
    .back { width: 40px; height: 32px; margin: 0 2px 0 0; border: 0; border-radius: 8px 0 0 0; background: transparent; color: rgba(0,0,0,.894); display: inline-flex; align-items: center; justify-content: center; cursor: default; transition: background-color .083s linear; }
    .back:hover { background: rgba(0,0,0,.0373); }
    .back:active { background: rgba(0,0,0,.0241); color: rgba(0,0,0,.6063); }
    .back:focus-visible { outline: 2px solid #000; outline-offset: -2px; }
    .back svg { width: 14px; height: 14px; fill: currentColor; }
    .ttl { margin: 0 auto 0 12px; font: 400 12px/16px "Segoe UI Variable Text", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif; color: rgba(0,0,0,.894); white-space: nowrap; }
    .cap {
      width: 46px; height: 32px; border: 0; background: transparent; color: #1a1a1a; cursor: default;
      display: inline-flex; align-items: center; justify-content: center; transition: background-color .083s linear, color .083s linear;
      -webkit-tap-highlight-color: transparent;
    }
    .cap:hover { background: rgba(0,0,0,.0373); }
    .cap:active { background: rgba(0,0,0,.0241); color: rgba(0,0,0,.6063); }
    .cap.close:hover { background: #c42b1c; color: #fff; }
    .cap.close:active { background: rgba(196,43,28,.9); color: rgba(255,255,255,.7); }
    .cap:focus-visible { outline: 2px solid #000; outline-offset: -2px; }
    .cap svg { width: 10px; height: 10px; stroke: currentColor; stroke-width: 1; fill: none; }
    .restore { display: none; }
    .bar.max .maxi { display: none; }
    .bar.max .restore { display: block; }
    .bar.gone { opacity: 0; transform: scale(.9); transition: opacity .15s, transform .15s; pointer-events: none; }
    .bar { transition: opacity .15s, transform .15s, border-radius .15s; }
    .bar.min { transform: translateY(6px) scaleY(.9); opacity: .5; }
  `,
  html: `
    <div class="bar">
      <button class="back" type="button" aria-label="Back"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M9.15898 16.8666C9.36292 17.0528 9.67918 17.0384 9.86536 16.8345C10.0515 16.6305 10.0371 16.3143 9.8332 16.1281L3.66535 10.4974H17.4961C17.7722 10.4974 17.9961 10.2735 17.9961 9.99736C17.9961 9.72122 17.7722 9.49736 17.4961 9.49736H3.66824L9.8332 3.86927C10.0371 3.68309 10.0515 3.36684 9.86536 3.16289C9.67918 2.95895 9.36292 2.94456 9.15898 3.13074L2.24263 9.44478C2.10268 9.57254 2.02285 9.74008 2.00314 9.91323C1.99851 9.94058 1.99609 9.96869 1.99609 9.99736C1.99609 10.0242 1.99821 10.0506 2.00229 10.0763C2.02047 10.2522 2.10058 10.4229 2.24263 10.5526L9.15898 16.8666Z"/></svg></button><svg class="app" viewBox="0 0 20 20" aria-hidden="true"><defs><linearGradient id="w11g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8c8c8c"/><stop offset="1" stop-color="#4a4a4a"/></linearGradient></defs><path fill="url(#w11g)" fill-rule="evenodd" d="M1.91099 7.38266C2.28028 6.24053 2.88863 5.19213 3.69133 4.30364C3.82707 4.15339 4.04002 4.09984 4.23069 4.16802L6.14897 4.85392C6.66905 5.03977 7.24131 4.76883 7.42716 4.24875C7.44544 4.19762 7.45952 4.14507 7.46925 4.09173L7.83471 2.08573C7.87104 1.88627 8.02422 1.7285 8.22251 1.6863C8.8027 1.5628 9.39758 1.5 10.0003 1.5C10.6026 1.5 11.1971 1.56273 11.7769 1.68607C11.9752 1.72824 12.1284 1.88591 12.1648 2.08529L12.5313 4.09165C12.6303 4.63497 13.1511 4.9951 13.6944 4.89601C13.7479 4.88627 13.8004 4.87219 13.8515 4.85395L15.7698 4.16802C15.9605 4.09984 16.1734 4.15339 16.3092 4.30364C17.1119 5.19213 17.7202 6.24053 18.0895 7.38266C18.1518 7.57534 18.0918 7.78658 17.9374 7.91764L16.3825 9.23773C15.9615 9.5952 15.9101 10.2263 16.2675 10.6473C16.3027 10.6887 16.3411 10.7271 16.3825 10.7623L17.9374 12.0824C18.0918 12.2134 18.1518 12.4247 18.0895 12.6173C17.7202 13.7595 17.1119 14.8079 16.3092 15.6964C16.1734 15.8466 15.9605 15.9002 15.7698 15.832L13.8515 15.1461C13.3315 14.9602 12.7592 15.2312 12.5733 15.7512C12.5551 15.8024 12.541 15.8549 12.5312 15.9085L12.1648 17.9147C12.1284 18.1141 11.9752 18.2718 11.7769 18.3139C11.1971 18.4373 10.6026 18.5 10.0003 18.5C9.39758 18.5 8.8027 18.4372 8.22251 18.3137C8.02422 18.2715 7.87104 18.1137 7.83471 17.9143L7.46926 15.9084C7.37018 15.365 6.8494 15.0049 6.30608 15.104C6.25265 15.1137 6.20011 15.1278 6.14906 15.1461L4.23069 15.832C4.04002 15.9002 3.82707 15.8466 3.69133 15.6964C2.88863 14.8079 2.28028 13.7595 1.91099 12.6173C1.84869 12.4247 1.90876 12.2134 2.06313 12.0824L3.61798 10.7623C4.03897 10.4048 4.09046 9.77373 3.73299 9.35274C3.69784 9.31135 3.65937 9.27288 3.618 9.23775L2.06313 7.91764C1.90876 7.78658 1.84869 7.57534 1.91099 7.38266ZM8.00026 10C8.00026 11.1046 8.89569 12 10.0003 12C11.1048 12 12.0003 11.1046 12.0003 10C12.0003 8.89543 11.1048 8 10.0003 8C8.89569 8 8.00026 8.89543 8.00026 10Z"/><circle cx="10" cy="10" r="2" fill="#0f6cbd"/></svg><span class="ttl">Settings</span>
      <button class="cap mini" type="button" aria-label="Minimize"><svg viewBox="0 0 10 10"><path d="M0 5h10"/></svg></button>
      <button class="cap maxi" type="button" aria-label="Maximize"><svg viewBox="0 0 10 10"><rect x=".5" y=".5" width="9" height="9" rx="1.5"/></svg></button>
      <button class="cap restore" type="button" aria-label="Restore"><svg viewBox="0 0 10 10"><path d="M2.5 2.5V1.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-1"/><rect x=".5" y="2.5" width="7" height="7" rx="1"/></svg></button>
      <button class="cap close" type="button" aria-label="Close"><svg viewBox="0 0 10 10"><path d="M0 0l10 10M10 0L0 10"/></svg></button>
    </div>`,
  init(root) {
    const bar = root.querySelector('.bar');
    // Temporary animation classes, each with its own duration and timer. `max` is a persistent toggle and is not touched here.
    const TEMP = { min: 600, gone: 900 };
    const timers = {};
    const resetAll = () => {
      for (const cls of Object.keys(TEMP)) { clearTimeout(timers[cls]); delete timers[cls]; bar.classList.remove(cls); }
    };
    // Starting one temporary animation supersedes any other in flight (a close replaces a pending minimize and vice versa),
    // and every reset clears all temporary classes, so none can be left stuck.
    const flash = (cls) => { resetAll(); bar.classList.add(cls); timers[cls] = setTimeout(resetAll, TEMP[cls]); };
    root.querySelector('.mini').addEventListener('click', () => flash('min'));
    root.querySelector('.maxi').addEventListener('click', () => bar.classList.add('max'));
    root.querySelector('.restore').addEventListener('click', () => bar.classList.remove('max'));
    root.querySelector('.close').addEventListener('click', () => flash('gone'));
    return resetAll;
  },
};
