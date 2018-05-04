import React, { Component } from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import moment from 'moment';

import DataLoaderPlaceholder from '../ui/DataLoaderPlaceholder';
import Scrollable from '../ui/Scrollable';
import { getCRTickerSymbols, getCRTickerTitle, format0000 } from '../../utils';

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
      case 2:
        return colors.success;
      
      case 3:
        return colors.error;

      default:
        return colors.default;
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
    <HeadingText width={1}>Loan Amount</HeadingText>
    <HeadingText width={1}>Collateral Amount</HeadingText>
    <HeadingText width={1}>APR</HeadingText>
    <HeadingText width={1}>Crypto Type</HeadingText>
    <HeadingText width={1}>Status</HeadingText>
  </FlexWithBorder>
);

export const formatDatetime = d => {
  const date = moment(d).format('L');
  return `${date}`;
};

const statusTypes = {
  0: 'Submitted',
  1: 'In Review',
  2: 'Approved',
  3: 'Declined',
  4: 'KYC Submitted',
  5: 'KYC Verified',
  6: 'Contract Signed',
  7: 'Funded',
  8: 'Loan released'
};

const LoanRow = ({
  maturity_date,
  total_loaned_amount,
  crypto_collateral,
  apr,
  crypto_type,
  state
}) => (
  <FlexWithBorder width={1} py={18}>
    <CellText width={1}>{formatDatetime(maturity_date)}</CellText>
    <CellText width={1}>${total_loaned_amount}</CellText>
    <CellText width={1}>
      {crypto_collateral}{' '}
      {getCRTickerSymbols(crypto_type)}
    </CellText>
    <CellText width={1}>{format0000(apr * 100, '.', 2)}%</CellText>
    <CellText width={1}>{getCRTickerTitle(crypto_type)}</CellText>
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
