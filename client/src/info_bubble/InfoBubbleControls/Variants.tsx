import React from 'react'
import { useIntl } from 'react-intl'

import { useSelector, useDispatch } from '~/src/store/hooks'
import {
  setBuildingVariant,
  changeSegmentVariant,
  changeSegmentProperties
} from '~/src/store/slices/street'
import { segmentsChanged } from '~/src/segments/view'
import { getSegmentInfo } from '~/src/segments/info'
import VARIANT_ICONS from '~/src/segments/variant_icons.json'
import { getVariantArray } from '~/src/segments/variant_utils'
import {
  BUILDING_LEFT_POSITION,
  BUILDING_RIGHT_POSITION
} from '~/src/segments/constants'
import Button from '~/src/ui/Button'
import Icon from '~/src/ui/Icon'
import {
  INFO_BUBBLE_TYPE_SEGMENT,
  INFO_BUBBLE_TYPE_LEFT_BUILDING,
  INFO_BUBBLE_TYPE_RIGHT_BUILDING
} from '../constants'
import ElevationControl from './ElevationControl'

import type { BoundaryPosition } from '@streetmix/types'
import MaterialControl from '~src/info_bubble/InfoBubbleControls/MaterialControl'
import CustomControl from '~src/info_bubble/InfoBubbleControls/CustomControl'

interface VariantsProps {
  type: number
  position: number | BoundaryPosition
}

