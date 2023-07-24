import * as React from 'react';
import Stripe from 'stripe';
import { GetStaticProps } from 'next';
import Image from "next/image";

import stripeConfig from '../../../config/stripe';
import { CurrencyInput } from 'react-currency-mask';
import PaymentLink from '@/components/PaymentLink';
import { useState, useContext, createContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import MenuAranda from '@/components/Menu';

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
    let revistaName = params?.revista;

    if (!revistaName || revistaName !== 'em') {
        revistaName = 'em'
    }
    
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
    const router = useRouter();
    const { data: session, status } = useSession();
    const [selectValues, setSelectValues] = useState<Array<number>>([]);
    const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});
    const [sessionLoaded, setSessionLoaded] = useState(false);
    const [inputValue, setInputValue] = useState<Array<number>>([]);
    const [maskValues, setMaskValues] = useState<Array<number>>([]);
    const [selectCurrencyValue, setSelectCurrencyValue] = useState<Array<string>>([]);
    const [selectLocaleValue, setSelectLocaleValue] = useState<Array<string>>([]);


    const revista = produtos[0].revistaName.toUpperCase();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const value = parseInt(event.target.value, 10);
        setSelectValues((prevValues) => {
            const updatedValues = [...prevValues];
            updatedValues[index] = value;
            return updatedValues;
        });
    };

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
      const value = event.target.value;
      setSelectCurrencyValue((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = value;
        return newValues
      })
      
      setSelectLocaleValue((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = value === 'USD' ? 'en-US' : 'pt-BR';
        return newValues
      })
    }

    const handleChangeWithIndex = (index: number) => (
      event: React.ChangeEvent<HTMLInputElement>,
      originalValue: string | number,
      maskedValue: string | number) => {
        handleProductPriceChange(event, originalValue, maskedValue, index);
      };

    const handleProductPriceChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      originalValue: string | number,
      maskedValue: string | number,
      index: number
    ) => {
      setInputValue((prevValues) => {
        const priceValue = [...prevValues];
        priceValue[index] = typeof originalValue === 'string' ? parseFloat(originalValue) : originalValue || 0;
        return priceValue;
      });
      
      setMaskValues((prevValues) => {
        const maskValue = [...prevValues];
        maskValue[index] = typeof maskedValue === 'string' ? parseFloat(maskedValue) : maskedValue || 0;
        return maskValue;
      });
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

    useEffect(() => {
        // Se a sessão ainda está carregando, não fazemos nada
        if (status === 'loading') {
          return;
        }
    
        // Se a sessão foi carregada e não existe, redirecionamos para a página de login
        if (status === 'unauthenticated' || !session) {
          router.push('/login');
        } else {
          // Se a sessão foi carregada e existe, marcamos a sessão como carregada
          setSessionLoaded(true);
        }
    }, [status, session, router]);

    if (!sessionLoaded) {
        return (
          <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
            <div className="flex space-x-2 animate-pulse">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        );
    }

    return(
        <div className="bg-white">
            <MenuAranda />
          <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-10 lg:pb-28 lg:px-8">
            <div className="absolute inset-0">
                <div className="bg-white h-1/3 sm:h-2/3" />
            </div>
            <div className="relative max-w-7xl mx-auto">
                <div className="text-center">
                <h2 className="text-3xl tracking-tight font-semibold text-gray-900 sm:text-4xl">Produtos</h2>
                <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                    Escolha abaixo qual produto você deseja gerar um pagamento e a quantidade de veiculações na revista
                </p>
                </div>
                <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-4 lg:max-w-none">
                {produtos.map((produto, index) => (
                  <div key={produto.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                      <div className="flex-shrink-0">
                          <Image src={produto.imagem[0]} className="h-48 w-full object-contain" alt="" height={48} width={80}/>
                      </div>
                      <div className="flex-1 bg-blue p-6 flex flex-col justify-between">
                          <div className="flex flex-col flex-1 justify-between">
                              <p className="text-xl font-semibold text-gray-200">{produto.nome}</p>
                              <p className="mt-3 text-base text-gray-400">{produto.descricao}</p>
                              <div className="flex flex-col justify-between mt-5">
                                <div className='flex flex-col'>
                                    <label className="block text-sm font-medium leading-6 text-white">Preço</label>
                                    <div className='flex flex-row justify-between mt-2'>
                                      <CurrencyInput 
                                        onChangeValue={handleChangeWithIndex(index)}
                                        value={maskValues[index] ? maskValues[index] : 'R$ 0,00'}
                                        currency={selectCurrencyValue[index]}
                                        locale={selectLocaleValue[index]}
                                        // @ts-ignore
                                        className="text-gray-600 pl-2 rounded-sm"
                                      />
                                      <div className="flex">
                                        <label className="sr-only">Moeda</label>
                                        <select 
                                          id="currency"
                                          name="currency"
                                          className="rounded-md border-0 bg-transparent text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                          onChange={(event) => handleCurrencyChange(event, index)}
                                          value={selectCurrencyValue[index]}
                                        >
                                          <option value="BRL">BRL</option>
                                          <option value="USD">USD</option>
                                        </select>
                                      </div>
                                    </div>
                                </div>
                                <div key={produto.id} className='mt-4'>
                                    <label htmlFor="quantity" className="text-white mr-1 ">
                                        Qtd.
                                    </label>
                                    <select
                                        id={`select-${produto.id}`}
                                        name={produto.id}
                                        className="rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={(event) => handleChange(event, index)}
                                        value={selectValues[index]}
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
                                  onClick={() => {PaymentLink({quantidade: selectValues[index] || 1, preco: inputValue[index], moeda: selectCurrencyValue[index] || 'BRL', produto: produto.id}); handleClickButton(produto.id)}}
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
