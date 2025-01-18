import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{title}</h2>
                <button className="close-button" onClick={onClose}>
                    ×
                </button>
                <div className="modal-content">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
