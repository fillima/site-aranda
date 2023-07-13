import { Card, Title } from "./styles";

const styles = {
    image: {
        width: "90%",
        height: "auto"
    }
}

export type Props = {
    magazine: string,
    link: string,
    image: string
}

export default function CardMagazine({magazine, link, image}: Props) {
    return(
        <Card>
            <a href={link}>
                
            </a>
        </Card>
    );
}