import { createContext, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Box from "@mui/material/Box";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BottomNavbar from "@/components/BottomNavbar";
import TopNavbar from "@/components/TopNavbar";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [value, setValue] = useState(0);
    const [mode, setMode] = useState(0);
    return (
        <>

                <TopNavbar
                    heading={"Clock"}
                    menuItemsProps={[
                        "Setting",
                        "Privacy policy",
                        "Send feedback",
                        "Help",
                    ]}
                    homepage={true}
                />
            {/* </Layout> */}
            {/* <Layout> */}
                <BottomNavbar />
        </>
    );
}
