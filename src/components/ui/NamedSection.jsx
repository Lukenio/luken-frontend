import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';

const Header = styled(Flex)`
  font-size: 20px;
  line-height: 20px;
  margin: 0;
  padding: 8px 20px;
  border-bottom: 1px solid #eee;
`;

const HeaderTitle = styled.p`
  font-weight: bold;
`;

const Footer = styled.section`
  background: #f6f6f6;
  padding: 8px 20px;
  font-size: 17px;
  line-height: 17px;
  border-bottom-right-radius: inherit;
  border-bottom-left-radius: inherit;
`;

const WrapBox = styled(Box)`
  background: #fff;
  border-radius: 5px;
`;

const NamedSection = ({ title, options, footer, children, ...other }) => (
  <WrapBox mb={30} {...other}>
    <Header justifyContent="space-between" alignItems="center">
      <HeaderTitle>{title}</HeaderTitle>
      {options}
    </Header>
    <Flex align="baseline">{children}</Flex>
    {footer && <Footer>{footer}</Footer>}
  </WrapBox>
);

export default NamedSection;
