import { useState } from 'react';
import { Reveal } from '../reveal';
import { Img } from './Img';
import { HexBg, NetworkSvg, CircuitSvg, OrbitSvg } from './svgs';
import { profile, skills, projects, education, certs } from '../data';

const Tags = ({ items, cls = '' }) => items.map((t) => <span key={t} className={('tag ' + cls).trim()}>{t}</span>);
const Heading = ({ label, children }) => (
  <Reveal>
    <div className="section-label">{label}</div>
    <h2 className="section-title">{children}</h2>
  </Reveal>
);
const Arrow = () => <span className="material-symbols-outlined" aria-hidden="true">arrow_right_alt</span>;
const Prompt = () => <span className="t-prompt">arnav@hw</span>;

export function About() {
  const ac = { color: 'var(--acid)' };
  return (
    <section id="about">
      <div className="about-grid">
        <Reveal className="reveal-left">
          <div className="section-label">About</div>
          <h2 className="section-title">BUILDING<br />AT THE<br />EDGE</h2>
          <div className="about-text">
            <p>Computer Science student at MIET Jammu with a minor in Cyber Security, interested in how intelligent and quantum systems can be made reliable and secure.</p>
            <p>Completed a summer research internship at IIIT Sri City (Jun–Aug 2026), building an entanglement-based quantum image descriptor, and serves as Technical Manager of the ACM Student Chapter (ACMSC MIET).</p>
            <p>I learn by shipping: security tools, AI-powered web apps, quantum circuits, CTFs and workshops.</p>
          </div>
        </Reveal>
        <Reveal className="reveal-right">
          <div className="about-terminal">
            <div className="t-bar">
              {['#ff3c5f', '#ffd600', '#00ff9f'].map((c) => <div key={c} className="t-dot" style={{ background: c }} />)}
            </div>
            <div><Prompt />:~$ whoami</div>
            <div style={{ color: '#fff' }}>arnav-khajuria // sec-engineer & quantum-ml dev</div><br />
            <div><Prompt />:~$ cat interests.json</div>
            <div><span className="t-comment">{'{'}</span></div>
            <div>&nbsp;&nbsp;<span className="t-val">"focus"</span>: <span className="t-comment">[</span><span style={ac}>"net-sec"</span>, <span style={ac}>"quantum-cv"</span>, <span style={ac}>"adversarial-ml"</span><span className="t-comment">]</span>,</div>
            <div>&nbsp;&nbsp;<span className="t-val">"recent"</span>: <span style={ac}>"Research Intern @ IIIT Sri City"</span>,</div>
            <div>&nbsp;&nbsp;<span className="t-val">"status"</span>: <span style={ac}>"available"</span></div>
            <div><span className="t-comment">{'}'}</span></div><br />
            <div><Prompt />:~$ <span className="t-cursor" /></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills">
      <HexBg />
      <div className="skills-outer">
        <Heading label="Capabilities">DOMAIN<br />EXPERTISE</Heading>
        <Reveal className="skill-domains stagger">
          {skills.map((s) => (
            <div key={s.title} className={'skill-card' + (s.red ? ' red-domain' : '')}>
              <div className="skill-icon"><span className="material-symbols-outlined" aria-hidden="true">{s.icon}</span></div>
              <div className="skill-domain">{s.title}</div>
              <div className="skill-desc">{s.desc}</div>
              <div className="skill-tags"><Tags items={s.tags} /></div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects">
      <div className="projects-outer">
        <Heading label="Work">SELECTED<br />PROJECTS</Heading>
        <Reveal className="projects-grid stagger">
          {projects.map((p, i) => {
            const body = (
              <div>
                <div className="project-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="project-title">{p.title}</div>
                <div className="project-desc">{p.desc}</div>
                <div className="project-stack"><Tags items={p.stack} /></div>
                {p.link
                  ? <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link">View Project <Arrow /></a>
                  : <span className="project-link" style={{ color: 'var(--dim)' }}>{p.meta}</span>}
              </div>
            );
            return p.featured ? (
              <div key={p.title} className="project-card featured">
                {body}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><NetworkSvg /></div>
              </div>
            ) : <div key={p.title} className="project-card">{body}</div>;
          })}
        </Reveal>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education">
      <CircuitSvg />
      <div className="edu-outer">
        <Heading label="Education">ACADEMIC<br />FOUNDATION</Heading>
        <Reveal className="edu-grid stagger">
          <div className="edu-card featured">
            <div>
              <div className="edu-num">01</div>
              <div className="edu-degree">B.TECH — COMPUTER SCIENCE &amp; ENGINEERING</div>
              <div className="edu-institution">// Model Institute of Engineering &amp; Technology, Jammu</div>
              <div className="edu-meta"><span>Sep 2024 — May 2028</span><span>Minor: Cyber Security</span></div>
              <p className="edu-desc">Building secure, intelligent systems across cybersecurity, AI and quantum computing, with hands-on work in vulnerability detection, quantum cryptography and AI-driven applications.</p>
              <ul className="edu-highlights">
                <li>Technical Manager (promoted from Web Master), ACM Student Chapter MIET: leads the chapter's technical work and mentors juniors.</li>
                <li>Google Student Ambassador: organized workshops and events promoting developer tech on campus.</li>
              </ul>
              <div className="edu-tags"><Tags items={['Algorithms', 'Data Structures', 'OS Internals', 'Computer Organization & Architecture', 'Object Oriented Programming']} /></div>
            </div>
            <div className="edu-visual"><OrbitSvg /></div>
          </div>

          {education.map((e, i) => (
            <div key={e.degree} className="edu-card wide">
              <div className="edu-num">{String(i + 2).padStart(2, '0')}</div>
              <div className="edu-degree">{e.degree}</div>
              <div className="edu-institution">// {e.inst}</div>
              <div className="edu-meta">{e.meta.map((m) => <span key={m}>{m}</span>)}</div>
              <p className="edu-desc">{e.desc}</p>
              {e.highlights && <ul className="edu-highlights">{e.highlights.map((h) => <li key={h}>{h}</li>)}</ul>}
            </div>
          ))}

        </Reveal>

        <Reveal style={{ marginTop: '1rem' }}>
          <div className="certs-label">Certifications</div>
          <Reveal className="certs-grid stagger">
            {certs.map((c) => {
              const card = (
                <div className="cert-card">
                  <div className="cert-status" />
                  <div className="cert-icon">
                    {c.img ? <Img src={c.img} alt={c.issuer} fallback={<span className="material-symbols-outlined" style={{ color: 'var(--acid)' }} aria-hidden="true">verified</span>} /> : <span className="material-symbols-outlined" style={{ color: 'var(--acid)' }} aria-hidden="true">{c.icon}</span>}
                  </div>
                  <div className="cert-name">{c.name}</div>
                  <div className="cert-issuer">// {c.issuer}</div>
                  <div className="cert-year">{c.tag}</div>
                </div>
              );
              return c.url ? <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer">{card}</a> : <div key={c.name}>{card}</div>;
            })}
          </Reveal>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(profile.email).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }).catch(() => {});
  };
  const icons = { GitHub: 'fa-brands fa-github', LinkedIn: 'fa-brands fa-linkedin-in', Instagram: 'fa-brands fa-instagram' };
  return (
    <section id="contact">
      <Reveal className="contact-inner reveal">
        <div className="section-label" style={{ justifyContent: 'center' }}>Contact</div>
        <div className="contact-big">LET'S<br />BUILD<br /><span>TOGETHER</span></div>
        <a href={`mailto:${profile.email}`} className="contact-mail" onClick={copy}>{copied ? 'Copied to clipboard' : profile.email}</a>
        <div className="contact-links">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.url} className="contact-link" target="_blank" rel="noopener noreferrer">
              <i className={icons[s.label]} />{s.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-custom-green/20 pt-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="relative w-16 h-16 bg-black border-gray-700 border-2 rounded-lg overflow-hidden group transition-transform duration-300 hover:scale-125">
              <a href="https://hack-wolves.vercel.app/" target="_blank" rel="noopener noreferrer">
                <Img src="hackwolf.png" alt="Wolf Logo" fallback={<span className="img-fallback">HW</span>} className="w-[200%] h-[200%] object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-0 transition-all duration-300" />
                <Img src="hackwolf.gif" alt="Wolf Animation" className="w-[200%] h-[200%] object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </a>
            </div>
            <div className="h-12 w-px bg-gray-700 mx-3" />
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold leading-none text-white" style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}>Arnav<span style={{ color: '#00ff9f' }}>Khajuria</span></h3>
              <p className="text-sm text-gray-400 italic mt-[2px]">—A HackWolves Member</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm mx-4">&copy; 2026 HackWolves. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
