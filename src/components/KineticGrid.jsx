import { useEffect, useRef } from 'react';

// Interactive grid that warps toward the pointer and ripples on every click.
// Ported from the TSX "kinetic-grid" component. Used with no children it is just a fixed canvas behind the page;
// with children it behaves like the original wrapper.
//   globalColor: 'green' (portfolio theme, default) | 'default' (blue) | 'monochrome'

const CELL_SIZE = 55;
const INFLUENCE_RADIUS = 260;
const MAX_WARP = 24;
const DOT_SPACING = 28;
const LERP_SPEED = 0.08;
const NODE_BASE_RADIUS = 1.8;
const NODE_ACTIVE_RADIUS = 3.2;

const THEMES = {
  green: {
    bg: '#050a0e',
    lineBase: { r: 0, g: 255, b: 159, a: 0.1 }, lineActive: { r: 0, g: 255, b: 159, a: 0.9 },
    nodeBase: { r: 0, g: 255, b: 159, a: 0.22 }, nodeActive: { r: 0, g: 255, b: 159, a: 1 },
    dot: 'rgba(0,255,159,0.07)', glow: '0,255,159', ripple: '0,255,159',
  },
  default: {
    bg: '#161618',
    lineBase: { r: 255, g: 255, b: 255, a: 0.13 }, lineActive: { r: 74, g: 158, b: 255, a: 0.9 },
    nodeBase: { r: 255, g: 255, b: 255, a: 0.2 }, nodeActive: { r: 74, g: 158, b: 255, a: 1 },
    dot: 'rgba(255,255,255,0.05)', glow: '74,158,255', ripple: '100,180,255',
  },
  monochrome: {
    bg: '#000000',
    lineBase: { r: 255, g: 255, b: 255, a: 0.13 }, lineActive: { r: 255, g: 255, b: 255, a: 0.9 },
    nodeBase: { r: 255, g: 255, b: 255, a: 0.2 }, nodeActive: { r: 255, g: 255, b: 255, a: 1 },
    dot: 'rgba(255,255,255,0.05)', glow: '255,255,255', ripple: '255,255,255',
  },
};

const lerpN = (a, b, t) => a + (b - a) * t;
const lerpColor = (base, active, t) =>
  `rgba(${Math.round(lerpN(base.r, active.r, t))},${Math.round(lerpN(base.g, active.g, t))},${Math.round(lerpN(base.b, active.b, t))},${lerpN(base.a, active.a, t).toFixed(3)})`;

// Where a grid point ends up after the pointer push + any ripples passing through it.
function warpPoint(gx, gy, col, row, mouse, ripples, cols, rows) {
  const edge = 1.5;                                           // boundary rows/cols stay pinned in place
  const colPin = Math.min(col / edge, (cols - 1 - col) / edge, 1);
  const rowPin = Math.min(row / edge, (rows - 1 - row) / edge, 1);
  const pin = colPin * colPin * rowPin * rowPin;

  const dx = gx - mouse.x, dy = gy - mouse.y, dist = Math.sqrt(dx * dx + dy * dy);
  const proximity = Math.max(0, 1 - dist / INFLUENCE_RADIUS) * pin;

  let rx = 0, ry = 0;
  for (const r of ripples) {
    const rdx = gx - r.x, rdy = gy - r.y, diff = Math.sqrt(rdx * rdx + rdy * rdy) - r.radius, waveWidth = 55;
    if (Math.abs(diff) < waveWidth) {
      const strength = (1 - Math.abs(diff) / waveWidth) * r.opacity * 18 * pin, angle = Math.atan2(rdy, rdx), sign = diff < 0 ? -1 : 1;
      rx += Math.cos(angle) * strength * sign * -1;
      ry += Math.sin(angle) * strength * sign * -1;
    }
  }

  if (dist < INFLUENCE_RADIUS && dist > 0 && pin > 0) {
    const t = dist / INFLUENCE_RADIUS;
    const eased = t < 0.01 ? 0 : (1 - t) * (1 - t) * Math.min(1, dist / 60);
    const warp = eased * MAX_WARP * pin, angle = Math.atan2(dy, dx);
    return { x: gx - Math.cos(angle) * warp + rx, y: gy - Math.sin(angle) * warp + ry, proximity };
  }
  return { x: gx + rx, y: gy + ry, proximity };
}

