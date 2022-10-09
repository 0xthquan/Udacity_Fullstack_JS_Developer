import express, { Request, Response } from 'express';
import imageUtil, { ImageObject } from '../../utils/imageUtil';

const routes = express.Router();

routes.get('/', (req: Request, res: Response): void => {
    res.send('api route');
});

routes.get('/image', async (req: Request, res: Response): Promise<void> => {
    try {
        const fileName = req.query['fileName'] as unknown as string;
        const width = req.query['width'] as unknown as string;
        const height = req.query['height'] as unknown as string;

        if (!fileName || !height || !width) {
            res.status(400).send('Missing request params');
            return;
        }

        const imageObject: ImageObject = {
            imageName: fileName,
            width: parseInt(width),
            height: parseInt(height),
        };

        const isExistImage = await imageUtil.isExistImage(fileName, true);

        if (!isExistImage) {
            res.status(400).send('This image is not exist in server');
            return;
        }

        const resizedImageBuffer = await imageUtil.resizeImage(imageObject);
        res.status(200).contentType('jpg').send(resizedImageBuffer);
    } catch (error) {
        res.status(400).send('Something went wrong');
        console.log(error);
    }
});

export default routes;
