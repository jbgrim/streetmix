import React from 'react'
import { vi, type Mock } from 'vitest'
import { userEvent } from '@testing-library/user-event'

import { render } from '~/test/helpers/render'
import { openGallery } from '~/src/store/actions/gallery'
import { getRemixOnFirstEdit } from '../remix'
import StreetMetaAuthor from './StreetMetaAuthor'

// Enable mocking of the return value of `getRemixOnFirstEdit`
vi.mock('../remix')

vi.mock('~/src/store/actions/gallery', () => ({
  openGallery: vi.fn(() => ({ type: 'MOCK_ACTION' }))
}))

describe('StreetMetaAuthor', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders nothing if you own the street', async () => {
    const { container } = render(<StreetMetaAuthor />, {
      initialState: {
        street: {
          creatorId: 'foo'
        },
        user: {
          signedIn: true,
          signInData: {
            userId: 'foo'
          }
        }
      }
    })

    expect(container.firstChild).toBe(null)
  })

  it('renders street creator byline if you are signed in and it’s not yours', async () => {
    const { getByText } = render(<StreetMetaAuthor />, {
      initialState: {
        street: {
          creatorId: 'foo'
        },
        user: {
          signedIn: true,
          signInData: {
            userId: 'bar'
          }
        }
      }
    })

    await userEvent.click(getByText('foo'))
    expect(openGallery).toBeCalledTimes(1)
    expect(openGallery).toBeCalledWith({ userId: 'foo' })
  })

  it('renders street creator byline if you are not signed in', async () => {
    const { getByText } = render(<StreetMetaAuthor />, {
      initialState: {
        street: {
          creatorId: 'foo'
        },
        user: {
          signedIn: false,
          signInData: {
            userId: null
          }
        }
      }
    })

    await userEvent.click(getByText('foo'))
    expect(openGallery).toBeCalledTimes(1)
    expect(openGallery).toBeCalledWith({ userId: 'foo' })
  })

  it('renders anonymous byline if you are signed in', async () => {
    const { getByText } = render(<StreetMetaAuthor />, {
      initialState: {
        street: {
          creatorId: null
        },
        user: {
          signedIn: true,
          signInData: {
            userId: 'bar'
          }
        }
      }
    })

    expect(getByText('by Anonymous')).toBeInTheDocument()
  })

  it('renders anonymous byline if you are not signed in and viewing an anonymous street', async () => {
    (getRemixOnFirstEdit as Mock).mockReturnValue(true)

    const { getByText } = render(<StreetMetaAuthor />, {
      initialState: {
        street: {
          creatorId: null
        },
        user: {
          signedIn: false,
          signInData: {
            userId: null
          }
        }
      }
    })

    expect(getByText('by Anonymous')).toBeInTheDocument()
  })

  it('renders nothing if you are a not-signed in user still editing an anonymous street', async () => {
    (getRemixOnFirstEdit as Mock).mockReturnValue(false)

    const { container } = render(<StreetMetaAuthor />, {
      initialState: {
        street: {
          creatorId: null
        },
        user: {
          signedIn: false,
          signInData: {
            userId: null
          }
        }
      }
    })

    expect(container.firstChild).toBe(null)
  })
})
