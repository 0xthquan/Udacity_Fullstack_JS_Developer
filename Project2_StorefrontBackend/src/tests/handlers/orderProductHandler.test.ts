import supertest from 'supertest';
import app from '../../app';
import { OrderProduct } from '../../models/orderProducts';
import { StatusOrder } from '../../models/orders';

const request = supertest(app);

describe('Order Product Handler', () => {
    let userId: number;
    let orderId: number;
    let productId: number;
    let authToken: string;
    let orderProduct: OrderProduct;

    beforeAll(async () => {
        const response = await request.post('/api/users/create').send({
            userName: 'thquan',
            firstName: 'quan',
            lastName: 'tran',
            password: '123qwe',
        });
        authToken = response.body.token;
        const userReponse = await request.get('/api/users/all').set('Authorization', 'Bearer ' + authToken);
        userId = userReponse.body[0].id;

        const productRes = await request
            .post('/api/products/create')
            .send({
                name: 'Test product',
                price: 500,
                category: 'Test category',
            })
            .set('Authorization', 'Bearer ' + authToken);
        productId = productRes.body.id;

        const orderRes = await request
            .post('/api/orders/create')
            .send({
                userId: userId,
                status: StatusOrder.ACTIVE,
            })
            .set('Authorization', 'Bearer ' + authToken);
        orderId = orderRes.body.id;
    });

    it('Test end point create order product', async () => {
        const response = await request
            .post(`/api/orderProducts/addProduct/order/${orderId}`)
            .send({
                productId: productId,
                quantity: 10,
            })
            .set('Authorization', 'Bearer ' + authToken);

        orderProduct = response.body;
        expect(response.status).toBe(200);
    });

    it('Test end point show order product by order id', async () => {
        const response = await request.get(`/api/orderProducts/${orderId}`);
        expect(response.status).toBe(200);
    });

    it('Test end point update order product by order id', async () => {
        const response = await request
            .put(`/api/orderProducts/updateOrderProduct/${orderId}`)
            .send({
                productId: productId,
                quantity: 12,
            })
            .set('Authorization', 'Bearer ' + authToken);
        expect(response.status).toBe(200);
    });

    it('Test end point delete order product', async () => {
        const response = await request
            .delete(`/api/orderProducts/delete/order/${orderId}`)
            .send({
                productId: productId
            })
            .set('Authorization', 'Bearer ' + authToken);
        expect(response.status).toBe(200);
    });
});
