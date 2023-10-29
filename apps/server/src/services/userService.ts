import { eq } from 'drizzle-orm';
import { db } from '../clients/postgres';
import { Users } from '../db/schema';
import bcrypt from 'bcrypt';
import { EmailService } from '../utilities/sendEmail';

interface TUserRegisterBody {
    fullName: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

const { HASH_SALT_ROUNDS } = process.env;
export class UserService {
    constructor() {}

    async register(requestBody: TUserRegisterBody) {
        const { fullName, email, password, passwordConfirm } = requestBody;

        const existingUser = await db
            .select()
            .from(Users)
            .where(eq(Users.email, email!))
            .limit(1);
        if (existingUser.length)
            throw Error('This user is already registered!');

        if (password !== passwordConfirm)
            throw Error('Passwords not matching!');

        const hashedPassword = this.hashUserPassword(password);

        await db.insert(Users).values({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        });

        const emailService = new EmailService(fullName, email);
        await emailService.sendRegisterEmail('members.rexven.com');
    }

    private hashUserPassword = (password: string): string => {
        return bcrypt.hashSync(password, +HASH_SALT_ROUNDS!);
    };
}
