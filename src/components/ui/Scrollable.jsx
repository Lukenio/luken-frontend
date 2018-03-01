import styled from 'styled-components';
import { Flex } from 'grid-styled';

const Scrollable = styled(Flex)`
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : '500px')};
  overflow-y: auto;
  overflow-x: hidden;
`;

export default Scrollable;
