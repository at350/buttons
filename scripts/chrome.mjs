// Finds and starts the Chromium that smoke, audit, bench and sheet drive over the DevTools protocol.
// Looks at CHROME=/path/to/binary, then the macOS Playwright cache and browsers, then the Linux ones
// ($PLAYWRIGHT_BROWSERS_PATH, ~/.cache/ms-playwright), then google-chrome / chromium on PATH.
import { spawn } from 'node:child_process';
import { readdirSync, existsSync } from 'node:fs';
import { join, delimiter } from 'node:path';
import { homedir } from 'node:os';

const CACHES = [join(homedir(), 'Library/Caches/ms-playwright'), process.env.PLAYWRIGHT_BROWSERS_PATH, join(homedir(), '.cache/ms-playwright')].filter(Boolean);
// newest build first: <cache>/<prefix><rev>/<path>
const builds = (prefix, paths) => CACHES.flatMap((c) => (existsSync(c) ? readdirSync(c) : [])
  .filter((d) => d.startsWith(prefix)).sort((a, b) => b.localeCompare(a, 'en', { numeric: true })).flatMap((d) => paths.map((p) => join(c, d, p))));
const shell = () => builds('chromium_headless_shell-', ['chrome-headless-shell-mac-arm64/chrome-headless-shell', 'chrome-linux/headless_shell', 'chrome-headless-shell-linux64/chrome-headless-shell']);
const full = () => builds('chromium-', ['chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 'chrome-linux/chrome', 'chrome-linux64/chrome']);
const APPS = ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'];
const onPath = () => ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']
  .flatMap((n) => (process.env.PATH || '').split(delimiter).filter(Boolean).map((d) => join(d, n)));

// preferFull: never pick chrome-headless-shell while a full browser exists (bench measures frame times)
export function findChrome({ preferFull = false } = {}) {
  if (process.env.CHROME) return process.env.CHROME;
  const order = preferFull ? [...full(), ...APPS, ...onPath(), ...shell()] : [...shell(), ...APPS, ...full(), ...onPath()];
  const found = order.find((p) => existsSync(p));
  if (!found) throw new Error('No Chromium found; set CHROME=/path/to/binary');
  return found;
}

// Chromium refuses to start as root (CI containers, cloud dev boxes) without --no-sandbox.
export const launchChrome = (flags, opts) =>
  spawn(findChrome(opts), process.getuid?.() === 0 ? ['--no-sandbox', ...flags] : flags, { stdio: ['ignore', 'ignore', 'pipe'] });
