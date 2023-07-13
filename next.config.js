const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    reactStrictMode: true,
    env: {
        stripeKey: process.env.STRIPE_KEY,
    },
    theme: {
        extend: {
            fontFamily: {
            sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },
}
