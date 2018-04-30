import React, { Component } from 'react';
import ReactModal from 'react-modal';
import CloseIcon from 'material-ui-icons/Close';
import styled from 'styled-components';

import { Flex, Box } from 'grid-styled';

import GradientedOverlay from './GradientedOverlay.jsx';
import IconButton from './IconButton.jsx';

ReactModal.setAppElement('#root');

const Modal = ({ children }) => (
  <GradientedOverlay flex="1" opacity="0.51">
    {children}
  </GradientedOverlay>
);

export default Modal;

/* Transparent Modal */
const style = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s linea',
    zIndex: 3
  },
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: 0,
    borderRadius: '5px',
    padding: '0',
    background: 'transparent'
  }
};

const dimensions = ({ width, height }) => {
  let s = {};
  if (width) {
    s = { width };
  }
  if (height) {
    s = { ...s, height };
  }
  return s;
};

const modelStyle = other => ({
  ...style,
  content: {
    ...style.content,
    ...dimensions(other)
  }
});

export class TransparentModal extends Component {
  render() {
    const { children, showModal, onRequestClose, ...other } = this.props;

    const style = modelStyle(other);

    return (
      <ReactModal
        isOpen={showModal}
        onRequestClose={onRequestClose}
        contentLabel="Modal"
        style={style}
      >
        {children}
      </ReactModal>
    );
  }
}

const Title = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
`;

const Header = styled(Flex)`
  background: #4d92df;
  color: #fff;
  position: relative;
`;

const CloseIconBox = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
`;

export const ModalHeader = ({ handleClose, children }) => (
  <Header alignItems="center" justifyContent="center" py={30}>
    <Box>
      <Title>{children}</Title>
    </Box>
    <CloseIconBox p={30}>
      <IconButton onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </CloseIconBox>
  </Header>
);

const StyledFlexWrap = styled(Flex)`
  font-size: 14px;
  height: ${props => props.height || '100%'};
  background: ${props => (props.flat ? 'transparent' : '#fff')};
  color: ${props => (props.flat ? '#fff' : 'inherit')};
`;

export const ModalBody = ({ children, flat, height, ...other }) => (
  <StyledFlexWrap flexDirection="column" width={1} height={height} flat={flat} {...other}>
    {children}
  </StyledFlexWrap>
);

const Footer = styled(Flex)`
  align-self: flex-end;
  background: #f6f6f6;
  font-size: 18px;
  font-weight: bold;
  line-height: 18px;
`;

export const ModalFooter = ({ children }) => (
  <Footer justifyContent="center" alignItems="center" width={1} py={15}>
    {children}
  </Footer>
);
