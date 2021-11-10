export const formatCurrency = (value) => {
  return Intl.NumberFormat(
    'pt-BR', 
    { 
      style: 'currency', 
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value || 0)
}