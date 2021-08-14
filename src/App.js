import './App.css';
import { FileDrop } from './components/FileDrop';
import { FileList } from './components/FileList';
import React, {useCallback, useState} from 'react';
import pttxgen from 'pptxgenjs';
import { getDimensions, getImageMeta, getRotationFromExif } from './utils/imageMeta';
import { BigButton } from './components/BigButton';

const MAX_HEIGHT = 5.625;
const MAX_WIDTH = 10.0;

function App() {
  const [images, setImages] = useState([]);

  const handleDrop = useCallback(async (acceptedImages) => {
    const newImages = await Promise.all(acceptedImages.map(image => getImageMeta(image)));
    setImages(currentImages => [...currentImages, ...newImages])
  },
  []);

  const reset = () => setImages([]);

  const submit = () => {
    const presentation = new pttxgen();
    images.forEach(image => {
      const dimensions = getDimensions(image, MAX_HEIGHT, MAX_WIDTH);
      presentation.addSlide().addImage({
        data: image.data,
        x: (MAX_WIDTH - dimensions.width) / 2.0,
        y: (MAX_HEIGHT - dimensions.height) / 2.0,
        h: dimensions.height,
        w: dimensions.width,
        rotate: getRotationFromExif(image.orientation)
      });
    });
    setTimeout(() => presentation.writeFile({fileName: 'FromImages.pptx'}), 1000);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!!images.length ?
          <>
            <FileList files={images} />
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
              <FileDrop onDrop={handleDrop} label="Add more images"/>
              <BigButton onClick={submit} color="white" backgroundColor="dodgerblue">
                Export as PPT
              </BigButton>
            </div>
          </>
        :
          <FileDrop onDrop={handleDrop} label="Drop images here or click to select images"/>
        }
      </header>
    </div>
  );
}

export default App;
