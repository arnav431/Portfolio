import { useEffect, useRef } from 'react';

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
