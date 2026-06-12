import { z } from 'zod'

export const emailSignupSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email("Doesn't look like an email — mind checking that?"),
})

export const confirmTokenSchema = z.object({
  token: z.string().uuid('Invalid confirmation token'),
})
