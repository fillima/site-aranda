import { getCssText } from "@/styles";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return(
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>

                <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
                <script async src="https://js.stripe.com/v3/buy-button.js"></script>
                <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText }} />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}