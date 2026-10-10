import { useEffect, useRef } from 'react';

// Adds the `visible` class once the element scrolls into view (CSS handles the transition).
export function Reveal({ as: Tag = 'div', className = 'reveal', children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); io.disconnect(); }
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={className} {...rest}>{children}</Tag>;
}
