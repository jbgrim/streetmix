import React, { useEffect, useMemo, useState } from 'react'
import { type Material } from '@streetmix/types'
import { FormattedMessage, useIntl } from 'react-intl'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useSelector } from '~src/store/hooks'
import { CostPDF } from '~src/pdf/CostPDF'
import './StreetCost.css'
import { useGetUserQuery } from '~src/store/services/api'
import { getVariantArray } from '~src/segments/variant_utils'

function StreetCost (): React.ReactElement {
  // récupère l'objet street qui contient la liste des segments
  const street = useSelector((state) => state.street)
  const [generated, setGenerated] = React.useState(false)
  const { elements, materials } = useSelector((state) => state.costs)
  const { locale } = useIntl()
  const { price, co2, thirtyYearsPrice, thirtyYearsCo2 } = useMemo(
    () =>
      street.segments.reduce(
        (sum, segment) => {
          let material
          if (typeof segment.material === 'string') {
            // Pour chacun des segments, on récupère le matériau
            material = elements.find(
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
            const tree = materials.find((material) => material.nom === 'Arbre')
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
            const lamp = materials.find(
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
            const dba = materials.find(
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
            thirtyYearsPrice:
              sum.thirtyYearsPrice + material.eur30 * segment.width,
            thirtyYearsCo2: sum.thirtyYearsCo2 + material.co230 * segment.width
          }
        },
        { price: 0, co2: 0, thirtyYearsPrice: 0, thirtyYearsCo2: 0 }
      ),
    [elements, materials, street.segments]
  )
  const { data: creatorProfile } = useGetUserQuery(street.creatorId)

  // Réinitialise le PDF lorsque la rue est modifiée
  useEffect(() => {
    setGenerated(false)
  }, [street])

  return (
    <div className="cost-container">
      <h3>
        <FormattedMessage
          id="cost.cost"
          defaultMessage="Construction cost (per ml)"
        />
      </h3>
      <p>
        <FormattedMessage
          id="cost.price"
          defaultMessage="Price: {price}"
          values={{
            price: price.toLocaleString(locale, {
              style: 'currency',
              currency: 'EUR'
            })
          }}
        />
      </p>
      <p>
        <FormattedMessage
          id="cost.co2"
          defaultMessage="Emissions: {co2}CO2eq"
          values={{
            co2: co2.toLocaleString(locale, { style: 'unit', unit: 'kilogram' })
          }}
        />
      </p>
      <h3>
        <FormattedMessage
          id="cost.thirtyYears"
          defaultMessage="Cost for 30 years (per ml)"
        />
      </h3>
      <p>
        <FormattedMessage
          id="cost.price"
          defaultMessage="Price: {price}"
          values={{
            price: thirtyYearsPrice.toLocaleString(locale, {
              style: 'currency',
              currency: 'EUR'
            })
          }}
        />
      </p>
      <p>
        <FormattedMessage
          id="cost.co2"
          defaultMessage="Emissions: {co2}CO2eq"
          values={{
            co2: thirtyYearsCo2.toLocaleString(locale, {
              style: 'unit',
              unit: 'kilogram'
            })
          }}
        />
      </p>
      <p>
        {generated
          ? (
            <PDFDownloadLink
              document={
                <CostPDF
                  street={street}
                  author={
                  creatorProfile?.displayName ?? street.creatorId ?? undefined
                }
                  locale={locale}
                  elementArray={elements}
                  materialArray={materials}
                />
            }
              fileName="costs.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Génération en cours...' : 'Télécharger maintenant !'}
            </PDFDownloadLink>
            )
          : (
            <a
              onClick={() => {
                setGenerated(true)
              }}
            >
              Générer le détail des coûts
            </a>
            )}
      </p>
    </div>
  )
}

export default StreetCost
