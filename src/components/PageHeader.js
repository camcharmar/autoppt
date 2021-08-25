import React from 'react';
import logo from '../assets/logo.png';

export const PageHeader = () => (
    <div
        style={{
            boxSizing: 'border-box',
            display: 'flex',
            padding: '25px',
            width: '100vw',
            alignItems: 'center'
        }}
    >
        <img 
            src={logo}
            alt="AutoPPT Logo"
            style={{width: '50px'}}
        />
        <span
            style={{
                fontSize: '2.25rem',
                marginLeft: '15px'
            }}
        >AutoPPT</span>
    </div>
);