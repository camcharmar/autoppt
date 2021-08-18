import React from 'react';
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

export const SortableImage = React.memo(({image, onRemove, onToggleContain}) => (
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
        <img src={image.data} alt="Uploading" style={{
            height: "100%",
            width: "100%",
            objectFit: image.contain ? 'contain' : 'cover',
        }}/>
        <ImageButton onClick={() => onRemove(image.id)} style={{top: 0, right: 0}}>
            <BiTrash />
        </ImageButton>
        <ImageButton onClick={() => onToggleContain(image.id)} style={{top: 0, left: 0}}>
            {image.contain ? <BiExpand /> : <BiCollapse />}
        </ImageButton>
        
    </div>
));