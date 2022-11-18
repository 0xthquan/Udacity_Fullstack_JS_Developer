import supertest from 'supertest';
import app from '../../app';
import { Product } from '../../models/products';

const request = supertest(app);

describe('Product Handler', () => {
    let authToken: string;
    let product: Product;

    beforeAll(async () => {
        const response = await request.post('/api/users/create').send({
            userName: 'thquan',
            firstName: 'quan',
            lastName: 'tran',
            password: '123qwe',
        });
        authToken = response.body.token
    })

    it('Test end point create product', async () => {
        const response = await request.post('/api/products/create').send({
            name: 'Test product',
            price: 500,
            category: 'Test category'
        }).set('Authorization', 'Bearer ' + authToken);
        product = response.body
        expect(response.status).toBe(200);
    });

    it('Test end point get all products', async () => {
        const response = await request.get('/api/products/all');
        expect(response.status).toBe(200);
    });

    it('Test end point show product by id', async () => {
        const response = await request.get(`/api/products/show/1`)
        expect(response.status).toBe(200);
    });

    it('Test end point update product', async () => {
        const response = await request
            .put(`/api/products/update/${product.id!}`).send({
                name: "Update name",
                price: 1000,
                category: "update category"
            })
            .set('Authorization', 'Bearer ' + authToken);
        expect(response.status).toBe(200);
    });

    it('Test end point delete product',async () => {
        const response = await request.delete(`/api/products/delete/1`).set('Authorization', 'Bearer ' + authToken);
        expect(response.status).toBe(200);
    })
});
