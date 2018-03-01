import React, { Fragment } from 'react';
import styled from 'styled-components';

const Text = styled.span`
  font-size: inherit;
`;

const NoContentList = ({
  isFetching,
  data = [],
  isItemsExists = !!data.length,
  children,
  noDataText = 'No data'
}) => {
  const shouldRenderList = isItemsExists && !isFetching;

  return (
    <Fragment>
      {isFetching && <Text>Loading</Text>}
      {!isItemsExists && !isFetching && <Text>{noDataText}</Text>}
      {shouldRenderList ? children : null}
    </Fragment>
  );
};

export default NoContentList;
