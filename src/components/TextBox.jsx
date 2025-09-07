import React from 'react';

const TextBox = ({ value, onChange, placeholder, name }) => {
    return (
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                marginBottom: '10px',
                fontSize: '14px',
            }}
        />
    );
};

export default TextBox;
