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

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(createNotification(message))
    setTimeout(() => {
      dispatch(removeNotification(null))
    }, time * 1000)
  }
}

export default notificationSlice.reducer
