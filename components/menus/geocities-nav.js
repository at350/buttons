export default {
  id: 'mn-geocities-nav',
  credit: '1998 GeoCities table navbar — bevelled cells, Times links, visited turns purple',
  size: 'full',
  css: `
    :host { display: block; }
    .stage { background: #000080 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Crect width='8' height='8' fill='%23000080'/%3E%3Ccircle cx='4' cy='4' r='.8' fill='%23ffff00' opacity='.5'/%3E%3C/svg%3E"); border-radius: 12px; padding: 10px; overflow-x: auto; }
    table { border-collapse: separate; border-spacing: 2px; width: 100%; min-width: 520px; background: #c0c0c0; border: 2px outset #fff; font: bold 15px/1 "Times New Roman", Times, serif; }
    td { padding: 0; }
    .lk { display: block; width: 100%; padding: 7px 10px; background: #c0c0c0; border: 2px outset #fff; color: #0000ee; font: inherit; cursor: pointer; text-decoration: underline; white-space: nowrap; }
    .lk:hover { color: #ff0000; background: #d4d0c8; }
    .lk:active { border-style: inset; }
    .lk.v { color: #551a8b; }
    .lk:focus-visible { outline: 1px dotted #000; outline-offset: -4px; }
    .cnt { text-align: center; color: #00ff00; font: 11px/1 "Courier New", monospace; padding: 8px 0 0; letter-spacing: .1em; }
    .cnt b { background: #000; color: #0f0; padding: 2px 4px; border: 1px solid #0f0; }
  `,
  html: `
    <div class="stage">
      <table><tr>
        <td><button class="lk" type="button">Home</button></td>
        <td><button class="lk" type="button">About Me</button></td>
        <td><button class="lk" type="button">My Pets</button></td>
        <td><button class="lk" type="button">Cool Links</button></td>
        <td><button class="lk" type="button">Guestbook</button></td>
        <td><button class="lk" type="button">WebRing</button></td>
        <td><button class="lk" type="button">E-Mail Me!</button></td>
      </tr></table>
      <div class="cnt">You are visitor <b class="n">000124</b></div>
    </div>`,
  init(root) {
    const n = root.querySelector('.n');
    root.querySelectorAll('.lk').forEach((b) => b.addEventListener('click', () => {
      b.classList.add('v');
      n.textContent = String(+n.textContent + 1).padStart(6, '0');
    }));
  },
};
