import { Button } from "./styles";

export type Props = {
    text: string
}

export default function ButtonDefault({text}: Props) {
    return(
        <Button>{text}</Button>
    );
}