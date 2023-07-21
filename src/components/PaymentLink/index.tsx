import React from 'react';
import Stripe from 'stripe';

import stripeConfig from '../../../config/stripe';

const stripeApi = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2022-11-15',
});

interface Props {
    quantidade: number,
    preco: number,
    moeda: string,
    produto: string,
}

export default async function PaymentLink({quantidade, preco, moeda, produto}: Props) {
    try {
        // Crie um novo preço para o produto no Stripe
        const newPrice = await stripeApi.prices.create({
          product: produto,
          unit_amount: Math.round(preco * 100), // Valor em centavos
          currency: moeda,
        });
  
        // Crie um objeto de pagamento com o novo preço
        const paymentLink = await stripeApi.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{
            price: newPrice.id,
            quantity: quantidade,
          }],
          mode: 'payment',
          success_url: 'https://publicidadearanda.com.br', // URL de sucesso após o pagamento
          cancel_url: 'https://publicidadearanda.com.br', // URL caso o usuário cancele o pagamento
        });
  
        if (paymentLink.url == null) {
            paymentLink.url = '';
        }

        window.location.href = paymentLink.url;
  
      } catch (error) {
        console.error('Erro ao gerar o PaymentLink:', error);
      }

}
  