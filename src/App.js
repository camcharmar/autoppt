import './App.css';
import { FileDrop } from './components/FileDrop';
import { SortableImage } from './components/SortableImage';
import React, { useCallback, useState } from 'react';
import pttxgen from 'pptxgenjs';
import { BigButton } from './components/BigButton';
import { getImageMeta } from './utils/getImageMeta';
import { getRotationFromExif } from './utils/getRotationFromExif';
import { getImageResizeDimensions } from './utils/getImageResizeDimensions';
import { Loader } from './components/Loader';
import { ReactSortable } from 'react-sortablejs';

const MAX_HEIGHT = 5.625;
const MAX_WIDTH = 10.0;

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleAddFiles = useCallback((async (acceptedImages) => {
    setLoading(true);
    const newImages = await Promise.all(acceptedImages.map(getImageMeta));
    setImages(currentImages => [...currentImages, ...newImages])
    setLoading(false);
  }), []);

  const handleRemoveId = useCallback((id) => setImages(
    currentImages => currentImages.filter((image) => image.id !== id)
  ), []);

  const handleToggleContainId = useCallback((id) => setImages(
    currentImages => currentImages.map((image) => image.id === id ? {...image, contain: !image.contain} : image)
  ), []);

  const reset = () => setImages([]);

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      const presentation = new pttxgen();
      images.forEach(image => {
        const dimensions = getImageResizeDimensions(image, MAX_HEIGHT, MAX_WIDTH);
        const slide = presentation.addSlide();
        slide.background = {color: '000000'};
        slide.addImage({
          data: image.data,
          x: (MAX_WIDTH - dimensions.width) / 2.0,
          y: (MAX_HEIGHT - dimensions.height) / 2.0,
          h: dimensions.height,
          w: dimensions.width,
          rotate: getRotationFromExif(image.orientation)
        });
      });

      presentation.writeFile({fileName: 'FromImages.pptx'}).then(() => {
        setLoading(false);
      });
    }, 0);
  };

  return (
    <div className="App">
        {!!images.length ?
          <>
            <ReactSortable list={images} setList={setImages} style={{
                width: '100%',
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {!!images.length && images.map((image) => 
                    <SortableImage 
                        key={image.id}
                        file={image} 
                        onRemove={handleRemoveId} 
                        onToggleContain={handleToggleContainId}
                    />
                )}
            </ReactSortable>
            <div style={{
              position: "relative",
              display: 'flex',
              flexFlow: 'row nowrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '90vw',
              margin: '30px',
              height: "90px",
            }}>
              <BigButton onClick={reset} color="white" backgroundColor="slategrey">
                Clear All
              </BigButton>
              <FileDrop onDrop={handleAddFiles} label="Add more images"/>
              <BigButton onClick={submit} color="white" backgroundColor="dodgerblue">
                Export as PPT
              </BigButton>
            </div>
          </>
        :
          <FileDrop onDrop={handleAddFiles} label="Drop images here or click to select images"/>
        }
        
      {isLoading &&  <Loader />}
    </div>
  );
}

export default App;
