'use client'

import { useActionState } from 'react'
import { registerAction, type AuthState } from '@/actions/auth'
import { CheckIcon } from '@/components/ui/icons'

const initialState: AuthState = { status: 'idle' }

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState)

  if (state.status === 'success') {
    return (
      <div className="auth-success" role="status" aria-live="polite">
        <div className="signup-success__icon" aria-hidden="true">
          <CheckIcon />
        </div>
        <p>{state.message}</p>
      </div>
    )
  }

  const hasError = state.status === 'error'

  return (
    <form action={formAction} noValidate>
      <label className="auth-label" htmlFor="register-email">Email</label>
      <input
        id="register-email"
        type="email"
        name="email"
        className="auth-input"
        placeholder="your@email.com"
        autoComplete="email"
        required
      />
      <label className="auth-label" htmlFor="register-password">Password</label>
      <input
        id="register-password"
        type="password"
        name="password"
        className="auth-input"
        placeholder="At least 8 characters"
        autoComplete="new-password"
        required
      />
      {hasError && <div className="signup__error">{state.message}</div>}
      <button type="submit" className="auth-btn" disabled={isPending}>
        {isPending ? 'Creating…' : 'Create account'}
      </button>
    </form>
  )
}
