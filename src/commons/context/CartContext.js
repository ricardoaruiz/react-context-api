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
    setCart(items => {
      const foundCartItem = items.find(item => item.id === cartItem.id)

      return !foundCartItem 
        ? [ ...items, { ...cartItem, quantidade: 1 } ] 
        : items.map(item => item.id !== foundCartItem.id ? item : { ...foundCartItem, quantidade: foundCartItem.quantidade + 1 })
    })
  }, [])

  /**
   * Remove an item from cart
   */
  const removeCartItem = React.useCallback((id) => {
    setCart(items => {
      if (!items || !items.length) return []

      const foundCartItem = items.find(item => item.id === id)

      return foundCartItem.quantidade === 1 
        ? items.filter(item => item.id !== id) 
        : items.map(item => item.id !== foundCartItem.id ? item : { ...foundCartItem, quantidade: foundCartItem.quantidade - 1 })
    })
  }, [])

  /**
   * Return a item by id from cart
   */
  const getCartItem = React.useCallback((id) => {
    const foundCartItem = cart ? cart.find(item => item.id === id) : null
    return foundCartItem || null
  }, [cart])

  const cartContextValues = {
    cart,
    addCartItem,
    removeCartItem,
    getCartItem
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

