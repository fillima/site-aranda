import { Card, Title } from "./styles";

export type Props = {
    magazine: string,
    link: string
}

export default function CardMagazine({magazine, link}: Props) {
    return(
        <Card>
            <Title><a href={link}>{magazine}</a></Title>
        </Card>
    );
}