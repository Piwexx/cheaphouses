'use client'

import { useActionState, useState } from 'react'
import { signupAction } from '@/actions/newsletter'
import { emailSignupSchema } from '@/lib/validations'
import { CheckIcon } from '@/components/ui/icons'

interface SignupFormProps {
  variant?: 'hero' | 'community'
}

const initialState = { status: 'idle' as const }

export default function SignupForm({ variant = 'hero' }: SignupFormProps) {
  const [state, formAction, isPending] = useActionState(signupAction, initialState)
  const [email, setEmail] = useState('')
  const [clientError, setClientError] = useState<string | null>(null)

  if (state.status === 'success') {
    return (
      <div
        className={`signup signup--success signup--${variant}`}
        role="status"
        aria-live="polite"
      >
        <div className="signup-success__icon" aria-hidden="true">
          <CheckIcon />
        </div>
        <div className="signup-success__copy">
          <div className="signup-success__title">You&apos;re in.</div>
          <div className="signup-success__body">
            Friday, eight properties. Check <strong>{state.email}</strong> for a
            confirmation link — it&apos;ll be in there before the kettle boils.
          </div>
        </div>
      </div>
    )
  }

  const errorMessage =
    clientError ?? (state.status === 'error' ? state.message : null)
  const hasError = errorMessage !== null

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const parsed = emailSignupSchema.safeParse({ email })
    if (!parsed.success) {
      e.preventDefault()
      setClientError(parsed.error.errors[0].message)
    }
  }

  return (
    <form
      className={`signup signup--${variant}`}
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="signup__row">
        <div className={`signup__input-wrap${hasError ? ' has-error' : ''}`}>
          <input
            type="email"
            name="email"
            className="signup__input"
            placeholder="your@email.com"
            aria-invalid={hasError}
            aria-label="Email address"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setClientError(null)
            }}
          />
        </div>
        <button type="submit" className="signup__btn" disabled={isPending}>
          {isPending ? 'Sending…' : "Get Friday's picks"}
        </button>
      </div>
      {hasError && (
        <div className="signup__error">{errorMessage}</div>
      )}
    </form>
  )
}
