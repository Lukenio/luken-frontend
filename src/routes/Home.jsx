import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import NamedSection from '../components/ui/NamedSection';
import AccountsList from '../components/accounts/AccountsList';
import { FlexContainer } from '../components/ui/Containers';
import Header from '../components/layout/Header';
import SideNavigation from '../components/layout/SideNavigation';
import { TransparentModal } from '../components/ui/Modal.jsx';
import { UnderlinedButton } from '../components/ui/Button.jsx';
import AddAccountModal from '../components/accounts/modals/AddAccountModal';
import { showNewAccountModal, hideNewAccountModal } from '../actions/modals';
import {
  dataAddAccount,
  dataFetchAccountsData
} from '../actions/coin-accounts';

import { dataPickNewAccount } from '../actions/ui';

class Home extends Component {
  componentWillMount() {
    const { dataFetchAccountsData } = this.props;
    dataFetchAccountsData();
  }

  handleModalSave = () => {
    const { dataAddAccount, hideModal, chosenAccount } = this.props;

    dataAddAccount(chosenAccount).then(() => {
      hideModal();
    });
  };

  handleAccountRowClick = account => {
    this.props.goToAccountPage(account.id);
  };

  render() {
    const {
      chosenAccount,
      hideModal,
      showModal,
      modalShown,
      dataPickNewAccount,
      ...other
    } = this.props;

    return (
      <Fragment>
        <Header />
        <Flex width={1} flex="1">
          <SideNavigation />
          <FlexContainer style={{ margin: 30 }}>
            <NamedSection
              title="Accounts"
              width={600}
              options={
                <UnderlinedButton onClick={showModal} style={{ fontSize: 15 }}>
                  Add an Account
                </UnderlinedButton>
              }
              footer={<p>{''}</p>}
            >
              <AccountsList
                {...other}
                handleRowClick={this.handleAccountRowClick}
              />
            </NamedSection>
          </FlexContainer>
        </Flex>
        <TransparentModal showModal={modalShown} width={600} height={490}>
          <AddAccountModal
            handleSave={this.handleModalSave}
            handleCancel={hideModal}
            handleAccountChoose={dataPickNewAccount}
            chosenAccount={chosenAccount}
          />
        </TransparentModal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  modalShown: state.modals.newAccountModalShown,
  accountsFetching: state.coinAccounts.isFetching,
  accounts: state.coinAccounts.allIds.map(id => state.coinAccounts.byId[id]),
  chosenAccount: state.ui.chosenNewAccount
});

const mapDispatchToProps = dispatch => ({
  showModal: () => dispatch(showNewAccountModal()),
  hideModal: () => dispatch(hideNewAccountModal()),
  dataPickNewAccount: a => dispatch(dataPickNewAccount(a)),
  dataAddAccount: a => dispatch(dataAddAccount(a)),
  dataFetchAccountsData: () => dispatch(dataFetchAccountsData()),
  goToAccountPage: id => {
    dispatch(push(`/coin-account/${id}`));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
