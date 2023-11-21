import { z } from 'zod';

export const registerDto: z.ZodSchema = z
    .object({
        fullName: z
            .string({
                required_error: 'Name is required',
                invalid_type_error: 'Name must be string',
            })
            .max(60, { message: 'Name must be 60 or less characters' })
            .min(2, { message: 'Name must be 2 or more characters' }),
        email: z
            .string({
                required_error: 'Email is required',
                invalid_type_error: 'Email must be string',
            })
            .email({ message: 'Email must be in line with email conventions' })
            .toLowerCase(),
        password: z
            .string({
                required_error: 'Password is required',
                invalid_type_error: 'Password must be string',
            })
            .max(15, { message: 'Password must be maxium 15 characters' })
            .min(3, { message: 'Password must be minimum 3 characters' }),
        passwordConfirm: z
            .string({
                required_error: 'Password confirm is required',
                invalid_type_error: 'Password confirm must be string',
            })
            .max(15, {
                message: 'Password confirm must be maxium 15 characters',
            })
            .min(3, {
                message: 'Password confirm must be minimum 3 characters',
            }),
    })
    .refine((values) => values.password === values.passwordConfirm, {
        message: "Passwords don't match",
        path: ['passwordConfirm'],
    });

export const userVerifyDto: z.ZodSchema = z.object({
    verificationCode: z.string({
        required_error: 'verification url is required',
        invalid_type_error: 'verification url must be string',
    }),
});
