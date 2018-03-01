import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

import { cssUnit } from '../cssUtils.js';

const background = ({ to, from }) =>
  to && from ? `linear-gradient(to bottom, ${to}, ${from})` : '#EEEEEE';

const GradientedOverlaySection = styled(Flex)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: ${background};
  border-radius: ${({ roundness }) => (roundness ? cssUnit(roundness) : 0)};
  opacity: ${({ opacity }) => opacity || 0.51};
  ${'' /* transition: all 0.33s; */};
`;

const ZIndexedSection = styled.section`
  z-index: 1;
  border-radius: ${({ roundness }) => (roundness ? cssUnit(roundness) : 0)};
`;

const GradientedOverlay = ({ children, ...other }) => (
  <Fragment>
    <ZIndexedSection {...other}>{children}</ZIndexedSection>
    <GradientedOverlaySection {...other} />
  </Fragment>
);

export default GradientedOverlay;
