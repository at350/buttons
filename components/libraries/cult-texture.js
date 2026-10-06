export default {
  id: 'lb-cult-texture',
  credit: 'cult/ui — TextureButton: 1px gradient rim (black/70 → black, indigo-300 → 500, white/50) wrapping a rounded-[10px] gradient face, in primary / accent / secondary plus the round icon variant',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 12px; flex-wrap: wrap; font: 400 14px/20px Inter, -apple-system, system-ui, sans-serif; }
    .tx { display: block; padding: 1px; border-radius: 12px; border: 1px solid rgba(0,0,0,.1); cursor: pointer; font: inherit; transition: all .3s ease-in-out; -webkit-tap-highlight-color: transparent; }
    .tx:focus-visible { outline: 2px solid #a1a1aa; outline-offset: 2px; }
    .in { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 8px 16px; border-radius: 10px; white-space: nowrap; transition: all .3s ease-in-out; }
    .pri { background: linear-gradient(to bottom, rgba(0,0,0,.7), #000); }
    .pri .in { background: linear-gradient(to bottom, #262626, #000); color: rgba(255,255,255,.9); }
    .pri:hover .in { background: linear-gradient(to bottom, #292524, rgba(38,38,38,.7)); }
    .pri:active .in { background: linear-gradient(to bottom, #000, #000); }
    .acc { background: linear-gradient(to bottom, rgba(165,180,252,.9), #6366f1); }
    .acc .in { background: linear-gradient(to bottom, #818cf8, #4f46e5); color: rgba(255,255,255,.9); }
    .acc:hover .in { background: linear-gradient(to bottom, rgba(129,140,248,.7), rgba(79,70,229,.7)); }
    .acc:active .in { background: linear-gradient(to bottom, rgba(129,140,248,.8), rgba(79,70,229,.8)); }
    .sec { border-color: rgba(0,0,0,.2); background: rgba(255,255,255,.5); }
    .sec .in { background: linear-gradient(to bottom, rgba(245,245,245,.8), rgba(229,229,229,.5)); color: #71717a; }
    .sec:hover .in { background: linear-gradient(to bottom, rgba(229,229,229,.4), rgba(212,212,212,.6)); }
    .sec:active .in { background: linear-gradient(to bottom, rgba(229,229,229,.6), rgba(212,212,212,.7)); }
    .ic { border-radius: 9999px; background: rgba(255,255,255,.5); }
    .ic:hover { background: linear-gradient(to top, #f5f5f5, #fff); }
    .ic:active { background: #e5e5e5; }
    .ic .in { padding: 4px; border-radius: 9999px; background: linear-gradient(to bottom, #fff, rgba(250,250,250,.5)); color: #71717a; }
    .ic:active .in { background: #e5e5e5; }
    .ic svg { width: 24px; height: 24px; padding: 4px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `
    <div class="row">
      <button class="tx pri" type="button"><span class="in">Primary</span></button>
      <button class="tx acc" type="button"><span class="in">Accent</span></button>
      <button class="tx sec" type="button"><span class="in">Secondary</span></button>
      <button class="tx ic" type="button" aria-label="Delete"><span class="in"><svg viewBox="0 0 24 24"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></span></button>
    </div>`,
};
