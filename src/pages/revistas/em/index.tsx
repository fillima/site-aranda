import * as React from 'react';
import Stripe from 'stripe';
import Menu from '@/components/Menu';
import { GetStaticProps } from 'next';

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
            description: product.description,
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
          <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
            <div className="absolute inset-0">
                <div className="bg-white h-1/3 sm:h-2/3" />
            </div>
            <div className="relative max-w-7xl mx-auto">
                <div className="text-center">
                <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Produtos - EM</h2>
                <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                    Escolha abaixo qual produto você deseja gerar um pagamento e a quantidade de veiculações na revista
                </p>
                </div>
                <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                {products.map((product) => (
                    <div key={product.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                        <div className="flex-shrink-0">
                            <img className="h-48 w-full object-contain" src={product.image} alt="" />
                        </div>
                        <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                            <div className="flex-1">
                                <p className="text-xl font-semibold text-gray-900">{product.name}</p>
                                <p className="mt-3 text-base text-gray-500">{product.description}</p>
                                <p className="text-xl font-semibold text-gray-900">{product.price / 100}</p>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
      </div>
    )
};

export default Product;
