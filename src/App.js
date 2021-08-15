import './App.css';
import { FileDrop } from './components/FileDrop';
import { FileList } from './components/FileList';
import React, {useCallback, useState} from 'react';
import pttxgen from 'pptxgenjs';
import { getDimensions, getImageMeta, getRotationFromExif } from './utils/imageMeta';
import { BigButton } from './components/BigButton';
import { BiLoaderAlt } from 'react-icons/bi';

const MAX_HEIGHT = 5.625;
const MAX_WIDTH = 10.0;

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleDrop = useCallback(async (acceptedImages) => {
    setLoading(true);
    const newImages = await Promise.all(acceptedImages.map(image => getImageMeta(image)));
    setImages(currentImages => [...currentImages, ...newImages])
    setLoading(false);
  },
  []);

  const handleRemoveIndex = (index) => setImages(currentImages => [...currentImages.slice(0, index), ...currentImages.slice(index+1)]);
  const handleToggleContainIndex = (index) => setImages(currentImages => currentImages.map((image, idx) => idx === index ? {...image, contain: !image.contain} : image));

  const reset = () => setImages([]);

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      const presentation = new pttxgen();
      images.forEach(image => {
        const dimensions = getDimensions(image, MAX_HEIGHT, MAX_WIDTH);
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
            <FileList files={images} setFiles={setImages} handleRemove={handleRemoveIndex} handleToggleContain={handleToggleContainIndex}/>
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
        
    {isLoading && 
      <div id="loader">
        <div><BiLoaderAlt fontSize="20vw"/></div>
      </div>
    }
    </div>
  );
}

export default App;
