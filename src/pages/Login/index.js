import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core';
import {
  Container,
  Titulo,
  InputContainer
} from './styles';
import {
  Input,
  InputLabel,
  InputAdornment 
} from '@material-ui/core';
import { UserContext } from 'commons/context/UserContext';

function Login() {
  const history = useHistory()

  const goToMarket = React.useCallback(() => {
      history.push('/feira')
  }, [history])

  return (
    <Container>
      <UserContext.Consumer>
        {({name, setName, balance, setBalance}) => {
          const hasBasicInfos = name && balance
          return (
          <>
            <Titulo>
              Insira o seu nome
            </Titulo>
            <InputContainer>
              <InputLabel>
                Nome
              </InputLabel>
              <Input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>
                Saldo
              </InputLabel>
              <Input
              type="number"
              startAdornment={
                <InputAdornment position="start">
                  R$
                </InputAdornment>
              }
              value={balance}
              onChange={(event) => setBalance(event.target.value)}
            />
            </InputContainer>
            <Button
              variant="contained"
              color="primary"
              onClick={goToMarket}
              disabled={!hasBasicInfos}
            >
              Avançar
            </Button>
          </>
        )}}
      </UserContext.Consumer>
    </Container>
  )
};

export default Login;