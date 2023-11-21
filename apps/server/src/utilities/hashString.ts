import { hash } from 'bcrypt';

const { HASH_SALT_ROUNDS } = process.env;

export const hashString = async (string: string): Promise<string> => {
    return await hash(string, +HASH_SALT_ROUNDS!);
};
