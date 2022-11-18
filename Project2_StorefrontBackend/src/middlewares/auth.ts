import jwt from "jsonwebtoken";
import { NextFunction, Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = req.headers.authorization?.split(" ")[1]
        if (!authToken) {
            throw Error('Unauthorized')
        }
        jwt.verify(authToken, process.env.TOKEN_SECRET as string)
        next()
    } catch (error) {
        res.status(401).send('Unauthorized')
        return
    }
}