import express, { Request, Response } from 'express';
import routes from './routes/api/routes';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response): void => {
    res.status(200).send('Welcome');
});

app.use('/api', routes);

app.listen(port, (): void => {
    console.log(`Server running on ${port}`);
});

export default app;
