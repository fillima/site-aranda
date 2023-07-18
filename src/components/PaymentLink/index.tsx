import React from 'react';
import Stripe from 'stripe';

import stripeConfig from '../../../config/stripe';

const stripeObj = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2022-11-15',
});

interface Props {
    quantidade: number,
    precoId: string
}

export default async function PaymentLink({quantidade, precoId}: Props) {
    const paymentLink = await stripeObj.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
        {
            price: precoId,
            quantity: quantidade
        },
        ],
        mode: 'payment',
        success_url: 'https://publicidadearanda.com.br',
        cancel_url: 'https://publicidadearanda.com.br',
    });

    if (paymentLink.url == null) {
        paymentLink.url = '';
    }

    window.location.href = paymentLink.url;
}
  