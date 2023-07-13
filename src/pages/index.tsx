import Menu from "@/components/Menu";
import { Container, MagazineContext, Title } from "@/styles/pages/home";
import CardMagazine from "@/components/CardMagazines";
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
        height: 70
    }
};

export default function Home() {

    return(
    <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <p className="text-center text-base font-semibold uppercase text-gray-600 tracking-wider">
            Gerador de vendas Aranda
            </p>
            <div className="mt-6 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8">
                <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                    <Image
                    className="max-h-12"
                    src={pi}
                    alt="Workcation"
                    />
                </div>
                <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                    <Image className="max-h-12" src={em} alt="Mirage" />
                </div>
                <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                    <Image className="max-h-12" src={fv} alt="Tuple" />
                </div>
                <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                    <Image className="max-h-12" src={rti} alt="Laravel" />
                </div>
                <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                    <Image
                    className="max-h-12"
                    src={mm}
                    alt="StaticKit"
                    />
                </div>
                <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                    <Image
                    className="max-h-12"
                    src={ccm}
                    alt="Statamic"
                    />
                </div>
            </div>
        </div>
    </div>
    )
}