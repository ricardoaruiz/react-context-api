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
  const { totalCartPrice } = useCartContext()
  const { balance } = useUserContext()
  const [currentPaymentType, setCurrentPaymentType] = React.useState(paymentTypes[0])

  const setPaymentType = React.useCallback((paymentTypeId) => {
    setCurrentPaymentType(paymentTypes.find(paymentType => paymentType.id === paymentTypeId))
  }, [])

  /**
   * Total balance
   */
  const totalBalance = React.useMemo(() => {
    return balance - totalCartPrice
  }, [balance, totalCartPrice])

  const paymentContextValues = {
    paymentTypes,
    paymentType: currentPaymentType,
    setPaymentType,
    balance,
    totalBalance
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