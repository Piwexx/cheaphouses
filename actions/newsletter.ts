'use server'

import { emailSignupSchema } from '@/lib/validations'

type SignupState =
  | { status: 'idle' }
  | { status: 'success'; email: string }
  | { status: 'error'; message: string }

export async function signupAction(
  _prevState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const parsed = emailSignupSchema.safeParse({ email: formData.get('email') })
  if (!parsed.success) {
    return { status: 'error', message: parsed.error.errors[0].message }
  }
  // TODO: integrate with email provider (Resend, ConvertKit, etc.)
  await new Promise(r => setTimeout(r, 600))
  return { status: 'success', email: parsed.data.email }
}
