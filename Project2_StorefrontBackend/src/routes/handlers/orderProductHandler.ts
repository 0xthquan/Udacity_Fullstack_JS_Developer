import { Router, Request, Response } from 'express';
import { verifyAuthToken } from '../../middlewares/auth';
import { OrderProduct, OrderProductsModel } from '../../models/orderProducts';

const orderProductModel = new OrderProductsModel();

const show = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id as unknown as number;

        const orderProduct = await orderProductModel.getOrderProductBy(orderId)
        res.status(200);
        res.json(orderProduct);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};

const update = async (req:Request, res: Response) => {
    try {
        const orderId = req.params.id as unknown as number;
        const productId = req.body.productId as unknown as number;
        const quantity = req.body.quantity as unknown as number;

        const orderProduct = await orderProductModel.updateOrderProduct(productId, orderId, quantity)
        res.status(200);
        res.json(orderProduct);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}

const addProduct = async (req:Request, res: Response) => {
    try {
        const orderId = req.params.id as unknown as number;
        const productId = req.body.productId as unknown as number;
        const quantity = req.body.quantity as unknown as number;

        const reqOrderProduct: OrderProduct = {
            order_id: orderId,
            product_id: productId,
            quantity: quantity
        }

        const orderProduct = await orderProductModel.addProductToOrder(reqOrderProduct)
        res.status(200);
        res.json(orderProduct);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}

const deleteOrderProduct = async (req:Request, res: Response) => {
    try {
        const orderId = req.params.id as unknown as number;
        const productId = req.body.productId as unknown as number;

        const orderProduct = await orderProductModel.deleteOrderProduct(orderId, productId)
        res.status(200);
        res.json(orderProduct);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}



export const orderProductRouter: Router = Router()
orderProductRouter.get('/:id', verifyAuthToken, show)
orderProductRouter.put('/updateOrderProduct/:id', verifyAuthToken, update)
orderProductRouter.post('/addProduct/order/:id', verifyAuthToken, addProduct)
orderProductRouter.delete('/delete/order/:id', verifyAuthToken, deleteOrderProduct)