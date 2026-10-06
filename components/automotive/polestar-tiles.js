const T = [
  ['Front', 'ms-windshield_defrost_front', 0],
  ['Rear', 'ms-windshield_defrost_rear', 0],
  ['A/C', 'ms-ac_unit', 0],
  ['Seat', 'ms-seat_heat_left', 3],
  ['Wheel', 'ms-steering_wheel_heat', 0],
  ['Auto', 'ms-mode_fan', 0],
];
const ICONS = {
  'ms-windshield_defrost_front': '<path d="M152-300q-12 2-22.5-5T117-324L42-739q-2-13 5-23.5T67-777q118-32 219.5-47.5T481-840q93 0 193.5 15.5T894-777q13 4 20 14.5t5 23.5l-75 416q-2 12-12 18.5t-22 4.5q-12-2-19-12t-5-22l69-392q-114-28-203.5-41T481-780q-81 0-171.5 13T106-726l70 392q2 12-5 22t-19 12Zm508 65q0-18-6.5-34.5T634-300q-21-23-32.5-50.5T590-409q0-22 6.5-43t19.5-39l8-12q7-11 19-13t23 5q11 7 12.5 19t-5.5 23l-8 11q-8 11-12 23.5t-4 26.5q0 19 7 35.5t20 30.5q21 23 32.5 50.5T720-233q0 22-6.5 43T694-151l-8 11q-7 11-19 13t-23-5q-11-7-13-18.5t5-22.5l8-11q8-11 12-24t4-27Zm-173 1q0-19-7-35.5T460-300q-21-23-32.5-50.5T416-409q0-22 6.5-43t19.5-39l8-12q7-11 19-13t23 5q11 7 12.5 19t-5.5 23l-7 11q-8 11-12 23.5t-4 26.5q0 19 7 35.5t20 30.5q21 23 32.5 50.5T547-233q0 22-6.5 43T521-151l-8 11q-7 11-19 13t-23-5q-11-7-13-18.5t5-22.5l8-11q8-11 12-23.5t4-26.5Zm-173 0q0-19-7-35.5T287-300q-21-23-33-50.5T242-409q0-22 6.5-43t20.5-39l9-12q7-11 19-13t23 5q11 7 12.5 19t-5.5 23l-8 11q-8 11-12 23.5t-4 26.5q0 19 7 35.5t20 30.5q21 23 32.5 50.5T374-233q0 22-6.5 43T348-151l-8 11q-7 11-19 13t-23-5q-11-7-13-18.5t5-22.5l8-11q8-11 12-23.5t4-26.5Z"/>', 'ms-windshield_defrost_rear': '<path d="M760-240v-60h60v-440H140v440h62v60h-62q-24 0-42-18t-18-42v-440q0-24 18-42t42-18h680q24 0 42 18t18 42v440q0 24-18 42t-42 18h-60Zm-100 5q0-18-6.5-34.5T634-300q-21-23-32.5-50.5T590-409q0-22 6.5-43t19.5-39l8-12q7-11 19-13t23 5q11 7 12.5 19t-5.5 23l-8 11q-8 11-12 23.5t-4 26.5q0 19 7 35.5t20 30.5q21 23 32.5 50.5T720-233q0 22-6.5 43T694-151l-8 11q-7 11-19 13t-23-5q-11-7-13-18.5t5-22.5l8-11q8-11 12-24t4-27Zm-173 1q0-19-7-35.5T460-300q-21-23-32.5-50.5T416-409q0-22 6.5-43t19.5-39l8-12q7-11 19-13t23 5q11 7 12.5 19t-5.5 23l-7 11q-8 11-12 23.5t-4 26.5q0 19 7 35.5t20 30.5q21 23 32.5 50.5T547-233q0 22-6.5 43T521-151l-8 11q-7 11-19 13t-23-5q-11-7-13-18.5t5-22.5l8-11q8-11 12-23.5t4-26.5Zm-173 0q0-19-7-35.5T287-300q-21-23-33-50.5T242-409q0-22 6.5-43t20.5-39l9-12q7-11 19-13t23 5q11 7 12.5 19t-5.5 23l-8 11q-8 11-12 23.5t-4 26.5q0 19 7 35.5t20 30.5q21 23 32.5 50.5T374-233q0 22-6.5 43T348-151l-8 11q-7 11-19 13t-23-5q-11-7-13-18.5t5-22.5l8-11q8-11 12-23.5t4-26.5Z"/>',
  'ms-ac_unit': '<path d="M450-275 321-146q-8 8-20.5 8t-21.5-8q-9-9-9-21.5t9-21.5l171-171v-90h-90L192-282q-8 8-20.5 8.5T150-281q-9-9-9.5-21.5T150-325l125-125H109q-12 0-20.5-8.5T80-480q0-12 8.5-21t21.5-9h165L146-638q-9-9-9-21.5t9-21.5q9-9 21.5-9t21.5 9l171 171h90v-91L282-768q-8-8-8-20.5t8-21.5q9-9 21.5-9t22.5 9l124 124v-164q0-12 8.5-21t21.5-9q12 0 21 9t9 21v164l128-128q9-9 21.5-9t21.5 9q8 9 8 21.5t-9 21.5L510-601v91h91l168-168q8-8 20.5-8t21.5 8q9 9 9 21.5t-9 21.5L686-510h164q12 0 21 9t9 21q0 13-9 21.5t-21 8.5H686l127 129q9 8 9 20.5t-9 20.5q-8 10-20.5 10t-21.5-9L601-450h-91v90l171 173q9 8 9 20.5t-9 20.5q-8 10-20.5 10t-21.5-9L510-275v166q0 12-9 20.5T480-80q-13 0-21.5-8.5T450-110v-165Z"/>', 'ms-seat_heat_left': '<path d="M765-490q-11-7-14-19t5-22l8-11q8-11 12-24t4-27q0-18-6.5-34.5T754-658q-21-23-32.5-50.5T710-767q0-22 6.5-43t19.5-39l8-12q7-11 19-12.5t23 5.5q11 7 13 19t-6 22l-8 11q-8 11-12 23.5t-4 26.5q0 19 7 35.5t20 30.5q21 23 32.5 50.5T840-591q0 22-6.5 43T814-509l-8 11q-8 10-19 12.5t-22-4.5Zm-173 0q-11-7-14-19t5-22l8-11q8-11 12-23.5t4-26.5q0-19-7-35.5T580-658q-21-23-32.5-50.5T536-767q0-22 6.5-43t19.5-39l8-12q7-11 18.5-13t22.5 5q10 7 12.5 19t-4.5 23l-7 11q-8 11-12 23.5t-4 26.5q0 19 7 35.5t20 30.5q21 23 32.5 50.5T667-591q0 22-6.5 43T641-509l-8 11q-8 10-19 12.5t-22-4.5Zm-173 0q-11-7-14-19t5-22l8-11q8-11 12-23.5t4-26.5q0-19-7-35.5T407-658q-21-23-33-50.5T362-767q0-22 6.5-43t20.5-39l9-12q8-10 20-12t22 5q11 7 13 19t-6 22l-8 11q-8 11-12 23.5t-4 26.5q0 19 7 35.5t20 30.5q21 23 32.5 50.5T494-591q0 22-6.5 43T468-509l-8 11q-8 10-19 12.5t-22-4.5ZM297-120q-25 0-44-14.5T228-172l-99-386q-5-14-6.5-29t-1.5-30q0-28 6.5-54.5T146-723q8-16 22.5-25.5T200-758q20 0 33.5 14t13.5 34q0 9-2.5 17T234-678q-22 23-26 53.5t9 59.5l17 43q28 65 49 132.5T304-250v54q8-11 24.5-18.5T365-222h260q21 0 36 15t15 36q0 21-15 36t-36 15H297Z"/>', 'ms-steering_wheel_heat': '<path d="M860-673q0-18-6.5-34.5T834-738q-21-23-32.5-50.5T790-847q0-22 6.5-43t19.5-39l8-12q7-11 19-13t23 5q11 7 12.5 19t-5.5 23l-8 11q-8 11-12 23.5t-4 26.5q0 19 7 35.5t20 30.5q21 23 32.5 50.5T920-671q0 22-6.5 43T894-589l-8 12q-7 11-18.5 12.5T845-570q-11-7-13-18.5t5-22.5l7-11q8-11 12-24t4-27Zm-173 1q0-19-7-35.5T660-738q-21-23-32.5-50.5T616-847q0-22 6.5-43t19.5-39l8-12q7-11 19-13t23 5q11 7 12.5 19t-5.5 23l-7 11q-8 11-12 23.5t-4 26.5q0 19 7 35.5t20 30.5q21 23 32.5 50.5T747-671q0 22-6.5 43T721-589l-4 6-4 6q-7 11-18.5 12.5T672-570q-11-7-13-18.5t5-22.5l7-11q8-11 12-23.5t4-26.5ZM510-141q124-11 211-98t98-211H632L510-298v157Zm4-531q0-19-7-35.5T487-738q-21-23-33-50.5T442-847q0-22 6.5-43t20.5-39l9-12q7-11 19-13t23 5q11 7 12.5 19t-5.5 23l-8 11q-8 11-12 23.5t-4 26.5q0 19 7 35.5t20 30.5q21 23 32.5 50.5T574-671q0 22-6.5 43T548-589l-8 12q-7 11-18.5 12.5T499-570q-11-7-13-18.5t5-22.5l7-11q8-11 12-23.5t4-26.5ZM141-450q11 124 98 211t211 98v-157L328-450H141Zm-61-30q0-130 72.5-231T340-855q13-5 23 1t14 17q4 11 0 22.5T358-797q-89 34-148.5 110.5T141-510h704q14 0 24.5 10.5T880-475q-1 81-32.5 153T762-196.5q-54 53.5-126.5 85T480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480Z"/>', 'ms-mode_fan': '<path d="M424-80q-51 0-77.5-30.5T320-180q0-26 11.5-50.5T367-271q22-14 36.5-37.5T425-373q-1 0-1-.5t-2-1.5l-116 41q-17 6-33 10t-33 4q-63 0-111.5-55T80-536q0-51 30.5-77.5T179-640q26 0 51 11.5t41 35.5q14 22 39.5 37.5T373-535q.67-1 1.33-2 .67-1 .67-2l-41-115q-6-17-10-33t-4-32q0-64 55-112.5T536-880q51 0 77.5 30.5T640-781q0 26-11.5 51T593-689q-26 17-40.5 45T536-586q1 1 1.5.5t1.5 1.5l115-43q17-6 32.5-9.5T719-640q81 0 121 67t40 149q0 51-32 77.5T777-320q-25 0-48.5-11.5T689-367q-14-22-37.5-36.5T587-426q-1 2-1.6 3.06-.6 1.06-1.4 1.94l42 115q6 16 10 30.5t4 30.5q1 65-54 115T424-80Zm56-340q25 0 42.5-17.5T540-480q0-25-17.5-42.5T480-540q-25 0-42.5 17.5T420-480q0 25 17.5 42.5T480-420Zm-58-165q12-5 26-9t28-6q8-45 29.5-81t54.5-58q10-7 15-17.5t5-24.5q0-16.42-10.5-27.71T536-820q-43 0-98.5 20.55-55.5 20.54-57.5 80.32 0 11.21 2.5 21.17T388-680l34 95ZM240-380q14 0 40-8l95-34q-8-14-11.5-28t-3.5-26q-45-8-81-29.5T221-560q-7-10-19-15t-23-5q-19 0-29 10.5T140-536q0 61.94 25.63 108.97Q191.25-380 240-380Zm184 240q53.13 0 104.57-23Q580-186 580-242q0-11-2-19t-6-19l-34-95q-13 6-26.5 10t-27.5 5q-8 45-29.5 81T400-221q-9 6-14.5 18.5T380-179q1 15 11 27t33 12Zm353-240q16.83 0 29.91-9.17Q820-398.33 820-424q0-44-20.5-99t-81.33-57q-11.17 0-20.67 2-9.5 2-17.5 5l-95 35q5 8 10 25.5t5 28.5q45 8 81 29.5t58 54.5q6 8 16.67 14 10.66 6 21.33 6ZM600-484ZM476-600ZM360-476Zm124 116Z"/>',
};

