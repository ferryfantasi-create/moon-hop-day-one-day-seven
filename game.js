// Moon Hop — the tiny game in the video. A little moon hops across
// floating islands and collects stars. Space (or tap) hops to the next
// island. Day 1 was grey, three islands and one star; day 7 (this file)
// has the sky, clouds, coins, a bat and a score. Press D to see day 1.
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const W = 540, H = 960;

// Same map as the video, same start, scaled down 2x.
const PLATFORMS = [
  { x: 40, y: 760, w: 180 },
  { x: 300, y: 680, w: 170 },
  { x: 60, y: 580, w: 165 },
  { x: 310, y: 480, w: 175 },
  { x: 90, y: 380, w: 180 },
];
const STARS = PLATFORMS.map(p => ({ x: p.x + p.w / 2, y: p.y - 55 }));

let day7 = true;
let at = 0;          // platform index the moon stands on
let hop = -1;        // hop progress 0..1, -1 = standing
let score = 0;
let taken = new Set();
let batX = -60;

function draw() {
  if (day7) {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#5aa9ff');
    g.addColorStop(1, '#cfe8ff');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffe996';
    ctx.beginPath(); ctx.arc(450, 160, 35, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    for (const [cx, cy] of [[100, 130], [350, 210], [180, 280]]) {
      ctx.beginPath(); ctx.ellipse(cx, cy, 45, 18, 0, 0, Math.PI * 2); ctx.fill();
    }
  } else {
    ctx.fillStyle = '#3a3a3a';
    ctx.fillRect(0, 0, W, H);
  }

  const n = day7 ? PLATFORMS.length : 3;
  for (let i = 0; i < n; i++) {
    const p = PLATFORMS[i];
    ctx.fillStyle = day7 ? '#785028' : '#8c8c8c';
    ctx.fillRect(p.x, p.y, p.w, 17);
    ctx.fillStyle = day7 ? '#6ec85a' : '#8c8c8c';
    ctx.fillRect(p.x, p.y, p.w, 8);
  }

  const m = day7 ? STARS.length : 1;
  for (let i = 0; i < m; i++) {
    if (taken.has(i)) continue;
    const s = STARS[i];
    ctx.fillStyle = day7 ? '#ffd700' : '#b4b4b4';
    ctx.beginPath();
    for (let k = 0; k < 10; k++) {
      const a = -Math.PI / 2 + k * Math.PI / 5;
      const r = k % 2 === 0 ? 17 : 8;
      const px = s.x + r * Math.cos(a), py = s.y + r * Math.sin(a);
      k === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath(); ctx.fill();
  }

  // Moon position: standing, or mid-hop on an arc to the next island.
  let mx, my;
  const cur = PLATFORMS[at];
  if (hop < 0) {
    mx = cur.x + cur.w / 2; my = cur.y - 21;
  } else {
    const nxt = PLATFORMS[(at + 1) % PLATFORMS.length];
    mx = cur.x + cur.w / 2 + (nxt.x + nxt.w / 2 - (cur.x + cur.w / 2)) * hop;
    my = cur.y - 21 + (nxt.y - cur.y) * hop - Math.sin(hop * Math.PI) * 110;
  }
  ctx.fillStyle = '#ffec8c';
  ctx.beginPath(); ctx.arc(mx, my, 21, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#1e1e1e';
  ctx.beginPath(); ctx.arc(mx - 8, my - 3, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(mx + 8, my - 3, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(mx, my + 6, 7, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();

  if (day7) {
    batX = (batX + 3) % (W + 120) - 60;
    ctx.fillStyle = '#3c285a';
    ctx.beginPath(); ctx.ellipse(batX, 240, 23, 9, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('DAY 7   SCORE ' + score, 20, 40);
  } else {
    ctx.fillStyle = '#c8c8c8';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('DAY 1', 20, 40);
  }
}

function hopNow() {
  if (hop >= 0) return;
  hop = 0;
  const step = () => {
    hop += 0.04;
    if (hop >= 1) {
      hop = -1;
      at = (at + 1) % PLATFORMS.length;
      if (!taken.has(at)) { taken.add(at); score += 10; }
      if (at === 0) taken.clear();
    }
    draw();
    if (hop >= 0) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

window.addEventListener('keydown', e => {
  if (e.code === 'Space') { e.preventDefault(); hopNow(); }
  if (e.code === 'KeyD') { day7 = !day7; taken.clear(); score = 0; draw(); }
});
canvas.addEventListener('click', hopNow);
draw();
