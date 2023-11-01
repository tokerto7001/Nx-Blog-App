import bcrypt from 'bcrypt';

const { HASH_SALT_ROUNDS } = process.env;
export const hashString = (string: string) => {
    return bcrypt.hashSync(string, +HASH_SALT_ROUNDS!);
};
