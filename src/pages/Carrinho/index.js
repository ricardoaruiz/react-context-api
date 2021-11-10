import { useHistory } from 'react-router-dom'
import { Button, Snackbar, InputLabel } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useState } from 'react';
import { Container, Voltar, TotalContainer, PagamentoContainer} from './styles';
import { useCartContext } from 'commons/context/CartContext';
import { formatCurrency } from 'commons/utils/number'

function Carrinho() {
  const history = useHistory()
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { totalCartPrice } = useCartContext()

  return (
    <Container>
      <Voltar onClick={() => history.goBack()}/>
      <h2>
        Carrinho
      </h2>
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
      </PagamentoContainer>
      <TotalContainer>
          <div>
            <h2>Total no Carrinho: </h2>
            <span>{formatCurrency(totalCartPrice)}</span>
          </div>
          <div>
            <h2> Saldo: </h2>
            <span> R$ </span>
          </div>
          <div>
            <h2> Saldo Total: </h2>
            <span> R$ </span>
          </div>
        </TotalContainer>
      <Button
        onClick={() => {
          setOpenSnackbar(true);
        }}
        color="primary"
        variant="contained"
      >
         Comprar
       </Button>
        <Snackbar
          anchorOrigin={
            { 
              vertical: 'top',
              horizontal: 'right'
            }
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
           <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
          >
            Compra feita com sucesso!
          </MuiAlert>
        </Snackbar>
    </Container>
  )
}

export default Carrinho;