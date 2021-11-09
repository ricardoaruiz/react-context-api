import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
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
          <Login name={name} setName={setName} balance={balance} setBalance={setBalance} />
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