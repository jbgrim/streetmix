import React, { useState, useRef, useEffect, useId } from 'react'
import { FormattedMessage } from 'react-intl'

import { goAdminEmailSignIn } from '~/src/app/routing'
import Button from '~/src/ui/Button'
import LoadingSpinner from '~/src/ui/LoadingSpinner'
import Dialog from '../Dialog'
import './AdminSignInDialog.css'

function AdminSignInDialog(): React.ReactElement {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [sendingEmail, setSendingEmail] = useState(false)
  const [error, setError] = useState(false)

  const emailInputEl = useRef<HTMLInputElement>(null)
  const passwordInputEl = useRef<HTMLInputElement>(null)
  const emailInputId = useId()
  const passwordInputId = useId()

  useEffect(() => {
    emailInputEl.current?.focus()
  }, [])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const target = event.target
    const value = target.value

    if (target.name === 'email') {
      setEmail(value)
    } else if (target.name === 'password') {
      setPassword(value)
    }
  }

  return (
    <Dialog>
      {(closeDialog) => {
        async function handleSubmit(event: React.FormEvent): Promise<void> {
          event.preventDefault()
          const response = await goAdminEmailSignIn(email, password)
          if (response.status === 200) {
            setSendingEmail(false)
            setEmailSent(true)
            // Reset error state
            setError(false)
            closeDialog()
          } else {
            setError(true)
          }
        }
        return (
          <div className="admin-sign-in-dialog">
            <header>
              <h1>
                <FormattedMessage
                  id="dialogs.admin-sign-in.heading"
                  defaultMessage="Admin Sign In"
                />
              </h1>
            </header>
            <div className="dialog-content">
              <p>
                <FormattedMessage
                  id="dialogs.admin-sign-in.description"
                  defaultMessage="Sign in to access the admin dashboard."
                />
              </p>

              <form onSubmit={handleSubmit}>
                <label
                  htmlFor={emailInputId}
                  className="admin-sign-in-email-label"
                >
                  <FormattedMessage
                    id="dialogs.admin-sign-in.email-label"
                    defaultMessage="Email"
                  />
                </label>

                <input
                  type="email"
                  id={emailInputId}
                  ref={emailInputEl}
                  value={email}
                  className={
                    'admin-sign-in-input ' +
                    (error ? 'admin-sign-in-input-error' : '')
                  }
                  name="email"
                  onChange={handleChange}
                  placeholder="test@test.com"
                  required
                />

                {error && (
                  <p className="admin-sign-in-error-message">
                    <FormattedMessage
                      id="dialogs.sign-in.email-invalid"
                      defaultMessage="Oops! That didn't look like a valid email address. Please try again."
                    />
                  </p>
                )}

                <label
                  htmlFor={passwordInputId}
                  className="admin-sign-in-password-label"
                >
                  <FormattedMessage
                    id="dialogs.admin-sign-in.password-label"
                    defaultMessage="Password"
                  />
                </label>

                <input
                  type="password"
                  id={passwordInputId}
                  ref={passwordInputEl}
                  value={password}
                  className={'admin-sign-in-input'}
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />

                <Button type="submit" primary className="admin-sign-in-button">
                  <FormattedMessage
                    id="dialogs.admin-sign-in.button"
                    defaultMessage="Sign In"
                  />
                </Button>
              </form>
            </div>
          </div>
        )
      }}
    </Dialog>
  )
}

export default AdminSignInDialog
