import React from 'react'
import { Container } from './styles';
import { memo } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useCartContext } from 'commons/context/CartContext';


function Produto({
  nome,
  foto,
  id,
  valor,
  unidade
}) {
  const { addCartItem, removeCartItem, getCartItem } = useCartContext()

  const quantity = React.useMemo(() => {
    const item = getCartItem(id)
    return item ? item.quantidade : 0
  }, [getCartItem, id])

  return (
      <Container>
        <div>
          <img
            src={`/assets/${foto}.png`}
            alt={`foto de ${nome}`}
          />
          <p>
            {nome} - R$ {valor?.toFixed(2)} <span>Kg</span>
          </p>
        </div>
        <div>
          <IconButton
            color="secondary"
            onClick={() => removeCartItem(id)}
            disabled={!quantity}
          >
            <RemoveIcon />
          </IconButton>
          {quantity}
          <IconButton onClick={() => addCartItem({
            id,
            nome,
            foto,
            valor
          })}
          >
            <AddIcon />
          </IconButton>
        </div>
      </Container>
  )
}

export default memo(Produto)