import { createStitches } from '@stitches/react';

export const {
    config,
    styled,
    css,
    globalCss,
    keyframes,
    getCssText,
    theme,
    createTheme
} = createStitches({
    theme: {
        colors: {
            white: '#fff',
            offWhite: '#DEDEDE',
            gray600: '#666',
            blue300: '#337AB7'
        },
        fontWeight: {
            Bold: 700,
            Regular: 400
        },
        fontFamily: {
            Roboto: 'Roboto'
        }
    }
})