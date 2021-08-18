/**
 * Based on this stackoverflow answer - https://stackoverflow.com/a/32490603
 */

 export const getImageOrientation = (file) => {
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