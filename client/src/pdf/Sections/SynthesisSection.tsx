import React from 'react'
import { Text, View } from '@react-pdf/renderer'
import { type StreetState } from '@streetmix/types'
import { styles } from '~src/pdf/styles'

export default function SynthesisSection ({
  street
}: {
  street: StreetState
}): React.ReactElement {
  return (
    <>
      <Text style={styles.title}>Synthèse</Text>
      <View style={styles.table}>
        <View style={{ ...styles.tableRow, backgroundColor: '#e7e3e4' }}>
          <Text style={{ ...styles.tableCell, width: '21%' }} />
          <Text style={{ ...styles.tableCell, width: '11%' }}>Largeur</Text>
          <Text style={{ ...styles.tableCell, width: '17%' }}>
            Empreinte CO2
          </Text>
          <Text style={{ ...styles.tableCell, width: '17%' }}>
            Empreinte CO2 sur 30 ans
          </Text>
          <Text style={{ ...styles.tableCell, width: '17%' }}>Prix €</Text>
          <Text style={{ ...styles.tableCell, width: '17%' }}>
            Prix € sur 30 ans
          </Text>
        </View>
        {street.segments.map((segment) => (
          <View style={{ ...styles.tableRow }} key={segment.id}>
            <Text style={{ ...styles.tableCell, width: '21%' }}>
              {segment.type}
            </Text>
            <Text
              style={{
                ...styles.tableCell,
                width: '11%',
                backgroundColor: '#e6e6f1'
              }}
            >
              {segment.width}
            </Text>
            <Text style={{ ...styles.tableCell, width: '17%' }}>
              Empreinte CO2
            </Text>
            <Text style={{ ...styles.tableCell, width: '17%' }}>
              Empreinte CO2 sur 30 ans
            </Text>
            <Text style={{ ...styles.tableCell, width: '17%' }}>Prix €</Text>
            <Text style={{ ...styles.tableCell, width: '17%' }}>
              Prix € sur 30 ans
            </Text>
          </View>
        ))}

        <View style={{ ...styles.tableRow, backgroundColor: '#ffe4ce' }}>
          <Text style={{ ...styles.tableCell, width: '21%' }}>Total</Text>
          <Text style={{ ...styles.tableCell, width: '11%' }}>
            {street.occupiedWidth}
          </Text>
          <Text style={{ ...styles.tableCell, width: '17%' }}>
            Empreinte CO2
          </Text>
          <Text style={{ ...styles.tableCell, width: '17%' }}>
            Empreinte CO2 sur 30 ans
          </Text>
          <Text style={{ ...styles.tableCell, width: '17%' }}>Prix €</Text>
          <Text style={{ ...styles.tableCell, width: '17%' }}>
            Prix € sur 30 ans
          </Text>
        </View>
      </View>
    </>
  )
}
