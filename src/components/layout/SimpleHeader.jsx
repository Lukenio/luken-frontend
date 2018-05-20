import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

const StyledFlex = styled(Flex)`
  background: #fff;
`;

const Logo = styled.img`
  display: block;
  width: auto;
  height: 45px;
`;

const SimpleHeader = () => {
  return (
    <StyledFlex
      alignItems="center"
      justifyContent="space-between"
      py={17}
      px={30}
      width={1}
    >
      <Flex alignItems="center" flexDirection="row">
        <a href="https://loanz.io/">
          <Logo src="/logo.png" alt="Loanz logo" />
        </a>
      </Flex>
    </StyledFlex>
  );
};

export default SimpleHeader;
