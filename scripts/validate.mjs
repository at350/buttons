#!/usr/bin/env node
// Validates component modules against components/CONTRACT.md.
// Usage: node scripts/validate.mjs [category ...]
import { readdir, readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'components');
const SIZES = new Set(['auto', 'wide', 'full']);
const BANNED = [
  [/<script\b/i, 'inline <script> tag'],
  [/<link\b/i, '<link> tag'],
  [/<img\b(?![^>]*\bsrc=["']assets\/)/i, '<img> that is not a local assets/ file'],
  [/@import\b/i, 'css @import'],
  [/url\((?!\s*['"]?(data:|#|assets\/))/i, 'url() that is not data:, #id or a local assets/ file'],
  [/position\s*:\s*fixed/i, 'position: fixed'],
  [/\b100vw\b|\b100vh\b/, '100vw / 100vh'],
  [/\bhref\s*=\s*["']https?:/i, 'external href'],
];

const requested = process.argv.slice(2);
const all = (await readdir(ROOT, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name);
const categories = requested.length ? requested : all;

let errors = 0;
let total = 0;
const ids = new Map();

function fail(msg) {
  errors++;
  console.error('  ✗ ' + msg);
}

for (const cat of categories) {
  const dir = join(ROOT, cat);
  let files;
  try {
    files = (await readdir(dir)).filter((f) => f.endsWith('.js') && f !== 'index.js').sort();
  } catch {
    fail(`category "${cat}" not found`);
    continue;
  }
  console.log(`${cat}/ (${files.length} files)`);
  const defs = [];
  for (const f of files) {
    const p = join(dir, f);
    let mod;
    try {
      mod = await import(pathToFileURL(p).href);
    } catch (e) {
      fail(`${cat}/${f}: failed to import — ${e.message.split('\n')[0]}`);
      continue;
    }
    const d = mod.default;
    if (!d || typeof d !== 'object') { fail(`${cat}/${f}: no default-exported object`); continue; }
    if (typeof d.id !== 'string' || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(d.id)) fail(`${cat}/${f}: bad id "${d.id}" (lowercase kebab-case)`);
    if (ids.has(d.id)) fail(`${cat}/${f}: duplicate id "${d.id}" (also in ${ids.get(d.id)})`);
    ids.set(d.id, `${cat}/${f}`);
    if (typeof d.credit !== 'string' || !d.credit.trim()) fail(`${cat}/${f}: missing credit`);
    if (d.size !== undefined && !SIZES.has(d.size)) fail(`${cat}/${f}: bad size "${d.size}"`);
    if (typeof d.html !== 'string' || !d.html.trim()) fail(`${cat}/${f}: html must be a non-empty string`);
    if (d.css !== undefined && typeof d.css !== 'string') fail(`${cat}/${f}: css must be a string`);
    if (d.init !== undefined && typeof d.init !== 'function') fail(`${cat}/${f}: init must be a function`);
    const blob = (d.css || '') + '\n' + (d.html || '');
    for (const [re, label] of BANNED) if (re.test(blob)) fail(`${cat}/${f}: contains ${label}`);
    const src = await readFile(p, 'utf8');
    if (/^\s*import\s/m.test(src)) fail(`${cat}/${f}: component files must not import anything`);
    defs.push(d);
  }
  total += defs.length;
  try {
    const idx = (await import(pathToFileURL(join(dir, 'index.js')).href)).default;
    if (!Array.isArray(idx)) fail(`${cat}/index.js: default export is not an array`);
    else {
      const have = new Set(idx.map((d) => d && d.id));
      for (const d of defs) if (!have.has(d.id)) fail(`${cat}/index.js: does not include "${d.id}"`);
      if (idx.length !== defs.length) fail(`${cat}/index.js: exports ${idx.length} items but folder has ${defs.length} files`);
    }
  } catch (e) {
    fail(`${cat}/index.js: failed to import — ${e.message.split('\n')[0]}`);
  }
}

console.log(`\n${total} components, ${errors} error(s)`);
process.exit(errors ? 1 : 0);
