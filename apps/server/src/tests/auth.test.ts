import { client, db } from '../clients/postgres';
import { Users } from '../db/schema';
import { httpServer } from '../index';
import request from 'supertest';

const server = request(httpServer);

interface IUserRegisterObject {
    fullName: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

const userRegisterObject: IUserRegisterObject = {
    fullName: 'Hasan toker',
    email: 'tokerto7001@gmail.com',
    password: '12345678',
    passwordConfirm: '12345678',
};

describe('Authentication process test', () => {
    it('should returns 400 if required properties are not provided', async () => {
        await server
            .post('/api/users/register')
            .send({
                fullName: userRegisterObject.fullName,
                email: userRegisterObject.email,
            })
            .expect(400);
    });

    it('should successfully register the user', async () => {
        await server
            .post('/api/users/register')
            .send(userRegisterObject)
            .expect(201);
    });
});

beforeAll(async () => {
    await db.delete(Users);
});

afterAll(async () => {
    httpServer.close();
    client.end();
});
