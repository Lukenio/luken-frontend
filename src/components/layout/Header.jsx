import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Flex, Box } from 'grid-styled';
import md5 from 'js-md5';
import { HeaderMenuIcon } from '../ui/SVGIcons';
import SVGContainer from '../ui/SVGContainer';
import { TransparentModal } from '../ui/Modal';
import ChangePasswordModal from './modals/ChangePasswordModal';

import { handleSideMenuToggle } from '../../actions/ui';
import { authLogoutAndRedirect } from '../../actions/auth';
import {
  showChangePasswordModal,
  hideChangePasswordModal
} from '../../actions/modals';

const StyledFlex = styled(Flex)`
  background: #fff;
`;

const Avatar = styled(Box)`
  width: 40px;
  height: 40px;
  margin-right: 15px;
  background: #D8D8D8 url(https://www.gravatar.com/avatar/${({ email }) => md5(email)}?d=mm);
  background-size: 40px 40px;
  border-radius: 50%;
`;

const FullNameBox = styled(Box)`
  font-weight: 500;
  font-size: 14px;
  color: #1F52C5;
  letter-spacing: 0;
  text-align: center;
  line-height: 22px;
  user-select: none;
`;

const AngleDownIcon = styled(Box)`
  width: 11px;
  height: 6px;
  margin: 3px 0 0 10px;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAYAAAA7KqwyAAAABGdBTUEAALGPC/xhBQAAAMhJREFUKBVjbFr36r+XAQ+DsSInAyng7P3vDNsufGFgctDiYZiy8z3DlSc/idYPUgvSA9LL8B8IDt349j9h+tP/lx//AHHxApAakFqQHhAAGwBi7Lr05X/SjKf/bz//CeJiBSA5kBqQWhiAGwASwGcINs0gPSgGgATWn/n0P3XWk/8P3/wCccEAxAaJgeTQAYYBIAUghWmzn4INAWkGsbFpBqllBBHYgn/ZsY8MR258BUvZaHAzRFnxY1PGwIJVFCiIrAGZja4eAH/2S1Gw0p89AAAAAElFTkSuQmCC');
  background-size: 11px 6px;
`;

const Logo = styled.img`
  display: block;
  width: auto;
  height: 45px;
`;

const DropdownFlex = styled(Flex)`
  position: relative;
  cursor: pointer;
  user-select: none;
`;

const DropdownList = styled.ul`
  position: absolute;
  right: 0;
  top: 100%;
  margin: 0;
  padding: .7em 0;
  width: 175px;
  list-style: none;
  font-size: 14px;
  color: #666;
  background: #fff;
  border: 1px solid #eee;
`;

const DropdownItem = styled.li`
  padding: .4em 1.4em;
  cursor: pointer;
  &:hover {
    background-color: #f7f7f7;
  }
`;

class UserDropDownBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownVisible: false
    };
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleOuterClick);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleOuterClick);
  }

  render() {
    const {
      email = '',
      authLogoutAndRedirect,
      showChangePasswordModal,
      pushProfileLocation
    } = this.props;
    const { isDropdownVisible } = this.state;

    return (
      <DropdownFlex alignItems="center" onClick={this.handleClick}>
        <Avatar email={email} />
        <FullNameBox>Welcome, {email}</FullNameBox>
        <AngleDownIcon />
        {isDropdownVisible && (
          <DropdownList>
            <DropdownItem onClick={pushProfileLocation}>My Profile</DropdownItem>
            <DropdownItem onClick={showChangePasswordModal}>Change Password</DropdownItem>
            <DropdownItem onClick={authLogoutAndRedirect}>Log Out</DropdownItem>
          </DropdownList>
        )}
      </DropdownFlex>
    );
  }

  handleClick = () => {
    this.setState(prevState => ({
      isDropdownVisible: !prevState.isDropdownVisible
    }));
  }

  handleOuterClick = ({ target }) => {
    const ownEl = findDOMNode(this);
    if (ownEl === target || ownEl.contains(target)) {
      return;
    }
    this.setState({ isDropdownVisible: false });
  }
}

const Header = ({
  className,
  fullName,
  email,
  handleSideMenuToggle,
  authLogoutAndRedirect,
  changePasswordModalShown,
  showChangePasswordModal,
  hideChangePasswordModal,
  pushProfileLocation,
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
        <a href="https://loanz.io/">
          <Logo src="/logo.png" alt="Loanz logo" />
        </a>
      </Flex>
      <UserDropDownBox
        fullName={fullName}
        email={email}
        authLogoutAndRedirect={authLogoutAndRedirect}
        showChangePasswordModal={showChangePasswordModal}
        pushProfileLocation={pushProfileLocation}
      />
      <TransparentModal
        showModal={changePasswordModalShown}
        width={470}
        height={265}
      >
        <ChangePasswordModal
          handleCancel={hideChangePasswordModal}
        />
      </TransparentModal>
    </StyledFlex>
  );
};

const fn = userData => `${userData.first_name} ${userData.last_name}`;

const mapStateToProps = state => ({
  fullName: fn(state.userAccount),
  email: state.userAccount.email,
  changePasswordModalShown: state.modals.changePasswordModalShown
});

const mapDispatchToProps = dispatch => ({
  handleSideMenuToggle: () => dispatch(handleSideMenuToggle()),
  authLogoutAndRedirect: () => dispatch(authLogoutAndRedirect()),
  showChangePasswordModal: () => dispatch(showChangePasswordModal()),
  hideChangePasswordModal: () => dispatch(hideChangePasswordModal()),
  pushProfileLocation: () => dispatch(push('/profile'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
