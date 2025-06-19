import { type StreetState } from '@streetmix/types'
import React from 'react'
import { Text } from '@react-pdf/renderer'
import { styles } from '~src/pdf/styles'

export default function DetailSection ({
  street
}: {
  street: StreetState
}): React.ReactElement {
  return <Text style={styles.title}>Détail par élément de voirie</Text>
}
