import { eq } from 'drizzle-orm';
import { db } from '../clients/postgres';
import { Users } from '../db/schema';
import { EmailService } from '../utilities/emailService';
import { hashString } from '../utilities/hashString';
import { generateEncodedString } from '../utilities/generateEncodedString';

interface TUserRegisterBody {
    fullName: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

const { JWT_AUTH_SECRET_KEY, JWT_AUTH_EXPIRES_IN, API_URL } = process.env;
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

        const hashedPassword = hashString(password);

        const userId = await db
            .insert(Users)
            .values({
                fullName: fullName,
                email: email,
                password: hashedPassword,
            })
            .returning({ userId: Users.id });

        const encodedString = await generateEncodedString(
            { userId },
            JWT_AUTH_SECRET_KEY!,
            JWT_AUTH_EXPIRES_IN!,
        );

        const emailService = new EmailService(fullName, email);
        await emailService.sendRegisterEmail(
            `${API_URL}/api/users/verify/${encodedString}`,
        );
    }
}
