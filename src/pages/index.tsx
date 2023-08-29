import { useEffect, useMemo, useState } from "react";
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

const homePageTitle = ["Clock", "Alarm", "Timer", "Stopwatch"];
const MenuItems = ["Setting", "Privacy policy", "Send feedback", "Help"];
export default function Home() {
    const { currentHomePage, currentTheme } = useSelector((state: any) => ({
        currentHomePage: state.homePage.currentHomePage,
        currentTheme: state.theme.currentTheme,
    }));
    const [myTheme, setMyTheme] = useState({});

    useEffect(() => {
        if (currentTheme === "light") {
            setMyTheme({
                backgroundColor: "#fff",
            });
        } else {
            setMyTheme({
                backgroundColor: "#000000",
            });
        }
    }, [currentTheme]);

    /* JSX code under useMemo for optimization and improving performance. */
    const indexPageComponent = useMemo(() => {
        return (
            <>
                <TopNavbar
                    heading={homePageTitle[currentHomePage]}
                    menuItemsProps={MenuItems}
                    homepage={true}
                />
                <Stack className={styles.container} sx={myTheme}>
                    {currentHomePage === 0 && <ClockHome />}
                    {currentHomePage === 1 && <AlarmHome />}
                    {currentHomePage === 2 && <TimerHome />}
                    {currentHomePage === 3 && <StopwatchHome />}
                </Stack>
                <BottomNavbar />
            </>
        );
    }, [myTheme, currentHomePage]);

    return <>{indexPageComponent}</>;
}
