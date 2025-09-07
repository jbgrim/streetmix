import { Material } from '@streetmix/types'
import { Text, View } from '@react-pdf/renderer'
import React from 'react'
import { styles } from '~src/pdf/styles'
import { CustomText } from '~src/pdf/Components/CustomText'

interface DetailRowProps {
  material: {
    nom: string
    color?: string
    co2: number
    co230: number
    eur: number
    eur30: number
    life: string
  }
  locale?: string
}

export default function DetailRow ({ material, locale }: DetailRowProps) {
  const numberFormat = Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  let [name, height] = material.nom.split(' - ')
  if (material.nom === 'Terrassement') {
    height = '55cm'
  }
  if (material.nom === 'Arbre') {
    height = '400cm'
  }
  // compute lifespan based on the price
  const lifespan = (30 * material.eur) / material.eur30
  return (
    <View style={{ ...styles.tableRow }} wrap={false}>
      <Text
        style={{
          ...styles.tableCell,
          width: '25%',
          backgroundColor: '#' + material.color
        }}
      >
        {name}
      </Text>
      <CustomText style={{ ...styles.tableCell, width: '15%' }}>
        {height}
      </CustomText>
      <CustomText style={{ ...styles.tableCell, width: '12%' }}>
        {lifespan.toLocaleString(locale, { maximumFractionDigits: 0 })} ans
      </CustomText>
      <CustomText
        style={{
          ...styles.tableCell,
          width: '12%',
          backgroundColor: '#e6e6f1'
        }}
      >
        {numberFormat.format(material.co2)} kgCO2
      </CustomText>
      <CustomText
        style={{
          ...styles.tableCell,
          width: '12%',
          backgroundColor: '#e6e6f1'
        }}
      >
        {numberFormat.format(material.co230)} kgCO2
      </CustomText>
      <CustomText
        style={{
          ...styles.tableCell,
          width: '12%',
          backgroundColor: '#ffe4ce'
        }}
      >
        {numberFormat.format(material.eur)} €
      </CustomText>
      <CustomText
        style={{
          ...styles.tableCell,
          width: '12%',
          backgroundColor: '#ffe4ce'
        }}
      >
        {numberFormat.format(material.eur30)} €
      </CustomText>
    </View>
  )
}
