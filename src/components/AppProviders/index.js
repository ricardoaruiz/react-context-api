import { UserProvider } from 'commons/context/UserContext'
import { CartProvider } from 'commons/context/CartContext'
import { PaymentProvider } from 'commons/context/PaymentContext'

export const AppProviders = ({ children }) => {
  <UserProvider>
    <CartProvider>
      <PaymentProvider>
        {children}
      </PaymentProvider>
    </CartProvider>
  </UserProvider>
}