function Variants (props: VariantsProps): React.ReactElement | null {
  const { type, position } = props

  // Get the appropriate variant information
  const variant = useSelector((state) => {
    if (position === BUILDING_LEFT_POSITION) {
      return state.street.boundary.left.variant
    } else if (position === BUILDING_RIGHT_POSITION) {
      return state.street.boundary.right.variant
    } else if (typeof position === 'number') {
      return state.street.segments[position].variantString
    }
  })
  const segment = useSelector((state) => {
    if (typeof position === 'number') {
      return state.street.segments[position]
    }

    return null
  })
  const flags = useSelector((state) => state.flags)
  const dispatch = useDispatch()
  const intl = useIntl()
  const elements = useSelector((state) => state.costs.elements)

  let variantSets: string[] = []
  let elevationToggle = false
  switch (type) {
    case INFO_BUBBLE_TYPE_SEGMENT: {
      const { variants, enableElevation } = getSegmentInfo(segment.type)
      variantSets = variants
      if (enableElevation !== undefined) {
        elevationToggle = true
      }
      break
    }
    case INFO_BUBBLE_TYPE_LEFT_BUILDING:
    case INFO_BUBBLE_TYPE_RIGHT_BUILDING:
      variantSets = Object.keys(VARIANT_ICONS.building)
      break
    default:
      break
  }

  // Remove any empty entries
  variantSets = variantSets.filter((x) => x !== '')

  function isVariantCurrentlySelected (set: string, selection: string): boolean {
    let bool = false

    switch (type) {
      case INFO_BUBBLE_TYPE_SEGMENT: {
        if (segment) {
          const obj = getVariantArray(segment.type, variant)
          bool = selection === obj[set as keyof typeof obj]
        }
        break
      }
      case INFO_BUBBLE_TYPE_LEFT_BUILDING:
      case INFO_BUBBLE_TYPE_RIGHT_BUILDING:
        bool = selection === variant
        break
      default:
        bool = false
        break
    }

    return bool
  }

  function getButtonOnClickHandler (set: string, selection: string): () => void {
    let handler

    switch (type) {
      case INFO_BUBBLE_TYPE_SEGMENT:
        // modification du matériau s'il s'agit d'une bordure
        if (segment.type === 'bordure' && set === 'bordure-type') {
          const icon = VARIANT_ICONS[set][selection]
          const element = elements.find(
            (material) => material.nom === icon.title
          )
          handler = () => {
            dispatch(changeSegmentVariant(position, set, selection))
            dispatch(
              changeSegmentProperties(position, { material: element.id })
            )
            segmentsChanged()
          }
        } else {
          handler = () => {
            dispatch(changeSegmentVariant(position, set, selection))
            segmentsChanged()
          }
        }
        break
      case INFO_BUBBLE_TYPE_LEFT_BUILDING:
        handler = () => {
          dispatch(setBuildingVariant(BUILDING_LEFT_POSITION, selection))
        }
        break
      case INFO_BUBBLE_TYPE_RIGHT_BUILDING:
        handler = () => {
          dispatch(setBuildingVariant(BUILDING_RIGHT_POSITION, selection))
        }
        break
      default:
        handler = () => {}
        break
    }

    return handler
  }

  function renderButton (
    set: string,
    selection: string
  ): React.ReactElement | null {
    const icon = VARIANT_ICONS[set][selection]

    if (icon === undefined) return null

    // If a variant is disabled by feature flag, skip it
    if (icon.enableWithFlag !== undefined) {
      const flag = flags[icon.enableWithFlag]
      if (!flag?.value) return null
    }

    const title = intl.formatMessage({
      id: `variant-icons.${set}|${selection}`,
      defaultMessage: icon.title
    })

    const isSelected = isVariantCurrentlySelected(set, selection)

    return (
      <Button
        key={set + '.' + selection}
        title={title}
        className={isSelected ? 'variant-selected' : undefined}
        disabled={isSelected}
        onClick={getButtonOnClickHandler(set, selection)}
      >
        <svg
          xmlns="http://www.w3.org/1999/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="icon"
          style={icon.color !== undefined ? { fill: icon.color } : undefined}
        >
          {/* `xlinkHref` is preferred over `href` for compatibility with Safari */}
          <use xlinkHref={`#icon-${icon.id}`} />
        </svg>
      </Button>
    )
  }

  function renderVariantsSelection (): Array<React.ReactElement | null> {
    const variantEls = []

    switch (type) {
      case INFO_BUBBLE_TYPE_SEGMENT: {
        let first = true

        // Each segment has some allowed variant sets (e.g. "direction")
        variantSets.forEach((set, variant, all) => {
          // New row for each variant set
          if (!first) {
            const el = <hr key={set} />
            variantEls.push(el)
          } else {
            first = false
          }

          // Each variant set has some selection choices.
          // VARIANT_ICONS is an object containing a list of what
          // each of the selections are and data for building an icon.
          // Different segments may refer to the same variant set
          // ("direction" is a good example of this)
          for (const selection in VARIANT_ICONS[set]) {
            const el = renderButton(set, selection)

            variantEls.push(el)
          }
        })

        if (elevationToggle) {
          // Street vendors always have enabled elevation controls
          // regardless of subscriber state
          const forceEnable =
            segment?.type === 'street-vendor' ||
            flags.ELEVATION_CONTROLS_UNLOCKED.value

          // React wants a unique key here
          variantEls.push(<hr key="elevation_divider" />)
          variantEls.push(
            <ElevationControl
              position={position}
              segment={segment}
              key="elevation_control"
              forceEnable={forceEnable}
            />
          )
        }

        variantEls.push(<hr />)
        variantEls.push(
          <MaterialControl position={position} segment={segment} />
        )

        break
      }
      case INFO_BUBBLE_TYPE_LEFT_BUILDING:
      case INFO_BUBBLE_TYPE_RIGHT_BUILDING: {
        const els = variantSets.map((building) =>
          renderButton('building', building)
        )
        variantEls.push(...els)
        break
      }
      default:
        break
    }

    return variantEls
  }

  // Do not render this component if there are no variants to select
  if (variantSets.length === 0) return null

  return (
    <>
      {segment?.type === 'custom' && <CustomControl position={position} />}
      <div className="variants">{renderVariantsSelection()}</div>
    </>
  )
}

export default Variants
