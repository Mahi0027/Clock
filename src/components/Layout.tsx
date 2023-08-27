import { memo, useEffect, useState } from "react";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";

/* only theme change component */
const Layout = ({ children }: any) => {
    const currentTheme: string = useSelector(
        (state: any) => state.theme.currentTheme
    );
    const [myTheme, setMyTheme] = useState({
        backgroundColor: "#f8f9fa",
    });
    useEffect(() => {
        if (currentTheme === "light") {
            setMyTheme({
                backgroundColor: "#f8f9fa",
            });
        } else {
            setMyTheme({
                backgroundColor: "#182226",
            });
        }
    }, [currentTheme]);

    const theme = createTheme({
        palette: {
            mode: currentTheme === "light" ? "light" : "dark",
            primary: {
                main: currentTheme === "light" ? "#000000" : "#ffffff", // Change this to your desired primary color for dark mode
            },
            secondary: {
                main: currentTheme === "light" ? "#000000" : "#ffffff", // Change this to your desired secondary color for dark mode
            },
            text: {
                primary: currentTheme === "light" ? "#000000" : "#ffffff", // Change this to your desired primary text color for dark mode
                secondary: currentTheme === "light" ? "#757575" : "#ffffff", // Change this to your desired secondary text color for dark mode
            },
            background: {
                default: currentTheme === "light" ? "#ffffff" : "#000000",
                paper: currentTheme === "light" ? "#ffffff" : "#000000",
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

export default memo(Layout);
