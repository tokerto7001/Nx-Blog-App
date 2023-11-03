import { promisify } from 'util';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export const generateEncodedString = async (
    object: object,
    secretKey: string,
    expiresIn: string,
): Promise<any> => {
    return await promisify<object, Secret, SignOptions>(jwt.sign)(
        object,
        secretKey,
        { expiresIn },
    );
};
