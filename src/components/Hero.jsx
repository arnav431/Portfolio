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
  const frameRef = useRef(null), rimRef = useRef(null), haloRef = useRef(null), glowRef = useRef(null), photoRef = useRef(null);

  // Scroll-driven zoom-out. Per-frame work is only clip-path / opacity / transform (no layout, no re-wrapping text).
  useEffect(() => {
    const st = stage.current, tr = track.current, ct = content.current, fr = frameRef.current, rim = rimRef.current,
      halo = haloRef.current, glow = glowRef.current, ph = photoRef.current;
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
    const placeBat = (scale, cx, cy) => { bs = scale; cv.style.transform = `translate(${(cx - side / 2).toFixed(1)}px, ${(cy - side / 2).toFixed(1)}px)`; drawBat(); };
    const frameAt = (t) => { const pct = (((t / 1000) % BAT.duration) / BAT.duration) * 100; let k = 0; BAT.frames.forEach((f, i) => { if (f.at <= pct) k = i; }); return k; };
    const loop = (t) => { const k = frameAt(t); if (k !== fi && inView) { fi = k; drawBat(); } rafBat = requestAnimationFrame(loop); };

    let W, H, S, PS, narrow, tablet, trackTop = 0, dist = 1, target = 0, cur = 0, raf = 0, collapsed = false, covered = true;
    window.__hzCovered = true;                                        // lets the background grid pause while the hero hides it

    const apply = (p) => {
      const e = ease(p), g = ease(clamp((p - 0.28) / 0.72)), cvis = clamp(1 - p / 0.42);
      const mx = ((W - S) / 2) * e, my = ((H - S) / 2) * e, r = Math.min(48, S * 0.12) * e;
      fr.style.clipPath = `inset(${my.toFixed(1)}px ${mx.toFixed(1)}px round ${r.toFixed(1)}px)`;   // the shrinking frame
      rim.style.inset = `${my.toFixed(1)}px ${mx.toFixed(1)}px`; rim.style.borderRadius = r.toFixed(1) + 'px';
      rim.style.borderColor = `rgba(0,255,159,${(e * 0.66).toFixed(3)})`;
      halo.style.opacity = e.toFixed(3); glow.style.opacity = g.toFixed(3);
      ct.style.opacity = ph.style.opacity = cvis.toFixed(3);
      ct.style.transform = `translateY(${((1 - cvis) * -28).toFixed(1)}px)`;
      ct.classList.toggle('hz-gone', cvis <= 0.02);
      // bat: starts where it always sat, then drifts to the centre while zooming in
      const s0 = narrow ? 2.2 : tablet ? 3 : 4;
      const c0x = narrow ? W - 80 : tablet ? W - 105 : W * 0.56, c0y = narrow ? 176 : tablet ? 373 : H * 0.7;
      placeBat(s0 * Math.pow(s1 / s0, g), lerp(c0x, W / 2, g), lerp(c0y, H / 2, g));
      const cov = e < 0.02; if (cov !== covered) { covered = cov; window.__hzCovered = cov; }
      const c = p > 0.4;
      if (c !== collapsed) { collapsed = c; onCollapse(c); }   // nav logo appears once the title has faded
    };
    const progress = () => clamp((window.scrollY - trackTop) / dist);   // pure arithmetic: no layout read while scrolling
    const measure = () => {
      W = st.clientWidth; H = st.clientHeight; narrow = W < 700; tablet = W < 900;
      S = narrow ? Math.min(W * 0.8, H * 0.5) : Math.min(W * 0.5, H * 0.66);          // final square
      PS = narrow ? 92 : tablet ? 140 : clamp(W * 0.21, 220, 360);                    // photo size
      s1 = (S * 0.8) / Math.max(BAT.W, BAT.H);                                         // final bat zoom
      side = Math.ceil(Math.max(BAT.W, BAT.H) * s1) + 8;
      cv.width = cv.height = Math.round(side * dpr); cv.style.width = cv.style.height = side + 'px';
      halo.style.width = halo.style.height = Math.round(Math.min(S * 1.9, W, H)) + 'px';   // never wider than the screen (would widen the page on phones)
      const right = tablet ? 24 : clamp(W * 0.06, 32, 160);                            // photo: fixed spot, fades with the text
      ph.style.left = (narrow ? 16 : W - right - PS) + 'px'; ph.style.top = (narrow ? 100 : tablet ? 88 : H * 0.42 - PS / 2) + 'px';
      ph.style.width = ph.style.height = PS + 'px';
      trackTop = tr.getBoundingClientRect().top + window.scrollY; dist = (tr.offsetHeight - H) * 0.86;
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
    return () => { removeEventListener('scroll', onScroll); ro.disconnect(); io.disconnect(); cancelAnimationFrame(raf); cancelAnimationFrame(rafBat); window.__hzCovered = false; };
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
        <div className="hz-halo" ref={haloRef} />
        <div className="hz-frame" ref={frameRef}>
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
          <div className="hz-glow" ref={glowRef} />
          <canvas className="hz-batcv" ref={batRef} aria-hidden="true" />
          <div className="hz-photo" ref={photoRef}>
            <div className="hz-clip">
              <Img src="passport-photo.png" alt="Arnav Khajuria" fallback={<span className="photo-fallback">AK</span>} />
            </div>
          </div>
        </div>
        <div className="hz-rim" ref={rimRef} />
      </div>
    </section>
  );
}
