import { useContext, useEffect, useState } from "react";
import { Box, Paper, ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { DataContext } from "@/contexts/DataComponent";
import { amber, deepOrange, grey } from "@mui/material/colors";

/* only theme change component */
const Layout = ({ children }) => {
    // const [darkMode, setDarkMode] = useState(false);
    const { mode } = useContext(DataContext);

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
            mode: "dark"
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ backgroundColor: "#212121" }}>
                <CssBaseline />
                {children}
            </Box>
        </ThemeProvider>
    );
};

export default Layout;