export default {
  id: 'au-polestar-tiles',
  credit: 'Polestar 2 (Android Automotive) — climate quick tiles that light up in Polestar orange, seat heat cycling 3 levels, and the ± temperature bar',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 300px; max-width: 100%; padding: 12px; border-radius: 12px; background: #000; color: #fff; font: 400 12px/1 'Roboto Flex', Roboto, system-ui, sans-serif; font-variation-settings: 'wdth' 92; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
    .t { position: relative; height: 66px; border: 0; border-radius: 4px; background: #1f2023; color: #d6d6d6; cursor: pointer; display: grid; place-items: center; align-content: center; gap: 7px; font: inherit; letter-spacing: .02em; transition: background .15s, color .2s; -webkit-tap-highlight-color: transparent; }
    .t:hover { background: #2a2b2f; }
    .t:active { background: #34353a; }
    .t:focus-visible, .pm:focus-visible { outline: 2px solid #ff7500; outline-offset: 1px; }
    .t svg { width: 26px; height: 26px; fill: currentColor; transition: fill .2s; }
    .t.on svg { fill: #ff7500; }
    .t.on { color: #fff; }
    .lv { position: absolute; left: 50%; bottom: 6px; display: flex; gap: 3px; transform: translateX(-50%); }
    .lv i { width: 10px; height: 2px; background: #3b3c40; transition: background .2s; }
    .t[data-l="1"] .lv i:nth-child(1), .t[data-l="2"] .lv i:nth-child(-n+2), .t[data-l="3"] .lv i { background: #ff7500; }
    .bar { display: flex; align-items: center; justify-content: space-between; margin-top: 8px; height: 52px; padding: 0 4px; border-radius: 4px; background: #131416; }
    .z { display: flex; align-items: center; gap: 2px; }
    .pm { width: 34px; height: 40px; border: 0; border-radius: 4px; background: transparent; color: #bdbdbd; font: 300 24px/1 'Roboto Flex', system-ui, sans-serif; cursor: pointer; }
    .pm:hover { background: #24252a; color: #fff; }
    .pm:active { background: #2f3036; }
    .v { min-width: 50px; text-align: center; font: 300 22px/1 'Roboto Flex', system-ui, sans-serif; font-variation-settings: 'wdth' 100; font-variant-numeric: tabular-nums; }
    .v sup { font-size: 12px; color: #9a9a9a; }
  `,
  html: `
    <div class="stage">
      <div class="grid">${T.map(([n, ic, lv]) => `<button class="t" type="button" aria-pressed="false" ${lv ? 'data-l="0"' : ''}><svg viewBox="0 -960 960 960">${ICONS[ic]}</svg>${n}${lv ? '<span class="lv"><i></i><i></i><i></i></span>' : ''}</button>`).join('')}</div>
      <div class="bar">
        <div class="z"><button class="pm" type="button" aria-label="Driver cooler">−</button><span class="v">21.0<sup>°</sup></span><button class="pm" type="button" aria-label="Driver warmer">+</button></div>
        <div class="z"><button class="pm" type="button" aria-label="Passenger cooler">−</button><span class="v">21.0<sup>°</sup></span><button class="pm" type="button" aria-label="Passenger warmer">+</button></div>
      </div>
    </div>`,
  init(root) {
    root.querySelectorAll('.t').forEach((t) => t.addEventListener('click', () => {
      if (t.dataset.l !== undefined) {
        const l = (+t.dataset.l + 1) % 4;
        t.dataset.l = l; t.classList.toggle('on', l > 0); t.setAttribute('aria-pressed', String(l > 0));
      } else {
        const on = !t.classList.contains('on');
        t.classList.toggle('on', on); t.setAttribute('aria-pressed', String(on));
      }
    }));
    const temps = [21, 21], vs = root.querySelectorAll('.v'), pms = root.querySelectorAll('.pm');
    pms.forEach((b, i) => b.addEventListener('click', () => {
      const z = i >> 1;
      temps[z] = Math.max(16, Math.min(28, temps[z] + (i % 2 ? .5 : -.5)));
      vs[z].innerHTML = (temps[z] === 16 ? 'LO' : temps[z] === 28 ? 'HI' : temps[z].toFixed(1)) + '<sup>°</sup>';
    }));
  },
};
