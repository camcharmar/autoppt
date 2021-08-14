import React from 'react';

export const FileListElement = ({file}) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '300px',
        width: '300px',
        background: 'black',
        borderRadius: '10px',
        margin: '5px',
        overflow: 'hidden'
    }}>
        <img src={file.data} alt="Uploading" style={{
            height: "100%",
            width: "100%",
            objectFit: "contain",
        }}/>
    </div>
)