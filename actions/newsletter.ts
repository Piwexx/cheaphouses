'use server'

import { emailSignupSchema } from '@/lib/validations'
import { subscribeEmail } from '@/lib/db'

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

  const result = await subscribeEmail(parsed.data.email)
  if (result.result === 'duplicate') {
    return { status: 'error', message: "You're already on the list." }
  }

  return { status: 'success', email: parsed.data.email }
}
