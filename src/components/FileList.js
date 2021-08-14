import React from 'react';
import Draggable from 'react-draggable';
import { FileListElement } from './FileListElement';

export const FileList = ({files}) => (
    <div style={{
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'stretch',
        justifyContent: 'center',
    }}>
        {!!files.length && files.map(file => <FileListElement file={file} />)}
    </div>
);