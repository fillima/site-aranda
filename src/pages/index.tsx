import Image from "next/image";
import Link from "next/link";

import ccm from '@/assets/ccm.png';
import em from '@/assets/em.png';
import fv from '@/assets/fotovolt.png';
import fs from '@/assets/fs.jpg';
import mm from '@/assets/mm.png';
import pi from '@/assets/pi.png';
import rti from '@/assets/rti.png';
import hy from '@/assets/hy.png';
import logoAranda from '@/assets/aranda-logo.png';
import { AuthGuard } from "@/components/AuthGuard";
import { GetServerSidePropsContext } from "next";

const styles = {
    image: {
        width: "auto",
        height: 70,
    }
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return AuthGuard();
}

function Home() {
    return (
    <div className="bg-white">
        <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href="/" className="flex items-center px-5">
                        <Image src={logoAranda} className="w-10 h-8" alt="Aranda Logo" />
                    </Link>
                </div>
            </nav>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-10 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
                <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
                Vendas Aranda
                </h2>
                <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Sistema para gerar vendas dos produtos da Aranda.
                Gera uma página de checkout para qualquer uma das revistas ao lado.
                </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 shadow-lg lg:grid-cols-2">
                <Link href="/revistas/fv">
                    <div className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:bg-gray-400 duration-200 col-span-1 flex justify-center py-8 px-8 bg-gray-300 rounded-md">
                    <Image
                        className="max-h-12 rounded"
                        src={fv}
                        alt="Fotovolt"
                        style={styles.image}
                    />
                    </div>
                </Link>
                <Link href="/revistas/pi">
                    <div className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:bg-gray-400 duration-200 col-span-1 flex justify-center py-8 px-8 bg-gray-300 rounded-md">
                    <Image className="max-h-12 rounded" src={pi} alt="Mirage" style={styles.image}/>
                    </div>
                </Link>
                <Link href="/revistas/em">
                    <div className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:bg-gray-400 duration-200 col-span-1 flex justify-center py-8 px-8 bg-gray-300 rounded-md">
                    <Image className="max-h-12 rounded" src={em} alt="Tuple" style={styles.image}/>
                    </div>
                </Link>
                <Link href="/revistas/rti">
                    <div className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:bg-gray-400 duration-200 col-span-1 flex justify-center py-8 px-8 bg-gray-300 rounded-md">
                    <Image
                        className="max-h-12 rounded"
                        src={rti}
                        alt="Laravel"
                        style={styles.image}
                    />
                    </div>
                </Link>
                <Link href="/revistas/mm">
                    <div className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:bg-gray-400 duration-200 col-span-1 flex justify-center py-8 px-8 bg-gray-300 rounded-md">
                    <Image
                        className="max-h-12 rounded"
                        src={mm}
                        alt="StaticKit"
                        style={styles.image}
                    />
                    </div>
                </Link>
                <Link href="/revistas/ccm">
                    <div className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:bg-gray-400 duration-200 col-span-1 flex justify-center py-8 px-8 bg-gray-300 rounded-md">
                    <Image
                        className="max-h-12 rounded"
                        src={ccm}
                        alt="Statamic"
                        style={styles.image}
                    />
                    </div>
                </Link>
                <Link href="/revistas/fs">
                    <div className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:bg-gray-400 duration-200 col-span-1 flex justify-center py-8 px-8 bg-gray-300 rounded-md">
                    <Image
                        className="max-h-12 rounded"
                        src={fs}
                        alt="StaticKit"
                        style={styles.image}
                    />
                    </div>
                </Link>
                <Link href="/revistas/hy">
                    <div className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:bg-gray-400 duration-200 col-span-1 flex justify-center py-8 px-8 bg-gray-300 rounded-md">
                    <Image
                        className="max-h-12 rounded"
                        src={hy}
                        alt="Statamic"
                        style={styles.image}
                    />
                    </div>
                </Link>
            </div>
            </div>
        </div>
    </div>
    )
}

export default Home;