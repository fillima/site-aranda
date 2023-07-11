import Menu from "@/components/Menu";
import { Container, Title } from "@/styles/pages/home";
import { Products } from "@/styles/pages/products";

export default function Revistas() {
    return(
        <div>
            <Menu />
            <Container>
                <Title>Produtos - Eletricidade Moderna</Title>
            </Container>
            <stripe-pricing-table pricing-table-id="prctbl_1NSliTA69Bv1uf0ZMqnzxekL"
            publishable-key="pk_live_51NNxdFA69Bv1uf0ZcVjAahrp3csOinqwNY6Rrpin2CGmh6DsMMunooOk7BceoHa3aQQiPNo5GOfOKHgUfLF57gwU00jpxv7T81">
            </stripe-pricing-table>
        </div>
    )
}