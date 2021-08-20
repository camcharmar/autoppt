import React from 'react';
import logo from '../assets/logo.png';

export const PageHeader = () => (
    <div
        style={{
            boxSizing: 'border-box',
            display: 'flex',
            padding: '25px',
            position: 'absolute',
            top: 0,
            width: '100vw',
            alignItems: 'center'
        }}
    >
        <img 
            src={logo}
            alt="AutoPPT Logo"
            style={{
                maxWidth: "80px",
                width: '20vw',
            }}
        />
        <span
            style={{
                fontSize: '3rem',
                marginLeft: '15px'
            }}
        >AutoPPT</span>
    </div>
);