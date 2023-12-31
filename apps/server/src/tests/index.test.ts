import { client } from '../clients/postgres';
import { httpServer } from '../index';
import request from 'supertest';

const server = request(httpServer);

describe('Basic tests for the initial route', () => {
    it('should return 200 statusCode', async () => {
        const response = await server.post('/').send({ test: true });

        expect(response.status).toBe(200);
    });
    it('should return 400 statusCode', async () => {
        const response = await server.post('/').send({ test: false });

        expect(response.status).toBe(400);
    });
});

afterAll(async () => {
    httpServer.close();
    client.end();
});
