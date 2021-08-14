const getOrientation = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {

            const view = new DataView(event.target.result);
            if (view.getUint16(0, false) !== 0xFFD8)
            {
                resolve(-2);
            }
            let length = view.byteLength, offset = 2;
            while (offset < length) 
            {
                if (view.getUint16(offset+2, false) <= 8) resolve(-1);
                var marker = view.getUint16(offset, false);
                offset += 2;
                if (marker === 0xFFE1) 
                {
                    if (view.getUint32(offset += 2, false) !== 0x45786966) 
                    {
                        resolve(-1);
                    }

                    var little = view.getUint16(offset += 6, false) === 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    var tags = view.getUint16(offset, little);
                    offset += 2;
                    for (var i = 0; i < tags; i++)
                    {
                        if (view.getUint16(offset + (i * 12), little) === 0x0112)
                        {
                            resolve(view.getUint16(offset + (i * 12) + 8, little));
                        }
                    }
                }
                else if ((marker & 0xFF00) !== 0xFF00)
                {
                    break;
                }
                else
                { 
                    offset += view.getUint16(offset, false);
                }
            }
            resolve(-1);
        }
        reader.readAsArrayBuffer(file);
    });
}

export const getImageMeta = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const fileReader = new FileReader();

      fileReader.onload = () => img.src = fileReader.result;
      img.onload = async () => resolve({
        data: img.src,
        height: img.height,
        width: img.width,
        orientation: await getOrientation(file),
      });
      fileReader.readAsDataURL(file);
    });
}

export const getDimensions = (image, maxHeight, maxWidth) => {
    const {height, width, orientation} = image;
    const currentAspect = width * 1.0 / height;
    const maxAspect = maxWidth * 1.0 / maxHeight;

    let dimensions = {height, width};
    if(currentAspect === maxAspect) {
        dimensions = {
            height: maxHeight,
            width: maxWidth,
        }
    } else if (currentAspect > maxAspect) {
        dimensions = {
            height: (maxWidth * 1.0 / width) * height,
            width: maxWidth,
        }
    } else {
        dimensions = {
            height: maxHeight,
            width: (maxHeight * 1.0 / height) * width,
        }
    }

    return ([5, 6, 7, 8]).includes(orientation) ? {height: dimensions.width, width: dimensions.height} : dimensions;
}

export const getRotationFromExif = (exif) => {
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