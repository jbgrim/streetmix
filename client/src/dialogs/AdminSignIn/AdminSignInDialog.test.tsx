import React from 'react'

import { render } from '~/test/helpers/render'
import SignInDialog from './AdminSignInDialog'

describe('SignInDialog', () => {
  it('renders', () => {
    const { asFragment } = render(<SignInDialog />)
    expect(asFragment()).toMatchSnapshot()
  })
})