export default function KineticGrid({ children, className = '', globalColor = 'green' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current, ctx = canvas.getContext('2d');
    const theme = THEMES[globalColor] || THEMES.green;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = matchMedia('(pointer: coarse)').matches;
    const mouse = { x: -9999, y: -9999 }, target = { x: -9999, y: -9999 }, ripples = [];
    let W = 0, H = 0, raf = 0, dirty = true, tick = 0, dots = null;

    // The static dot texture never changes, so it is painted once and just copied each frame.
    const buildDots = () => {
      dots = document.createElement('canvas'); dots.width = W; dots.height = H;
      const c = dots.getContext('2d'); c.fillStyle = theme.dot;
      for (let x = DOT_SPACING / 2; x < W; x += DOT_SPACING)
        for (let y = DOT_SPACING / 2; y < H; y += DOT_SPACING) { c.beginPath(); c.arc(x, y, 0.7, 0, Math.PI * 2); c.fill(); }
    };
    const setSize = () => { W = innerWidth; H = innerHeight; canvas.width = W; canvas.height = H; buildDots(); dirty = true; };

    const draw = (now) => {
      ctx.fillStyle = theme.bg; ctx.fillRect(0, 0, W, H);
      ctx.drawImage(dots, 0, 0);

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i], age = (now - r.born) / 1000;
        r.radius = Math.max(0, age * 400); r.opacity = Math.max(0, 1 - age * 1.2);
        if (r.opacity <= 0) ripples.splice(i, 1);
      }

      const cols = Math.max(2, Math.ceil(W / CELL_SIZE)) + 1, rows = Math.max(2, Math.ceil(H / CELL_SIZE)) + 1;
      const cellW = W / (cols - 1), cellH = H / (rows - 1);
      const pts = [];
      for (let row = 0; row < rows; row++) {
        pts[row] = [];
        for (let col = 0; col < cols; col++) pts[row][col] = warpPoint(col * cellW, row * cellH, col, row, mouse, ripples, cols, rows);
      }

      const seg = (a, b) => {
        const avg = (a.proximity + b.proximity) / 2, t = avg * avg * (3 - 2 * avg);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = lerpColor(theme.lineBase, theme.lineActive, t); ctx.lineWidth = lerpN(0.8, 1.5, t); ctx.stroke();
      };
      ctx.lineCap = 'butt';
      for (let row = 0; row < rows; row++) for (let col = 0; col < cols - 1; col++) seg(pts[row][col], pts[row][col + 1]);
      for (let col = 0; col < cols; col++) for (let row = 0; row < rows - 1; row++) seg(pts[row][col], pts[row + 1][col]);

      for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
        const p = pts[row][col], t = p.proximity * p.proximity * (3 - 2 * p.proximity), r = lerpN(NODE_BASE_RADIUS, NODE_ACTIVE_RADIUS, t);
        if (t > 0.3) {                                              // glow ring on active nodes
          const glowR = r + lerpN(0, 6, (t - 0.3) / 0.7), grd = ctx.createRadialGradient(p.x, p.y, r * 0.5, p.x, p.y, glowR);
          grd.addColorStop(0, `rgba(${theme.glow},${(t * 0.3).toFixed(3)})`); grd.addColorStop(1, `rgba(${theme.glow},0)`);
          ctx.beginPath(); ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2); ctx.fillStyle = grd; ctx.fill();
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fillStyle = lerpColor(theme.nodeBase, theme.nodeActive, t); ctx.fill();
      }

      for (const r of ripples) {
        ctx.beginPath(); ctx.arc(r.x, r.y, Math.max(0, r.radius), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${theme.ripple},${(r.opacity * 0.28).toFixed(3)})`; ctx.lineWidth = 1.5; ctx.stroke();
      }
    };

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (document.hidden || (coarse && (tick++ & 1))) return;     // background tab / half rate on phones
      const moving = Math.abs(target.x - mouse.x) > 0.1 || Math.abs(target.y - mouse.y) > 0.1;
      if (moving) { mouse.x = lerpN(mouse.x, target.x, LERP_SPEED); mouse.y = lerpN(mouse.y, target.y, LERP_SPEED); }
      else { mouse.x = target.x; mouse.y = target.y; }
      if (!moving && !ripples.length && !dirty) return;            // nothing changed: keep the last frame, cost ≈ 0
      if (window.__hzCovered) { dirty = true; return; }            // hidden behind the full-bleed hero
      dirty = false; draw(now);
    };

    const onMove = (e) => {
      if (mouse.x === -9999) { mouse.x = e.clientX; mouse.y = e.clientY; }   // first move: start under the pointer
      target.x = e.clientX; target.y = e.clientY;
    };
    const onDown = (e) => ripples.push({ x: e.clientX, y: e.clientY, radius: 0, opacity: 1, born: performance.now() });

    setSize();
    addEventListener('resize', setSize);
    if (!reduce) { addEventListener('pointermove', onMove, { passive: true }); addEventListener('pointerdown', onDown, { passive: true }); }
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', setSize); removeEventListener('pointermove', onMove); removeEventListener('pointerdown', onDown);
    };
  }, [globalColor]);

  const canvas = <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 w-full h-full z-0 pointer-events-none" />;
  if (children == null) return canvas;
  return (
    <div className={`relative w-full min-h-screen overflow-hidden ${className}`} style={{ background: (THEMES[globalColor] || THEMES.green).bg }}>
      {canvas}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
