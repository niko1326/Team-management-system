import React from 'react';

interface InputProps {
    label: string;
    name: string;
    value: string | number;
    onChange: (value: string | number) => void;
    type?: 'text' | 'number' | 'email' | 'password' | 'date';
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
                                         label,
                                         name,
                                         value,
                                         onChange,
                                         type = 'text',
                                         placeholder = '',
                                         required = false,
                                         disabled = false,
                                     }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={(e) => onChange(type === 'number' ? +e.target.value : e.target.value)}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className="form-control"
            />
        </div>
    );
};

export default Input;
