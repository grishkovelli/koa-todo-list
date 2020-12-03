import React, { createContext, useReducer } from 'react'
import Reducer from './Reducer'

const initState = {
  tasks: [
    { id: 1, title: 'Create simple ReactJs App', completed: true },
    { id: 2, title: 'Read book', completed: false }
  ]
}

const Store = ({children}) => {
  const [state, dispatch] = useReducer(Reducer, initState)
  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  )
}

const Context = createContext(initState)

export {
  Store,
  Context
}
