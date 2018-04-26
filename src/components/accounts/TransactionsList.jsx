import React, { Component } from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import moment from 'moment';

import DataLoaderPlaceholder from '../ui/DataLoaderPlaceholder';
import Scrollable from '../ui/Scrollable';
import { getCRTickerSymbols, format0000 } from '../../utils';

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

const TransactionCellText = CellText.extend`
  min-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TransactionLink = styled.a`
  color: #808080;
  &:hover {
    color: #000;
  }
`;

const FlexWithBorder = styled(Flex)`
  border-bottom: 1px solid rgba(151, 151, 151, 0.2);
`;

const TransactionHeadingRow = () => (
  <FlexWithBorder width={1} py={18}>
    <HeadingText width={200}>Date and Time</HeadingText>
    <HeadingText width={150}>Sent / Received</HeadingText>
    <HeadingText flex="1">Transaction</HeadingText>
    <HeadingText width={150}>Value in USD</HeadingText>
    <HeadingText width={130}>Amount</HeadingText>
  </FlexWithBorder>
);

export const formatDatetime = d => {
  const date = moment(d).format('L');
  const time = moment(d).format('LTS');
  return `${date} at ${time}`;
};

const transactionTypes = {
  '0': 'RECEIVED',
  '1': 'SENT'
};

const TransactionRow = ({
  symbol,
  datetime,
  type,
  address,
  value_usd,
  amount
}) => (
  <FlexWithBorder width={1} py={18}>
    <CellText width={200}>{formatDatetime(new Date(datetime))}</CellText>
    <CellText width={150}>{transactionTypes[type]}</CellText>
    <TransactionCellText flex="1" pr={20}>
      <TransactionLink
        href={`https://blockchain.info/tx/${address}`}
        target="_blank"
      >
        {address}
      </TransactionLink>
    </TransactionCellText>
    <CellText width={150}>${value_usd}</CellText>
    <CellText width={130}>{format0000(parseFloat(amount), '.')} {symbol}</CellText>
  </FlexWithBorder>
);

const NoDataComponent = () => <Box py={20}>No transactions to show yet</Box>;

class TransactionsList extends Component {
  render() {
    const { account } = this.props;
    const { transactions = [] } = account;

    return (
      <WrapFlex width={1} flexDirection="column" pt={20} px={30}>
        <TransactionHeadingRow />
        <Scrollable width={1} flexDirection="column">
          <DataLoaderPlaceholder
            data={transactions}
            isFetching={false}
            noDataComponent={<NoDataComponent />}
          >
            {transactions.map(d => (
              <TransactionRow
                key={d.id}
                {...d}
                symbol={getCRTickerSymbols(account.type)}
              />
            ))}
          </DataLoaderPlaceholder>
        </Scrollable>
      </WrapFlex>
    );
  }
}

export default TransactionsList;
