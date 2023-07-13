import { DataComponent } from "@/contexts/DataComponent";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
            <DataComponent>
                <Component {...pageProps} />
            </DataComponent>
    );
}
