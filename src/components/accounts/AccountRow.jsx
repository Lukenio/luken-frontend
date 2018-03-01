import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { PlaceholderImage } from '../ui/Placeholders';
import { getCRTickerSymbols } from '../../utils';

const Title = styled.h3`
  font-weight: 600;
  font-size: 15px;
  color: #9b9b9b;
  letter-spacing: 0;
  line-height: 22px;
  margin: 0;
`;

const CurrencyTitle = styled.span`
  font-weight: 500;
  font-size: 12px;
  color: rgba(155, 155, 155, 0.5);
  letter-spacing: 0;
  line-height: 19px;
`;

const CoinsOwned = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 15px;
  color: #9b9b9b;
  letter-spacing: 0;
  text-align: right;
  line-height: 22px;
`;

const FiatOwned = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 12px;
  color: rgba(155, 155, 155, 0.5);
  letter-spacing: 0;
  text-align: right;
  line-height: 19px;
`;

const AlignedRight = styled(Box)`
  text-align: right;
`;

const FlexWrap = styled(Flex)`
  min-height: 86px;
  border-bottom: 1px solid rgba(151, 151, 151, 0.2);
`;

const AccountRow = ({ name, type, onClick }) => (
  <FlexWrap py={20} justifyContent="space-between" onClick={onClick}>
    <Flex alignItems="center">
      <PlaceholderImage size={48} />
      <Box ml="8px">
        <Title>{name}</Title>
        <CurrencyTitle>{name}</CurrencyTitle>
      </Box>
    </Flex>
    <AlignedRight>
      <CoinsOwned>
        <strong>0.00</strong> {getCRTickerSymbols(type)}
      </CoinsOwned>
      <FiatOwned>$0.00 USD</FiatOwned>
    </AlignedRight>
  </FlexWrap>
);

export default AccountRow;
