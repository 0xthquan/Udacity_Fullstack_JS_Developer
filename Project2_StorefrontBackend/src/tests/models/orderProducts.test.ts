import {
    OrderProductsModel,
    OrderProductInfo,
    OrderProduct,
} from '../../models/orderProducts';
import { Order, OrdersModel, StatusOrder } from '../../models/orders';
import { ProductsModel, Product } from '../../models/products';
import { User, UsersModel } from '../../models/users';

const orderProductModel = new OrderProductsModel();

describe('Order Product model', () => {
    let orderProduct: OrderProduct;

    const userModel = new UsersModel();
    const orderModel = new OrdersModel();
    const productModel = new ProductsModel();
    let createdOrderProduct: OrderProduct;
    let createUser: User;
    let createProduct: Product;
    let createOrder: Order;

    beforeAll(async () => {
        createUser = await userModel.create({
            username: 'test',
            firstname: 'quan',
            lastname: 'tran',
            password: 'zxcv1234',
        });

        createOrder = await orderModel.create({
            user_id: createUser.id!,
            status: StatusOrder.ACTIVE,
        });

        createProduct = await productModel.create({
            name: 'Test Product',
            price: 500,
            category: 'Test category',
        })

        orderProduct = {
            order_id: createOrder.id!,
            product_id: createProduct.id!,
            quantity: 10
        }

        createdOrderProduct = await orderProductModel.addProductToOrder(orderProduct)
    });
    

    afterAll(async () => {
        await userModel.deleteUser(1)
        await productModel.deleteProduct(1)
        await orderModel.deleteOrder(1)

        await orderProductModel.deleteOrderProduct(
            createdOrderProduct.order_id,
            createdOrderProduct.product_id
        );
    });

    it('should have add method', () => {
        expect(orderProductModel.addProductToOrder).toBeDefined();
    });

    it('should have get method', () => {
        expect(orderProductModel.getOrderProductBy).toBeDefined();
    });

    it('should have delete method', () => {
        expect(orderProductModel.deleteOrderProduct).toBeDefined();
    });

    it('should have update method', () => {
        expect(orderProductModel.updateOrderProduct).toBeDefined();
    });

    it('test create method', async () => {
        expect(JSON.stringify(createdOrderProduct)).toEqual(
            JSON.stringify({
                order_id: orderProduct.order_id,
                product_id: orderProduct.product_id,
                quantity: orderProduct.quantity
            })
        );
    });

    it('test getOrderProductBy orderId method', async () => {
        const orderProductList: OrderProductInfo[] =
            await orderProductModel.getOrderProductBy(
                orderProduct.order_id
            );

        expect(JSON.stringify(orderProductList[0])).toEqual(
            JSON.stringify({
                product_id: createdOrderProduct.product_id,
                name: 'Test Product',
                price: "500",
                category: 'Test category',
                quantity: 10,
            })
        );
    });

    it('test update method', async () => {
        const updatedOrderProduct = await orderProductModel.updateOrderProduct(
            orderProduct.product_id,
            orderProduct.order_id,
            12
        );
        expect(JSON.stringify(updatedOrderProduct)).toEqual(
            JSON.stringify({
                order_id: createdOrderProduct.order_id,
                product_id: createdOrderProduct.product_id,
                quantity: 12,
            })
        );
    });

    it('test delete method', async () => {
        orderProductModel.deleteOrderProduct(
            createdOrderProduct.order_id,
            createdOrderProduct.product_id
        );
        const result = await orderProductModel.getOrderProductBy(
            createdOrderProduct.order_id
        );

        let isDeleted = true;
        result.forEach((orderProductInfo) => {
            if (
                JSON.stringify(orderProductInfo) ===
                JSON.stringify({
                    id: 1,
                    name: 'Test Product',
                    price: 500,
                    category: 'Test category',
                    quantity: 10,
                })
            ) {
                isDeleted = false;
            }
        });

        expect(isDeleted).toBeTrue;
    });
});
