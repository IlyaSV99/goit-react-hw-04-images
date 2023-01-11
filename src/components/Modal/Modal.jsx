import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from 'components/Modal/Modal.module.css';

const modalEl = document.getElementById('modal-root');

function Modal({ closeModal, children }) {
  useEffect(() => {
    window.addEventListener('keydown', onModalClose);
  }, []);
  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', onModalClose);
    };
  }, []);

  function onModalClose(e) {
    if (e.target === e.currentTarget) {
      closeModal();
      return;
    }
    if (e.code === 'Escape') {
      closeModal();
    }
  }
  return createPortal(
    <div className={css.Overlay} onClick={onModalClose}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalEl
  );
}

Modal.defaultProps = {
  closeModal: () => {},
};
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;
