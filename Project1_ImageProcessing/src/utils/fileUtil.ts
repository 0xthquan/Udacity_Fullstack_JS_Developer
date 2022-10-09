import { promises as fs } from 'fs';
import path from 'path';
import { ImageObject } from './imageUtil';

const originalImagePath = `${path.resolve(__dirname, '../../assets/original/')}` + '/';
const thumbImagePath = `${path.resolve(__dirname, '../../assets/thumb/')}` + '/';

async function isFileExist(fileName: string, isOriginal: boolean): Promise<boolean> {
    try {
        if (isOriginal) {
            await fs.access(originalImagePath + fileName);
        } else {
            await fs.access(thumbImagePath + fileName);
        }
        return true;
    } catch {
        return false;
    }
}

async function getBufferImage(fileName: string): Promise<Buffer | string> {
    try {
        const buffer = await fs.readFile(originalImagePath + fileName);
        return buffer;
    } catch (error) {
        return String(error);
    }
}

async function saveImageToServer(imageObject: ImageObject, bufferFile: Buffer): Promise<string> {
    const fileName = `${imageObject.imageName.replace('.jpg', '')}${imageObject.width}x${imageObject.height}.jpg`;
    try {
        await fs.writeFile(`${thumbImagePath}${fileName}`, bufferFile);
        return fileName;
    } catch (error) {
        return String(error);
    }
}

export default {
    getBufferImage,
    isFileExist,
    saveImageToServer,
};
