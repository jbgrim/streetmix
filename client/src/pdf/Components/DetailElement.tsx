import { Element, Material } from '@streetmix/types'
import React, { Fragment } from 'react'
import { Text, View } from '@react-pdf/renderer'
import { styles } from '~src/pdf/styles'
import { CustomText } from '~src/pdf/Components/CustomText'
import DetailRow from '~src/pdf/Components/DetailRow'

interface DetailElementProps {
  element: Element
  width: number
  materials: Material[]
  elements: Element[]
  locale?: string
}

export default function DetailElement ({
  element,
  width,
  materials,
  elements,
  locale
}: DetailElementProps): React.ReactElement {
  const numberFormat = Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  const slices: Material[] = []
  if (element.roulement && element.nom !== 'Arbre') {
    const mat = materials.find((material) => material.nom === element.roulement)
    if (mat) {
      slices.push(mat)
    }
  }
  if (element.base) {
    const mat = materials.find((material) => material.nom === element.base)
    if (mat) {
      slices.push(mat)
    }
  }
  if (element.forme) {
    const mat = materials.find((material) => material.nom === element.forme)
    if (mat) {
      slices.push(mat)
    }
  }
  const mat = materials.find((material) => material.nom === 'Terrassement')
  if (mat) {
    slices.push(mat)
  }

  const total = slices.reduce(
    (sum, slice) => {
      // on ajoute à chacun des accumulateurs le coût linéaire
      return {
        price: sum.price + slice.eur,
        co2: sum.co2 + slice.co2,
        thirtyYearsPrice: sum.thirtyYearsPrice + slice.eur30,
        thirtyYearsCo2: sum.thirtyYearsCo2 + slice.co230
      }
    },
    { price: 0, co2: 0, thirtyYearsPrice: 0, thirtyYearsCo2: 0 }
  )
  let fixe = { eur: 0, co2: 0, eur30: 0, co230: 0 }
  if (element.nom === 'Arbre') {
    fixe = {
      eur: element.eur,
      co2: element.co2,
      eur30: element.eur30,
      co230: element.co230
    }
  }
  return (
    <>
      <View style={styles.table}>
        <View style={{ ...styles.tableRow }}>
          <Text style={{ ...styles.tableCell, width: '25%' }}>
            {element.nom}
          </Text>
          <Text style={{ ...styles.tableCell, width: '15%' }}>Épaisseur</Text>
          <Text style={{ ...styles.tableCell, width: '12%' }}>
            Durée de vie
          </Text>
          <Text
            style={{
              ...styles.tableCell,
              width: '12%',
              backgroundColor: '#e6e6f1'
            }}
          >
            Empreinte CO2
          </Text>
          <Text
            style={{
              ...styles.tableCell,
              width: '12%',
              backgroundColor: '#e6e6f1'
            }}
          >
            Empreinte CO2 sur 30 ans
          </Text>
          <Text
            style={{
              ...styles.tableCell,
              width: '12%',
              backgroundColor: '#ffe4ce'
            }}
          >
            Prix €
          </Text>
          <Text
            style={{
              ...styles.tableCell,
              width: '12%',
              backgroundColor: '#ffe4ce'
            }}
          >
            Prix € sur 30 ans
          </Text>
        </View>
        {/* render Arbre alone because of fixed price */}
        {element.nom === 'Arbre' && (
          <DetailRow
            material={materials.find((mat) => mat.nom === 'Arbre')}
            locale={locale}
          />
        )}
        {slices.map((mat) => (
          <DetailRow material={mat} locale={locale} key={mat.id} />
        ))}
        <View style={{ ...styles.tableRow }}>
          <Text style={{ ...styles.tableCell, width: '52%' }}>
            Valeur pour <Text style={{ fontWeight: 'bold' }}>1m</Text>
          </Text>
          <CustomText
            style={{
              ...styles.tableCell,
              width: '12%',
              fontWeight: 'bold',
              backgroundColor: '#e6e6f1'
            }}
          >
            {numberFormat.format(total.co2 + fixe.co2)} kgCO2
          </CustomText>
          <CustomText
            style={{
              ...styles.tableCell,
              width: '12%',
              fontWeight: 'bold',
              backgroundColor: '#e6e6f1'
            }}
          >
            {numberFormat.format(total.thirtyYearsCo2 + fixe.co230)} kgCO2
          </CustomText>
          <CustomText
            style={{
              ...styles.tableCell,
              width: '12%',
              fontWeight: 'bold',
              backgroundColor: '#ffe4ce'
            }}
          >
            {numberFormat.format(total.price + fixe.eur)} €
          </CustomText>
          <CustomText
            style={{
              ...styles.tableCell,
              width: '12%',
              fontWeight: 'bold',
              backgroundColor: '#ffe4ce'
            }}
          >
            {numberFormat.format(total.thirtyYearsPrice + fixe.eur30)} €
          </CustomText>
        </View>
        <View style={{ ...styles.tableRow }}>
          <Text style={{ ...styles.tableCell, width: '52%' }}>
            Valeur pour <Text style={{ fontWeight: 'bold' }}>{width}m</Text>
          </Text>
          <CustomText
            style={{
              ...styles.tableCell,
              width: '12%',
              fontWeight: 'bold',
              backgroundColor: '#e6e6f1'
            }}
          >
            {numberFormat.format(total.co2 * width + fixe.co2)} kgCO2
          </CustomText>
          <CustomText
            style={{
              ...styles.tableCell,
              width: '12%',
              fontWeight: 'bold',
              backgroundColor: '#e6e6f1'
            }}
          >
            {numberFormat.format(total.thirtyYearsCo2 * width + fixe.co230)}{' '}
            kgCO2
          </CustomText>
          <CustomText
            style={{
              ...styles.tableCell,
              width: '12%',
              fontWeight: 'bold',
              backgroundColor: '#ffe4ce'
            }}
          >
            {numberFormat.format(total.price * width + fixe.eur)} €
          </CustomText>
          <CustomText
            style={{
              ...styles.tableCell,
              width: '12%',
              fontWeight: 'bold',
              backgroundColor: '#ffe4ce'
            }}
          >
            {numberFormat.format(total.thirtyYearsPrice * width + fixe.eur30)} €
          </CustomText>
        </View>
      </View>
    </>
  )
}
