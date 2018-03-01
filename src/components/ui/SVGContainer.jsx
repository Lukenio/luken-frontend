import styled from 'styled-components';

const SVGContainer = styled.div`
  position: relative;
  background: transparent;

  > svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default SVGContainer;
