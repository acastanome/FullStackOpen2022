import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

//COUNTER EXAMPLE
// const counterReducer = (state = 0, action) => {
// 	switch (action.type) {
// 		case "INCREMENT":
// 			return state + 1;
// 		case "DECREMENT":
// 			return state - 1;
// 		case "ZERO":
// 			return 0;
// 		default:
// 			return state;
// 	}
// };

// const store = createStore(counterReducer)

// const App = () => {
// 	return (
// 		<div>
// 			<div>{store.getState()}</div>
// 			<button onClick={(e) => store.dispatch({ type: "INCREMENT" })}>
// 				plus
// 			</button>
// 			<button onClick={(e) => store.dispatch({ type: "DECREMENT" })}>
// 				minus
// 			</button>
// 			<button onClick={(e) => store.dispatch({ type: "ZERO" })}>zero</button>
// 		</div>
// 	);
// };

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD',
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK',
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD',
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO',
    })
  }

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => root.render(<App />)

renderApp()
store.subscribe(renderApp)
