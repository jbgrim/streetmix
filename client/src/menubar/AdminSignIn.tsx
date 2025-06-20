import React from 'react'
import { FormattedMessage } from 'react-intl'

import Button from '../ui/Button'
import './AdminSignIn.css'

interface AdminSignInButtonProps {
  onClick: () => void
}

function AdminSignInButton ({
  onClick = () => undefined
}: AdminSignInButtonProps): React.ReactElement {
  return (
    <Button primary className="menu-admin-sign-in" onClick={onClick}>
      <FormattedMessage
        id="menu.item.admin-sign-in"
        defaultMessage="Admin Sign in"
      />
    </Button>
  )
}

export default AdminSignInButton
