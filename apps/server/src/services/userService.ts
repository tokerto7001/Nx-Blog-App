import { eq } from 'drizzle-orm';
import { db } from '../clients/postgres';
import { Users } from '../db/schema';
import { EmailService } from '../utilities/emailService';
import { hashString } from '../utilities/hashString';
import { generateEncodedString } from '../utilities/generateEncodedString';
import { verifyEncodedString } from '../utilities/verifyEncodedString';

interface TUserRegisterBody {
    fullName: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

const { JWT_AUTH_SECRET_KEY, JWT_AUTH_EXPIRES_IN, API_URL } = process.env;
export class UserService {
    constructor() {}

    async register(requestBody: TUserRegisterBody): Promise<void> {
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

        const hashedPassword = hashString(password);

        const user = await db
            .insert(Users)
            .values({
                fullName: fullName,
                email: email,
                password: hashedPassword,
            })
            .returning({ userId: Users.id });

        const encodedString = await generateEncodedString(
            { userId: user[0].userId },
            JWT_AUTH_SECRET_KEY!,
            JWT_AUTH_EXPIRES_IN!,
        );

        if (process.env.NODE_ENV !== 'test') {
            const emailService = new EmailService(fullName, email);
            await emailService.sendRegisterEmail(
                `${API_URL}/api/users/verify/${encodedString}`,
            );
        }
    }

    async verifyUser(verificationCode: string) {
        if (!verificationCode) throw Error('No code provided!');

        const { userId } = await verifyEncodedString(verificationCode);
        if (!userId) throw new Error('No user found!');

        const user = await db
            .select()
            .from(Users)
            .where(eq(Users.id, userId))
            .limit(1);
        if (!user.length) throw Error('No user found!');

        await db
            .update(Users)
            .set({ isVerified: true })
            .where(eq(Users.id, userId));
    }
}
