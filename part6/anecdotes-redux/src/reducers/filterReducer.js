import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filterChange(state, action) {
      const filter = action.payload
      return filter
    },
  },
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer
