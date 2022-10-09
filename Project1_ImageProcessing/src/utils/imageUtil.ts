import sharp from 'sharp';
import fileUtil from './fileUtil';

export interface ImageObject {
    imageName: string;
    width: number;
    height: number;
}

async function isExistImage(fileName: string, isOriginal: boolean): Promise<boolean> {
    return await fileUtil.isFileExist(fileName, isOriginal);
}

async function resizeImage(imageObject: ImageObject): Promise<Buffer> {
    const imageBuffer = await fileUtil.getBufferImage(imageObject.imageName);

    try {
        const imageResizedBuffer = await sharp(imageBuffer).resize(imageObject.width, imageObject.height).toBuffer();

        await fileUtil.saveImageToServer(imageObject, imageResizedBuffer);
        return imageResizedBuffer;
    } catch (error) {
        console.log(error);
        return Promise.reject();
    }
}

export default {
    isExistImage,
    resizeImage,
};
