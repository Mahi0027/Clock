import { DataComponent, DataContext } from "@/contexts/DataComponent";
import "@/styles/globals.scss";
import { ThemeProvider } from "@emotion/react";
import { Paper, createTheme } from "@mui/material";
import type { AppProps } from "next/app";
import { useContext, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <DataComponent>
            <Component {...pageProps} />
        </DataComponent>
    );
}
