#!/usr/bin/env node
// Zero-dependency static server for development and benchmarks: HTTP/1.1 keep-alive, gzip for text,
// ETag revalidation. (python -m http.server speaks HTTP/1.0 without keep-alive, so every one of the
// ~700 module requests opens a new TCP connection and nothing is compressed — unlike real hosting.)
// Usage: node scripts/serve.mjs [port=4173] [--root=dir] [--host=127.0.0.1]
import { createServer } from 'node:http';
import { stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { join, extname, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const opt = (k, d) => { const a = args.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
const PORT = +(args.find((a) => /^\d+$/.test(a)) || 4173);
const HOST = opt('host', '127.0.0.1');
const ROOT = resolve(opt('root', join(dirname(fileURLToPath(import.meta.url)), '..')));

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff',
};
const COMPRESS = new Set(['.html', '.js', '.mjs', '.css', '.json', '.md', '.txt', '.svg']);

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://x');
    let path = decodeURIComponent(url.pathname);
    let file = resolve(ROOT, '.' + path);
    if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
    let s = await stat(file).catch(() => null);
    if (s && s.isDirectory()) { file = join(file, 'index.html'); s = await stat(file).catch(() => null); }
    if (!s || !s.isFile()) { res.writeHead(404, { 'content-type': 'text/plain' }); return res.end('not found'); }
    const ext = extname(file).toLowerCase();
    const etag = `W/"${s.size.toString(16)}-${Math.floor(s.mtimeMs).toString(16)}"`;
    const headers = { 'content-type': MIME[ext] || 'application/octet-stream', etag, 'cache-control': 'no-cache', vary: 'accept-encoding' };
    if (req.headers['if-none-match'] === etag) { res.writeHead(304, headers); return res.end(); }
    const gz = COMPRESS.has(ext) && /\bgzip\b/.test(req.headers['accept-encoding'] || '');
    if (gz) headers['content-encoding'] = 'gzip'; else headers['content-length'] = s.size;
    res.writeHead(200, headers);
    if (req.method === 'HEAD') return res.end();
    const src = createReadStream(file);
    src.on('error', () => res.destroy());
    if (gz) src.pipe(createGzip({ level: 6 })).pipe(res); else src.pipe(res);
  } catch (e) {
    res.writeHead(500, { 'content-type': 'text/plain' });
    res.end(String(e && e.message));
  }
});
server.keepAliveTimeout = 15000;
server.listen(PORT, HOST, () => console.log(`serving ${ROOT} at http://${HOST}:${PORT}/ (keep-alive, gzip)`));
