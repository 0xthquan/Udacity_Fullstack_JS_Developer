import { Order, OrdersModel, StatusOrder} from '../../models/orders';
import { Router, Request, Response, NextFunction } from 'express';
import { verifyAuthToken } from '../../middlewares/auth';

const orderModel = new OrdersModel();

const create = async (req: Request, res: Response) => {
    try {
        const status = StatusOrder.ACTIVE;
        const userId = req.body.userId as unknown as number;

        const reqOrder: Order = {
            status: status,
            user_id: userId
        }
        const product = await orderModel.create(reqOrder)
        res.status(200);
        res.json(product);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};

const deleteOrder = async (req:Request, res: Response) => {
    try {
        const orderId = req.params.id as unknown as number;
        const order = await orderModel.deleteOrder(orderId)
        res.status(200);
        res.json(order);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}

const show = async (req:Request, res: Response) => {
    try {
        const userId = req.body.userId as unknown as number;
        const status = req.body.status as unknown as StatusOrder;
        const order = await orderModel.getOrdersByUserId(userId, status)
        res.status(200);
        res.json(order);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}

const updateStatus = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const orderId = req.params.id as unknown as number;
        const status = req.body.status as unknown as StatusOrder;

        const order = await orderModel.updateOrderStatus(orderId, status)
        res.status(200);
        res.json(order);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

export const orderRoutes: Router = Router()
orderRoutes.post('/create', verifyAuthToken, create)
orderRoutes.delete('/delete/:id', verifyAuthToken, deleteOrder)
orderRoutes.get('/all',verifyAuthToken, show)
orderRoutes.put('/status/:id', verifyAuthToken, updateStatus)