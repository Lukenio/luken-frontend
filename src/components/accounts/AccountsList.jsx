import React, { Component } from 'react';
import NoContentList from '../ui/NoContentList';
import AccountRow from './AccountRow';
import Scrollable from '../ui/Scrollable';

class AccountsList extends Component {
  render() {
    const { accountsFetching, accounts, handleRowClick } = this.props;
    return (
      <Scrollable width={1} flexDirection="column" px={30}>
        <NoContentList
          data={accounts}
          isFetching={accountsFetching}
          noDataText="No accounts to show yet"
        >
          {accounts.map(d => (
            <AccountRow key={d.id} {...d} onClick={() => handleRowClick(d)} />
          ))}
        </NoContentList>
      </Scrollable>
    );
  }
}

export default AccountsList;
