import React from 'react'
import { createContext, useContext } from 'react'
import { useCartContext } from './CartContext'
import { useUserContext } from './UserContext'

const PaymentContext = createContext()
PaymentContext.displayName = 'PaymentContext'

const paymentTypes = [
  { id: 1, name: 'Boleto', fees: 1 },
  { id: 2, name: 'Cartão de Crédito', fees: 1.3 },
  { id: 3, name: 'PIX', fees: 1 },
  { id: 4, name: 'Crediário', fees: 1.5 },
]

export const PaymentProvider = ({ children }) => {
  const { totalCartPrice, clearCart } = useCartContext()
  const { balance, setBalance } = useUserContext()
  const [currentPaymentType, setCurrentPaymentType] = React.useState(paymentTypes[0])

  const setPaymentType = React.useCallback((paymentTypeId) => {
    setCurrentPaymentType(paymentTypes.find(paymentType => paymentType.id === paymentTypeId))
  }, [])

  /**
   * Total Cart Price with fees
   */
   const totalCartPriceWithFees = React.useMemo(() => totalCartPrice !== 0 
   ? totalCartPrice * currentPaymentType.fees
   : 0, [currentPaymentType.fees, totalCartPrice])

  /**
   * Total balance
   */
  const totalBalance = React.useMemo(() => {
    return balance - totalCartPriceWithFees
  }, [balance, totalCartPriceWithFees])

  /**
   * 
   */
  const finishPayment = React.useCallback(() => {
    clearCart()
    setBalance(totalBalance)
    setCurrentPaymentType(paymentTypes[0])
  }, [clearCart, setBalance, totalBalance])

  const paymentContextValues = {
    paymentTypes,
    paymentType: currentPaymentType,
    setPaymentType,
    totalCartPriceWithFees,
    balance,
    totalBalance,
    finishPayment
  }

  return (
    <PaymentContext.Provider value={paymentContextValues}>
      {children}
    </PaymentContext.Provider>
  )
}

export const usePaymentContext = () => {
  const context = useContext(PaymentContext)

  if (!context) {
    throw new Error('usePaymentContext can not be used without PaymentProvider')
  }

  return context
}