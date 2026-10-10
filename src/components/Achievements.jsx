import { useRef, useState } from 'react';
import { Reveal } from '../reveal';
import { Img } from './Img';
import Lightbox from './Lightbox';
import { achievements } from '../data';
import { hash } from '../utils';

// An ID badge: tilts and catches the light with the cursor; flips over to show its certificates.
function Badge({ a, onPreview }) {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef(null);
  // a certificate can be a plain link string, or { label, image?, link? }
  const certs = (a.certificates || []).map((c) => (typeof c === 'string' ? { label: 'Certificate', link: c } : c));
  const set = (k, v) => ref.current.style.setProperty(k, v);

  const onMove = (e) => {
    if (e.pointerType === 'touch') return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    set('--rx', (0.5 - y) * 12 + 'deg'); set('--ry', (x - 0.5) * 14 + 'deg');
    set('--sx', x * 100 + '%'); set('--sy', y * 100 + '%'); set('--glow', 1);
  };
  const onLeave = () => { set('--rx', '0deg'); set('--ry', '0deg'); set('--glow', 0); };

  const flipBtn = (label, face) => (
    <button type="button" className="bd-flip-btn" tabIndex={(face === 'back') === flipped ? 0 : -1}
      aria-pressed={flipped} onClick={() => setFlipped((f) => !f)}>
      {label}<span className="material-symbols-outlined" aria-hidden="true">{face === 'back' ? 'undo' : 'flip'}</span>
    </button>
  );

  return (
    <div className={'bd' + (flipped ? ' flipped' : '')} ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="bd-tilt">
        <div className="bd-flip">
          <div className="bd-face bd-front" aria-hidden={flipped}>
            <span className="bd-slot" />
            <div className="bd-emblem">
              {a.img
                ? <Img src={a.img} alt="" loading="lazy" fallback={<span className="material-symbols-outlined" aria-hidden="true">{a.icon}</span>} />
                : <span className="material-symbols-outlined" aria-hidden="true">{a.icon}</span>}
            </div>
            <div className="bd-title">{a.title}</div>
            <div className="bd-org">{a.org}{a.year ? ` · ${a.year}` : ''}</div>
            <p className="bd-text">{a.text}</p>
            <div className="bd-foot">
              <span className="bd-id">ID {hash(a.title)}</span>
              {certs.length > 0 && flipBtn(`${certs.length} certificate${certs.length > 1 ? 's' : ''}`, 'front')}
            </div>
            <span className="bd-bars" aria-hidden="true" />
            <span className="bd-sheen" aria-hidden="true" />
          </div>
          <div className="bd-face bd-back" aria-hidden={!flipped}>
            <span className="bd-slot" />
            <div className="bd-back-title">{a.title}</div>
            <div className="bd-certs">
              {certs.map((c) => c.image ? (
                <button key={c.label + c.image} type="button" className="bd-cert" tabIndex={flipped ? 0 : -1}
                  onClick={() => onPreview({ title: `${a.title} — ${c.label}`, image: 'achievements/' + c.image, link: c.link })}>
                  <Img src={'achievements/' + c.image} alt="" loading="lazy" fallback={<span className="material-symbols-outlined" aria-hidden="true">image</span>} />
                  <span>{c.label}</span>
                </button>
              ) : (
                <a key={c.label + c.link} href={c.link} target="_blank" rel="noopener noreferrer" className="bd-cert" tabIndex={flipped ? 0 : -1}>
                  <span className="material-symbols-outlined" aria-hidden="true">open_in_new</span><span>{c.label}</span>
                </a>
              ))}
            </div>
            <div className="bd-foot">{flipBtn('Flip back', 'back')}</div>
            <span className="bd-sheen" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Achievements() {
  const [open, setOpen] = useState(null);
  return (
    <section id="achievements">
      <div className="ach-outer">
        <Reveal>
          <div className="section-label">Recognition</div>
          <h2 className="section-title">ACHIEVEMENTS</h2>
        </Reveal>
        <Reveal className="bd-grid stagger">
          {achievements.map((a) => <Badge key={a.title} a={a} onPreview={setOpen} />)}
        </Reveal>
      </div>
      {open && <Lightbox item={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
