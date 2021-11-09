import React from 'react'
import { createContext, useContext } from 'react'

const UserContext = createContext()
UserContext.displayName = "UserContext"

export const UserProvider = ({ children }) => {

  const [name, setName] = React.useState('')
  const [balance, setBalance] = React.useState(0)

  const contextValues = {
    name,
    setName,
    balance,
    setBalance
  }

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  )

}

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUserContext only be used under UserProvider')
  }

  return context

}