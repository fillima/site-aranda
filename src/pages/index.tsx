import Menu from "@/components/Menu";
import { Container, MagazineContext, Title } from "@/styles/pages/home";
import CardMagazine from "@/components/CardMagazines";

export default function Home() {

    return(
        <div>
            <Menu />
            <Container>
                <Title>Gerador de vendas</Title>
                <MagazineContext>
                    <CardMagazine magazine="Eletricidade Moderna" link="/revistas/em"/>
                    <CardMagazine magazine="Fotovolt" link="/revistas/fv" />
                    <CardMagazine magazine="Plástico Industrial" link="/revistas/pi" />
                    <CardMagazine magazine="Máquinas e Metais" link="/revistas/mm" />
                </MagazineContext>
                <MagazineContext>
                    <CardMagazine magazine="Corte e Conformação de Metais" link="/revistas/ccm" />
                    <CardMagazine magazine="Hydro" link="/revistas/hy" />
                    <CardMagazine magazine="Redes, Telecom e Instalações" link="/revistas/rti" />
                    <CardMagazine magazine="Fundição e Serviços" link="/revistas/fs" />
                </MagazineContext>
            </Container>
        </div>
    )
}