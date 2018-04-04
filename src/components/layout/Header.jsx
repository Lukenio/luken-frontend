import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Flex, Box } from 'grid-styled';
import { PlaceholderImage } from '../ui/Placeholders';
import { HeaderMenuIcon } from '../ui/SVGIcons';
import SVGContainer from '../ui/SVGContainer';

import { handleSideMenuToggle } from '../../actions/ui';
import { authLogoutAndRedirect } from '../../actions/auth';

const StyledFlex = styled(Flex)`
  background: #fff;
`;

const Title = styled.span`
  height: 22px;
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  margin-left: 10px;
`;

const FullNameBox = styled(Box)`
  /* Kevin Ferguson: */
  font-weight: 500;
  font-size: 14px;
  color: #9b9b9b;
  letter-spacing: 0;
  text-align: center;
  line-height: 22px;
`;

const UserDropDownBox = ({ fullName = 'Loading', onClick }) => (
  <Flex alignItems="center" onClick={onClick}>
    <PlaceholderImage pointer size={45} mr="7px" />
    <FullNameBox>{fullName}</FullNameBox>
  </Flex>
);

const Header = ({
  className,
  fullName,
  title = 'Logo',
  handleSideMenuToggle,
  hadleLogout,
  ...other
}) => {
  return (
    <StyledFlex
      alignItems="center"
      justifyContent="space-between"
      py={17}
      px={30}
      width={1}
      {...other}
    >
      <Flex alignItems="center" flexDirection="row">
        <SVGContainer w={20} h={13} mr={30} onClick={handleSideMenuToggle}>
          <HeaderMenuIcon />
        </SVGContainer>
        <PlaceholderImage size={45} />
        <Title>{title}</Title>
      </Flex>
      <UserDropDownBox fullName={fullName} onClick={hadleLogout} />
    </StyledFlex>
  );
};

const fn = userData => `${userData.first_name} ${userData.last_name}`;

const mapStateToProps = state => ({
  fullName: fn(state.userAccount)
});

const mapDispatchToProps = {
  handleSideMenuToggle,
  hadleLogout: authLogoutAndRedirect
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
