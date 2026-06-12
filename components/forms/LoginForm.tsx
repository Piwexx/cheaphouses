'use client'

import { useActionState, useState } from 'react'
import { loginAction, magicLinkAction, type AuthState } from '@/actions/auth'
import { CheckIcon } from '@/components/ui/icons'

const initialState: AuthState = { status: 'idle' }

type Mode = 'password' | 'magic'

export default function LoginForm({ next }: { next?: string }) {
  const [mode, setMode] = useState<Mode>('password')
  const [passwordState, passwordFormAction, passwordPending] = useActionState(
    loginAction,
    initialState,
  )
  const [magicState, magicFormAction, magicPending] = useActionState(
    magicLinkAction,
    initialState,
  )

  if (magicState.status === 'success') {
    return (
      <div className="auth-success" role="status" aria-live="polite">
        <div className="signup-success__icon" aria-hidden="true">
          <CheckIcon />
        </div>
        <p>{magicState.message}</p>
      </div>
    )
  }

  const state = mode === 'password' ? passwordState : magicState
  const hasError = state.status === 'error'

  return (
    <div>
      <div className="auth-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'password'}
          className={`auth-tab${mode === 'password' ? ' active' : ''}`}
          onClick={() => setMode('password')}
        >
          Password
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'magic'}
          className={`auth-tab${mode === 'magic' ? ' active' : ''}`}
          onClick={() => setMode('magic')}
        >
          Email me a link
        </button>
      </div>

      {mode === 'password' ? (
        <form action={passwordFormAction} noValidate>
          {next && <input type="hidden" name="next" value={next} />}
          <label className="auth-label" htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            name="email"
            className="auth-input"
            placeholder="your@email.com"
            autoComplete="email"
            required
          />
          <label className="auth-label" htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            name="password"
            className="auth-input"
            autoComplete="current-password"
            required
          />
          {hasError && <div className="signup__error">{state.message}</div>}
          <button type="submit" className="auth-btn" disabled={passwordPending}>
            {passwordPending ? 'Logging in…' : 'Log in'}
          </button>
        </form>
      ) : (
        <form action={magicFormAction} noValidate>
          <label className="auth-label" htmlFor="magic-email">Email</label>
          <input
            id="magic-email"
            type="email"
            name="email"
            className="auth-input"
            placeholder="your@email.com"
            autoComplete="email"
            required
          />
          {hasError && <div className="signup__error">{state.message}</div>}
          <button type="submit" className="auth-btn" disabled={magicPending}>
            {magicPending ? 'Sending…' : 'Send sign-in link'}
          </button>
        </form>
      )}
    </div>
  )
}
