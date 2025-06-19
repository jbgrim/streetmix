import React from 'react'
import { Text } from '@react-pdf/renderer'
import { styles } from '~src/pdf/styles'
import ListItem from '~src/pdf/Components/ListItem'

export default function HypothesisSection (): React.ReactElement {
  return (
    <>
      <Text style={styles.title}>Hypothèses principales</Text>
      <Text style={styles.subtitle}>Durée de vie :</Text>
      <ListItem>
        Certains matériaux ont une durée de vie volontairement minorés afin de
        tenir compte d’une reprise partielle au cours de la durée de vie de
        l’ouvrage.
      </ListItem>

      <Text style={styles.subtitle}>Chiffrage :</Text>
      <ListItem>
        Les prix sont basés au maximum sur des projets récents (2020 ou plus
        récents) dans la région Nantaise. Ils sont issus de DQE internes ou de
        chiffrages d’entreprises reçus.
      </ListItem>
      <ListItem>
        Les prix surfaciques correspondent en majorité à des grandes surfaces
        (supérieures à 1000m²)
      </ListItem>
      <ListItem>
        Concernant les bordures et caniveaux, les prix au ml sont en majorité
        des prix pour des linéaires supérieurs à 100ml
      </ListItem>
      <ListItem>
        <Text style={{ marginBottom: 4 }}>
          Les matériaux suivants sont des prix forfaitaires :
        </Text>
        <ListItem>Sol traité au liant hydraulique routier</ListItem>
        <ListItem>GNT</ListItem>
        <ListItem>Terrassement + décapage</ListItem>
      </ListItem>
      <ListItem>
        Le chiffrage de certaines épaisseurs de matériaux sont extrapolées à
        partir de prix d’autre épaisseurs de ce même matériau.
      </ListItem>

      <Text style={styles.subtitle}>Empreinte carbone :</Text>
      <ListItem>
        Les ratios d’émission carbone sont principalement issus de la base de
        données de Sève TP
      </ListItem>
      <ListItem>
        Tous les matériaux incluent des émissions liées au transport sur une
        distant de 20km
      </ListItem>
    </>
  )
}
