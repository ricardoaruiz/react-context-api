import { useHistory } from 'react-router-dom'
import { Nav } from './styles';
import { ReactComponent as Logo } from 'assets/logo.svg';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { useCartContext } from 'commons/context/CartContext';

export default function NavBar() {
  const history = useHistory()
  const { totalCartItemQuantity } = useCartContext()

  return (
    <Nav>
      <Logo />
      <IconButton 
        onClick={() => history.push('/carrinho')} 
        disabled={!totalCartItemQuantity}
      >
        <Badge
          color="primary"
          badgeContent={totalCartItemQuantity}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  )
}