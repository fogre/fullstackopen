import React from 'react'

const App = ({ store }) => {

  const dispatchAction = (dispatchType) => {
    store.dispatch({ type: dispatchType })
  }

  return (
    <div>
      <button onClick={() => dispatchAction('GOOD')}>good</button> 
      <button onClick={() => dispatchAction('OK')}>neutral</button> 
      <button onClick={() => dispatchAction('BAD')}>bad</button>
      <button onClick={() => dispatchAction('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

export default App