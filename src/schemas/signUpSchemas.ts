import {z} from 'zod';

export const usernameValidation = z
    .string()
    .min(3, {message: 'username must have atleast 3 characters '})
    .max(20, {message: 'username must be atmost 20 characters '})
    .regex(/^[a-zA-Z0-9_]+$/, {message: 'username must contain only letters, numbers and underscore'});

export const SignUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: 'Invalid email'}),
    password: z.string().min(8, {message: 'Password must be atleast 8 characters long'}),
});
