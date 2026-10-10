// Short deterministic id (looks like a git hash) from any string.
export const hash = (s) => {
  let h = 5381;
  for (const c of s) h = ((h << 5) + h + c.charCodeAt(0)) >>> 0;
  return h.toString(16).padStart(8, '0').slice(0, 7);
};
