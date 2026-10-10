import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Img } from './Img';

// item: { title, image: 'folder/file.jpg' (inside public/images/), link? }
export default function Lightbox({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);
  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <div className="lightbox-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close preview" autoFocus>×</button>
        <Img src={item.image} alt={item.title}
          fallback={<p className="lightbox-miss">Image not found: public/images/{item.image}</p>} />
        <div className="lightbox-bar">
          <span>{item.title}</span>
          {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer">Open original</a>}
        </div>
      </div>
    </div>,
    document.body
  );
}
