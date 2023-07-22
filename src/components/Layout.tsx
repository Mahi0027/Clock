import { useContext, useEffect, useState } from "react";
import { Box, Paper, ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { DataContext } from "@/contexts/DataComponent";
import { amber, deepOrange, grey } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { initialStatesTypes } from "@/redux/features/setting/personalize/theme/themeReducer";

/* only theme change component */
const Layout = ({ children }: any) => {
    const stateData: initialStatesTypes = useSelector(
        (state: any) => state.theme
    );
    const [myTheme, setMyTheme] = useState({
        // color: "black",
        backgroundColor: "#f8f9fa",
    });
    useEffect(() => {
        if (stateData.currentTheme === "light") {
            setMyTheme({
                // color: "black",
                backgroundColor: "#f8f9fa",
            });
        } else {
            setMyTheme({
                // color: "white",
                backgroundColor: "#182226",
            });
        }
    }, [stateData.currentTheme]);

    // const [darkMode, setDarkMode] = useState(false);
    // const { mode } = useContext(DataContext);

    // useEffect(() => {
    //     // Check if dark mode preference is set
    //     const prefersDarkMode = window.matchMedia(
    //         "(prefers-color-scheme: dark)"
    //     ).matches;
    //     setDarkMode(prefersDarkMode);
    // }, []);

    // const toggleDarkMode = () => {
    //     setDarkMode(!darkMode);
    // };

    const theme = createTheme({
        palette: {
            mode: stateData.currentTheme === "light" ? "light" : "dark",
            primary: {
                main:
                    stateData.currentTheme === "light" ? "#000000" : "#ffffff", // Change this to your desired primary color for dark mode
            },
            secondary: {
                main:
                    stateData.currentTheme === "light" ? "#000000" : "#ffffff", // Change this to your desired secondary color for dark mode
            },
            text: {
                primary:
                    stateData.currentTheme === "light" ? "#000000" : "#ffffff", // Change this to your desired primary text color for dark mode
                secondary:
                    stateData.currentTheme === "light" ? "#757575" : "#ffffff", // Change this to your desired secondary text color for dark mode
            },
            background: {
                default:
                    stateData.currentTheme === "light" ? "#ffffff" : "#000000",
                paper:
                    stateData.currentTheme === "light" ? "#ffffff" : "#000000",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Box sx={myTheme}>
                <CssBaseline />
                {children}
            </Box>
        </ThemeProvider>
    );
};

export default Layout;
