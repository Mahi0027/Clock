import { Html, Head, Main, NextScript } from "next/document";
import type { AppProps } from "next/app";
import { useContext, useEffect } from "react";
import { DataContext } from "@/contexts/DataComponent";
import Layout from "@/components/Layout";

export default function Document() {
    return (
        <>
            <Html lang="en">
                <Head>
                    <title>Clock</title>
                    <meta
                        name="Clock"
                        content="This application provide all clock related services like different timezone's clocks, alarm, timer, stopwatch, calender etc."
                    />
                    <meta
                        name="viewport"
                        content="width=device-width, user-scalable=no,initial-scale=1, maximum-scale=1, minimum-scale=1, shrink-to-fit=no"
                    />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="theme-color" content="#000000" />

                    <meta name="full-screen" content="yes" />
                    <meta name="x5-fullscreen" content="true" />
                    <meta name="360-fullscreen" content="true" />

                    <meta name="screen-orientation" content="landscape" />
                    <meta name="x5-orientation" content="landscape"></meta>
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="94x94"
                        href="/assets/icons/icon-94x94.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="188x188"
                        href="/assets/icons/icon-188x188.png"
                    />
                    <link rel="manifest" href="/manifest.json" />
                    <link
                        rel="apple-touch-icon"
                        href="/assets/icons/icon-188x188.png"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Tektur&display=swap"
                        rel="stylesheet"
                    ></link>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@700&family=Lumanosimo&family=Nabla&family=Noto+Sans+Sundanese:wght@400;700&family=Tektur&display=swap"
                        rel="stylesheet"
                    ></link>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Dai+Banna+SIL&family=Dancing+Script&family=Handjet&family=Kablammo&family=Kalam&family=Lumanosimo&family=Open+Sans&family=Playfair+Display&family=Raleway+Dots&family=Shojumaru&family=Tektur&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        </>
    );
}
