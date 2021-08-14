import './App.css';
import { FileDrop } from './components/FileDrop';
import { FileList } from './components/FileList';
import React, {useCallback, useState} from 'react';
import pttxgen from 'pptxgenjs';
import { getDimensions, getImageMeta } from './utils/getImageMeta';

const MAX_HEIGHT = 5.625;
const MAX_WIDTH = 10.0;

function App() {
  const [images, setImages] = useState([]);

  const handleDrop = useCallback(async (acceptedImages) => {
    const newImages = await Promise.all(acceptedImages.map(image => getImageMeta(image)));
    setImages(currentImages => [...currentImages, ...newImages])
  },
  []);

  const getRotationFromExif = (exif) => {
    switch(exif) {
      case 3:
      case 4:
        return 180;
      case 5:
      case 6:
        return 90;
      case 7:
      case 8:
        return 270;
      case 1:
      case 2:
      default:
        return 0;
    }
  }

  const reset = () => console.log(images.map(image => {
    const dimensions = getDimensions(image.height, image.width, MAX_HEIGHT, MAX_WIDTH);
    return {
      data: image.data,
      x: (MAX_WIDTH - dimensions.width) / 2.0,
      y: (MAX_HEIGHT - dimensions.height) / 2.0,
      h: dimensions.height,
      w: dimensions.width,
      rotate: getRotationFromExif(image.orientation)
    }
  }));

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
        {!!images.length &&
        <>
          <FileList files={images} />
          <div style={{
            display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90vw',
            margin: '30px',
          }}>
            <button onClick={reset}>
              Clear All
            </button>
            <button onClick={submit}>
              Export as PPT
            </button>
          </div>
        </>
        }
        <FileDrop onDrop={handleDrop}/>
      </header>
    </div>
  );
}

export default App;
