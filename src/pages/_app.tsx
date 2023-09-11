import InitializeStateData from "@/components/InitializeStateData";
import Layout from "@/components/Layout";
import store from "@/redux/store";
import "@/styles/globals.scss";
import Paper from "@mui/material/Paper";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
    const [completedInitializationFlag,setCompletedInitializationFlag] = useState(false);

    return (
        <Provider store={store}>
            <Layout>
                <Paper sx={{ boxShadow: 0 }}>
                    {completedInitializationFlag ? (
                        <Component {...pageProps} />
                    ) : (
                        <InitializeStateData setCompletedInitializationFlag={setCompletedInitializationFlag}/>
                    )}
                </Paper>
            </Layout>
        </Provider>
    );
}
