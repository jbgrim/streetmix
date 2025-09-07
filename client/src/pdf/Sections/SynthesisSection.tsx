import React, { Fragment, useEffect } from 'react'
import { Text, View } from '@react-pdf/renderer'
import { type Element, Material, type StreetState } from '@streetmix/types'
import { useIntl } from 'react-intl'
import { CustomText } from '~src/pdf/Components/CustomText'
import { styles } from '~src/pdf/styles'
import { getVariantArray } from '~src/segments/variant_utils'

interface Segment {
  material: Partial<Element>
  width: number
}

export default function SynthesisSection ({
  street,
  elementArray,
  materialArray,
  locale
}: {
  street: StreetState
  elementArray: Element[]
  materialArray: Material[]
  locale?: string
}): React.ReactNode {
  const numberFormat = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  })
  const segments: Segment[] = []
  for (const segment of street.segments) {
    const idx = segments.findIndex((e) => e.material?.id === segment.material)
    let material: Partial<Element> = elementArray.find(
      (e) => e.id === segment.material
    )
    if (!material) {
      if (typeof segment.material === 'string') {
        console.log('Unknown material ID')
        continue
      }
      material = {
        ...segment.material,
        nom: 'Valeur Manuelle'
      }
    }
    if (idx >= 0) {
      segments[idx].width += segment.width
    } else {
      segments.push({
        material,
        width: segment.width
      })
    }
  }
  const total = street.segments.reduce(
    (sum, segment) => {
      // Pour chacun des segments, on récupère le matériau
      let material
      if (typeof segment.material === 'string') {
        // Pour chacun des segments, on récupère le matériau
        material = elementArray.find(
          (element) => element.id === segment.material
        )
      } else {
        material = segment.material
      }
      if (!material) {
        console.error('Material not found (' + segment.material + ')')
        return sum
      }
      // on ajoute le coût fixe si le segment est un arbre
      if (segment.type === 'sidewalk-tree') {
        const tree = materialArray.find((material) => material.nom === 'Arbre')
        if (!tree) {
          console.error('tree not found')
        } else {
          sum.price += tree.eur
          sum.co2 += tree.co2
          sum.thirtyYearsPrice += tree.eur30
          sum.thirtyYearsCo2 += tree.co230
        }
      }
      // on ajoute le coût fixe si le segment est un lampadaire, en fonction du type de lampadaire
      if (segment.type === 'sidewalk-lamp') {
        const lamp = materialArray.find(
          (material) =>
            material.nom ===
            (getVariantArray(segment.type, segment.variantString)[
              'lamp-type'
            ] === 'traditional'
              ? 'Candélabre 6m'
              : 'Candélabre 8m')
        )
        if (!lamp) {
          console.error('lamp not found')
        } else {
          sum.price += lamp.eur
          sum.co2 += lamp.co2
          sum.thirtyYearsPrice += lamp.eur30
          sum.thirtyYearsCo2 += lamp.co230
        }
      }
      if (segment.variantString === 'tpc-dba') {
        const dba = materialArray.find(
          (material) => material.nom === 'DBA Béton'
        )
        if (!dba) {
          console.error('dba not found')
        } else {
          sum.price += dba.eur
          sum.co2 += dba.co2
          sum.thirtyYearsPrice += dba.eur30
          sum.thirtyYearsCo2 += dba.co230
        }
      }
      // puis on ajoute à chacun des accumulateurs le coût linéaire multiplié par la largeur
      return {
        price: sum.price + material.eur * segment.width,
        co2: sum.co2 + material.co2 * segment.width,
        thirtyYearsPrice: sum.thirtyYearsPrice + material.eur30 * segment.width,
        thirtyYearsCo2: sum.thirtyYearsCo2 + material.co230 * segment.width
      }
    },
    { price: 0, co2: 0, thirtyYearsPrice: 0, thirtyYearsCo2: 0 }
  )
  return (
    <>
      <Text style={styles.title}>Synthèse</Text>
      <View style={styles.table}>
        <View
          style={{ ...styles.tableRow, backgroundColor: '#e7e3e4' }}
          wrap={false}
        >
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
        {segments.map((elem, id) => {
          return (
            <View style={{ ...styles.tableRow }} key={id} wrap={false}>
              <Text
                style={{
                  ...styles.tableCell,
                  width: '21%',
                  backgroundColor: '#e6e6f1',
                  fontWeight: 'bold'
                }}
              >
                {(elem.material.category !== undefined
                  ? elem.material.category + ' - '
                  : '') +
                  elem.material.nom +
                  (elem.material.roulement !== undefined
                    ? ' - ' + elem.material.roulement.split(' - ')[0]
                    : '') +
                  (elem.material.forme !== undefined
                    ? '/' + elem.material.forme.split(' - ')[0]
                    : '') +
                  (elem.material.base !== undefined
                    ? '/' + elem.material.base.split(' - ')[0]
                    : '')}
              </Text>
              <CustomText style={{ ...styles.tableCell, width: '11%' }}>
                {numberFormat.format(elem.width)} m
              </CustomText>
              <CustomText style={{ ...styles.tableCell, width: '17%' }}>
                {numberFormat.format(elem.width * elem.material.co2)} kgCO2éq
              </CustomText>
              <CustomText style={{ ...styles.tableCell, width: '17%' }}>
                {numberFormat.format(elem.width * elem.material.co230)} kgCO2éq
              </CustomText>
              <CustomText style={{ ...styles.tableCell, width: '17%' }}>
                {numberFormat.format(elem.width * elem.material.eur)} €
              </CustomText>
              <CustomText style={{ ...styles.tableCell, width: '17%' }}>
                {numberFormat.format(elem.width * elem.material.eur30)} €
              </CustomText>
            </View>
          )
        })}

        <View
          style={{ ...styles.tableRow, backgroundColor: '#ffe4ce' }}
          wrap={false}
        >
          <Text
            style={{ ...styles.tableCell, width: '21%', fontWeight: 'bold' }}
          >
            Total
          </Text>
          <CustomText
            style={{ ...styles.tableCell, width: '11%', fontWeight: 'bold' }}
          >
            {numberFormat.format(street.occupiedWidth)} m
          </CustomText>
          <CustomText
            style={{ ...styles.tableCell, width: '17%', fontWeight: 'bold' }}
          >
            {numberFormat.format(total.co2)} kgCO2éq/ml
          </CustomText>
          <CustomText
            style={{ ...styles.tableCell, width: '17%', fontWeight: 'bold' }}
          >
            {numberFormat.format(total.thirtyYearsCo2)} kgCO2éq/ml
          </CustomText>
          <CustomText
            style={{ ...styles.tableCell, width: '17%', fontWeight: 'bold' }}
          >
            {numberFormat.format(total.price)} €/ml
          </CustomText>
          <CustomText
            style={{ ...styles.tableCell, width: '17%', fontWeight: 'bold' }}
          >
            {numberFormat.format(total.thirtyYearsPrice)} €/ml
          </CustomText>
        </View>
      </View>
    </>
  )
}
