import styled from 'styled-components';

export const BaseButton = styled.button`
  cursor: pointer;
  border: 0;
  outline: none;
  font-family: inherit;
  background: transparent;
`;

const Button = BaseButton.extend`
  display: inline-block;
  text-decoration: none;
  color: ${({ secondary, danger }) =>
    secondary ? '#6F6F6F' : danger ? '#d84256' : '#fff'};
  background: ${({ secondary, flat }) =>
    secondary ? '#D8D8D8' : flat ? 'transparent' : '#9B9B9B'};
  border-radius: 5px;
  font-size: ${({ small }) => (small ? '12px' : 'inherit')};
  line-height: ${({ small }) => (small ? '14px' : 'inherit')};
  font-weight: inherit;
  padding: ${({ small }) => (small ? '10 12px' : '10px 45px')};
  text-align: center;
  min-width: 61px;
`;

export const BlueButton = BaseButton.extend`
  display: inline-block;
  text-decoration: none;
  color: #fff;
  background: #2893ef;
  border-radius: 100px;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  letter-spacing: 0.24px;
  text-align: center;
  line-height: 22px;
  padding: 11px;

  min-width: 360px;
`;

// export const LinkButton = Button.withComponent(Link);

export const UnderlinedButton = BaseButton.extend`
  text-decoration: underline;
  color: inherit;
  border-radius: 0;
  font-size: inherit;
`;

export default Button;
