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

export const listingToneValues = [
  'olive', 'terracotta', 'granite', 'cedar', 'pine', 'timber',
] as const

// The image file is validated in the Server Action (type/size), not here —
// FormData files don't survive Object.fromEntries cleanly.
export const listingSchema = z.object({
  state:          z.string().trim().min(2, 'State is required'),
  stateShort:     z.string().trim().min(2, 'State code is required').max(5),
  location:       z.string().trim().min(2, 'Location is required'),
  locationShort:  z.string().trim().min(2, 'Short location is required'),
  price:          z.string().trim().regex(/^\d{1,3}(,\d{3})*$|^\d+$/, 'Numeric price, e.g. 35,000'),
  currencySymbol: z.string().trim().min(1, 'Currency symbol is required').max(3),
  title:          z.string().trim().min(3, 'Title is required'),
  meta: z
    .string()
    .transform(s => s.split('\n').map(l => l.trim()).filter(Boolean))
    .pipe(z.array(z.string().max(60, 'Keep each detail under 60 characters'))
      .min(1, 'Add at least one detail')
      .max(6, 'Six details max')),
  note: z.string().trim().min(1, 'Note is required'),
  link: z
    .union([z.literal(''), z.string().trim().url('Link must be a valid URL')])
    .transform(v => v || null),
  tone:      z.enum(listingToneValues, { message: 'Pick a tone' }),
  isNew:     z.preprocess(v => v === 'on', z.boolean()),
  published: z.preprocess(v => v === 'on', z.boolean()),
  imageUrl:  z.union([z.literal(''), z.string().trim().url('Image URL must be a valid URL')]),
})

export const listingIdSchema = z.coerce.number().int().positive()
