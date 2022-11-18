import supertest from 'supertest';
import app from '../../app';
import { Order, StatusOrder } from '../../models/orders';

const request = supertest(app);

describe('Order Handler', () => {
    let userId: number;
    let authToken: string;
    let order: Order;

    beforeAll(async () => {
        const response = await request.post('/api/users/create').send({
            userName: 'thquan',
            firstName: 'quan',
            lastName: 'tran',
            password: '123qwe',
        });
        authToken = response.body.token
        const userReponse = await request.get('/api/users/all').set('Authorization', 'Bearer ' + authToken);
        userId = userReponse.body[0].id
    })

    it('Test end point create order', async () => {
        const response = await request.post('/api/orders/create').send({
            userId: userId,
            status: StatusOrder.ACTIVE
        }).set('Authorization', 'Bearer ' + authToken);

        order = response.body
        expect(response.status).toBe(200);
    });

    it('Test end point get all order by user id', async () => {
        const response = await request.get('/api/orders/all').send({
            userId: order.user_id,
            status: StatusOrder.ACTIVE
        }).set('Authorization', 'Bearer ' + authToken);
        expect(response.status).toBe(200);
    });

    it('Test end point update order', async () => {
        const response = await request
            .put(`/api/orders/status/${order.id!}`).send({
                status: StatusOrder.COMPLETED
            })
            .set('Authorization', 'Bearer ' + authToken);
        expect(response.status).toBe(200);
    });

    it('Test end point delete order',async () => {
        const response = await request.delete(`/api/orders/delete/${order.id!}`).set('Authorization', 'Bearer ' + authToken);
        expect(response.status).toBe(200);
    })
});
