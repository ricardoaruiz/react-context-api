import React, { useContext } from 'react'
import { createContext } from 'react'

const CartContext = createContext()
CartContext.displayName = 'CartContext'

export const CartProvider = ({ children }) => {
  const [cart, setCart] = React.useState([])

  /**
   * Change quantity of informed item
   */
  const changeCartItemQuantity = React.useCallback((itemId, quantity) => {
    return cart.map(cartItem => cartItem.id === itemId 
      ? { ...cartItem, quantidade: cartItem.quantidade + quantity }
      : cartItem)
  }, [cart])

  /**
   * Increment one in item quantity
   */
  const incrementCartItemQuantity = React.useCallback((itemId) => {
    return changeCartItemQuantity(itemId, 1)
  }, [changeCartItemQuantity])

  /**
   * Decrement one in item quantity
   */
  const decrementCartItemQuantity = React.useCallback((itemId) => {
    return changeCartItemQuantity(itemId, -1)
  }, [changeCartItemQuantity])

  /**
   * Add new item on cart
   */
  const addCartItem = React.useCallback((cartItem) => {
    setCart(items => {
      const foundCartItem = items.find(item => item.id === cartItem.id)

      return !foundCartItem 
        ? [ ...items, { ...cartItem, quantidade: 1 } ] 
        : incrementCartItemQuantity(foundCartItem.id)
    })
  }, [incrementCartItemQuantity])

  /**
   * Remove an item from cart
   */
  const removeCartItem = React.useCallback((id) => {
    setCart(items => {
      const foundCartItem = items?.find(item => item.id === id)

      if (!foundCartItem) return

      return foundCartItem.quantidade === 1 
        ? items.filter(item => item.id !== id) 
        : decrementCartItemQuantity(foundCartItem.id)
    })
  }, [decrementCartItemQuantity])

  /**
   * Return a item by id from cart
   */
  const getCartItem = React.useCallback((id) => {
    return cart?.find(item => item.id === id) || null
  }, [cart])

  /**
   * Get total quantity of cart
   */
  const totalCartItemQuantity = React.useMemo(() => {
    return !cart?.length ? 0 : cart.reduce((total, item) => total + item.quantidade, 0)
  }, [cart])

  /**
   * Total cart price
   */
  const totalCartPrice = React.useMemo(() => {
    return !cart?.length ? 0 : cart.reduce((total, item) => total + item.valor * item.quantidade, 0)
  }, [cart])

  /**
   * Clear Cart
   */
  const clearCart = React.useCallback(() => {
    setCart([])
  }, [])

  const cartContextValues = {
    cart,
    addCartItem,
    removeCartItem,
    getCartItem,
    clearCart,
    totalCartItemQuantity,
    totalCartPrice
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

