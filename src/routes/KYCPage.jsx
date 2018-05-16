import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { connect } from 'react-redux';

import { FlexContainer } from '../components/ui/Containers';
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
  color: #1F52C5;
  letter-spacing: -0.67px;
  line-height: 32px;
  margin-left: 10px;
`;

const Divider = styled(Box)`
  border-bottom: 1px solid #979797;
  opacity: 0.2;
`;

const Loading = styled.p`
  font-size: 14px;
  color: #1F52C5;
  letter-spacing: 0;
  line-height: 22px;
  margin: 0;
`;

const IframeFlex = styled(Flex)`
  ${props => props.isLoading && css`
    min-height: 539px;
    background: url(/loading.svg) no-repeat 50% 50%;
    background-size: 185px 185px;
  `}
`;

class KYC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingIframe: true
    };
  }

  renderIframe(userId) {
    return (
      <iframe
        id="JotFormIFrame-80925336043252"
        title="KYC"
        onLoad={this.handleIframeLoad}
        allowtransparency="true"
        allowFullScreen={true}
        allow="geolocation; microphone; camera"
        src={`https://form.jotform.com/80925336043252?userid=${userId}`}
        frameBorder="0"
        style={{ width: '1px', minWidth: '100%', height: 539, border: 'none' }}
        scrolling="no"
      />
    );
  }

  render() {
    const { userId } = this.props;
    const { isLoadingIframe } = this.state;

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
              </Flex>
              <Divider width={1} />
              <IframeFlex width={1} py={20} px={30} justifyContent="space-between" isLoading={isLoadingIframe}>
                {userId ? (
                  this.renderIframe(userId)
                ) : (
                  <Loading>Loading...</Loading>
                )}
              </IframeFlex>
            </WrapFlexContainer>
            <Footer />
          </Flex>
        </Flex>
      </Fragment>
    );
  }

  handleIframeLoad = () => {
    this.setState({ isLoadingIframe: false });
  }
}

const mapStateToProps = state => {
  const userId = state.userAccount.id;

  return {
    userId
  };
};

export default connect(mapStateToProps)(KYC);
