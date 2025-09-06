import React, { useCallback, useMemo } from 'react'
import { Element, Segment } from '@streetmix/types'
import { createSelector } from '@reduxjs/toolkit'
import Button from '~src/ui/Button'
import { useDispatch, useSelector } from '~src/store/hooks'
import {
  changeSegmentProperties,
  changeSegmentVariant
} from '~src/store/slices/street'
import { segmentsChanged } from '~src/segments/view'

interface MaterialControlProps {
  position: number
  segment: Segment
}

const elementsSelector = createSelector(
  [(state) => state.costs.elements, (state, segment) => segment],
  (elements: Element[], segment: Segment) => {
    if (segment.type === 'sidewalk' || segment.type === 'sidewalk-lamp') {
      elements = elements.filter(
        (element) =>
          element.nom !== 'Candélabre 6m' && element.nom !== 'Candélabre 8m'
      )
    }
    return elements.filter((element) => element.category === segment.category)
  }
)

export default function MaterialControl ({
  position,
  segment
}: MaterialControlProps): React.ReactElement {
  const elements = useSelector((state) => elementsSelector(state, segment))
  const dispatch = useDispatch()

  function getButtonOnClickHandler (selection: string): () => void {
    return (): void => {
      dispatch(changeSegmentProperties(position, { material: selection }))
      segmentsChanged()
    }
  }

  const renderButtons = useCallback(
    (element: Element) => {
      const title =
        element.nom +
        ' - ' +
        element.roulement.split(' - ')[0] +
        (element.forme !== undefined
          ? '/' + element.forme.split(' - ')[0]
          : '') +
        (element.base !== undefined ? '/' + element.base.split(' - ')[0] : '')
      const isSelected = element.id === segment.material
      return (
        <>
          <Button
            title={title}
            className={isSelected ? 'variant-selected' : undefined}
            disabled={isSelected}
            onClick={getButtonOnClickHandler(element.id)}
          >
            <svg
              xmlns="http://www.w3.org/1999/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              className="icon"
              style={{ fill: '#' + element.color }}
            >
              {/* `xlinkHref` is preferred over `href` for compatibility with Safari */}
              <use xlinkHref="#icon-asphalt" />
            </svg>
          </Button>
        </>
      )
    },
    [getButtonOnClickHandler, segment.material]
  )

  return <>{elements.map((elem) => renderButtons(elem))}</>
}
