import React from 'react'
import { vi } from 'vitest'

import { render } from '~/test/helpers/render'
import AboutDialog from './AboutDialog'

import __mocks__ from './__mocks__/credits.json'

vi.mock('./credits.json', () => ({
  default: __mocks__
}))

describe('AboutDialog', () => {
  it('renders snapshot', () => {
    const { asFragment } = render(<AboutDialog />)
    expect(asFragment()).toMatchSnapshot()
  })
})
