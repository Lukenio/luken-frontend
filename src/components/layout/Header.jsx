import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Flex, Box } from 'grid-styled';
import md5 from 'js-md5';
import { HeaderMenuIcon } from '../ui/SVGIcons';
import SVGContainer from '../ui/SVGContainer';

import { handleSideMenuToggle } from '../../actions/ui';
import { authLogoutAndRedirect } from '../../actions/auth';

const StyledFlex = styled(Flex)`
  background: #fff;
`;

const Avatar = styled(Box)`
  width: 40px;
  height: 40px;
  margin-right: 15px;
  background: #D8D8D8 url(https://www.gravatar.com/avatar/${({ email }) => md5(email)}?d=identicon);
  background-size: 40px 40px;
  border-radius: 50%;
`;

const FullNameBox = styled(Box)`
  font-weight: 500;
  font-size: 14px;
  color: #4d92df;
  letter-spacing: 0;
  text-align: center;
  line-height: 22px;
  cursor: pointer;
`;

const Logo = styled.img`
  width: auto;
  height: 45px;
`;

const UserDropDownBox = ({ fullName = 'Loading', email = '', onClick }) => (
  <Flex alignItems="center" onClick={onClick}>
    <Avatar email={email} />
    <FullNameBox>{fullName}</FullNameBox>
  </Flex>
);

const Header = ({
  className,
  fullName,
  email,
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
        <Logo src="/logo.png" alt="Loanz logo" />
      </Flex>
      <UserDropDownBox fullName={fullName} email={email} onClick={hadleLogout} />
    </StyledFlex>
  );
};

const fn = userData => `${userData.first_name} ${userData.last_name}`;

const mapStateToProps = state => ({
  fullName: fn(state.userAccount),
  email: state.userAccount.email
});

const mapDispatchToProps = {
  handleSideMenuToggle,
  hadleLogout: authLogoutAndRedirect
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
