import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

const StyledAnchor = styled.a`
  color: #9b9b9b;
  text-decoration: none;
  margin-right: 15px;
`;

const StyledFlex = styled(Flex)`
  height: 19px;
  font-size: 12px;
  color: #9b9b9b;
  letter-spacing: 0;
  line-height: 19px;
  align-self: flex-end;
`;

const Footer = ({ className }) => (
  <StyledFlex
    className={className}
    justifyContent="space-between"
    alignItems="center"
    width={1}
    mt={25}
  >
    <Flex alignItems="center">
      <StyledAnchor href="https://loanz.io/privacy-policy/">Privacy</StyledAnchor>
      <StyledAnchor href="https://loanz.io/terms-of-service/">Terms of Service</StyledAnchor>
      <StyledAnchor href="https://loanz.io/contact-support/">Support</StyledAnchor>
      <StyledAnchor href="https://loanz.io/contact-support/">Contact Us</StyledAnchor>
    </Flex>
    <span>
      © {new Date().getFullYear()} Loanz.io. All rights reserved.
    </span>
  </StyledFlex>
);

export default Footer;
