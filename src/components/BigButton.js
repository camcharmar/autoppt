import React from 'react';

export const BigButton = ({color, backgroundColor, onClick, children}) => (
    <button
        onClick={onClick}
        style={{
            color,
            backgroundColor,
            boxSizing: 'border-box',
            padding: '10px 15px',
            border: `2px solid ${backgroundColor}`,
            height: "100%",
            width: "auto",
            borderRadius: "10px",
            cursor: 'pointer',
            fontSize: 'calc(10px + 2vmin)',
        }}
    >
        {children}
    </button>
)