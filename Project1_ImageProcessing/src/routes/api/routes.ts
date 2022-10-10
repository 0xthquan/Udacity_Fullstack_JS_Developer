import express, { NextFunction, Request, Response } from 'express';
import imageUtil, { ImageObject } from '../../utils/imageUtil';

const routes = express.Router();

routes.get('/', (req: Request, res: Response): void => {
    res.send('api route');
});

routes.get('/image', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const fileName = req.query['filename'] as unknown as string;
        const width = req.query['width'] as unknown as string;
        const height = req.query['height'] as unknown as string;

        if (!fileName || !height || !width) {
            next('Missing request param filename, height or width.')
            return;
        }

        if (isNaN(parseInt(height)) || isNaN(parseInt(width)) || parseInt(width) < 0 || parseInt(height) < 0) {
            next('Invalid input for height or width')
            return;
        }

        const imageObject: ImageObject = {
            imageName: fileName+'.jpg',
            width: parseInt(width),
            height: parseInt(height),
        };

        const isExistImage = await imageUtil.isExistImage(imageObject.imageName, true);

        if (!isExistImage) {
            next('This image does not exist in server.\n Please try these file name: bitcoin, binance, ethereum or solana')
            return;
        }

        const resizedImageBuffer = await imageUtil.resizeImage(imageObject);
        res.status(200).contentType('jpg').send(resizedImageBuffer);
    } catch (error) {
        next('Something went wrong')
    }
});

export default routes;
