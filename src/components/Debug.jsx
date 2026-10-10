import { useEffect, useRef } from 'react';

// Opt-in diagnostics: open the site with ?debug and screen-record while scrolling.
// Prints how the browser is positioning the viewport so a phone-only layout bug can be pinned down.
export default function Debug() {
  const box = useRef(null);
  useEffect(() => {
    const probes = ['svh', 'lvh', 'dvh'].map((u) => {
      const d = document.createElement('div');
      d.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;width:1px;height:100${u}`;
      document.body.appendChild(d); return [u, d];
    });
    const id = setInterval(() => {
      const vv = window.visualViewport, q = (s) => document.querySelector(s);
      const st = q('.hz-stage')?.getBoundingClientRect(), nav = q('nav')?.getBoundingClientRect(), tr = q('.hz-track');
      const f = (n) => Math.round(n);
      box.current.textContent = [
        `scrollY ${f(scrollY)}   inner ${innerWidth}x${innerHeight}`,
        `vv offsetTop ${f(vv.offsetTop)} pageTop ${f(vv.pageTop)} h ${f(vv.height)} scale ${vv.scale.toFixed(2)}`,
        `units  ${probes.map(([u, d]) => u + ' ' + d.offsetHeight).join('  ')}`,
        `stage top ${st ? f(st.top) : '-'} h ${st ? f(st.height) : '-'}   nav top ${nav ? f(nav.top) : '-'}`,
        `track h ${tr ? tr.offsetHeight : '-'}   scrollH ${document.documentElement.scrollHeight}`,
      ].join('\n');
    }, 100);
    return () => { clearInterval(id); probes.forEach(([, d]) => d.remove()); };
  }, []);
  return <pre ref={box} style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 99999, margin: 0, padding: '6px 8px', pointerEvents: 'none',
    font: '11px/1.35 monospace', color: '#00ff9f', background: 'rgba(0,0,0,.82)', whiteSpace: 'pre-wrap' }} />;
}
