import { styled, theme } from "@/styles";

export const Button = styled('button', {
    backgroundColor: theme.colors.blue300,
    padding: 10,
    borderRadius: 5,
    border: 'none',
    color: theme.colors.white,
    fontSize: 16,
    cursor: "pointer",

    '&:hover': {
        button: {
            opacity: 2
        }
    }
})