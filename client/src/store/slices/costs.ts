import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CostsState } from '@streetmix/types'

const initialState: CostsState = {
  elements: [],
  materials: []
}

const costsSlice = createSlice({
  name: 'costs',
  initialState,
  reducers: {
    updateCosts (state, action: PayloadAction<Partial<CostsState>>) {
      return {
        ...state,
        ...action.payload
      }
    }
  }
})

export const { updateCosts } = costsSlice.actions

export default costsSlice.reducer
