import jwt, { Secret } from 'jsonwebtoken';
import { promisify } from 'util';
const { JWT_AUTH_SECRET_KEY } = process.env;

export const verifyEncodedString = async <T>(
    encodedString: string,
): Promise<T> => {
    return (await promisify<string, Secret>(jwt.verify)(
        encodedString,
        JWT_AUTH_SECRET_KEY!,
    )) as T;
};
