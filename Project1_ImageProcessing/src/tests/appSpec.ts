import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe('Test endpoint server', () => {
    it('Welcome test', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
});
