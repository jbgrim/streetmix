import React, { useState, useRef, useId } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { useSelector } from '~/src/store/hooks'
import { updateAdminPassword } from '~/src/app/routing'
import Button from '~/src/ui/Button'
import LoadingSpinner from '~/src/ui/LoadingSpinner'
import Popover from '~/src/ui/Popover'
import './ProfileSettings.css'

const PASSWORD_MIN_LENGTH = 8

function AdminResetPassword (): React.ReactElement | null {
  const user = useSelector((state) => state.user.signInData?.details)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isEditing, setEditing] = useState(false)
  const [isPending, setPending] = useState(false)
  const [isError, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSuccess, setSuccess] = useState(false)
  
  const currentPasswordInputRef = useRef<HTMLInputElement>(null)
  const newPasswordInputRef = useRef<HTMLInputElement>(null)
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null)
  
  const currentPasswordInputId = useId()
  const newPasswordInputId = useId()
  const confirmPasswordInputId = useId()

  const intl = useIntl()

  function handleEditPassword (): void {
    setEditing(true)
    setError(false)
    setErrorMessage('')
    setSuccess(false)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')

    // Focus the first input
    window.setTimeout(() => {
      if (currentPasswordInputRef.current) {
        currentPasswordInputRef.current.focus()
      }
    }, 0)
  }

  function handleResetPassword (): void {
    setEditing(false)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setError(false)
    setErrorMessage('')
    setSuccess(false)
  }

  function handleChangeCurrentPassword (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setCurrentPassword(event.target.value)
  }

  function handleChangeNewPassword (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setNewPassword(event.target.value)
  }

  function handleChangeConfirmPassword (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setConfirmPassword(event.target.value)
  }

  function validatePasswords(): boolean {
    if (newPassword.length < PASSWORD_MIN_LENGTH) {
      setErrorMessage(intl.formatMessage({
        id: 'settings.admin.password-too-short',
        defaultMessage: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`
      }))
      return false
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage(intl.formatMessage({
        id: 'settings.admin.passwords-dont-match',
        defaultMessage: 'New password and confirm password do not match.'
      }))
      return false
    }

    return true
  }

  async function handleSavePassword (): Promise<void> {
    if (!validatePasswords()) {
      setError(true)
      return
    }

    setPending(true)
    setError(false)
    setErrorMessage('')

    try {
      const response = await updateAdminPassword(currentPassword, newPassword, confirmPassword)
      
      if (response.status === 200) {
        setSuccess(true)
        setError(false)
        
        // "Thinking time" and then reset form
        window.setTimeout(() => {
          setEditing(false)
          setPending(false)
          setSuccess(false)
          setCurrentPassword('')
          setNewPassword('')
          setConfirmPassword('')
        }, 2000)
      } else {
        setErrorMessage(response.error || intl.formatMessage({
          id: 'settings.admin.password-update-error',
          defaultMessage: 'Failed to update password. Please try again.'
        }))
        setError(true)
        setPending(false)
        
        // Focus the current password input on error
        if (currentPasswordInputRef.current) {
          currentPasswordInputRef.current.focus()
        }
      }
    } catch (err) {
      console.error('Admin password reset error', err)
      setErrorMessage(intl.formatMessage({
        id: 'settings.admin.password-update-error',
        defaultMessage: 'Failed to update password. Please try again.'
      }))
      setError(true)
      setPending(false)
      
      if (currentPasswordInputRef.current) {
        currentPasswordInputRef.current.focus()
      }
    }
  }

  function handleSubmit (event: React.FormEvent): void {
    event.preventDefault()
    void handleSavePassword()
  }

  // Not signed-in users shouldn't see this,
  // but if they somehow access it, just refuse to render
  if (!user) {
    return null
  }

  const messages = []

  if (isEditing && !isPending && newPassword.length > 0) {
    if (newPassword.length < PASSWORD_MIN_LENGTH) {
      messages.push(
        intl.formatMessage(
          {
            id: 'settings.admin.password-min-length',
            defaultMessage: 'Password must be at least {minLength} characters long.'
          },
          { minLength: PASSWORD_MIN_LENGTH }
        )
      )
    } else if (newPassword !== confirmPassword && confirmPassword.length > 0) {
      messages.push(
        intl.formatMessage({
          id: 'settings.admin.passwords-dont-match',
          defaultMessage: 'New password and confirm password do not match.'
        })
      )
    }
  }

  if (isError && errorMessage) {
    messages.push(errorMessage)
  }

  if (isSuccess) {
    messages.push(
      intl.formatMessage({
        id: 'settings.admin.password-updated',
        defaultMessage: 'Password updated successfully!'
      })
    )
  }

  return (
    <section>
      <h2>
        <FormattedMessage
          id="settings.admin.password-reset.label"
          defaultMessage="Admin Password Reset"
        />
      </h2>
      <hr />

      <div className="profile-settings-item">
        <h3>
          <FormattedMessage
            id="settings.admin.password-reset.title"
            defaultMessage="Change Password"
          />
          <Popover>
            <FormattedMessage
              id="settings.admin.password-reset.description"
              defaultMessage="Update your admin account password. Make sure to use a strong password."
            />
          </Popover>
        </h3>
        {isEditing ? (
          <div className="profile-settings-editable">
            <form onSubmit={handleSubmit}>
              <p>
                <label htmlFor={currentPasswordInputId}>
                  <FormattedMessage
                    id="settings.admin.current-password"
                    defaultMessage="Current Password"
                  />
                </label>
                <input
                  ref={currentPasswordInputRef}
                  id={currentPasswordInputId}
                  type="password"
                  value={currentPassword}
                  onChange={handleChangeCurrentPassword}
                  disabled={isPending}
                  required
                />
              </p>
              <p>
                <label htmlFor={newPasswordInputId}>
                  <FormattedMessage
                    id="settings.admin.new-password"
                    defaultMessage="New Password"
                  />
                </label>
                <input
                  ref={newPasswordInputRef}
                  id={newPasswordInputId}
                  type="password"
                  value={newPassword}
                  onChange={handleChangeNewPassword}
                  disabled={isPending}
                  minLength={PASSWORD_MIN_LENGTH}
                  required
                />
              </p>
              <p>
                <label htmlFor={confirmPasswordInputId}>
                  <FormattedMessage
                    id="settings.admin.confirm-password"
                    defaultMessage="Confirm New Password"
                  />
                </label>
                <input
                  ref={confirmPasswordInputRef}
                  id={confirmPasswordInputId}
                  type="password"
                  value={confirmPassword}
                  onChange={handleChangeConfirmPassword}
                  disabled={isPending}
                  required
                />
              </p>
              <div className="profile-settings-button">
                <Button
                  onClick={() => {
                    void handleSavePassword()
                  }}
                  primary
                  disabled={isPending}
                >
                  <FormattedMessage id="btn.save" defaultMessage="Save" />
                  {isPending && (
                    <div className="profile-settings-pending">
                      <LoadingSpinner size="small" />
                    </div>
                  )}
                </Button>
                <Button
                  onClick={handleResetPassword}
                  tertiary
                  disabled={isPending}
                >
                  <FormattedMessage id="btn.cancel" defaultMessage="Cancel" />
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="profile-settings-editable">
            <p>
              <FormattedMessage
                id="settings.admin.password-reset.info"
                defaultMessage="Click the button below to change your admin password."
              />
            </p>
            <div className="profile-settings-button">
              <Button onClick={handleEditPassword}>
                <FormattedMessage 
                  id="settings.admin.change-password" 
                  defaultMessage="Change Password" 
                />
              </Button>
            </div>
          </div>
        )}
        <div className="profile-display-name-messages">
          {messages.map((m) => (
            <p key={m} className={isSuccess ? 'success-message' : ''}>
              {m}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdminResetPassword
