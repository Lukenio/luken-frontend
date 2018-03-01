import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

const WrapFlex = styled(Flex)`
  background: #9b9b9b;
`;

const SideNavigation = ({ isOpen }) => (
  <WrapFlex width={isOpen ? 200 : 100}> </WrapFlex>
);

export default SideNavigation;
