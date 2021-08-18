/**
 * Return rotation in degrees needed to correctly orient an image with given exif orintation tag
 */

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