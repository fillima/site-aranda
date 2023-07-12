import Menu from "@/components/Menu";
import { Container, MagazineContext, Title } from "@/styles/pages/home";

export default function Revistas() {
    return(
        <div>
            <Menu />
            <Container>
                <Title>Produtos Padrão - Eletricidade Moderna</Title>
            </Container>
            <MagazineContext>
                <stripe-buy-button
                buy-button-id="buy_btn_1NT929A69Bv1uf0ZyqBwNiJR"
                publishable-key="pk_live_51NNxdFA69Bv1uf0ZcVjAahrp3csOinqwNY6Rrpin2CGmh6DsMMunooOk7BceoHa3aQQiPNo5GOfOKHgUfLF57gwU00jpxv7T81"
                >
                </stripe-buy-button>

                <stripe-buy-button
                buy-button-id="buy_btn_1NTA5KA69Bv1uf0Z0MMtNUAi"
                publishable-key="pk_live_51NNxdFA69Bv1uf0ZcVjAahrp3csOinqwNY6Rrpin2CGmh6DsMMunooOk7BceoHa3aQQiPNo5GOfOKHgUfLF57gwU00jpxv7T81"
                >
                </stripe-buy-button>

                <stripe-buy-button
                buy-button-id="buy_btn_1NTA9FA69Bv1uf0ZMyXBoTYn"
                publishable-key="pk_live_51NNxdFA69Bv1uf0ZcVjAahrp3csOinqwNY6Rrpin2CGmh6DsMMunooOk7BceoHa3aQQiPNo5GOfOKHgUfLF57gwU00jpxv7T81"
                >
                </stripe-buy-button>
                
            </MagazineContext>
        </div>
    )
}