import * as React from 'react';
import Stripe from 'stripe';
import { GetStaticPaths, GetStaticProps } from 'next';

import stripeConfig from '../../../config/stripe';

const Products: React.FC = () => {
  return <h1>Product</h1>
};

export const getStaticPaths: GetStaticPaths = async () => {
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2022-11-15',
  });

  const products = await stripe.products.list();

  console.log(products.data);

  return{
    paths: [],
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}

export default Products;