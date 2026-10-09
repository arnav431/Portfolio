import { useEffect, useRef, useState } from 'react';
import { profile } from '../data';
import { Img } from './Img';
import { BAT } from '../batFrames';

function SocialFab() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const close = (e) => !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);
  return (
    <div className={'social-fab' + (open ? ' open' : '')} ref={ref}>
      <button type="button" className="social-drop" aria-label="Open social links" aria-expanded={open}
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}>
        <span className="material-symbols-outlined" aria-hidden="true">arrow_forward_ios</span>
      </button>
      <div className="social-links-pop" aria-label="Social links">
        {profile.socials.map((s) => (
          <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="social-link-btn" aria-label={s.label}>
            <span className={`fa-brands ${s.icon} social-link-btn-txt`} aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Hero({ onCollapse }) {
  const batRef = useRef(null), track = useRef(null), stage = useRef(null), content = useRef(null), glitch = useRef(null);

  // Scroll-driven zoom-out: the frame shrinks, content fades, and the photo grows until only it remains.
  useEffect(() => {
    const st = stage.current, tr = track.current, ct = content.current;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lerp = (a, b, t) => a + (b - a) * t;
    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const ease = (t) => t * t * t * (t * (t * 6 - 15) + 10);   // smootherstep
    // ---- bat: pixel art drawn on a canvas (crisp at any zoom, cheap per frame) ----
    const cv = batRef.current, ctx = cv.getContext('2d'), dpr = Math.min(2, window.devicePixelRatio || 1);
    let bs = 4, fi = 0, side = 0, s1 = 8, inView = true, rafBat = 0;
    const drawBat = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      const f = BAT.frames[fi].px, sc = bs * dpr, ox = cv.width / 2 - (BAT.W / 2) * sc, oy = cv.height / 2 - (BAT.H / 2) * sc;
      for (let i = f.length - 3; i >= 0; i -= 3) {                    // later shadows sit under earlier ones
        const x0 = Math.round(ox + (f[i] - BAT.X0) * sc), y0 = Math.round(oy + (f[i + 1] - BAT.Y0) * sc);
        ctx.fillStyle = BAT.palette[f[i + 2]];
        ctx.fillRect(x0, y0, Math.round(ox + (f[i] + 1 - BAT.X0) * sc) - x0, Math.round(oy + (f[i + 1] + 1 - BAT.Y0) * sc) - y0);
      }
    };
    const placeBat = (scale, cx, cy) => { bs = scale; cv.style.left = cx - side / 2 + 'px'; cv.style.top = cy - side / 2 + 'px'; drawBat(); };
    const frameAt = (t) => { const pct = (((t / 1000) % BAT.duration) / BAT.duration) * 100; let k = 0; BAT.frames.forEach((f, i) => { if (f.at <= pct) k = i; }); return k; };
    const loop = (t) => { const k = frameAt(t); if (k !== fi && inView) { fi = k; drawBat(); } rafBat = requestAnimationFrame(loop); };
    let W, H, M0, S, PS, narrow, tablet, target = 0, cur = 0, raf = 0, collapsed = false;

    const apply = (p) => {
      const e = ease(p), g = ease(clamp((p - 0.28) / 0.72)), cv = clamp(1 - p / 0.42);
      const mx = lerp(M0, (W - S) / 2, e), my = lerp(M0, (H - S) / 2, e), fw = W - 2 * mx, fh = H - 2 * my;
      // photo box: starts at its place inside the hero, ends covering the whole frame
      const right = tablet ? 24 : clamp(W * 0.06, 32, 160);
      const startL = narrow ? 16 : fw - right - PS;
      const startT = narrow ? 100 : tablet ? 88 : fh * 0.42 - PS / 2;
      const set = (k, v) => st.style.setProperty(k, v);
      set('--mx', mx + 'px'); set('--my', my + 'px'); set('--r', lerp(0, Math.min(48, S * 0.12), e) + 'px');
      set('--e', e.toFixed(4)); set('--g', g.toFixed(4)); set('--cv', cv.toFixed(4));
      set('--pl', startL + 'px'); set('--pt', startT + 'px'); set('--pw', PS + 'px'); set('--ph', PS + 'px');   // photo stays put and fades
      // bat: starts where it always sat, then drifts to the centre of the frame while zooming in
      const s0 = narrow ? 2.2 : tablet ? 3 : 4;
      const scale = s0 * Math.pow(s1 / s0, g);
      const c0x = narrow ? fw - 80 : tablet ? fw - 105 : fw * 0.56, c0y = narrow ? 176 : tablet ? 373 : fh * 0.7;
      const bcx = lerp(c0x, fw / 2, g), bcy = lerp(c0y, fh / 2, g);
      placeBat(scale, bcx, bcy);
      ct.classList.toggle('hz-gone', cv <= 0.02);
      const c = p > 0.4;
      if (c !== collapsed) { collapsed = c; onCollapse(c); }   // nav logo appears once the title has faded
    };
    const progress = () => clamp(-tr.getBoundingClientRect().top / ((tr.offsetHeight - H) * 0.86));
    const measure = () => {
      W = st.clientWidth; H = st.clientHeight; narrow = W < 700; tablet = W < 900;
      M0 = 0;                                                                         // full-bleed at load
      S = narrow ? Math.min(W * 0.8, H * 0.5) : Math.min(W * 0.5, H * 0.66);          // final photo square
      PS = narrow ? 92 : tablet ? 140 : clamp(W * 0.21, 220, 360);                    // photo size at the start
      s1 = (S * 0.8) / Math.max(BAT.W, BAT.H);                                         // final bat zoom
      side = Math.ceil(Math.max(BAT.W, BAT.H) * s1) + 8;
      cv.width = cv.height = Math.round(side * dpr); cv.style.width = cv.style.height = side + 'px';
      apply(0);
      // short screens: shrink only the text blocks (never the padding that keeps them clear of the photo)
      const cs = getComputedStyle(ct), hc = ct.querySelector('.hero-content');
      ct.style.setProperty('--fit', 1);
      const need = hc.offsetHeight;
      const avail = ct.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      ct.style.setProperty('--fit', clamp(avail / need, 0.6, 1).toFixed(3));
    };
    const tick = () => {
      cur += (target - cur) * (reduce ? 1 : 0.12);
      if (Math.abs(target - cur) < 0.0004) cur = target;
      apply(cur);
      raf = cur === target ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => { target = progress(); if (!raf) raf = requestAnimationFrame(tick); };

    measure(); target = cur = progress(); apply(cur);
    if (reduce) { fi = 0; drawBat(); } else rafBat = requestAnimationFrame(loop);
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; }); io.observe(tr);
    addEventListener('scroll', onScroll, { passive: true });
    const ro = new ResizeObserver(() => { measure(); target = cur = progress(); apply(cur); });
    ro.observe(st);
    return () => { removeEventListener('scroll', onScroll); ro.disconnect(); io.disconnect(); cancelAnimationFrame(raf); cancelAnimationFrame(rafBat); };
  }, [onCollapse]);

  // Replay the glitch animation every 7s.
  useEffect(() => {
    const id = setInterval(() => {
      const g = glitch.current; g.style.animation = 'none'; void g.offsetWidth; g.style.animation = '';
    }, 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hz-track" id="home" ref={track}>
      <div className="hz-stage" ref={stage}>
        <div className="hz-frame">
          <div className="hero-grid" />
          <div className="hero-glow" />
          <div className="hero-glow2" />
          <div className="hz-content" ref={content}>
            <div className="hero-content">
              <div className="hero-tag">Open to opportunities &nbsp;</div>
              <h1 ref={glitch} className="hero-name glitch" data-text="ARNAV">ARNAV</h1>
              <div className="hero-sub">Khajuria // Security · Quantum · AI</div>
              <p className="hero-desc">
                I build systems that defend, connect, and think. Full-stack developer who completed a quantum research internship at IIIT Sri City, working across cybersecurity, quantum computing, and machine learning.
              </p>
              <div className="hero-cta">
                <a href="#projects" className="btn-primary">View Projects</a>
                <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  <span className="material-symbols-outlined" aria-hidden="true">download</span>Download CV
                </a>
                <SocialFab />
              </div>
            </div>
          </div>
          <div className="hz-glow" />
          <canvas className="hz-batcv" ref={batRef} aria-hidden="true" />
          <div className="hz-photo">
            <div className="hz-clip">
              <Img src="passport-photo.png" alt="Arnav Khajuria" fallback={<span className="photo-fallback">AK</span>} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
