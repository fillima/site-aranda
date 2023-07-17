import React from 'react';

interface CurrencyFormatterProps {
  amount: number;
}

const CurrencyFormatter: React.FC<CurrencyFormatterProps> = ({ amount }) => {
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);

  return <span>{formattedAmount}</span>;
};

export default CurrencyFormatter;
