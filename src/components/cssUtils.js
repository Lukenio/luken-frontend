export function cssUnit(v = '') {
  if (!(typeof v === 'string')) {
    v = v.toString();
  }

  return v.includes('px') || v.includes('%') ? v : `${v}px`;
}
