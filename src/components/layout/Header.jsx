import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { PlaceholderImage } from '../ui/Placeholders';

const Title = styled.span`
  height: 22px;
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  margin-left: 10px;
`;

const OptionsBox = styled(Box)`
  min-height: 16px;
`;

const Header = ({ className, optionsBar, title = 'Logo', ...other }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      py={17}
      px={27}
      width={1}
      className={className}
      {...other}
    >
      <Flex alignItems="center" flexDirection="row">
        <PlaceholderImage size={45} />
        <Title>{title}</Title>
      </Flex>
      {optionsBar && <OptionsBox ml={20}>{optionsBar}</OptionsBox>}
    </Flex>
  );
};

export default styled(Header)`
  background: #fff;
  ${'' /* border-bottom: 1px solid #dcdcdc; */};
`;
