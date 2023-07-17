import * as React from 'react';
import Stripe from 'stripe';
import Menu from '@/components/Menu';
import { GetStaticProps } from 'next';

import stripeConfig from '../../../../config/stripe';
import CurrencyFormatter from '@/components/CurrencyFormat';

const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2022-11-15',
});

interface ProductProps {
    produtos: Array<{
        id: string;
        nome: string;
        descricao: string;
        imagem: string;
        preco: number;
        moeda: string;
    }>;
}

export const getStaticProps: GetStaticProps = async () => {
    const produtos = await stripe.products.list();

    // Filtrar produtos pelo metadado específico
    const metadadoChave = 'revista';
    const metadadoValor = 'EM';

    const produtosFiltrados = produtos.data.filter(produto => {
      return produto.metadata[metadadoChave] === metadadoValor;
    });

    // Obter os preços dos produtos filtrados
    const precos = await Promise.all(
      produtosFiltrados.map(async produto => {
        const preco = await stripe.prices.list({
          product: produto.id,
        });
        return preco.data[0];
      })
    );

    // Mapear produtos e preços encontrados
    const produtosComPrecos = produtosFiltrados.map((produto, index) => {
      const preco = precos[index];
      return {
        id: produto.id,
        nome: produto.name,
        descricao: produto.description,
        imagem: produto.images,
        preco: preco.unit_amount,
        moeda: preco.currency,
      };
    });

    return {
      props: {
        produtos: produtosComPrecos,
      },
    };
}

const Product: React.FC<ProductProps> = ({ produtos }) => {
    return(
        <div className="bg-white">
        <div className='shadow-lg'>
          <Menu />
        </div>
          <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
            <div className="absolute inset-0">
                <div className="bg-white h-1/3 sm:h-2/3" />
            </div>
            <div className="relative max-w-7xl mx-auto">
                <div className="text-center">
                <h2 className="text-3xl tracking-tight font-semibold text-gray-900 sm:text-4xl">Produtos - EM</h2>
                <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                    Escolha abaixo qual produto você deseja gerar um pagamento e a quantidade de veiculações na revista
                </p>
                </div>
                <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                {produtos.map((produto) => (
                    <div key={produto.id} className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-200 flex flex-col rounded-lg shadow-lg overflow-hidden">
                        <div className="flex-shrink-0">
                            <img className="h-48 w-full object-contain" src={produto.imagem} alt="" />
                        </div>
                        <div className="flex-1 bg-blue p-6 flex flex-col justify-between">
                            <div className="flex-1">
                                <p className="text-xl font-semibold text-gray-200">{produto.nome}</p>
                                <p className="mt-3 text-base text-gray-400">{produto.descricao}</p>
                                <p className="text-xl font-semibold text-gray-200"><CurrencyFormatter amount={produto.preco / 100} /></p>
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
