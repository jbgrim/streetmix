import React from 'react'
import { useIntl } from 'react-intl'
import { useDrag } from 'react-dnd'

import { useSelector } from '../store/hooks'
import { images } from '../app/load_resources'
import Icon from '../ui/Icon'
import { Tooltip } from '../ui/Tooltip'
import EmptyDragPreview from '../ui/dnd/EmptyDragPreview'
import { createPaletteItemDragSpec } from '../segments/drag_and_drop'

import type { SegmentDefinition } from '@streetmix/types'
import './PaletteItem.css'

interface PaletteItemProps {
  segment: SegmentDefinition
}

function PaletteItem ({ segment }: PaletteItemProps): React.ReactElement | null {
  const flags = useSelector((state) => state.flags)
  const isSignedIn = useSelector((state) => state.user.signedIn)
  const isSubscriber = useSelector((state) => state.user.isSubscriber)
  const intl = useIntl()

  const [collected, drag, dragPreview] = useDrag(() =>
    createPaletteItemDragSpec(segment)
  )

  // Get localized display names
  function getLabel (segment: SegmentDefinition): string {
    const defaultMessage = segment.name

    return intl.formatMessage({
      id: `segments.${segment.nameKey}`,
      defaultMessage
    })
  }

  const { unlockCondition } = segment
  const classNames = ['palette-item']
  let isLocked = false
  let sublabel

  if (
    unlockCondition &&
    !(
      segment.unlockWithFlag !== undefined &&
      flags[segment.unlockWithFlag]?.value
    )
  ) {
    switch (unlockCondition) {
      case 'SUBSCRIBE':
        if (!isSubscriber) {
          classNames.push('palette-item-disabled')
          isLocked = true
          sublabel = intl.formatMessage({
            id: 'plus.locked.sub',
            // Default message ends with a Unicode-only left-right order mark
            // to allow for proper punctuation in `rtl` text direction
            // This character is hidden from editors by default!
            defaultMessage: 'Upgrade to Streetmix+ to use!‎'
          })
        }
        break
      case 'SIGN_IN':
      default:
        if (!isSignedIn) {
          classNames.push('palette-item-disabled')
          isLocked = true
          sublabel = intl.formatMessage({
            id: 'plus.locked.user',
            // Default message ends with a Unicode-only left-right order mark
            // to allow for proper punctuation in `rtl` text direction
            // This character is hidden from editors by default!
            defaultMessage: 'Sign in to use!‎'
          })
        }
        break
    }
  }

  const thumbnail =
    images.get(`thumbnails--${segment.id}`)?.src ??
    images.get('thumbnails--missing')?.src

  return (
    <li className={classNames.join(' ')} ref={isLocked ? null : drag}>
      <Tooltip label={getLabel(segment)} sublabel={sublabel}>
        <button>
          <img
            className="palette-item-image"
            src={thumbnail}
            draggable={false}
          />
        </button>
      </Tooltip>
      {isLocked && <Icon name="lock" />}
      <EmptyDragPreview dragPreview={dragPreview} />
    </li>
  )
}

export default PaletteItem
