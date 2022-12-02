import { createStore } from 'redux'

const App = () => {
  const counterReducer = (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'DECREMENT':
        return state - 1
      case 'ZERO':
        return 0
      default:
        return state
    }
  }

  const store = createStore(counterReducer)

  store.subscribe(() => {
    const storeNow = store.getState()
    console.log(store.getState())
  })
  store.dispatch({ type: 'INCREMENT' })
  store.dispatch({ type: 'INCREMENT' })
  store.dispatch({ type: 'INCREMENT' })
  store.dispatch({ type: 'INCREMENT' })
  store.dispatch({ type: 'ZERO' })
  store.dispatch({ type: 'DECREMENT' })
  return <div></div>
}

export default App
