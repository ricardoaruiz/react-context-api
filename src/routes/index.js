import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { AppProviders } from 'components/AppProviders'
import Login from 'pages/Login'
import Feira from 'pages/Feira'
import Carrinho from 'pages/Carrinho'


const Routes = () => {
  return (
    <AppProviders>
      <BrowserRouter>
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
      </BrowserRouter>
    </AppProviders>
  )
}

export default Routes