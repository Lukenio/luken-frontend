import React, { Component } from 'react';
import DataLoaderPlaceholder from '../ui/DataLoaderPlaceholder';
import AccountRow from './AccountRow';
import Scrollable from '../ui/Scrollable';

class AccountsList extends Component {
  render() {
    const { accountsFetching, accounts, handleRowClick } = this.props;
    return (
      <Scrollable width={1} flexDirection="column" px={30}>
        <DataLoaderPlaceholder
          data={accounts}
          isFetching={accountsFetching}
          noDataText="No accounts to show yet"
        >
          {accounts.map(d => (
            <AccountRow key={d.id} {...d} onClick={() => handleRowClick(d)} />
          ))}
        </DataLoaderPlaceholder>
      </Scrollable>
    );
  }
}

export default AccountsList;
