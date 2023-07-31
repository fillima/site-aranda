import React from 'react';
import Stripe from 'stripe';

import stripeConfig from '../../../config/stripe';

const stripeApi = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2022-11-15',
});

export default async function Subscription(subscriptionID: string, cancelAt: number) {
    try {
        // Certifique-se de que subscriptionID é uma string não vazia
        if (!subscriptionID) {
            throw new Error('ID da assinatura é obrigatório para atualização.');
        }
    
        // Certifique-se de que cancelAt é um número válido (timestamp)
        if (!Number.isInteger(cancelAt)) {
            throw new Error('Timestamp inválido para cancelAt.');
        }
        
        const subscription = await stripeApi.subscriptions.update(
            subscriptionID,
            {
                cancel_at: cancelAt
            }
        )
    } catch (error) {
        console.error('Erro ao atualizar a Assinatura:', error);
    }
}