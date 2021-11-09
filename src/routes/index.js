import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { UserProvider } from 'commons/context/UserContext'
import { CartProvider } from 'commons/context/CartContext'
import Login from 'pages/Login'
import Feira from 'pages/Feira'
import Carrinho from 'pages/Carrinho'


const Routes = () => {
  return (
    <BrowserRouter>
        <Switch>
          <UserProvider>
            <Route path="/" exact >          
              <Login />
            </Route>
            <CartProvider>
              <Route path="/feira">
                <Feira />
              </Route>
            </CartProvider>
          </UserProvider>
          <Route path="/carrinho">
            <Carrinho />
          </Route>
        </Switch>
    </BrowserRouter>
  )
}

export default Routes