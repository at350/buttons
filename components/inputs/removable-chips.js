// Gmail compose "To" recipients: gray "To" label, then recipient chips — white pills with a 1px #dadce0 outline,
// a 24px Google letter avatar, the name in 14px Google Sans (#3c4043) and a trailing Material Symbols close in
// #5f6368 whose 24px round hover layer darkens. Removing scales the chip out; the person_add icon button
// (Material Symbols) brings the last removed recipient back.
const CLOSE = 'm249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z';
const ADD = 'M730-400v-130H600v-60h130v-130h60v130h130v60H790v130h-60ZM252-523q-42-42-42-108t42-108q42-42 108-42t108 42q42 42 42 108t-42 108q-42 42-108 42t-108-42ZM40-160v-94q0-35 17.5-63.5T108-360q75-33 133.5-46.5T360-420q60 0 118 13.5T611-360q33 15 51 43t18 63v94H40Zm60-60h520v-34q0-16-9-30.5T587-306q-71-33-120-43.5T360-360q-58 0-107.5 10.5T132-306q-15 7-23.5 21.5T100-254v34Zm324.5-346.5Q450-592 450-631t-25.5-64.5Q399-721 360-721t-64.5 25.5Q270-670 270-631t25.5 64.5Q321-541 360-541t64.5-25.5ZM360-631Zm0 411Z';
const PEOPLE = [['Ana Ruiz', '#e8710a'], ['Ben Okafor', '#1a73e8'], ['Chloé Martin', '#188038']];
export default {
  id: 'in-removable-chips',
  credit: 'Gmail compose recipient chips — outlined pills with a letter avatar and a close × that scales the chip out',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .f {
      display: flex; flex-wrap: wrap; align-items: center; gap: 6px; width: 340px; max-width: 100%; padding: 8px 4px 8px 12px; background: #fff; border-radius: 8px;
      border-bottom: 1px solid #f1f3f4; font: 400 14px/20px "Google Sans", "Roboto Flex", Roboto, system-ui, sans-serif; color: #3c4043;
    }
    .to { color: #444746; margin-right: 4px; }
    .chip {
      display: inline-flex; align-items: center; height: 28px; padding: 0 2px 0 2px; border: 1px solid #dadce0; border-radius: 14px; background: #fff; white-space: nowrap;
      transition: transform .2s cubic-bezier(.4,0,.2,1), opacity .2s, background-color .15s, border-color .15s; transform-origin: center;
    }
    .chip:hover { background: #f8f9fa; border-color: #c4c7c5; }
    .chip.out { transform: scale(.4); opacity: 0; }
    .av { width: 24px; height: 24px; border-radius: 50%; display: grid; place-items: center; color: #fff; font: 500 13px/1 "Google Sans", Roboto, system-ui, sans-serif; margin-right: 6px; }
    .x, .add {
      position: relative; display: grid; place-items: center; border: 0; padding: 0; background: none; cursor: pointer; color: #5f6368; border-radius: 50%;
      -webkit-tap-highlight-color: transparent; outline: 0;
    }
    .x { width: 24px; height: 24px; margin-left: 2px; }
    .add { width: 32px; height: 32px; margin-left: auto; }
    .x::before, .add::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: #3c4043; opacity: 0; transition: opacity .15s; }
    .x:hover::before, .add:hover:not(:disabled)::before { opacity: .08; }
    .x:active::before, .add:active:not(:disabled)::before { opacity: .12; }
    .x:focus-visible, .add:focus-visible { box-shadow: 0 0 0 2px #1a73e8; }
    .x svg { width: 16px; height: 16px; fill: currentColor; }
    .add svg { width: 20px; height: 20px; fill: currentColor; }
    .add:disabled { opacity: .38; cursor: default; }
  `,
  html: `<div class="f"><span class="to">To</span><button class="add" type="button" aria-label="Add recipient"><svg viewBox="0 -960 960 960"><path d="${ADD}"/></svg></button></div>`,
  init(root) {
    const f = root.querySelector('.f'), add = root.querySelector('.add');
    const removed = [];
    const make = ([name, color]) => {
      const c = document.createElement('span'); c.className = 'chip';
      c.innerHTML = '<span class="av" style="background:' + color + '">' + name[0] + '</span>' + name +
        '<button class="x" type="button" aria-label="Remove ' + name + '"><svg viewBox="0 -960 960 960"><path d="' + CLOSE + '"/></svg></button>';
      c.querySelector('.x').addEventListener('click', () => {
        if (c.classList.contains('out')) return;
        c.classList.add('out');
        let done = false;
        const fin = () => { if (done) return; done = true; clearTimeout(t); c.removeEventListener('transitionend', onEnd); c.remove(); removed.push([name, color]); add.disabled = false; };
        const onEnd = (e) => { if (e.target === c) fin(); };
        c.addEventListener('transitionend', onEnd);
        const t = setTimeout(fin, 400);
      });
      return c;
    };
    PEOPLE.forEach((p) => f.insertBefore(make(p), add));
    add.disabled = true;
    add.addEventListener('click', () => {
      const p = removed.pop(); if (!p) return;
      const c = make(p); c.classList.add('out'); f.insertBefore(c, add);
      requestAnimationFrame(() => requestAnimationFrame(() => c.classList.remove('out')));
      add.disabled = removed.length === 0;
    });
  },
};
