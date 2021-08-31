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
import { PageHeader } from './components/PageHeader';
import { BiAddToQueue, BiDownload, BiEditAlt } from 'react-icons/bi';

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
        <PageHeader />
          {!!images.length ?
            <div>
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
                          image={image}
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
                  Export
                </BigButton>
              </div>
            </div>
          :
          <>
            <h1>Free Powerpoint Generator</h1>
            <p style={{margin: '30px', maxWidth: '900px', fontWeight: 300}}>Easily create powerpoint presentations from any number of images. Just upload, order,&nbsp;and&nbsp;export!</p>
            <FileDrop onDrop={handleAddFiles} label="Drop images here or click to select images"/>
          </>
          }
        <div className="how-to">
          <h2>How it works</h2>
          <div style={{
            width: '100%',
            textAlign: 'left',
          }}>
            <h3>Upload Images</h3>
            <div className="how-to-group">
              <div className="group-icon"><BiAddToQueue/></div>
              <p>
                Upload images (jpeg, png, or gif) or a folder of images, which will be added as individual slides in a powerpoint presentation.
              </p>
            </div>
            <h3>Customize Presentation</h3>
            <div className="how-to-group">
              <div className="group-icon"><BiEditAlt /></div>
              <p>
                Reorder slides, remove and upload more images, and even set whether the image should fit within or fill the enitre slide.
              </p>
            </div>
            <h3>Export to .ppt</h3>
            <div className="how-to-group">
              <div className="group-icon"><BiDownload /></div>
              <p>
                Once finished, just click Export and the powerpoint will be automatically downloaded with your formatted images. Easy!
              </p>
            </div>
          </div>
        </div>
          
        {isLoading &&  <Loader />}
      </div>
  );
}

export default App;
