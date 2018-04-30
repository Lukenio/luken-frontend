import styled, { css } from 'styled-components';
import { Box } from 'grid-styled';
import { cssUnit } from '../cssUtils';

const SVGContainer = styled(Box)`
  position: relative;
  background: transparent;
  height: ${({ h }) => (h ? cssUnit(h) : 'inherit')};

  > svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  ${props => props.fill && css`
    > svg path {
      fill: ${props.fill};
    }
  `}
`;

export default SVGContainer;
