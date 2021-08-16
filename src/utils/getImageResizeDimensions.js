
export const getImageResizeDimensions = (image, maxHeight, maxWidth) => {
    const {height, width, orientation} = image;
    const currentAspect = width * 1.0 / height;
    const maxAspect = maxWidth * 1.0 / maxHeight;

    let dimensions = {height, width};
    if(currentAspect === maxAspect) {
        dimensions = {
            height: maxHeight,
            width: maxWidth,
        }
    }
    else if (
        (currentAspect > maxAspect && image.contain) ||
        (currentAspect < maxAspect && !image.contain)
    ) {
        dimensions = {
            height: (maxWidth * 1.0 / width) * height,
            width: maxWidth,
        }
    }
    else {
        dimensions = {
            height: maxHeight,
            width: (maxHeight * 1.0 / height) * width,
        }
    }

    return ([5, 6, 7, 8]).includes(orientation) ? {height: dimensions.width, width: dimensions.height} : dimensions;
}