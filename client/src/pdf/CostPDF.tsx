import React from 'react'
import { Page, Text, View, Document, Image } from '@react-pdf/renderer'
import { type StreetState } from '@streetmix/types'
import logo from 'url:./ressources/Logo_SCE.png'
import { styles } from '~src/pdf/styles'
import DetailSection from '~src/pdf/Sections/DetailSection'
import SynthesisSection from '~src/pdf/Sections/SynthesisSection'

// Create Document Component
interface CostPDFProps {
  street: StreetState
  author?: string
}

export function CostPDF ({ street, author }: CostPDFProps): React.ReactElement {
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
            <Text>Numero de projet : TODO</Text>
            <Text>Maitre d’ouvrage : TODO</Text>
            <Text>Chef de projet : TODO</Text>
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
          <SynthesisSection street={street} />
          <DetailSection street={street} />
          <DetailSection street={street} />
        </View>
      </Page>
    </Document>
  )
}
