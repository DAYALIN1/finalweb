import React from 'react';
import '../../assets/styles/confirmation-modal.scss';

const ConfirmationModal = ({ onClose, onConfirm, message }) => {
  return (
    <div className="confirmation-modal">
      <div className="modal-content">
        <p>{message}</p>
        <div className="actions">
          <button className="confirm-button" onClick={onConfirm}>
            Confirmar
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
