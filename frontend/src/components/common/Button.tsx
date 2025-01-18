import React from 'react';

interface ButtonProps {
    text: string;
    onClick: () => void;
    type?: 'button' | 'submit';
    variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'button', variant = 'primary' }) => {
    return (
        <button className={`button ${variant}`} onClick={onClick} type={type}>
            {text}
        </button>
    );
};

export default Button;
