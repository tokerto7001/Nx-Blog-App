import jwt, { Secret } from 'jsonwebtoken';
import { promisify } from 'util';
const { JWT_AUTH_SECRET_KEY } = process.env;

export const verifyEncodedString = async (
    encodedString: string,
): Promise<any> => {
    return await promisify<string, Secret>(jwt.verify)(
        encodedString,
        JWT_AUTH_SECRET_KEY!,
    );
};
