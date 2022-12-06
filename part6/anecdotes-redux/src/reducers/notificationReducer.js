import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createNotification(state, action) {
      const content = action.payload
      return content
    },
    removeNotification(state, action) {
      const content = ''
      return content
    },
  },
})

export const { createNotification, removeNotification } =
  notificationSlice.actions
export default notificationSlice.reducer
