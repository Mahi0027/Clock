import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Stack } from "@mui/material";
import BottomNavbar from "@/components/BottomNavbar";
import TopNavbar from "@/components/TopNavbar";
import styles from "@/styles/Home.module.scss";
import { useSelector } from "react-redux";
import ClockHome from "@/components/home/clock";
import AlarmHome from "@/components/home/alarm";
import TimerHome from "@/components/home/timer";
import StopwatchHome from "@/components/home/stopwatch";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const stateData = useSelector((state: any) => state);
    const [myTheme, setMyTheme] = useState({});

    useEffect(() => {
        console.log("start: ", stateData.homePage);
    }, []);


    useEffect(() => {
        if (stateData.theme.currentTheme === "light") {
            setMyTheme({
                backgroundColor: "#fff",
            });
        } else {
            setMyTheme({
                backgroundColor: "#000000",
            });
        }
    }, [stateData.theme.currentTheme]);

    useEffect(() => {
        console.log("updated: ", stateData);
    }, [stateData.homePage.currentHomePage]);

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
            <Stack className={styles.container} sx={myTheme}>
                {stateData.homePage.currentHomePage === 0 && <ClockHome />}
                {stateData.homePage.currentHomePage === 1 && <AlarmHome />}
                {stateData.homePage.currentHomePage === 2 && <TimerHome />}
                {stateData.homePage.currentHomePage === 3 && <StopwatchHome />}
            </Stack>
            <BottomNavbar />
        </>
    );
}
