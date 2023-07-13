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
        <div>
            <Menu />
            <Container>
                <Title>Gerador de vendas</Title>
                <MagazineContext>
                    <Link href="/revistas/pi">
                        <Image
                            src={pi}
                            style={styles.image}
                            alt="Plástico Industrial"
                        />
                    </Link>
                    <Link href="/revistas/em">
                        <Image
                            src={em}
                            style={styles.image}
                            alt="Corte e Conformação de Metais"
                        />
                    </Link>
                    <Link href="/revistas/fv">
                        <Image
                            src={fv}
                            style={styles.image}
                            alt="Corte e Conformação de Metais"
                        />
                    </Link>
                    <Link href="/revistas/rti">
                        <Image
                            src={rti}
                            style={styles.image}
                            alt="Corte e Conformação de Metais"
                        />
                    </Link>
                </MagazineContext>
                <MagazineContext>
                    <Link href="/revistas/ccm">
                        <Image
                            src={ccm}
                            style={styles.image}
                            alt="Corte e Conformação de Metais"
                        />
                    </Link>
                    <Link href="/revistas/mm">
                        <Image
                            src={mm}
                            style={styles.image}
                            alt="Corte e Conformação de Metais"
                        />
                    </Link>
                    <Link href="/revistas/hy">
                        <Image
                            src={hy}
                            style={styles.image}
                            alt="Corte e Conformação de Metais"
                        />
                    </Link>
                    <Link href="/revistas/fs">
                        <Image
                            src={fs}
                            style={styles.image}
                            alt="Corte e Conformação de Metais"
                        />
                    </Link>
                </MagazineContext>
            </Container>
        </div>
    )
}