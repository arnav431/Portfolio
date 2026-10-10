import { useState } from 'react';

// All images live in public/images/. BASE_URL keeps paths valid on subpath hosting (GitHub Pages etc).
export const asset = (file) => `${import.meta.env.BASE_URL}images/${file}`;

export function Img({ src, alt, fallback = null, ...rest }) {
  const [failed, setFailed] = useState(false);
  if (failed) return fallback;
  return <img src={asset(src)} alt={alt} onError={() => setFailed(true)} {...rest} />;
}
