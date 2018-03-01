import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { Flex } from 'grid-styled';
import ReactModal from 'react-modal';

import GradientedOverlay from './GradientedOverlay.jsx';

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
    padding: '0'
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
