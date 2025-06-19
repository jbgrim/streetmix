import React, { useEffect, useMemo } from 'react'
import { type Material } from '@streetmix/types'
import { FormattedMessage, useIntl } from 'react-intl'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useSelector } from '~src/store/hooks'
import { CostPDF } from '~src/pdf/CostPDF'
import './StreetCost.css'
import { useGetUserQuery } from '~src/store/services/api'

function getMaterial (name: string): Material {
  if (name === 'trottoir') {
    return {
      id: 'trottoir',
      cost: { price: 2, co2: 2, fixedCo2: 0, fixedPrice: 0 },
      thirtyYears: { price: 2, co2: 2, fixedCo2: 0, fixedPrice: 0 }
    }
  }
  return {
    id: 'default',
    cost: { price: 1, co2: 1, fixedPrice: 0, fixedCo2: 0 },
    thirtyYears: { price: 1, co2: 1, fixedPrice: 0, fixedCo2: 0 }
  }
}

function StreetCost (): React.ReactElement {
  // récupère l'objet street qui contient la liste des segments
  const street = useSelector((state) => state.street)
  const [generated, setGenerated] = React.useState(false)
  const { locale } = useIntl()
  const { price, co2, thirtyYearsPrice, thirtyYearsCo2 } = useMemo(
    () =>
      street.segments.reduce(
        (sum, segment) => {
          // Pour chacun des segments, on récupère le matériau
          const material = getMaterial(segment.material)
          // puis on ajoute à chacun des accumulateurs le coût linéaire multiplié par la largeur et le coût fixe
          return {
            price:
              sum.price +
              material.cost.price * segment.width +
              material.cost.fixedPrice,
            co2:
              sum.co2 +
              material.cost.co2 * segment.width +
              material.cost.fixedCo2,
            thirtyYearsPrice:
              sum.thirtyYearsPrice +
              material.thirtyYears.price * segment.width +
              material.thirtyYears.fixedCo2,
            thirtyYearsCo2:
              sum.thirtyYearsCo2 +
              material.thirtyYears.co2 * segment.width +
              material.thirtyYears.fixedCo2
          }
        },
        { price: 0, co2: 0, thirtyYearsPrice: 0, thirtyYearsCo2: 0 }
      ),
    [street]
  )
  const { data: creatorProfile } = useGetUserQuery(street.creatorId)

  useEffect(() => {
    setGenerated(false)
  }, [street])

  return (
    <div className="cost-container">
      <h3>
        <FormattedMessage id="cost.cost" defaultMessage="Construction cost" />
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
          defaultMessage="Emissions: {co2}CO2"
          values={{
            co2: co2.toLocaleString(locale, { style: 'unit', unit: 'kilogram' })
          }}
        />
      </p>
      <h3>
        <FormattedMessage
          id="cost.thirtyYears"
          defaultMessage="Cost for 30 years"
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
          defaultMessage="Emissions: {co2}CO2"
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
                />
            }
              fileName="costs.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : 'Download now!'}
            </PDFDownloadLink>
            )
          : (
            <a
              onClick={() => {
                setGenerated(true)
              }}
            >
              Generate document!
            </a>
            )}
      </p>
    </div>
  )
}

export default StreetCost
