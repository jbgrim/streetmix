import React from 'react'
import { Page, Text, View, Document, Image } from '@react-pdf/renderer'
import { type Element, type Material, type StreetState } from '@streetmix/types'
import logo from 'url:./ressources/Logo_SCE.png'
import { styles } from '~src/pdf/styles'
import DetailSection from '~src/pdf/Sections/DetailSection'
import SynthesisSection from '~src/pdf/Sections/SynthesisSection'
import HypothesisSection from '~src/pdf/Sections/HypothesisSection'

// Create Document Component
interface CostPDFProps {
  street: StreetState
  elementArray: Element[]
  materialArray: Material[]
  author?: string
  locale?: string
}

export function CostPDF ({
  street,
  author,
  locale,
  elementArray,
  materialArray
}: CostPDFProps): React.ReactElement {
  const streetName = street.name ?? 'Rue sans nom'
  return (
    <Document
      title={'PDF des coûts - ' + streetName}
      author={author ?? 'Inconnu'}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.project}>
            <Text>Projet : {street.name ?? 'Rue sans nom'}</Text>
          </View>
          <Image src={logo} style={styles.logo} />
        </View>
        <View style={styles.mainContainer}>
          <View
            style={{
              textAlign: 'center',
              padding: 5,
              border: '1px solid black'
            }}
          >
            <Text style={{ ...styles.title, marginTop: 0, marginBottom: 0 }}>
              Aménagement de {streetName}
            </Text>
          </View>
          <SynthesisSection
            street={street}
            locale={locale}
            elementArray={elementArray}
            materialArray={materialArray}
          />
          <DetailSection
            street={street}
            locale={locale}
            elementArray={elementArray}
            materialArray={materialArray}
          />
          <HypothesisSection />
        </View>
      </Page>
    </Document>
  )
}
