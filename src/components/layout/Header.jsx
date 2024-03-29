import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
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
    const { fullName = 'Loading', email = '', onClick } = this.props;
    const { isDropdownVisible } = this.state;

    return (
      <DropdownFlex alignItems="center" onClick={this.handleClick}>
        <Avatar email={email} />
        <FullNameBox>Welcome, {email}</FullNameBox>
        <AngleDownIcon />
        {isDropdownVisible && (
          <DropdownList>
            <DropdownItem>My Profile</DropdownItem>
            <DropdownItem>Change Password</DropdownItem>
            <DropdownItem onClick={onClick}>Log Out</DropdownItem>
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
