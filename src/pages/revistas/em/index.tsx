import * as React from 'react';
import Stripe from 'stripe';
import Menu from '@/components/Menu';
import { GetStaticProps } from 'next';
import { Container, CardProducts } from '@/styles/pages/revistas';

import stripeConfig from '../../../../config/stripe';

const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2022-11-15',
});

export const getStaticProps: GetStaticProps = async () => {
    const {data: prices} = await stripe.prices.list();

    const products = await Promise.all(prices.map(async (price) => {
        const product = await stripe.products.retrieve(price.product)
        return {
            id: price.id,
            name: product.name,
            image: product.images,
            price: price.unit_amount,
            currency: price.currency,
        }
    }))

    return{
        props: {
            products,
        },
    };
}

const Product = ({ products }) => {
    console.log(products);

    return(
      <div>
          <Menu />
          <Container>
          </Container>
            {products.map(product => (
            <CardProducts>
                <h2>{product.name}</h2>
                <p>{product.price/1}</p>
            </CardProducts>
            ))}
      </div>
    )
};

export default Product;
