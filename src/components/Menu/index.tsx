import Link from "next/link";
import { Container, Empresa } from "./styles"

export default function Menu() {
    return(
        <Container>
            <Empresa><Link href="/">Aranda</Link></Empresa>
            <p>Gerador de vendas</p>
        </Container>
    );
}