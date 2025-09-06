import React, { useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch } from 'react-redux'

import Dialog from '../Dialog'
import './AdminConfigurationDialog.css'

import {
  AllCommunityModule,
  CellValueChangedEvent,
  ColDef,
  ModuleRegistry,
  RowDataUpdatedEvent
} from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { addToast } from '~/src/store/slices/toasts'

import {
  fetchAllElementData,
  fetchAllPavementStructureData,
  saveElementData,
  savePavementStructureData
} from '~/src/app/routing'
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule])

interface AdminConfigurationDialogProps {
  category: string
}

// Row Data: The data to be displayed.
export interface ElementRowData {
  id: string
  nom: string
  category: string
  roulement: string
  base: string
  forme: string
  countEur: string
  countCo2: string
  sur30CountEur: string
  sur30CountCo2: string
  colour: string
}

export interface PavementStructureRowData {
  id: string
  nom: string
  prixProjet: string
  co2Projet: string
  prixSur30Ans: string
  co2Sur30Ans: string
}

// Column Definitions: Defines the columns to be displayed.
interface ElementColumnData {
  nom: string
  category: string
  roulement: string
  base: string
  forme: string
  countEur: string
  countCo2: string
  sur30CountEur: string
  sur30CountCo2: string
  colour: string
}

interface PavementStructureColumnData {
  nom: string
  prixProjet: string
  co2Projet: string
  prixSur30Ans: string
  co2Sur30Ans: string
}

type TabType = 'Calculation' | 'PDF'

