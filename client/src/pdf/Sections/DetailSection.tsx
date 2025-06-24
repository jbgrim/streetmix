import { Material, Element, type StreetState } from '@streetmix/types'
import React, { Fragment } from 'react'
import { Text, View } from '@react-pdf/renderer'
import { styles } from '~src/pdf/styles'
import { CustomText } from '~src/pdf/Components/CustomText'
import DetailElement from '~src/pdf/Components/DetailElement'

export default function DetailSection ({
  street,
  materialArray,
  elementArray,
  locale
}: {
  street: StreetState
  materialArray: Material[]
  elementArray: Element[]
  locale?: string
}): React.ReactElement {
  const numberFormat = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  })
  const segments = []
  for (const segment of street.segments) {
    const idx = segments.findIndex((e) => e.id === segment.material)
    const material = elementArray.find((e) => e.id === segment.material)
    if (!material) {
      console.log('Unknown material ID')
      continue
    }
    if (idx >= 0) {
      segments[idx].width += segment.width
    } else {
      segments.push({
        id: segment.material,
        width: segment.width
      })
    }
  }

  return (
    <>
      <Text style={styles.title}>Détail par élément de voirie</Text>
      {segments.map((segment) => (
        <Fragment key={segment.id.toString()}>
          <DetailElement
            element={elementArray.find((elem) => elem.id === segment.id)}
            width={segment.width}
            materials={materialArray}
            elements={elementArray}
            key={segment.id}
          />
          <View style={{ height: 10 }} />
        </Fragment>
      ))}
    </>
  )
}
