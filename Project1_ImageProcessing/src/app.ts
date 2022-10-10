import express, { NextFunction, Request, Response } from 'express';
import routes from './routes/api/routes';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response): void => {
    res.status(200).send('Welcome');
});

app.use('/api', routes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: string, req: Request, res: Response, next: NextFunction): void=> {
    res.status(400).send(err)
})

app.listen(port, (): void => {
    console.log(`Server running on ${port}`);
});

export default app;
