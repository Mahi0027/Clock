// import { DataComponent } from "@/contexts/DataComponent";
import Layout from "@/components/Layout";
import store from "@/redux/store";
import "@/styles/globals.scss";
import Paper from "@mui/material/Paper";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Layout>
                <Paper>
                    <Component {...pageProps} />
                </Paper>
            </Layout>
        </Provider>
    );
}
