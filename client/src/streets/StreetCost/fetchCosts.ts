import { useEffect, useState } from 'react'
import { Element, Material } from '@streetmix/types'
import {
  fetchAllElementData,
  fetchAllPavementStructureData
} from '~src/app/routing'
import store from '~src/store'
import { updateCosts } from '~src/store/slices/costs'

export default function fetchCosts () {
  let elements: Element[] = []
  let materials: Material[] = []

  // @ts-expect-error row data from request
  const transformPavementStructureKeys = (row): Material => {
    return {
      id: row.id,
      nom: row.nom ?? row.Nom,
      eur: Number.parseFloat(row.prixProjet ?? row['Prix Projet']),
      co2: Number.parseFloat(row.co2Projet ?? row['CO2 Projet']),
      eur30: Number.parseFloat(row.prixSur30Ans ?? row['Prix Sur 30 Ans']),
      co230: Number.parseFloat(row.co2Sur30Ans ?? row['CO2 Sur 30 Ans']),
      color: row.colour ?? row.Colour
    }
  }

  // @ts-expect-error row data from request
  const transformKeys = (row): Element => {
    return {
      id: row.id,
      category: row.category ?? row.Category,
      nom: row.nom ?? row.Nom,
      roulement: row.roulement ?? row.Roulement,
      base: row.base ?? row.Base,
      forme: row.forme ?? row.Forme,
      eur: Number.parseFloat(row.countEur ?? row['Count €']),
      co2: Number.parseFloat(row.countCo2 ?? row['Count Co2']),
      eur30: Number.parseFloat(row.sur30CountEur ?? row['Sur 30 Count €']),
      co230: Number.parseFloat(row.sur30CountCo2 ?? row['Sur 30 Count Co2']),
      color: row.colour ?? row.Colour
    }
  }

  const fetchAllPavStructureData = async () => {
    try {
      const response = await fetchAllPavementStructureData()
      if (Array.isArray(response)) {
        materials = response.map(transformPavementStructureKeys)
      } else {
        console.warn('API returned unexpected format:', response)
      }
    } catch (error) {
      console.error('Error fetching pavement structure data:', error)
    }
  }

  const fetchAllEleData = async () => {
    try {
      const response = await fetchAllElementData()
      if (Array.isArray(response)) {
        elements = response.map(transformKeys)
      } else {
        console.warn('API returned unexpected format:', response)
      }
    } catch (error) {
      console.error('Error fetching element data:', error)
    }
  }

  fetchAllEleData().then((r) => store.dispatch(updateCosts({ elements })))
  fetchAllPavStructureData().then((r) =>
    store.dispatch(updateCosts({ materials }))
  )
}
