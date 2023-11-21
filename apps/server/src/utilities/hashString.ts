import bcrypt from 'bcrypt';
import { promisify } from 'util';

const { HASH_SALT_ROUNDS } = process.env;
export const hashString = async (string: string): Promise<string> => {
    return (await promisify<string, number>(bcrypt.hash)(
        string,
        +HASH_SALT_ROUNDS,
    )) as unknown as string;
};
