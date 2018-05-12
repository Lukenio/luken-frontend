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
import { LoadingIndicator } from '../components/auth/forms/Elements';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SideNavigation from '../components/layout/SideNavigation';
import { dataFetchUserAccountData } from '../actions/user-account';

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

const SubHeadingVariant = Heading.extend`
  margin: 29px 0 21px;
  font-size: 29px;
`;

const VerifyParagraph = ItemTitle.extend`
  text-align: center;
`;

const DocumentList = styled.ul`
  margin: 0 0 3em;
  padding: 0;
  list-style: none;
  text-align: center;
  font-size: 14px;
  line-height: 1.5em;
`;

const DocumentListBold = styled.b`
  color: #4d92df;
`;

class ProfilePage extends Component {
  componentDidMount() {
    const { dataFetchUserAccountData } = this.props;
    dataFetchUserAccountData();
  }
  
  render() {
    const {
      dispatch,
      userAccount: {
        isFetching,
        kyc_applied,
        kyc
      }
    } = this.props;

    let loadingContent;
    if (isFetching) {
      loadingContent = (
        <Flex justifyContent="center">
          <LoadingIndicator />
        </Flex>
      );
    }

    let innerContent;
    if (!kyc_applied) {
      innerContent = (
        <Fragment>
          <Flex flexDirection="column" alignItems="center">
            <SubHeadingVariant>Verify Your Account</SubHeadingVariant>
            <div style={{ marginBottom: '2em' }}>
              <VerifyParagraph>
                Verification is required to comply with KYC/AML regulations
                and to protect your account from unauthorized access.
              </VerifyParagraph>
            </div>
            <AccountButton onClick={() => dispatch(push('/profile/edit'))}>
              Start Your Verification
            </AccountButton>
            <div style={{ paddingTop: '1.7em' }}>
              <VerifyParagraph>
                The following documents are accepted for verification of identity:
              </VerifyParagraph>
              <DocumentList>
                <li>
                  <DocumentListBold>Photo ID</DocumentListBold><br />
                  <span>Driver License, National Identity Card, Passport or other Valid Government Issued photo ID.</span>
                </li>
                <li>
                  <DocumentListBold>Proof of Address (Less than 3 month old)</DocumentListBold><br />
                  <span>Utility Bills, Driver License, National Identity Card, Passport.</span>
                </li>
                <li>
                  <DocumentListBold>Selfie Picture holding your ID</DocumentListBold><br />
                  <span>Make sure to take a quality picture holding your ID.</span>
                </li>
              </DocumentList>
            </div>
          </Flex>
        </Fragment>
      );
    } else {
      const {
        q2_enterYour,
        q10_phoneNumber,
        q13_enterYour13_,
        q5_whatWill
      } = kyc || {};

      const questions = [
        {
          title: 'Enter Your Full name',
          value: (function (q2_enterYour = { first: 'NA', last: '' }) {
            return `${q2_enterYour.first} ${q2_enterYour.last}`;
          }(q2_enterYour))
        },
        {
          title: 'Phone Number',
          value: (function (q10_phoneNumber = { full: 'NA' }) {
            return `${q10_phoneNumber.full}`
          }(q10_phoneNumber))
        },
        {
          title: 'Address',
          value: (function (q13_enterYour13_ = { addr_search: 'NA' }) {
            return `${q13_enterYour13_.addr_search}`;
          }(q13_enterYour13_))
        },
        {
          title: 'What will you use the proceeds from the loan for?',
          value: (function (q5_whatWill = ['NA']) {
            return q5_whatWill.join(', ');
          }(q5_whatWill))
        }
      ];

      innerContent = (
        <Fragment>
          <SubHeading>Enter Your Personal Information</SubHeading>
          <ProfileList>
            {questions.map((item, i, list) => (
              <ProfileListItem key={i}>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemValue>{item.value}</ItemValue>
                {(list.length - 1 > i) && <Divider />}
              </ProfileListItem>
            ))}
          </ProfileList>
        </Fragment>
      );
    }

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
                {!isFetching && kyc_applied && (
                  <AccountButton onClick={() => dispatch(push('/profile/edit'))}>
                    Edit
                  </AccountButton>
                )}
              </Flex>
              <Divider width={1} />
              <Flex width={1} flexDirection="column" pt={20} px={30}>
                {isFetching ? loadingContent : innerContent}
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
    userAccount: state.userAccount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dataFetchUserAccountData: () => dispatch(dataFetchUserAccountData())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
