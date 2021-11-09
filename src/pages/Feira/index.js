import React from 'react'
import {
  Container,
  Header,
  Lista,
} from './styles';
import feira from './feira.json';
import Produto from 'components/Produto';
import NavBar from './NavBar';
import { useUserContext } from 'commons/context/UserContext';

function Feira() {
  const { name, balance } = useUserContext()

  return (
    <Container>
      <NavBar />
      <Header>
        <div>
          <h2> Olá! {name} </h2>
          <h3> Saldo: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(balance)} </h3>
        </div>
        <p>Encontre os melhores produtos orgânicos!</p>
      </Header>
      <Lista>
        <h2>
          Produtos:
        </h2>
        {feira.map(produto => (
          <Produto
            {...produto}
            key={produto.id}
          />
        ))}
      </Lista>
    </Container>
  )
}

export default Feira;