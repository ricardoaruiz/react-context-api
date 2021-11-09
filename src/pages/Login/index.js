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

function Login({ name, setName, balance, setBalance }) {
  const history = useHistory()
  const hasBasicInfos = React.useMemo(() => name && balance, [balance, name])

  const goToMarket = React.useCallback(() => {
    if (hasBasicInfos) {
      history.push('/feira')
    }
  }, [hasBasicInfos, history])

  return (
    <Container>
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
    </Container>
  )
};

export default Login;