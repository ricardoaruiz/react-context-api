import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { UserProvider } from 'commons/context/UserContext'
import Login from 'pages/Login'
import Feira from 'pages/Feira'
import Carrinho from 'pages/Carrinho'


const Routes = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Switch>
          <Route path="/" exact >          
            <Login />
          </Route>
          <Route path="/feira">
            <Feira />
          </Route>
          <Route path="/carrinho">
            <Carrinho />
          </Route>
        </Switch>
      </UserProvider>
    </BrowserRouter>
  )
}

export default Routes