import React from 'react';

const CurrencyFormatter = ({ amount }) => {
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);

  return <span>{formattedAmount}</span>;
};

export default CurrencyFormatter;
