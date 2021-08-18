import { getImageOrientation } from "./getImageOrientation";

export const getImageMeta = (file, index) => {
    return new Promise((resolve) => {
      const img = new Image();
      const fileReader = new FileReader();
      const now = new Date().getTime();

      fileReader.onload = () => img.src = fileReader.result;
      img.onload = async () => resolve({
        id: `${img.src}${now}${index}`,
        data: img.src,
        height: img.height,
        width: img.width,
        orientation: await getImageOrientation(file),
        contain: true
      });
      fileReader.readAsDataURL(file);
    });
}