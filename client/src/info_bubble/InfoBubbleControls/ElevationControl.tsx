import React from 'react'
import { useIntl } from 'react-intl'

import VARIANT_ICONS from '~/src/segments/variant_icons.json'
import { segmentsChanged } from '~/src/segments/view'
import { useSelector, useDispatch } from '~/src/store/hooks'
import { changeSegmentProperties } from '~/src/store/slices/street'
import Button from '~/src/ui/Button'
import Icon from '~/src/ui/Icon'

interface ElevationControlProps {
  position: number
  segment: {
    elevation: number
  }
  forceEnable: boolean
}

function ElevationControl ({
  position,
  segment,
  forceEnable = false
}: ElevationControlProps): React.ReactElement {
  const dispatch = useDispatch()
  const intl = useIntl()

  function isVariantCurrentlySelected (selection: string): boolean {
    let bool

    switch (selection) {
      case 'sidewalk': {
        bool = segment.elevation === 1
        break
      }
      case 'road':
        bool = segment.elevation === 0
        break
      default:
        bool = false
        break
    }

    return bool
  }

  function getButtonOnClickHandler (selection: string): () => void {
    let elevation: number

    switch (selection) {
      case 'sidewalk':
        elevation = 1
        break
      case 'road':
        elevation = 0
        break
    }

    return (): void => {
      dispatch(changeSegmentProperties(position, { elevation }))
      segmentsChanged()
    }
  }

  function renderButton (
    set: string,
    selection: string
  ): React.ReactElement | null {
    const icon = VARIANT_ICONS[set][selection]

    if (icon === undefined) return null

    const title = intl.formatMessage({
      id: `variant-icons.${set}|${selection}`,
      defaultMessage: icon.title
    })

    const isSelected = isVariantCurrentlySelected(selection)

    return (
      <Button
        title={title}
        className={isSelected ? 'variant-selected' : undefined}
        disabled={isSelected}
        onClick={getButtonOnClickHandler(selection)}
      >
        <svg
          xmlns="http://www.w3.org/1999/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="icon"
        >
          {/* `xlinkHref` is preferred over `href` for compatibility with Safari */}
          <use xlinkHref={`#icon-${icon.id}`} />
        </svg>
      </Button>
    )
  }

  return (
    <>
      {renderButton('elevation', 'sidewalk')}
      {renderButton('elevation', 'road')}
    </>
  )
}

export default ElevationControl
