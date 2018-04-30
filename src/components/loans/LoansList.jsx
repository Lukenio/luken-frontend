import React, { Component } from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import moment from 'moment';

import DataLoaderPlaceholder from '../ui/DataLoaderPlaceholder';
import Scrollable from '../ui/Scrollable';
import { getCRTickerSymbols, format0000 } from '../../utils';

const WrapFlex = styled(Flex)`
  background: #f7f7f7;
`;

const HeadingText = styled(Box)`
  font-weight: 600;
  font-size: 15px;
  color: #999;
  letter-spacing: 0;
  line-height: 22px;
`;

const cellTextColors = {
  success: '#66CC33',
  error: '#FF353B',
  warning: '#DF7515',
  default: '#999'
};

const getCellTextColor = (prop, value) => {
  const colors = cellTextColors;

  if (prop === 'state') {
    switch (value) {
      case 2: return colors.success;
      default: return colors.default;
    }
  }
  
  if (prop === 'agree') {
    return value ? colors.success : colors.default;
  }

  return colors.default;
};

const CellText = styled(Box)`
  font-size: 14px;
  color: ${props => props.color || '#999'};
  letter-spacing: 0;
  line-height: 22px;
  font-weight: 500;
`;

const FlexWithBorder = styled(Flex)`
  border-bottom: 1px solid rgba(151, 151, 151, 0.2);
`;

const LoansHeadingRow = () => (
  <FlexWithBorder width={1} py={18}>
    <HeadingText width={1}>Maturity Date</HeadingText>
    <HeadingText width={1}>Total Loan Amount</HeadingText>
    <HeadingText width={1}>Total Collateral Amount</HeadingText>
    <HeadingText width={1}>APR</HeadingText>
    <HeadingText width={1}>Crypto Type</HeadingText>
    <HeadingText width={1}>Loan Agreement</HeadingText>
    <HeadingText width={1}>Status</HeadingText>
  </FlexWithBorder>
);

export const formatDatetime = d => {
  const date = moment(d).format('L');
  return `${date}`;
};

const statusTypes = {
  0: '',
  1: 'In Process',
  2: 'Funded'
};

const cryptoTypes = {
  0: 'Bitcoin',
  1: 'Ethereum'
};

const LoanRow = ({
  created,
  loaned_amount,
  total_loaned_amount,
  apr,
  crypto_type,
  terms_of_service_agree,
  state
}) => (
  <FlexWithBorder width={1} py={18}>
    <CellText width={1}>{formatDatetime(new Date(created))}</CellText>
    <CellText width={1}>${loaned_amount}</CellText>
    <CellText width={1}>
      {total_loaned_amount}{' '}
      {getCRTickerSymbols(crypto_type)}
    </CellText>
    <CellText width={1}>{format0000(apr * 100, '.', 2)}%</CellText>
    <CellText width={1}>{cryptoTypes[crypto_type] || 'Other'}</CellText>
    <CellText width={1} color={getCellTextColor('agree', terms_of_service_agree)}>
      {terms_of_service_agree ? 'Signed' : 'Pending KYC'}
    </CellText>
    <CellText width={1} color={getCellTextColor('state', state)}>
      {statusTypes[state]}
    </CellText>
  </FlexWithBorder>
);

const NoDataComponent = () => <Box py={20}>No loans to show yet</Box>;

class LoansList extends Component {
  render() {
    const { list } = this.props;

    return (
      <WrapFlex width={1} flexDirection="column" pt={20} px={30}>
        <LoansHeadingRow />
        <Scrollable width={1} flexDirection="column">
          <DataLoaderPlaceholder
            data={list}
            isFetching={false}
            noDataComponent={<NoDataComponent />}
          >
            {list.map(l => (
              <LoanRow key={l.id} {...l} />
            ))}
          </DataLoaderPlaceholder>
        </Scrollable>
      </WrapFlex>
    );
  }
}

export default LoansList;
