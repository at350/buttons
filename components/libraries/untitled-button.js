export default {
  id: 'lb-untitled-button',
  credit: 'Untitled UI — Secondary gray, Secondary color and Primary (brand-600 #7F56D9) md buttons with Untitled UI icons (check-circle, grid-01, user-plus-01), shadow-xs and the 4px brand-100 / gray-100 focus rings',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 12px; flex-wrap: wrap; font: 600 14px/20px Inter, -apple-system, system-ui, sans-serif; }
    .uu { height: 40px; padding: 0 16px; border-radius: 8px; border: 1px solid transparent; cursor: pointer; font: inherit; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; box-shadow: 0 1px 2px rgba(16,24,40,.05); transition: background .15s, border-color .15s, color .15s, box-shadow .15s; -webkit-tap-highlight-color: transparent; }
    .uu svg { width: 20px; height: 20px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .pri { background: #7f56d9; border-color: #7f56d9; color: #fff; }
    .pri:hover { background: #6941c6; border-color: #6941c6; }
    .pri:focus-visible { outline: 0; box-shadow: 0 1px 2px rgba(16,24,40,.05), 0 0 0 4px #f4ebff; }
    .pri[aria-pressed="true"] { background: #53389e; border-color: #53389e; }
    .sec { background: #fff; border-color: #d0d5dd; color: #344054; }
    .sec:hover { background: #f9fafb; color: #182230; }
    .sec:focus-visible { outline: 0; box-shadow: 0 1px 2px rgba(16,24,40,.05), 0 0 0 4px #f2f4f7; }
    .sec[aria-pressed="true"] { background: #f2f4f7; border-color: #98a2b3; }
    .sc { background: #f9f5ff; border-color: #f9f5ff; color: #6941c6; box-shadow: none; }
    .sc:hover { background: #f4ebff; border-color: #f4ebff; }
    .sc:focus-visible { outline: 0; box-shadow: 0 0 0 4px #f4ebff; }
    .sc[aria-pressed="true"] { background: #e9d7fe; border-color: #e9d7fe; }
    .uu:active { transform: translateY(.5px); }
    .l { display: grid; }
    .l > span { grid-area: 1 / 1; }
    .pri[aria-pressed="true"] .a, .pri[aria-pressed="false"] .b { visibility: hidden; }
  `,
  html: `
    <div class="row">
      <button class="uu sec" type="button" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="m7.5 12 3 3 6-6m5.5 3c0 5.5228-4.4772 10-10 10S2 17.5228 2 12 6.4772 2 12 2s10 4.4772 10 10"/></svg>Mark as done</button>
      <button class="uu sc" type="button" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M8.4 3H4.6c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C3 3.76 3 4.04 3 4.6v3.8c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C3.76 10 4.04 10 4.6 10h3.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C10 9.24 10 8.96 10 8.4V4.6c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C9.24 3 8.96 3 8.4 3m11 0h-3.8c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C14 3.76 14 4.04 14 4.6v3.8c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437c.214.109.494.109 1.054.109h3.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C21 9.24 21 8.96 21 8.4V4.6c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C20.24 3 19.96 3 19.4 3m0 11h-3.8c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C14 14.76 14 15.04 14 15.6v3.8c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437c.214.109.494.109 1.054.109h3.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C21 20.24 21 19.96 21 19.4v-3.8c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C20.24 14 19.96 14 19.4 14m-11 0H4.6c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C3 14.76 3 15.04 3 15.6v3.8c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C3.76 21 4.04 21 4.6 21h3.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C10 20.24 10 19.96 10 19.4v-3.8c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C9.24 14 8.96 14 8.4 14"/></svg>Grid</button>
      <button class="uu pri" type="button" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M12 15.5H7.5c-1.3956 0-2.0933 0-2.6611.1722a4 4 0 0 0-2.6667 2.6667C2 18.9067 2 19.6044 2 21m17 0v-6m-3 3h6M14.5 7.5c0 2.4853-2.0147 4.5-4.5 4.5S5.5 9.9853 5.5 7.5 7.5147 3 10 3s4.5 2.0147 4.5 4.5"/></svg><span class="l"><span class="a">Add user</span><span class="b" aria-hidden="true">Added</span></span></button>
    </div>`,
  init(root) {
    root.querySelectorAll('.uu').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true')));
  },
};
