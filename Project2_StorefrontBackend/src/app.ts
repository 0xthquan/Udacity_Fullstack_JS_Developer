import bodyParser from 'body-parser';
import express, { Request, Response } from 'express'
import routes from "./routes/routes";

const app: express.Application = express()
app.use(bodyParser.json())
routes(app)
export default app