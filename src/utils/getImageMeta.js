import { getImageOrientation } from "./getImageOrientation";

export const getImageMeta = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const fileReader = new FileReader();

      fileReader.onload = () => img.src = fileReader.result;
      img.onload = async () => resolve({
        data: img.src,
        height: img.height,
        width: img.width,
        orientation: await getImageOrientation(file),
        contain: true
      });
      fileReader.readAsDataURL(file);
    });
}