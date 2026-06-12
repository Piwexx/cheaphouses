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

const authEmail = z
  .string()
  .min(1, 'Email is required')
  .email("Doesn't look like an email — mind checking that?")

export const loginSchema = z.object({
  email:    authEmail,
  password: z.string().min(1, 'Password is required'),
})

export const registerSchema = z.object({
  email:    authEmail,
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const magicLinkSchema = z.object({
  email: authEmail,
})

export const checkoutSchema = z.object({
  billing: z.enum(['monthly', 'annual'], { message: 'Pick a billing cycle' }),
})
