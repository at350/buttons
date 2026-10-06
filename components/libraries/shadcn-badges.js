export default {
  id: 'lb-shadcn-badges',
  credit: 'shadcn/ui (new-york v4) — Badge: rounded-full, px-2 py-0.5, text-xs medium, in default / secondary / destructive / outline plus the blue "Verified" badge with Lucide BadgeCheck and the mono count pills; badges rendered as links get the [a&]:hover /90 tint',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap; max-width: 520px; font: 500 12px/16px Inter, -apple-system, system-ui, sans-serif; }
    .bd { display: inline-flex; flex: none; align-items: center; justify-content: center; gap: 4px; overflow: hidden; width: fit-content; padding: 2px 8px; border-radius: 9999px; border: 1px solid transparent; white-space: nowrap; text-decoration: none; cursor: pointer; transition: color .15s cubic-bezier(.4,0,.2,1), background-color .15s cubic-bezier(.4,0,.2,1), box-shadow .15s cubic-bezier(.4,0,.2,1); -webkit-tap-highlight-color: transparent; }
    .bd:focus-visible { outline: 0; border-color: #a1a1a1; box-shadow: 0 0 0 3px rgba(161,161,161,.5); }
    .bd svg { width: 12px; height: 12px; flex: none; pointer-events: none; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .def { background: #171717; color: #fafafa; }
    .def:hover { background: rgba(23,23,23,.9); }
    .sec { background: #f5f5f5; color: #171717; }
    .sec:hover { background: rgba(245,245,245,.9); }
    .des { background: #e7000b; color: #fff; }
    .des:hover { background: rgba(231,0,11,.9); }
    .des:focus-visible { box-shadow: 0 0 0 3px rgba(231,0,11,.2); }
    .out { border-color: #e5e5e5; color: #0a0a0a; }
    .out:hover { background: #f5f5f5; color: #171717; }
    .ver { background: #3b82f6; color: #fff; }
    .num { height: 20px; min-width: 20px; padding: 0 4px; font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace; font-variant-numeric: tabular-nums; }
  `,
  html: `
    <div class="row">
      <a class="bd def" href="#">Badge</a>
      <a class="bd sec" href="#">Secondary</a>
      <a class="bd des" href="#">Destructive</a>
      <a class="bd out" href="#">Outline</a>
      <a class="bd sec ver" href="#"><svg viewBox="0 0 24 24"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m16 9-5.5 5.5L8 12"/></svg>Verified</a>
      <a class="bd def num" href="#">8</a>
      <a class="bd des num" href="#">99</a>
      <a class="bd out num" href="#">20+</a>
    </div>`,
  init(root) {
    root.querySelectorAll('a').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
  },
};
