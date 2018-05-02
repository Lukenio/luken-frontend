import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { FlexContainer } from '../components/ui/Containers';
import { AccountButton } from '../components/ui/Button';
import SVGContainer from '../components/ui/SVGContainer';
import {
  UserIcon
} from '../components/ui/SVGIcons.jsx';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SideNavigation from '../components/layout/SideNavigation';

const WrapFlexContainer = styled(FlexContainer)`
  background: #ffffff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  flex: 1;
`;

const Heading = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: #4d92df;
  letter-spacing: -0.67px;
  line-height: 32px;
  margin-left: 10px;
`;

const Divider = styled(Box)`
  border-bottom: 1px solid #979797;
  opacity: 0.2;
`;

const SubHeading = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #000;
  letter-spacing: -0.67px;
  line-height: 32px;
  margin-left: 10px;
`;

const ProfileList = styled.ol`
`;

const ProfileListItem = styled.li`
  margin-bottom: .8em;
  font-size: 14px;
  color: #000;
`;

const ItemTitle = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 22px;
`;

const ItemValue = styled.p`
  margin: 0;
  margin-bottom: .8em;
  font-size: 17px;
  color: #53AB0A;
  line-height: 22px;
`;

const profileData = [
  {
    title: 'Enter Your Full name',
    value: 'qwe qwe'
  },
  {
    title: 'Phone Number',
    value: '(111) 111-1111'
  },
  {
    title: 'Source of Funds',
    value: '123123213'
  },
  {
    title: 'Enter Your Wallet Public Key',
    value: '123123'
  },
  {
    title: 'What will you use the proceeds from the loan for?',
    value: 'General Expence'
  }
];

class ProfilePage extends Component {
  componentWillMount() {
    const { didApplyKYC, dispatch } = this.props;

    if (!didApplyKYC) {
      dispatch(push('/profile/edit'));
    }
  }
  
  render() {
    const { dispatch } = this.props;

    return (
      <Fragment>
        <Header />
        <Flex width={1} flex="1">
          <SideNavigation />
          <Flex w={1} mt={30} mb={25} mx={30} flexDirection="column">
            <WrapFlexContainer flexDirection="column" w={1}>
              <Flex width={1} alignItems="center" py={10} px={30}>
                <Flex width={1} alignItems="center">
                  <SVGContainer w={48} h={48} fill="#d8d8d8">
                    <UserIcon />
                  </SVGContainer>
                  <Heading>My Profile</Heading>
                </Flex>
                <AccountButton onClick={() => dispatch(push('/profile/edit'))}>
                  Edit
                </AccountButton>
              </Flex>
              <Divider width={1} />

              <Flex width={1} flexDirection="column" pt={20} px={30}>
                <SubHeading>Enter Your Personal Information</SubHeading>

                <ProfileList>
                  {profileData.map((item, i, list) => (
                    <ProfileListItem key={i}>
                      <ItemTitle>{item.title}</ItemTitle>
                      <ItemValue>{item.value}</ItemValue>
                      {(list.length - 1 > i) && <Divider />}
                    </ProfileListItem>
                  ))}
                </ProfileList>
              </Flex>

            </WrapFlexContainer>
            <Footer />
          </Flex>
        </Flex>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    didApplyKYC: state.userAccount.kyc_applied
  };
};

export default connect(mapStateToProps)(ProfilePage);
