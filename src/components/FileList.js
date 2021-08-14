import React from 'react';
import { FileListElement } from './FileListElement';

export const FileList = ({files, handleRemove, handleToggleContain, onReorder}) => (
    <div style={{
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'stretch',
        justifyContent: 'center',
    }}>
        {!!files.length && files.map((file, index) => 
            <FileListElement 
                key={`${file.data}-${index}`}
                file={file} 
                onRemove={() => handleRemove(index)} 
                onToggleContain={() => handleToggleContain(index)}
            />
        )}
    </div>
);