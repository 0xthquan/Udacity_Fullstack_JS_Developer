import imageUtil from '../../utils/imageUtil';
import { ImageObject } from '../../utils/imageUtil';

describe('Process Image API Test', () => {
    it('Test resized image', async () => {
        const imageObject: ImageObject = {
            imageName: 'binance.jpg',
            width: 200,
            height: 130,
        };

        const imageResizedBuffer = await imageUtil.resizeImage(imageObject);
        expect(imageResizedBuffer).not.toBeNull;
    });
});
