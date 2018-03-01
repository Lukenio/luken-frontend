import styled from 'styled-components';
import SVGContainer from './SVGContainer.jsx';
import { BaseButton } from './Button.jsx';

const ButtonSVGContainer = SVGContainer.withComponent(BaseButton);

const IconButton = ButtonSVGContainer.extend`
  min-width: ${({ mini }) => (mini ? '14px' : '1.5rem')};
  min-height: ${({ mini }) => (mini ? '14px' : '1.5rem')};
  color: inherit;
  padding: 0;
`;

export default IconButton;
