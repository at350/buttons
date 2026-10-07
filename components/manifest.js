// Every category folder exports `default` = array of component definitions from its index.js.
// Categories load independently so one broken file can't take down the whole page.
export const CATEGORIES = [
  'core',
  'big-tech',
  'creative',
  'retro',
  'menus',
  'inputs',
  'physical',
  'modern-brands',
  'motion',
  'shaders',
  'typography',
  'depth',
  'game-ui',
  'obscure-web',
  'libraries',
  'automotive',
  'kiosks',
  'scifi',
  'industrial',
  'toys',
];

// The page loads `bundle.js` (every component in one generated module, from `npm run build`) instead of
// ~700 separate files. A dev server (localhost) keeps loading the per-file modules so edits show up without a
// rebuild; `?bundle` / `?nobundle` override either way, and a missing or broken bundle falls back to the files.
// (index.html preloads the bundle under the same rule.)
function wantBundle() {
  const q = new URLSearchParams(location.search);
  if (q.has('nobundle')) return false;
  if (q.has('bundle')) return true;
  return !/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
}

async function loadPerFile() {
  return Promise.allSettled(CATEGORIES.map((c) => import(`./${c}/index.js`).then((m) => ({ c, list: m.default }))));
}

export async function loadComponents() {
  let results = null;
  if (wantBundle()) {
    try {
      const { default: byCat } = await import('./bundle.js');
      results = CATEGORIES.map((c) => ({ status: 'fulfilled', value: { c, list: (byCat[c] || []).filter(Boolean) } }));
    } catch (err) {
      console.warn('[buttons] bundle.js unavailable, loading components per file', err);
    }
  }
  if (!results) results = await loadPerFile();
  const seen = new Set();
  const out = [];
  for (const r of results) {
    if (r.status !== 'fulfilled') {
      console.error('[buttons] category failed to load', r.reason);
      continue;
    }
    const { c, list } = r.value;
    if (!Array.isArray(list)) {
      console.error(`[buttons] category "${c}" did not export an array`);
      continue;
    }
    for (const def of list) {
      if (!def || typeof def !== 'object' || !def.id) continue;
      if (seen.has(def.id)) {
        console.warn(`[buttons] duplicate id "${def.id}" in "${c}" skipped`);
        continue;
      }
      seen.add(def.id);
      def._cat = c;
      out.push(def);
    }
  }
  return out;
}
