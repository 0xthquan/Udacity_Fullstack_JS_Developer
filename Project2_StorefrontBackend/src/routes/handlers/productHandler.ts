import { Product, ProductsModel } from '../../models/products';
import { Application, Request, Response, Router } from 'express';
import { verifyAuthToken } from '../../middlewares/auth';

const productModel = new ProductsModel();

const index = async (req: Request, res: Response) => {
    try {
        const user = await productModel.index();
        res.status(200);
        res.json(user);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const name = req.body.name as unknown as string;
        const price = req.body.price as unknown as number;
        const category = req.body.category as unknown as string;

        const reqProduct: Product = {
            name: name,
            price: price,
            category: category
        }
        const product = await productModel.create(reqProduct)
        res.status(200);
        res.json(product);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const deleteProduct = async (req:Request, res: Response) => {
    try {
        const productId = req.params.id as unknown as number;
        const product = await productModel.deleteProduct(productId)
        res.status(200);
        res.json(product);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const show = async (req:Request, res: Response) => {
    try {
        const productId = req.params.id as unknown as number;
        const product = await productModel.getProductBy(productId)
        res.status(200);
        res.json(product);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async (req:Request, res: Response) => {
    try {
        const productId = req.params.id as unknown as number;
        const name = req.body.name as unknown as string;
        const price = req.body.price as unknown as number;
        const category = req.body.category as unknown as string;

        const reqProduct: Product = {
            name: name,
            price: price,
            category: category
        }

        const product = await productModel.updateProduct(productId, reqProduct)
        res.status(200);
        res.json(product);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

export const productRouter: Router = Router()
productRouter.get('/all', index)
productRouter.post('/create', verifyAuthToken, create)
productRouter.delete('/delete/:id', verifyAuthToken, deleteProduct)
productRouter.get('/show/:id', show)
productRouter.put('/update/:id', verifyAuthToken, update)