// Moon Hop — make.fun "Day one, day seven" entry (Node 22, standard
// library only). The video itself is the entry: it shows this tiny game
// on day one and again on day seven, and it is posted on TikTok.
// This program only hands the video's address to the gate: it copies
// VIDEO.json from the repository root to /output/VIDEO.json.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and
// MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// Check the copy before handing it over: it must name a TikTok video
// address, or the gate would be handed a broken link.
const copied = JSON.parse(readFileSync(join(OUTPUT_DIR, 'VIDEO.json'), 'utf8')) as { url?: unknown };
if (typeof copied.url !== 'string' || !copied.url.startsWith('https://www.tiktok.com/')) {
  console.error('VIDEO.json does not name a TikTok video address');
  process.exit(1);
}
console.log(`VIDEO.json copied: ${copied.url}`);
