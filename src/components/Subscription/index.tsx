import React from 'react';
import Stripe from 'stripe';

import stripeConfig from '../../../config/stripe';

const stripeApi = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2022-11-15',
});

export default async function Subscription(subscriptionID: string, cancelAt: number) {
    try {
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