import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

const widths = [1, 768, 1024, 1080];

const StyledFlex = styled(Flex)`
  margin-right: ${({ centered }) => (centered ? 'auto' : 'inherit')};
  margin-left: ${({ centered }) => (centered ? 'auto' : 'inherit')};
`;

export const FlexContainer = ({ children, centered, ...other }) => (
  <StyledFlex
    width={widths}
    centered={centered}
    alignItems="flex-start"
    px={[10, 10, 0]}
    {...other}
  >
    {children}
  </StyledFlex>
);
