import React from 'react';
import {useDropzone} from 'react-dropzone';

export const FileDrop = ({onDrop, label}) => {
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: 'image/jpeg, image/png, image/gif, image/svg'})
  
    return (
      <div {...getRootProps({style: {
          boxSizing: 'border-box',
          width: 'auto',
          height: '100%',
          cursor: 'pointer',
          border: '2px dashed',
          borderRadius: '10px',
          margin: '15px',
          padding: '10px 20px',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          userSelect: 'none',
      }})}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the images here ...</p> :
            <p>{label}</p>
        }
      </div>
    )
}