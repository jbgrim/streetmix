import React, { useEffect, useState } from 'react'
import UpDownInput from '~src/info_bubble/InfoBubbleControls/UpDownInput'
import store from '~src/store'
import {
  changeSegmentProperties,
  updateSegments
} from '~src/store/slices/street'
import { segmentsChanged } from '~src/segments/view'
import { useSelector } from '~src/store/hooks'

interface CustomControlsProps {
  position: number
}

export default function CustomControl ({ position }: CustomControlsProps) {
  const segments = useSelector((state) => state.street.segments)
  const segment = segments[position]
  let material
  if (segment.material === undefined || typeof segment.material === 'string') {
    material = { eur: 0, co2: 0, eur30: 0, co230: 0 }
  } else {
    material = segment.material
  }

  const [eur, setEur] = useState(material.eur)
  const [co2, setCo2] = useState(material.co2)
  const [eur30, setEur30] = useState(material.eur30)
  const [co230, setCo230] = useState(material.co230)

  useEffect(() => {
    store.dispatch(
      changeSegmentProperties(position, {
        material: { eur, co2, eur30, co230 }
      })
    )
    segmentsChanged()
  }, [eur, co2, eur30, co230])

  return (
    <div className="non-variant">
      <p>Prix : </p>
      <UpDownInput
        value={eur}
        minValue={0}
        maxValue={10000}
        onClickUp={() => setEur(eur + 1)}
        onClickDown={() => setEur(eur - 1)}
        onUpdatedValue={(val) => setEur(Number.parseFloat(val))}
      />
      <p>Co2 : </p>
      <UpDownInput
        value={co2}
        minValue={0}
        maxValue={10000}
        onClickUp={() => setCo2(co2 + 1)}
        onClickDown={() => setCo2(co2 - 1)}
        onUpdatedValue={(val) => setCo2(Number.parseFloat(val))}
      />
      <p>Prix (30 ans) : </p>
      <UpDownInput
        value={eur30}
        minValue={0}
        maxValue={10000}
        onClickUp={() => setEur30(eur30 + 1)}
        onClickDown={() => setEur30(eur30 - 1)}
        onUpdatedValue={(val) => setEur30(Number.parseFloat(val))}
      />
      <p>Co2 (30 ans) : </p>
      <UpDownInput
        value={co230}
        minValue={0}
        maxValue={10000}
        onClickUp={() => setCo230(co230 + 1)}
        onClickDown={() => setCo230(co230 - 1)}
        onUpdatedValue={(val) => setCo230(Number.parseFloat(val))}
      />
    </div>
  )
}
