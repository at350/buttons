#!/usr/bin/env node
// Fetches REAL artwork for things elements depict (films, albums, games, apps, books, people, products)
// into assets/real/<slug>.<ext>, and appends a provenance line to assets/real/manifest.jsonl.
// No API keys needed.
//
//   node scripts/fetch-real.mjs itunes "<search term>" <entity> <slug> [size=600]
//       entity: album | song | software | ebook | podcast | musicVideo   (best for album art, app icons, books;
//       its film/TV catalogue is thin — use `wiki` for films and TV shows)
//   node scripts/fetch-real.mjs wiki "<Wikipedia page title>" <slug> [width=600]      (page's lead image: film
//       posters, TV key art, album covers, game covers, photos of public people; use the exact page title,
//       e.g. "Twisters (film)", "Hades (video game)", "Tom Anderson (Myspace)")
//   node scripts/fetch-real.mjs steam <appid> <slug> [header|capsule_616x353|library_600x900|library_hero]
//   node scripts/fetch-real.mjs commons "<search terms>" <slug> [width=600]          (Wikimedia Commons)
//   node scripts/fetch-real.mjs url <https url> <slug>                                 (a specific image file)
//
// Prints what matched so the caller can confirm it is the right thing.
import { mkdir, writeFile, appendFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'real');
await mkdir(ROOT, { recursive: true });
const UA = 'buttons-showcase/1.0 (https://github.com/at350/buttons; asset fetch for a UI showcase)';
const [kind, a, b, c, d] = process.argv.slice(2);
if (!kind || !a || !b) { console.error('usage: see header'); process.exit(2); }

const get = async (url, opts = {}) => {
  const r = await fetch(url, { headers: { 'User-Agent': UA, ...(opts.headers || {}) }, redirect: 'follow' });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r;
};
const extOf = (url, type) => {
  const m = url.split('?')[0].match(/\.(jpe?g|png|webp|gif)$/i);
  if (m) return m[1].toLowerCase().replace('jpeg', 'jpg');
  if (/png/.test(type)) return 'png'; if (/webp/.test(type)) return 'webp'; return 'jpg';
};
async function save(url, slug, meta) {
  const r = await get(url);
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 1000) throw new Error('image too small: ' + url);
  const file = `${slug}.${extOf(url, r.headers.get('content-type') || '')}`;
  await writeFile(join(ROOT, file), buf);
  const rec = { slug, file: `assets/real/${file}`, bytes: buf.length, kind, ...meta, source: url, fetched: new Date().toISOString() };
  await appendFile(join(ROOT, 'manifest.jsonl'), JSON.stringify(rec) + '\n');
  console.log(`✓ assets/real/${file}  (${Math.round(buf.length / 1024)} KB)  ← ${meta.matched || ''}`);
}

try {
  if (kind === 'itunes') {
    const [term, entity, slug, size = '600'] = [a, b, c, d];
    const media = { album: 'music', song: 'music', musicVideo: 'music', movie: 'movie', tvSeason: 'tvShow', software: 'software', ebook: 'ebook', podcast: 'podcast' }[entity] || 'all';
    const j = await (await get(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=${media}&entity=${entity}&limit=3&country=us`)).json();
    const hit = j.results?.[0];
    if (!hit || !hit.artworkUrl100) throw new Error('no iTunes match for ' + term);
    const name = hit.collectionName || hit.trackName || hit.artistName;
    const by = hit.artistName && hit.artistName !== name ? ` — ${hit.artistName}` : '';
    const art = hit.artworkUrl100.replace(/\/\d+x\d+bb\./, `/${size}x${size}bb.`);
    await save(art, slug, { query: term, entity, matched: `${name}${by}`, licence: 'artwork via iTunes Search API; rights remain with the owner (thumbnail use in a UI replica)' });
  } else if (kind === 'wiki') {
    const [title, slug, width = '600'] = [a, b, c];
    const j = await (await get(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail|name&pilicense=any&pithumbsize=${width}&redirects=1&titles=${encodeURIComponent(title)}`)).json();
    const page = Object.values(j.query.pages)[0];
    if (!page?.thumbnail?.source) throw new Error('no lead image on Wikipedia page ' + title);
    await save(page.thumbnail.source, slug, { query: title, matched: `${page.title} (${page.pageimage})`, licence: 'Wikipedia lead image; see the File: page for its licence' });
  } else if (kind === 'steam') {
    const [appid, slug, which = 'header'] = [a, b, c];
    const name = { header: 'header.jpg', capsule_616x353: 'capsule_616x353.jpg', library_600x900: 'library_600x900.jpg', library_hero: 'library_hero.jpg' }[which] || 'header.jpg';
    let matched = 'app ' + appid;
    try { const j = await (await get(`https://store.steampowered.com/api/appdetails?appids=${appid}&filters=basic`)).json(); matched = j[appid]?.data?.name || matched; } catch {}
    await save(`https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/${name}`, slug, { query: appid, matched, licence: 'Steam store art; rights remain with the publisher' });
  } else if (kind === 'commons') {
    const [q, slug, width = '600'] = [a, b, c];
    const j = await (await get(`https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=5&gsrsearch=${encodeURIComponent(q + ' filetype:bitmap')}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=${width}`)).json();
    const pages = Object.values(j.query?.pages || {}).sort((x, y) => x.index - y.index);
    const p = pages.find((x) => x.imageinfo?.[0]?.thumburl);
    if (!p) throw new Error('no Commons match for ' + q);
    const ii = p.imageinfo[0];
    await save(ii.thumburl, slug, { query: q, matched: p.title, licence: ii.extmetadata?.LicenseShortName?.value || 'see Commons' });
  } else if (kind === 'url') {
    const [url, slug] = [a, b];
    if (!/^https:\/\//.test(url)) throw new Error('https only');
    await save(url, slug, { query: url, matched: url.split('/').pop(), licence: 'see source' });
  } else throw new Error('unknown kind ' + kind);
} catch (e) {
  console.error('✗', e.message);
  process.exit(1);
}
