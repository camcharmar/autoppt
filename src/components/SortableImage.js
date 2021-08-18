import React, {useEffect} from 'react';
import {BiCollapse, BiExpand, BiTrash} from 'react-icons/bi'

const ImageButton = ({style, onClick, children}) => (
    <div onClick={onClick} style={{
        position: 'absolute',
        backgroundColor: 'white',
        color: 'black',
        border: 'black dashed 2px',
        borderRadius: '50%',
        height: '50px',
        width: '50px',
        margin: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        ...style
    }}>
        {children}
    </div>
)

export const SortableImage = ({file, onRemove, onToggleContain}) => {
    useEffect(() => console.log('image render'));
    return (
    <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '200px',
        width: '355px',
        background: 'black',
        borderRadius: '10px',
        margin: '5px',
        overflow: 'hidden',
        cursor: 'move'
    }}>
        <img src={file.data} alt="Uploading" style={{
            height: "100%",
            width: "100%",
            objectFit: file.contain ? 'contain' : 'cover',
        }}/>
        <ImageButton onClick={() => onRemove(file.id)} style={{top: 0, right: 0}}>
            <BiTrash />
        </ImageButton>
        <ImageButton onClick={() => onToggleContain(file.id)} style={{top: 0, left: 0}}>
            {file.contain ? <BiExpand /> : <BiCollapse />}
        </ImageButton>
        
    </div>
)}