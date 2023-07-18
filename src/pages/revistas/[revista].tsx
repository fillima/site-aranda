import * as React from 'react';
import Stripe from 'stripe';
import { GetStaticProps } from 'next';
import Image from "next/image";
import Link from 'next/link';

import logoAranda from '@/assets/aranda-logo.png';

import stripeConfig from '../../../config/stripe';
import CurrencyFormatter from '@/components/CurrencyFormat';
import PaymentLink from '@/components/PaymentLink';
import { useState, useContext, createContext } from 'react';
import { useRouter } from 'next/router';

const Revistas = createContext([]);

const RevistasProvider = ({ children }: { children: React.ReactNode }) => {
    const revistas = useContext(Revistas);

    return <Revistas.Provider value={revistas}>{children}</Revistas.Provider>;
}

const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2022-11-15',
});

interface ProductProps {
    produtos: Array<{
        id: string;
        idPrice: string;
        nome: string;
        descricao: string;
        imagem: string;
        preco: number;
        moeda: string;
        metadata: Array<string>;
        revistaName: string;
    }>;
}

export async function getStaticPaths() {
  
    const paths = [
      { params: { revista: 'em' } },
      { params: { revista: 'pi' } },
      { params: { revista: 'fv' } },
      { params: { revista: 'hy' } },
      { params: { revista: 'rti' } },
      { params: { revista: 'mm' } },
      { params: { revista: 'ccm' } },
      { params: { revista: 'fs' } },
    ];
  
    return {
      paths,
      fallback: false, // Ou 'blocking' se você quiser usar o modo de carregamento incremental
    };
  }

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const revistaName = params?.revista;
    
    const produtos = await stripe.products.list();

    // Filtrar produtos pelo metadado específico
    const metadadoChave = 'revista';
    const metadadoValor = revistaName;

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
        idPrice: preco.id,
        nome: produto.name,
        descricao: produto.description,
        imagem: produto.images,
        preco: preco.unit_amount,
        moeda: preco.currency,
        metadata: produto.metadata,
        revistaName: revistaName
      };
    });

    return {
      props: {
        produtos: produtosComPrecos,
      },
    };
}

const Product: React.FC<ProductProps> = ({ produtos }) => {
    const [selectValue, setSelectValue] = useState(1); // Valor padrão inicial
    const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

    const revista = produtos[0].revistaName.toUpperCase();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectValue(parseInt(value, 10));
        console.log(event.target);
    };

    const handleClickButton = (produtoId: string) => {
        setIsLoading((prevLoading) => ({
            ...prevLoading,
            [produtoId]: true,
          }));

        setTimeout(() => {
            setIsLoading((prevLoading) => ({
                ...prevLoading,
                [produtoId]: false,
              }));
        }, 4000);
    };

    return(
        <div className="bg-white">
            <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href="/" className="flex items-center px-5">
                        <Image src={logoAranda} className="w-10 h-8" alt="Aranda Logo" />
                    </Link>
                </div>
            </nav>
          <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-10 lg:pb-28 lg:px-8">
            <div className="absolute inset-0">
                <div className="bg-white h-1/3 sm:h-2/3" />
            </div>
            <div className="relative max-w-7xl mx-auto">
                <div className="text-center">
                <h2 className="text-3xl tracking-tight font-semibold text-gray-900 sm:text-4xl">Produtos - {revista}</h2>
                <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                    Escolha abaixo qual produto você deseja gerar um pagamento e a quantidade de veiculações na revista
                </p>
                </div>
                <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-4 lg:max-w-none">
                {produtos.map((produto) => (
                    <div key={produto.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                        <div className="flex-shrink-0">
                            <img className="h-48 w-full object-contain" src={produto.imagem} alt="" />
                        </div>
                        <div className="flex-1 bg-blue p-6 flex flex-col justify-between">
                            <div className="flex flex-col flex-1 justify-between">
                                <p className="text-xl font-semibold text-gray-200">{produto.nome}</p>
                                <p className="mt-3 text-base text-gray-400">{produto.descricao}</p>
                                <div className="flex flex-row justify-between mt-5">
                                    <div>
                                        <p className="text-xl font-semibold text-gray-200"><CurrencyFormatter amount={produto.preco / 100} /></p>
                                    </div>
                                    <div key={produto.id}>
                                        <label htmlFor="quantity" className="text-white mr-1">
                                            Qtd.
                                        </label>
                                        <select
                                            id={`select-${produto.id}`}
                                            name={produto.id}
                                            className="rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={selectValue}
                                            onChange={handleChange}
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray bg-gray-300 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-3 justify-center"
                                    onClick={() => {PaymentLink({quantidade: selectValue, precoId: produto.idPrice}); handleClickButton(produto.id)}}
                                >
                                    {isLoading[produto.id] ? (
                                    <>
                                        <svg className="animate-spin inline-block w-5 h-5 mr-2 border-[3px] border-current border-t-transparent text-gray-700 rounded-full" viewBox="0 0 24 24">
                                        </svg>
                                        Gerando link...
                                    </>
                                    ) : (
                                    'Gerar link de pagamento'
                                    )}
                                </button>
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
