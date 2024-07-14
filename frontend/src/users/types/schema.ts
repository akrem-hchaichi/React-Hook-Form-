import { z } from 'zod'
import { patterns } from '../../constants'

export const schema = z.object({
    name: z.string()
        .min(1, { message: 'Name Required' }),
    email: z.string()
        .min(1, { message: 'Email Required' })
        .refine((text) => patterns.email.test(text), { message: 'Email not valid' }),
    states: z.array(z.string()).min(1).max(2),
    languagesSpoken: z.array(z.string()),
    gender: z.string().min(1),

})

export type userSchema = z.infer<typeof schema>

export const defaultValues: userSchema = {
    email: '',
    name: '',
    states: [],
    languagesSpoken: [],
    gender: '',
};