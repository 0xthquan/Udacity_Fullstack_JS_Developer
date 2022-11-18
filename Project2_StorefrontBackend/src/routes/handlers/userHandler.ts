import { User, UsersModel } from '../../models/users';
import { Router, Request, Response } from 'express';
import jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verifyAuthToken } from '../../middlewares/auth';

dotenv.config();

const userModel = new UsersModel();

const index = async (req: Request, res: Response) => {
    try {
        const user = await userModel.index();
        res.status(200);
        res.json(user);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const firstName = req.body.firstName as unknown as string;
        const lastName = req.body.lastName as unknown as string;
        const userName = req.body.userName as unknown as string;
        const password = req.body.password as unknown as string;

        const reqUser: User = {
            firstname: firstName,
            lastname: lastName,
            username: userName,
            password: password
        }
        const user = await userModel.create(reqUser)
        const token = jwt.sign({user: user}, process.env.TOKEN_SECRET as string);
        res.status(200);
        res.json({token: token});
    } catch (error) {
        res.status(400);
        res.json(error);
        console.log(error)
    }
};

const deleteUser = async (req:Request, res: Response) => {
    try {
        const userId = req.params.id as unknown as number;
        const user = await userModel.deleteUser(userId)
        res.status(200);
        res.json(user);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id as unknown as number;
        const user = await userModel.show(userId);
        res.status(200);
        res.json(user);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const authenticateUser = async (req: Request, res: Response) => {
    try {
        const userName = req.body.userName as unknown as string;
        const password = req.body.password as unknown as string;

        const user = await userModel.authenticate(userName, password)
        if (!user) {
            throw Error('Authentication failed')
        }
        const token = jwt.sign({user: user}, process.env.TOKEN_SECRET as string);
        res.status(200);
        res.json({token: token});
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

export const userRouter: Router = Router()
userRouter.get('/all', verifyAuthToken, index)
userRouter.get('/:id', verifyAuthToken, show)
userRouter.post('/create', create)
userRouter.delete('/delete/:id', verifyAuthToken, deleteUser)
userRouter.post('/auth/', authenticateUser)