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
];

export async function loadComponents() {
  const results = await Promise.allSettled(
    CATEGORIES.map((c) => import(`./${c}/index.js`).then((m) => ({ c, list: m.default })))
  );
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
      out.push(def);
    }
  }
  return out;
}
