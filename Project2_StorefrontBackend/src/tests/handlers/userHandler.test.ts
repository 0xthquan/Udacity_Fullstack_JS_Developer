import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);

describe('User Handler', () => {
    let authToken: string;

    it('Test end point create user', async () => {
        const response = await request.post('/api/users/create').send({
            userName: 'thquan',
            firstName: 'quan',
            lastName: 'tran',
            password: '123qwe',
        });
        authToken = response.body.token
        expect(response.status).toBe(200);
    });

    it('Test end point get all user', async () => {
        const response = await request.get('/api/users/all').set('Authorization', 'Bearer ' + authToken);
        expect(response.status).toBe(200);
    });

    it('Test end point authenticate user', async () => {
        const response = await request.post(`/api/users/auth`).send({
            userName: "thquan",
            password: '123qwe'
        });
        expect(response.status).toBe(200);
    });

    it('Test end point delete user', async () => {
        const response = await request
            .delete(`/api/users/delete/${1}`)
            .set('Authorization', 'Bearer ' + authToken);
        expect(response.status).toBe(200);
    });
});
