import { Html, Head, Main, NextScript } from "next/document";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Paper, createTheme } from "@mui/material";
import type { AppProps } from "next/app";
import { useContext, useEffect } from "react";
import { DataContext } from "@/contexts/DataComponent";
import Layout from "@/components/Layout";

export default function Document() {
    const { mode } = useContext(DataContext);
    const theme = createTheme({
        palette: {
            mode: "dark",
        },
    });
    useEffect(() => {
        console.log("mode chansdfdsggs: ", mode);
    }, [mode]);
    return (
        <>
            <Html lang="en">
                <Head>
                    <title>Create Next Appsdf</title>
                    <meta
                        name="description"
                        content="Generated by create next app"
                    />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <body>
                    <Layout>
                        <Main />
                    </Layout>
                    <NextScript />
                </body>
            </Html>
        </>
    );
}
