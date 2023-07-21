import React, { useState } from 'react';

interface CurrencyFormatterProps {
  amount: number;
}

const CurrencyFormatter: React.FC<CurrencyFormatterProps> = ({ amount }) => {
  const [inputValue, setInputValue] = useState('');

  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remova todos os caracteres não numéricos da entrada do usuário
    const numericValue = value.replace(/\D/g, '');
    e.target.value = numericValue;
  };

  return (
    <div className='flex flex-col'>
        <label className="block text-sm font-medium leading-6 text-white">Preço</label>
        <div className='flex flex-row justify-between mt-2'>
          <input type="text" name="price" pattern="[0-9]*" onInput={handleInputChange} id="price" className="pl-3 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder={formattedAmount} />
          <div className="flex">
            <label className="sr-only">Moeda</label>
            <select id="currency" name="currency" className="rounded-md border-0 bg-transparent text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
              <option>BRL</option>
              <option>USD</option>
            </select>
          </div>
        </div>
    </div>
  );
};

export default CurrencyFormatter;
