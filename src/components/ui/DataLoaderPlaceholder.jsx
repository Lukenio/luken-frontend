import React, { Fragment } from 'react';
import styled from 'styled-components';

const Text = styled.span`
  font-size: inherit;
`;

const DataLoaderPlaceholder = ({
  isFetching,
  data = [],
  isDataExists = !!data.length,
  children,
  noDataText = 'No data',
  noDataComponent
}) => {
  const NoDataPlaceholder = noDataComponent ? (
    noDataComponent
  ) : (
    <Text>{noDataText}</Text>
  );

  return (
    <Fragment>
      {isDataExists ? children : null}
      {!isDataExists && isFetching && <Text>Loading</Text>}
      {!isDataExists && !isFetching && NoDataPlaceholder}
    </Fragment>
  );
};

export default DataLoaderPlaceholder;
