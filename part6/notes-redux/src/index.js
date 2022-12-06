import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
})

// console.log(store.getState())
// store.subscribe(() => console.log(store.getState()))
// store.dispatch(filterChange('IMPORTANT'))
// store.dispatch(
//   createNote('combineReducers forms one reducer from many simple reducers')
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)