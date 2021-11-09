import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { UserContext } from 'commons/context/UserContext'
import Login from 'pages/Login'
import Feira from 'pages/Feira'
import Carrinho from 'pages/Carrinho'


const Routes = () => {
  const [name, setName] = React.useState('')
  const [balance, setBalance] = React.useState(0)
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact >
          <UserContext.Provider value={{
            name,
            setName,
            balance,
            setBalance
          }}>
            <Login />
          </UserContext.Provider>
        </Route>
        <Route path="/feira">
          <Feira name={name} balance={balance} />
        </Route>
        <Route path="/carrinho">
          <Carrinho />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes