import { css } from 'styled-components';

export function cssUnit(v = '') {
  if (!(typeof v === 'string')) {
    v = v.toString();
  }

  return v.includes('px') || v.includes('%') ? v : `${v}px`;
}

export const hide = () => css`
  display: none;
  visibility: hidden;
`;

export const show = () => css`
  display: block;
  visibility: visible;
`;
