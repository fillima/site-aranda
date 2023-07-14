import Menu from "@/components/Menu";
import Image from "next/image";
import Link from "next/link";

import ccm from '@/assets/ccm.jpg';
import em from '@/assets/em.jpg';
import fv from '@/assets/fotovolt.jpg';
import fs from '@/assets/fs.jpg';
import mm from '@/assets/mm.jpg';
import pi from '@/assets/pi.jpg';
import rti from '@/assets/rti.jpg';
import hy from '@/assets/hy.jpg';

const styles = {
    image: {
        width: "auto",
        height: 70,
    }
};

export default function Home() {
    return (
        <div className="bg-white">
            <Menu />
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Vendas Aranda
                </h2>
                <p className="mt-3 max-w-3xl text-lg text-gray-500">
                  Sistema para gerar vendas dos produtos da Aranda.
                  Gera uma página de checkout para qualquer uma das revistas ao lado.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
                <Link href="/revistas/fv">
                    <div className="col-span-1 flex justify-center py-8 px-8 bg-blue rounded-md">
                    <Image
                        className="max-h-12 rounded"
                        src={fv}
                        alt="Fotovolt"
                        style={styles.image}
                    />
                    </div>
                </Link>
                <Link href="/revistas/pi">
                    <div className="col-span-1 flex justify-center py-8 px-8 bg-blue rounded-md">
                    <Image className="max-h-12 rounded" src={pi} alt="Mirage" style={styles.image}/>
                    </div>
                </Link>
                <Link href="/revistas/em">
                    <div className="col-span-1 flex justify-center py-8 px-8 bg-blue rounded-md">
                    <Image className="max-h-12 rounded" src={em} alt="Tuple" style={styles.image}/>
                    </div>
                </Link>
                <Link href="/revistas/rti">
                    <div className="col-span-1 flex justify-center py-8 px-8 bg-blue rounded-md">
                    <Image
                        className="max-h-12 rounded"
                        src={rti}
                        alt="Laravel"
                        style={styles.image}
                    />
                    </div>
                </Link>
                <Link href="/revistas/mm">
                    <div className="col-span-1 flex justify-center py-8 px-8 bg-blue rounded-md">
                    <Image
                        className="max-h-12 rounded"
                        src={mm}
                        alt="StaticKit"
                        style={styles.image}
                    />
                    </div>
                </Link>
                <Link href="/revistas/ccm">
                    <div className="col-span-1 flex justify-center py-8 px-8 bg-blue rounded-md">
                    <Image
                        className="max-h-12 rounded"
                        src={ccm}
                        alt="Statamic"
                        style={styles.image}
                    />
                    </div>
                </Link>
                <Link href="/revistas/fs">
                    <div className="col-span-1 flex justify-center py-8 px-8 bg-blue rounded-md">
                    <Image
                        className="max-h-12 rounded"
                        src={fs}
                        alt="StaticKit"
                        style={styles.image}
                    />
                    </div>
                </Link>
                <Link href="/revistas/hy">
                    <div className="col-span-1 flex justify-center py-8 px-8 bg-blue rounded-md">
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