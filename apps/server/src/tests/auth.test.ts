import { client, db } from '../clients/postgres';
import { Users } from '../db/schema';
import { httpServer } from '../index';
import request from 'supertest';
import { eq } from 'drizzle-orm';
import { generateEncodedString } from '../utilities/generateEncodedString';

const { JWT_AUTH_SECRET_KEY, JWT_AUTH_EXPIRES_IN } = process.env;

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

beforeAll(async () => {
    await db.delete(Users);
});

describe('Authentication process test', () => {
    describe('Register', () => {
        it('should returns 400 if required properties are not provided', async () => {
            const response = await server.post('/api/users/register').send({
                fullName: userRegisterObject.fullName,
                email: userRegisterObject.email,
            });

            expect(response.status).toBe(400);
        });

        it('should successfully register the user', async () => {
            const response = await server
                .post('/api/users/register')
                .send(userRegisterObject);

            expect(response.status).toBe(201);
        });
    });

    describe('Verify User', () => {
        it('should return 400 if verification code is not provided properly', async () => {
            const response = await server.get('/api/users/verify/test').send();

            expect(response.status).toBe(400);
        });

        it('should verify the user', async () => {
            const registeredUser = await db
                .select()
                .from(Users)
                .where(eq(Users.email, userRegisterObject.email));

            const verificationCode = await generateEncodedString(
                { userId: registeredUser[0].id },
                JWT_AUTH_SECRET_KEY,
                JWT_AUTH_EXPIRES_IN,
            );

            const response = await server
                .get(`/api/users/verify/${verificationCode}`)
                .send();

            expect(response.status).toBe(200);
        });
    });
});

afterAll(async () => {
    httpServer.close();
    client.end();
});
