import React from 'react';
import Stripe from 'stripe';

import stripeConfig from '../../../config/stripe';
import Subscription from '../Subscription';

const stripeApi = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2022-11-15',
});

interface Props {
    quantidade: number,
    preco: number,
    moeda: string,
    produto: string,
    parcelas: number,
}

function addMonths(date: Date, parcelas: number) {
  // Obtém o dia atual do mês
  const day = date.getDate();
  
  // Cria uma nova data baseada na data fornecida, adicionando um mês
  const nextMonthDate = new Date(date);
  nextMonthDate.setMonth(nextMonthDate.getMonth() + parcelas);
  
  // Se o dia atual for maior do que o último dia do próximo mês, ajusta para o último dia do próximo mês
  if (day > nextMonthDate.getDate()) {
    nextMonthDate.setDate(0);
  }
  
  const timestamp = Math.floor(nextMonthDate.getTime() / 1000);
  return timestamp;
}

export default async function PaymentLink({quantidade, preco, moeda, produto, parcelas}: Props) {
    try {
        const existingPrices = await stripeApi.prices.list({
          product: produto,
          limit: 10000, // Aumente o limite se você tiver mais de 10000 preços por produto
        });

        // Caso seja parcelado, o sistema cria um pagamento recorrente
        if (parcelas > 1) {
          const matchingPrice = existingPrices.data.find(price => {
            // Defina uma tolerância para comparação de preços
            const tolerance = 0.00; // 0% de tolerância
            const priceValue = preco * 100 / parcelas;
            const existingPriceValue = price.unit_amount || 0;
            const currency = moeda.toLowerCase();
            const mathPrice = Math.abs(priceValue - existingPriceValue) / existingPriceValue <= tolerance && price.recurring && price.recurring.interval === 'month' && price.currency === currency;
            return mathPrice;
          });

          // Se encontrar um preço existente, reutilize esse preço
          const priceToUse = matchingPrice ? matchingPrice.id : undefined;

          let newPrice;

          // Crie um novo preço para o produto no Stripe
          if (priceToUse == undefined) {
            newPrice = await stripeApi.prices.create({
              product: produto,
              unit_amount: Math.round(preco * 100 / parcelas), // Valor em centavos
              currency: moeda,
              recurring: {
                interval: 'month',
              }
            });
          }

          const today = new Date();
          const cancelAt = addMonths(today, parcelas);
          const actualData = Math.floor(Date.now() / 1000);

          // Crie um objeto de pagamento com o novo preço
          const paymentLink = await stripeApi.checkout.sessions.create({
            payment_method_types: ['card'],
            phone_number_collection: {
              "enabled": true
            },
            line_items: [
              {
                price: priceToUse || newPrice?.id || '',
                quantity: quantidade
              }
            ],
            metadata: {
              'cancelAt': cancelAt
            },
            billing_address_collection: "required",
            custom_fields: [
              {
                key: 'cnpj',
                label: {
                  type: "custom",
                  custom: "CNPJ",
                },
                type: "numeric",
              },
              {
                key: 'razaosocial',
                label: {
                  type: "custom",
                  custom: "Razão Social",
                },
                type: "text",
              },
            ],
            mode: 'subscription',
            subscription_data: {
              billing_cycle_anchor: actualData,
            },
            success_url: 'http://localhost:3000/payment_success?session_id={CHECKOUT_SESSION_ID}', // URL de sucesso após o pagamento
            cancel_url: 'https://publicidadearanda.com.br', // URL caso o usuário cancele o pagamento
          });
    
          if (paymentLink.url == null) {
              paymentLink.url = '';
          }

          window.location.href = paymentLink.url;

        // Caso não seja parcelado, o sistema cria um link de pagamento único
        } else {

          const matchingPrice = existingPrices.data.find(price => {
            // Defina uma tolerância para comparação de preços
            const tolerance = 0.00; // 0% de tolerância
            const priceValue = preco * 100;
            const existingPriceValue = price.unit_amount || 0;
            const currency = moeda.toLowerCase();
            return Math.abs(priceValue - existingPriceValue) / existingPriceValue <= tolerance && price.currency === currency;
          });

          // Se encontrar um preço existente, reutilize esse preço
          const priceToUse = matchingPrice ? matchingPrice.id : undefined;

          let newPrice;

          // Crie um novo preço para o produto no Stripe
          if (priceToUse == undefined) {
            newPrice = await stripeApi.prices.create({
              product: produto,
              unit_amount: Math.round(preco * 100), // Valor em centavos
              currency: moeda,
            });
          }
          
          // Crie um objeto de pagamento com o novo preço
          const paymentLink = await stripeApi.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
              price: priceToUse || newPrice?.id || '',
              quantity: quantidade,
            }],
            phone_number_collection: {
              "enabled": true
            },
            billing_address_collection: "required",
            custom_fields: [
              {
                key: 'cnpj',
                label: {
                  type: "custom",
                  custom: "CNPJ",
                },
                type: "numeric",
              },
              {
                key: 'razaosocial',
                label: {
                  type: "custom",
                  custom: "Razão Social",
                },
                type: "text",
              },
            ],
            mode: 'payment',
            success_url: 'https://publicidadearanda.com.br', // URL de sucesso após o pagamento
            cancel_url: 'https://publicidadearanda.com.br', // URL caso o usuário cancele o pagamento
          });
    
          if (paymentLink.url == null) {
              paymentLink.url = '';
          }

          window.location.href = paymentLink.url;
        }
  
      } catch (error) {
        console.error('Erro ao gerar o PaymentLink:', error);
      }

}
  