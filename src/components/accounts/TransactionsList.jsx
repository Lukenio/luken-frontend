import React, { Component, Fragment } from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import moment from 'moment';

import NoContentList from '../ui/NoContentList';
import Scrollable from '../ui/Scrollable';
import { getCRTickerSymbols } from '../../utils';

const transactions = [
  {
    id: 1
  }
];

const WrapFlex = styled(Flex)`
  background: #eeeeee;
  opacity: 0.5;
`;

const HeadingText = styled(Box)`
  font-weight: 600;
  font-size: 15px;
  color: #9b9b9b;
  letter-spacing: 0;
  line-height: 22px;
`;

const CellText = styled(Box)`
  font-size: 14px;
  color: #9b9b9b;
  letter-spacing: 0;
  line-height: 22px;
`;

const FlexWithBorder = styled(Flex)`
  border-bottom: 1px solid rgba(151, 151, 151, 0.2);
`;

const TransactionHeadingRow = () => (
  <FlexWithBorder width={1} py={18}>
    <HeadingText width={100}>Date</HeadingText>
    <HeadingText flex="1">Description</HeadingText>
    <HeadingText width={100}>Amount</HeadingText>
  </FlexWithBorder>
);

const TransactionRow = ({ symbol }) => (
  <FlexWithBorder width={1} py={18}>
    <CellText width={100}>{moment(new Date()).format('L')}</CellText>
    <CellText flex="1" pr={20}>
      Ethereum is a decentralized platform for applications that run exactly as
      programmed without any chance of fraud, censorship or third-party
      interference.
    </CellText>
    <CellText width={100}>5,000 {symbol}</CellText>
  </FlexWithBorder>
);

class TransactionsList extends Component {
  render() {
    const { account } = this.props;
    return (
      <WrapFlex width={1} flexDirection="column" pt={20} px={30}>
        <TransactionHeadingRow />
        <Scrollable width={1} flexDirection="column">
          <NoContentList
            data={transactions}
            isFetching={false}
            noDataText="No transactions to show yet"
          >
            {transactions.map(d => (
              <TransactionRow
                key={d.id}
                {...d}
                symbol={getCRTickerSymbols(account.type)}
              />
            ))}
          </NoContentList>
        </Scrollable>
      </WrapFlex>
    );
  }
}

export default TransactionsList;
