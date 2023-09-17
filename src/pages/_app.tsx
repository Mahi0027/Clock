import InitializeStateData from "@/components/InitializeStateData";
import Layout from "@/components/Layout";
import { getCurrentTheme } from "@/middleware/setting/personalize";
import store from "@/redux/store";
import "@/styles/globals.scss";
import Paper from "@mui/material/Paper";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import screenfull from "screenfull";

export default function App({ Component, pageProps }: AppProps) {
    const [completedInitializationFlag, setCompletedInitializationFlag] =
        useState(false);
    const [theme, setTheme] = useState('light');
    const [themeBackground, setThemeBackground] = useState({ backgroundColor: "#fff" });

    useEffect(() => {
        // fullScreen();
        getSystemCurrentTheme();
    }, [])

    useEffect(() => {
        if (theme === "light") {
            setThemeBackground({
                backgroundColor: "#fff",
            });
        } else {
            setThemeBackground({
                backgroundColor: "#000000",
            });
        }
    }, [theme])

    const getSystemCurrentTheme = async () => {
        const result: any = await getCurrentTheme();
        if (typeof result.currentTheme !== undefined) {
            setTheme(result.currentTheme);
        }
    }

//     function fullScreen(): void {
//     if (screenfull.isEnabled) {
//     const elem: any = document.documentElement; // You can use document.documentElement to request fullscreen for the entire document.
    
//     if (elem.requestFullscreen) {
//       elem.requestFullscreen();
//     } else if (elem.webkitRequestFullscreen) {
//       /* Safari */
//       elem.webkitRequestFullscreen();
//     } else if (elem.msRequestFullscreen) {
//       /* IE11 */
//       elem.msRequestFullscreen();
//     }
//   }
//   }

    return (
        <Provider store={store}>
            <Layout>
                <Paper sx={{ boxShadow: 0 }}>
                    {completedInitializationFlag ?
                        <Component {...pageProps} />
                        :
                        <InitializeStateData setCompletedInitializationFlag={
                            setCompletedInitializationFlag
                        } />}
                </Paper>
            </Layout>
        </Provider>
    );
}
