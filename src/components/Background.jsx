import { useEffect, useRef } from 'react';

const CELL = 52;
const BASE = 'rgba(0,255,159,';
const PULSE = 'rgba(0,207,255,';

// Full-page grid that lights up near the mouse and pulses randomly.
export function GridCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext('2d');
    let W, H, cols, rows, cells = [], raf, timer, lastScroll = 0;

    const resize = () => {
      W = canvas.width = innerWidth; H = canvas.height = innerHeight;
      cols = Math.ceil(W / CELL) + 1; rows = Math.ceil(H / CELL) + 1;
      cells = Array.from({ length: rows }, () => Array.from({ length: cols }, () => ({ energy: 0, pulse: 0 })));
    };
    const onMove = (e) => {
      const col = Math.floor(e.clientX / CELL), row = Math.floor(e.clientY / CELL);
      for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++) {
        const cell = cells[row + dr]?.[col + dc];
        if (cell) cell.energy = Math.min(1, cell.energy + Math.max(0, 1 - Math.hypot(dr, dc) / 2.5) * 0.8);
      }
    };
    const onScroll = () => {
      const sy = scrollY;
      if (Math.abs(sy - lastScroll) > 2) {
        const row = cells[Math.floor((sy % H) / CELL)];
        row?.forEach((c) => { c.energy = Math.min(1, c.energy + 0.3 * Math.random()); });
      }
      lastScroll = sy;
    };
    const spawn = () => {
      const c = cells[Math.floor(Math.random() * rows)]?.[Math.floor(Math.random() * cols)];
      if (c) c.pulse = 1;
      timer = setTimeout(spawn, 600 + Math.random() * 1400);
    };
    const line = (x1, y1, x2, y2, e, nE) => {
      const a = Math.max(e, nE) * 0.5 + 0.028 + e * 0.22;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
      ctx.strokeStyle = BASE + a + ')'; ctx.lineWidth = a > 0.08 ? 0.8 : 0.5; ctx.stroke();
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const cell = cells[r][c], x = c * CELL, y = r * CELL;
        cell.energy *= 0.965; cell.pulse *= 0.94;
        const e = Math.max(cell.energy, cell.pulse * 0.6);
        ctx.beginPath();
        if (e > 0.01) {
          ctx.arc(x, y, 1.2 + e * 2, 0, Math.PI * 2);
          ctx.fillStyle = (cell.pulse > cell.energy ? PULSE : BASE) + (0.4 + e * 0.5) + ')';
        } else { ctx.arc(x, y, 0.8, 0, Math.PI * 2); ctx.fillStyle = 'rgba(0,255,159,0.12)'; }
        ctx.fill();
        if (c < cols - 1) line(x, y, x + CELL, y, e, cells[r][c + 1].energy);
        if (r < rows - 1) line(x, y, x, y + CELL, e, cells[r + 1][c].energy);
      }
      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.85);
      vg.addColorStop(0, 'rgba(5,10,14,0)'); vg.addColorStop(1, 'rgba(5,10,14,0.82)');
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
      raf = requestAnimationFrame(draw);
    };

    resize(); spawn(); draw();
    addEventListener('resize', resize); addEventListener('mousemove', onMove); addEventListener('scroll', onScroll);
    return () => {
      cancelAnimationFrame(raf); clearTimeout(timer);
      removeEventListener('resize', resize); removeEventListener('mousemove', onMove); removeEventListener('scroll', onScroll);
    };
  }, []);
  return <canvas id="grid-canvas" ref={ref} />;
}

// Dot + trailing ring. Hidden on touch devices by CSS.
export function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, raf;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const tick = () => {
      dot.current.style.transform = `translate(calc(-50% + ${mx}px), calc(-50% + ${my}px))`;
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      ring.current.style.transform = `translate(calc(-50% + ${rx}px), calc(-50% + ${ry}px))`;
      raf = requestAnimationFrame(tick);
    };
    addEventListener('mousemove', onMove); tick();
    return () => { cancelAnimationFrame(raf); removeEventListener('mousemove', onMove); };
  }, []);
  return <><div id="cursor" ref={dot} /><div id="cursor-ring" ref={ring} /></>;
}
