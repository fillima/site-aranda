import { globalCss } from ".";

export const globalStyles = globalCss({
    '*': {
        margin: 0,
        padding: 0
    },

    'body, input, p, ul, textarea, button': {
        fontFamily: 'Roboto',
        fontWeight: 400
    },

    'a': {
        textDecoration: "none",
        color: "white"
    }
})