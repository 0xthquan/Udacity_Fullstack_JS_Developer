import { Application } from 'express';
import { orderRoutes } from './handlers/orderHandler';
import { orderProductRouter } from './handlers/orderProductHandler';
import { productRouter } from './handlers/productHandler';
import { userRouter } from './handlers/userHandler';

export default function (app: Application) {
    // app.use("/auth", authHandler);
    app.use('/api/orders', orderRoutes);
    app.use('/api/users', userRouter);
    app.use('/api/products', productRouter);
    app.use('/api/orderProducts', orderProductRouter);
}
