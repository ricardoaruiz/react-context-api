import React from 'react'
import { createContext, useContext } from 'react'

const PaymentContext = createContext()
PaymentContext.displayName = 'PaymentContext'

const paymentTypes = [
  { id: 1, name: 'Boleto', fees: 1 },
  { id: 2, name: 'Cartão de Crédito', fees: 1.3 },
  { id: 3, name: 'PIX', fees: 1 },
  { id: 4, name: 'Crediário', fees: 1.5 },
]

export const PaymentProvider = ({ children }) => {
  const [currentPaymentType, setCurrentPaymentType] = React.useState(paymentTypes[0])

  const setPaymentType = React.useCallback((paymentTypeId) => {
    setCurrentPaymentType(paymentTypes.find(paymentType => paymentType.id === paymentTypeId))
  }, [])

  const paymentContextValues = {
    paymentTypes,
    paymentType: currentPaymentType,
    setPaymentType
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