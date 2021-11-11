import { useHistory } from 'react-router-dom'
import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useState } from 'react';
import { Container, Voltar, TotalContainer, PagamentoContainer} from './styles';
import { useCartContext } from 'commons/context/CartContext';
import { formatCurrency } from 'commons/utils/number'
import Produto from 'components/Produto';
import { usePaymentContext } from 'commons/context/PaymentContext';

function Carrinho() {
  const history = useHistory()
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { cart, totalCartPrice } = useCartContext()
  const { paymentType, setPaymentType, paymentTypes } = usePaymentContext()

  return (
    <Container>
      <Voltar onClick={() => history.goBack()}/>

      {/* Cart Items */}
      <h2>
        Carrinho
      </h2>
      {cart.map(item => (
        <Produto { ...item } key={item.id} />
      ))}

      {/* PaymentType */}
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select 
          value={paymentType.id}
          onChange={(event) => setPaymentType(event.target.value)}
        >
          {paymentTypes.map(paymentType => (
            <MenuItem value={paymentType.id} key={paymentType.id}>
              {paymentType.name}
            </MenuItem>
          ))}
        </Select>
      </PagamentoContainer>

      {/* Cart Summary  */}
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

      {/* Buttons */}
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