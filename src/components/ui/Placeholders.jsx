import styled from 'styled-components';
import { Box } from 'grid-styled';
import { cssUnit } from '../cssUtils';

const defaultSize = 50;

export const PlaceholderImage = styled(Box)`
  width: ${({ size }) => (size ? cssUnit(size) : cssUnit(defaultSize))};
  height: ${({ size }) => (size ? cssUnit(size) : cssUnit(defaultSize))};
  border-radius: 50%;
  background: #d8d8d8;
`;
