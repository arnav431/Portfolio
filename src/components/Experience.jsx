import { useId, useRef, useState } from 'react';
import { Reveal } from '../reveal';
import { experience } from '../data';
import { hash } from '../utils';
import { Img } from './Img';
import Lightbox from './Lightbox';

// Each role type is a "branch" with its own lane + colour in the graph.
const LANES = { research: 0, leadership: 1, opensource: 2 };
const BRANCHES = [['all', 'all'], ['research', 'research'], ['leadership', 'leadership'], ['opensource', 'open-source']];

function months(start, end) {
  const [sy, sm] = start.split('-').map(Number);
  const [ey, em] = end ? end.split('-').map(Number) : [new Date().getFullYear(), new Date().getMonth() + 1];
  return Math.max(1, (ey - sy) * 12 + (em - sm) + 1);
}
const fmt = (m) => (m < 12 ? `${m} mo` : `${Math.floor(m / 12)} yr${m % 12 ? ` ${m % 12} mo` : ''}`);

// newest first, like `git log`
const commits = [...experience]
  .sort((a, b) => b.start.localeCompare(a.start) || (b.end || '9999').localeCompare(a.end || '9999'))
  .map((e) => ({ ...e, id: hash(e.role + e.co), lane: LANES[e.type] ?? 0 }));

function Commit({ c, open, dim, onToggle, onPreview }) {
  const bodyId = useId();
  const spot = (ev) => {
    const r = ev.currentTarget.getBoundingClientRect();
    ev.currentTarget.style.setProperty('--mx', ev.clientX - r.left + 'px');
    ev.currentTarget.style.setProperty('--my', ev.clientY - r.top + 'px');
  };
  return (
    <div className={'gl-row' + (open ? ' open' : '') + (dim ? ' dim' : '')} data-lane={c.lane} style={{ '--lane': c.lane }} onMouseMove={spot}>
      <span className="gl-graph" aria-hidden="true">
        {[0, 1, 2].map((l) => <i key={l} className={`gl-lane l${l}${l === c.lane ? ' on' : ''}`} />)}
        <u className="gl-stub" />
        <b className="gl-node" />
      </span>
      <button type="button" className="gl-head" aria-expanded={open} aria-controls={bodyId} onClick={onToggle}>
        <span className="gl-hash">{c.id}</span>
        <span className="gl-main">
          <span className="gl-role">{c.role}</span>
          <span className="gl-co">@ {c.co}</span>
        </span>
        {c.promotedFrom && <span className="gl-promo">↑ promoted from {c.promotedFrom}</span>}
        {!c.end && <span className="gl-live">active</span>}
        <span className="gl-meta"><span>{c.date}</span><span className="gl-dur">{fmt(months(c.start, c.end))}</span></span>
        <span className="gl-branch">{c.type === 'opensource' ? 'open-source' : c.type}</span>
        <span className="material-symbols-outlined gl-chev" aria-hidden="true">expand_more</span>
      </button>
      <div className="gl-body" id={bodyId} role="region">
        <div className="gl-inner">
          <p className="gl-intro">{c.intro}</p>
          <div className="gl-diff">
            {c.points.map((p, i) => (
              <div key={p} className="gl-line" style={{ '--i': i }}>
                <span className="gl-ln">{String(i + 1).padStart(2, '0')}</span>
                <span className="gl-plus">+</span>
                <span>{p}</span>
              </div>
            ))}
          </div>
          <div className="gl-stat">{c.points.length} highlights · {c.tags.length} technologies</div>
          <div className="gl-tags">{c.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
          {c.certificates?.length > 0 && (
            <div className="gl-certs">
              {c.certificates.map((x) => x.image ? (
                <button key={x.label + x.image} type="button" className="gl-cert" tabIndex={open ? 0 : -1}
                  onClick={() => onPreview({ title: `${c.role} — ${x.label}`, image: 'experience/' + x.image, link: x.link })}>
                  <Img src={'experience/' + x.image} alt="" fallback={<span className="material-symbols-outlined" aria-hidden="true">workspace_premium</span>} />
                  <span>{x.label}</span>
                  <span className="material-symbols-outlined gl-cert-arrow" aria-hidden="true">north_east</span>
                </button>
              ) : (
                <a key={x.label + x.link} href={x.link} target="_blank" rel="noopener noreferrer" className="gl-cert" tabIndex={open ? 0 : -1}>
                  <span className="material-symbols-outlined" aria-hidden="true">open_in_new</span><span>{x.label}</span>
                  <span className="material-symbols-outlined gl-cert-arrow" aria-hidden="true">north_east</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const [branch, setBranch] = useState('all');
  const [open, setOpen] = useState(() => new Set([commits[0].id]));
  const [preview, setPreview] = useState(null);
  const log = useRef(null);
  const toggle = (id) => setOpen((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const allOpen = open.size === commits.length;

  const onKey = (ev) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(ev.key)) return;
    const heads = [...log.current.querySelectorAll('.gl-head')];
    const i = heads.indexOf(document.activeElement);
    if (i < 0) return;
    ev.preventDefault();
    const n = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: heads.length - 1 }[ev.key];
    heads[Math.min(heads.length - 1, Math.max(0, n))].focus();
  };

  return (
    <section id="experience">
      <div className="gl">
        <Reveal>
          <div className="section-label">Career log</div>
          <h2 className="section-title">EXPERIENCE</h2>
        </Reveal>
        <Reveal className="gl-win">
          <div className="gl-bar">
            <div className="t-bar">{['#ff3c5f', '#ffd600', '#00ff9f'].map((c) => <div key={c} className="t-dot" style={{ background: c }} />)}</div>
            <span className="gl-title">arnav@hw:~/career$ git log --graph --all</span>
          </div>
          <div className="gl-tools">
            <div className="gl-branches" role="group" aria-label="Filter by branch">
              {BRANCHES.map(([id, label]) => {
                const n = id === 'all' ? commits.length : commits.filter((c) => c.type === id).length;
                return (
                  <button key={id} type="button" className={'gl-chip' + (id !== 'all' ? ` b${LANES[id]}` : '')}
                    aria-pressed={branch === id} onClick={() => setBranch(id)}>
                    {label}<sup>{n}</sup>
                  </button>
                );
              })}
            </div>
            <button type="button" className="gl-all" onClick={() => setOpen(allOpen ? new Set() : new Set(commits.map((c) => c.id)))}>
              {allOpen ? 'Collapse all' : 'Expand all'}
            </button>
          </div>
          <div className="gl-log" ref={log} onKeyDown={onKey}>
            {commits.map((c) => (
              <Commit key={c.id} c={c} open={open.has(c.id)} dim={branch !== 'all' && c.type !== branch} onToggle={() => toggle(c.id)} onPreview={setPreview} />
            ))}
          </div>
          {preview && <Lightbox item={preview} onClose={() => setPreview(null)} />}
          <div className="gl-foot"><span className="t-prompt">arnav@hw</span>:~/career$ <span className="t-cursor" /></div>
        </Reveal>
      </div>
    </section>
  );
}
