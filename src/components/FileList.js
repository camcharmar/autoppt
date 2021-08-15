import React from 'react';
import { FileListElement } from './FileListElement';
import { ReactSortable } from 'react-sortablejs';

export const FileList = ({files, setFiles, handleRemove, handleToggleContain}) => (
    <ReactSortable list={files} setList={setFiles} style={{
        width: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        {!!files.length && files.map((file, index) => 
            <FileListElement 
                key={`${file.data}-${index}`}
                file={file} 
                onRemove={() => handleRemove(index)} 
                onToggleContain={() => handleToggleContain(index)}
            />
        )}
    </ReactSortable>
);