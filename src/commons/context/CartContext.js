import React, { useContext } from 'react'
import { createContext } from 'react'

const CartContext = createContext()
CartContext.displayName = 'CartContext'

export const CartProvider = ({ children }) => {
  const [cart, setCart] = React.useState([])

  /**
   * Add new item on cart
   */
  const addCartItem = React.useCallback((cartItem) => {
    setCart(state => [ ...state, cartItem ])
  }, [])

  /**
   * Remove an item from cart
   */
  const removerCartItem = React.useCallback((id) => {
    setCart(state => state.filter(item => item.id !== id))
  }, [])

  const cartContextValues = {
    cart,
    addCartItem,
    removerCartItem
  }

  return (
    <CartContext.Provider value={cartContextValues}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  const context = useContext(CartContext)

  if(!context) {
    throw new Error('useCartContext canot be used outside of CartProvider')
  }

  return context
}

