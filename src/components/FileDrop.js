import React from 'react';
import {useDropzone} from 'react-dropzone';

export const FileDrop = ({onDrop}) => {
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: 'image/jpeg, image/png, image/gif, image/svg'})
  
    return (
      <div {...getRootProps({style: {
          width: '90vw',
          height: '200px',
          cursor: 'pointer',
          border: '2px dashed',
          borderRadius: '10px',
          margin: '5vw',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          userSelect: 'none',
      }})}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the images here ...</p> :
            <p>Drop images here or click to select images</p>
        }
      </div>
    )
}