function AdminConfigurationDialog (): React.ReactElement {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState<TabType>('Calculation')
  const [isElementLoading, setIsElementLoading] = useState(false)
  const [isPavementStructureLoading, setIsPavementStructureLoading] =
    useState(false)
  const [columnDefs] = useState<ColDef<ElementColumnData>[]>([
    {
      field: 'category',
      headerName: 'Category',
      editable: true,
      hide: false,
      width: 120,
      minWidth: 100,
      maxWidth: 200,
      resizable: true
    },
    {
      field: 'nom',
      headerName: 'Nom',
      hide: false,
      width: 150,
      minWidth: 120,
      maxWidth: 250,
      resizable: true
    },
    {
      field: 'roulement',
      headerName: 'Roulement',
      editable: true,
      hide: false,
      width: 120,
      minWidth: 100,
      maxWidth: 200,
      resizable: true
    },
    {
      field: 'base',
      headerName: 'Base',
      editable: true,
      hide: false,
      width: 100,
      minWidth: 80,
      maxWidth: 150,
      resizable: true
    },
    {
      field: 'forme',
      headerName: 'Forme',
      editable: true,
      hide: false,
      width: 100,
      minWidth: 80,
      maxWidth: 150,
      resizable: true
    },
    {
      field: 'countEur',
      headerName: 'Count €',
      editable: true,
      hide: false,
      width: 110,
      minWidth: 90,
      maxWidth: 180,
      resizable: true
    },
    {
      field: 'countCo2',
      headerName: 'Count Co2',
      editable: true,
      hide: false,
      width: 110,
      minWidth: 90,
      maxWidth: 180,
      resizable: true
    },
    {
      field: 'sur30CountEur',
      headerName: 'Sur 30 Count €',
      editable: true,
      hide: false,
      width: 140,
      minWidth: 120,
      maxWidth: 220,
      resizable: true
    },
    {
      field: 'sur30CountCo2',
      headerName: 'Sur 30 Count Co2',
      editable: true,
      hide: false,
      width: 140,
      minWidth: 120,
      maxWidth: 220,
      resizable: true
    },
    {
      field: 'colour',
      headerName: 'Couleur',
      editable: true,
      hide: false,
      width: 100,
      minWidth: 80,
      maxWidth: 150,
      resizable: true
    }
  ])

  const [pavementStructureColumnDefs] = useState<
    ColDef<PavementStructureColumnData>[]
  >([
    {
      field: 'nom',
      headerName: 'Nom',
      hide: false,
      width: 200,
      minWidth: 150,
      maxWidth: 300,
      resizable: true
    },
    {
      field: 'prixProjet',
      headerName: 'Prix Projet',
      editable: true,
      hide: false,
      width: 140,
      minWidth: 120,
      maxWidth: 200,
      resizable: true
    },
    {
      field: 'co2Projet',
      headerName: 'CO2 Projet',
      editable: true,
      hide: false,
      width: 140,
      minWidth: 120,
      maxWidth: 200,
      resizable: true
    },
    {
      field: 'prixSur30Ans',
      headerName: 'Prix Sur 30 Ans',
      editable: true,
      hide: false,
      width: 160,
      minWidth: 140,
      maxWidth: 220,
      resizable: true
    },
    {
      field: 'co2Sur30Ans',
      headerName: 'CO2 Sur 30 Ans',
      editable: true,
      hide: false,
      width: 160,
      minWidth: 140,
      maxWidth: 220,
      resizable: true
    }
  ])

  const [rowElementData, setRowElementData] = useState<ElementRowData[]>([])
  const [rowPavementStructureData, setRowPavementStructureData] = useState<
    PavementStructureRowData[]
  >([])
  const [updatedElementRows, setElementUpdatedRows] = useState<
    Record<string, ElementRowData>
  >({})
  const [updatedPavementStructureRows, setPavementStructureUpdatedRows] =
    useState<Record<string, PavementStructureRowData>>({})
  const elementGridRef = useRef<AgGridReact>(null)
  const pavementStructureGridRef = useRef<AgGridReact>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformKeys = (row: any): ElementRowData => ({
    id: row.id,
    category: row.category ?? row.Category,
    nom: row.nom ?? row.Nom,
    roulement: row.roulement ?? row.Roulement,
    base: row.base ?? row.Base,
    forme: row.forme ?? row.Forme,
    countEur: row.countEur ?? row['Count €'],
    countCo2: row.countCo2 ?? row['Count Co2'],
    sur30CountEur: row.sur30CountEur ?? row['Sur 30 Count €'],
    sur30CountCo2: row.sur30CountCo2 ?? row['Sur 30 Count Co2'],
    colour: row.colour ?? row.Couleur
  })

  const transformPavementStructureKeys = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row: any
  ): PavementStructureRowData => ({
    id: row.id,
    nom: row.nom ?? row.Nom,
    prixProjet: row.prixProjet ?? row['Prix Projet'],
    co2Projet: row.co2Projet ?? row['CO2 Projet'],
    prixSur30Ans: row.prixSur30Ans ?? row['Prix Sur 30 Ans'],
    co2Sur30Ans: row.co2Sur30Ans ?? row['CO2 Sur 30 Ans']
  })

  useEffect(() => {
    const fetchAllPavStructureData = async () => {
      setIsPavementStructureLoading(true)
      try {
        const response = await fetchAllPavementStructureData()
        if (Array.isArray(response)) {
          setRowPavementStructureData(
            response.map(transformPavementStructureKeys)
          )
        } else {
          console.warn('API returned unexpected format:', response)
        }
      } catch (error) {
        console.error('Error fetching pavement structure data:', error)
      } finally {
        setIsPavementStructureLoading(false)
      }
    }

    const fetchAllEleData = async () => {
      setIsElementLoading(true)
      try {
        const response = await fetchAllElementData()
        if (Array.isArray(response)) {
          setRowElementData(response.map(transformKeys))
        } else {
          console.warn('API returned unexpected format:', response)
        }
      } catch (error) {
        console.error('Error fetching element data:', error)
      } finally {
        setIsElementLoading(false)
      }
    }

    fetchAllEleData()
    fetchAllPavStructureData()
  }, [])

  const onElementCellValueChanged = (
    event: CellValueChangedEvent<ElementRowData>
  ) => {
    const updatedRow = event.data
    setElementUpdatedRows((prev) => ({
      ...prev,
      [updatedRow.id]: updatedRow
    }))
  }

  const onPavementStructureCellValueChanged = (
    event: CellValueChangedEvent<PavementStructureRowData>
  ) => {
    const updatedRow = event.data
    setPavementStructureUpdatedRows((prev) => ({
      ...prev,
      [updatedRow.id]: updatedRow
    }))
  }

  const handleSave = async (type: 'element' | 'pavementStructure') => {
    // Stop editing for the appropriate grid
    const currentGridRef =
      type === 'element' ? elementGridRef : pavementStructureGridRef

    if (currentGridRef.current?.api) {
      // Stop any active editing
      currentGridRef.current.api.stopEditing()

      // Clear cell focus and selection
      currentGridRef.current.api.clearFocusedCell()
      currentGridRef.current.api.deselectAll()

      // Force the grid to refresh
      currentGridRef.current.api.refreshCells({ force: true })

      // Ensure no cell is in edit mode
      const focusedCell = currentGridRef.current.api.getFocusedCell()
      if (focusedCell) {
        currentGridRef.current.api.clearFocusedCell()
      }
    }

    // Collect updated rows as usual
    const modifiedRows =
      type === 'element'
        ? Object.values(updatedElementRows)
        : Object.values(updatedPavementStructureRows)

    if (modifiedRows.length === 0) {
      return
    }

    try {
      if (type === 'element') {
        await saveElementData(modifiedRows)
        setElementUpdatedRows({})
        dispatch(
          addToast({
            mode: 'success',
            message: 'Element Data successfully saved'
          })
        )
      } else {
        await savePavementStructureData(modifiedRows)
        setPavementStructureUpdatedRows({})
        dispatch(
          addToast({
            mode: 'success',
            message: 'Pavement structure successfully saved'
          })
        )
      }
    } catch (error) {
      console.error('Error saving data:', error)
      dispatch(
        addToast({
          mode: 'warning',
          message: 'Error saving data. Please try again.'
        })
      )
    }
  }

  return (
    <Dialog>
      {(closeDialog) => (
        <div className="admin-configuration-dialog">
          <header>
            <h1>
              <FormattedMessage
                id="admin-configuration.heading"
                defaultMessage="Admin Configuration"
              />
            </h1>
          </header>
          <div className="dialog-content dialog-content-bleed">
            <div className="tabs-container">
              <div className="tabs-header">
                <button
                  className={`tab-button ${activeTab === 'Calculation' ? 'active' : ''}`}
                  onClick={() => setActiveTab('Calculation')}
                >
                  <FormattedMessage
                    id="tab.Calculation"
                    defaultMessage="Calculation"
                  />
                </button>
                <button
                  className={`tab-button ${activeTab === 'PDF' ? 'active' : ''}`}
                  onClick={() => setActiveTab('PDF')}
                >
                  <FormattedMessage id="tab.PDF" defaultMessage="PDF" />
                </button>
              </div>

              <div
                className={`tab-content ${activeTab === 'Calculation' ? 'active' : ''}`}
              >
                <div className="configuration-dialog-content">
                  {isElementLoading
                    ? (
                      <div className="loading-overlay">
                        <div className="loading-spinner">
                          <FormattedMessage
                            id="loading"
                            defaultMessage="Loading..."
                          />
                        </div>
                      </div>
                      )
                    : (
                      <AgGridReact
                        ref={elementGridRef}
                        rowData={rowElementData}
                        columnDefs={columnDefs}
                        domLayout="normal"
                        defaultColDef={{
                          resizable: true,
                          sortable: true,
                          filter: true,
                          minWidth: 100,
                          flex: 1
                        }}
                        sideBar={{
                          toolPanels: [
                            {
                              id: 'columns',
                              labelDefault: 'Columns',
                              labelKey: 'columns',
                              iconKey: 'columns',
                              toolPanel: 'agColumnsToolPanel',
                              toolPanelParams: {
                                suppressRowGroups: true,
                                suppressValues: true,
                                suppressPivots: true,
                                suppressPivotMode: true,
                                suppressSideButtons: true,
                                suppressColumnFilter: true,
                                suppressColumnSelectAll: false,
                                suppressColumnExpandAll: true
                              }
                            }
                          ],
                          defaultToolPanel: 'columns',
                          position: 'right'
                        }}
                        rowSelection="single"
                        onCellValueChanged={onElementCellValueChanged}
                        pagination
                        paginationPageSize={20}
                        suppressRowClickSelection={false}
                        enableCellTextSelection
                        suppressCellFocus={false}
                      />
                      )}
                </div>
              </div>

              <div
                className={`tab-content ${activeTab === 'PDF' ? 'active' : ''}`}
              >
                <div className="pdf-content">
                  {isPavementStructureLoading
                    ? (
                      <div className="loading-overlay">
                        <div className="loading-spinner">
                          <FormattedMessage
                            id="loading"
                            defaultMessage="Loading..."
                          />
                        </div>
                      </div>
                      )
                    : (
                      <AgGridReact
                        ref={pavementStructureGridRef}
                        rowData={rowPavementStructureData}
                        columnDefs={pavementStructureColumnDefs}
                        domLayout="normal"
                        defaultColDef={{
                          resizable: true,
                          sortable: true,
                          filter: true,
                          minWidth: 120,
                          flex: 1
                        }}
                        sideBar={{
                          toolPanels: [
                            {
                              id: 'columns',
                              labelDefault: 'Columns',
                              labelKey: 'columns',
                              iconKey: 'columns',
                              toolPanel: 'agColumnsToolPanel',
                              toolPanelParams: {
                                suppressRowGroups: true,
                                suppressValues: true,
                                suppressPivots: true,
                                suppressPivotMode: true,
                                suppressSideButtons: true,
                                suppressColumnFilter: true,
                                suppressColumnSelectAll: false,
                                suppressColumnExpandAll: true
                              }
                            }
                          ],
                          defaultToolPanel: 'columns',
                          position: 'right'
                        }}
                        rowSelection="single"
                        onCellValueChanged={onPavementStructureCellValueChanged}
                        pagination
                        paginationPageSize={20}
                        suppressRowClickSelection={false}
                        enableCellTextSelection
                        suppressCellFocus={false}
                      />
                      )}
                </div>
              </div>
            </div>
          </div>
          <div className="dialog-footer">
            {activeTab === 'Calculation' && (
              <button
                className="dialog-primary-action-configuration"
                onClick={() => handleSave('element')}
              >
                <FormattedMessage id="btn.save" defaultMessage="Save" />
              </button>
            )}
            {activeTab === 'PDF' && (
              <button
                className="dialog-secondary-action-configuration"
                onClick={() => handleSave('pavementStructure')}
              >
                <FormattedMessage id="btn.save" defaultMessage="Save" />
              </button>
            )}
            <button
              className="dialog-secondary-action-configuration"
              onClick={closeDialog}
            >
              <FormattedMessage id="btn.close" defaultMessage="Close" />
            </button>
          </div>
        </div>
      )}
    </Dialog>
  )
}

export default AdminConfigurationDialog
