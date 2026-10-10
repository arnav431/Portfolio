import { useEffect, useState } from 'react';

const LINKS = ['about', 'skills', 'projects', 'education', 'experience', 'achievements', 'contact'];

export default function Nav({ showLogo }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 60);
    addEventListener('scroll', onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0, rootMargin: '-45% 0px -50% 0px' }
    );
    document.querySelectorAll('section[id]').forEach((s) => io.observe(s));
    return () => { removeEventListener('scroll', onScroll); io.disconnect(); };
  }, []);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div id="nav-logo-title" className={'nav-logo' + (showLogo ? ' show' : '')}>Arnav Khajuria</div>
      <div className="nav-links">
        {LINKS.map((id) => (
          <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>
            {id[0].toUpperCase() + id.slice(1)}
          </a>
        ))}
      </div>
    </nav>
  );
}
