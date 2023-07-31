import React, { useEffect, useState } from "react";
import Stripe from 'stripe';

import stripeConfig from '../../config/stripe';
import { useRouter } from 'next/router';
import Session from 'stripe';
import Link from "next/link";

const styles = {
    background: {
        backgroundColor: '#0a4271'
    }
}

const PaymentSuccess = () => {
    return (
        <div className="h-screen mt-20" style={styles.background}>
            <div className="bg-white p-6  md:mx-auto">
                <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                    <path fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                    </path>
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Pagamento Concluído!</h3>
                    <p className="text-gray-600 my-2">Obrigado por completar o seu pagamento.</p>
                    <br></br>
                    <p className="text-gray-600 my-2">Clique no botão abaixo para acessar outros conteúdos,</p>
                    <p className="text-gray-600 mb-10">como esse que você acabou de assinar.</p>
                    <Link href='https://arandanet.com.br'><button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white justify-center"
                        style={styles.background}
                    >
                        Acesse nosso site
                    </button></Link>
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess;
