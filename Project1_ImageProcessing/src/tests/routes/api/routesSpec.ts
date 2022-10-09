import supertest from 'supertest';
import app from '../../../app';
import imageUtil from '../../../utils/imageUtil';
import { ImageObject } from '../../../utils/imageUtil';

const request = supertest(app);

describe('Process Image API Test', () => {
    it('Test null param', async () => {
        const response = await request.get('/api/image');
        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing request params');
    });

    it('Test image is not exist', async () => {
        const response = await request.get('/api/image?fileName=testFail.jpg&height=100&width=100');
        expect(response.status).toBe(400);
        expect(response.text).toBe('This image is not exist in server');
    });

    it('Test endpoint image response', async () => {
        const imageObject: ImageObject = {
            imageName: 'binance.jpg',
            width: 200,
            height: 130,
        };
        const fileResized = `${imageObject.imageName.replace('.jpg', '')}${imageObject.width}x${
            imageObject.height
        }.jpg`;
        const response = await request.get(
            `/api/image?fileName=${imageObject.imageName}&width=${imageObject.width}&height=${imageObject.height}`
        );
        const isFileExist = await imageUtil.isExistImage(fileResized, false);
        expect(isFileExist).toBe(true);
        expect(response.status).toBe(200);
    });
});
