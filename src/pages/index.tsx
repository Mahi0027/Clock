import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Stack } from "@mui/material";
import BottomNavbar from "@/components/BottomNavbar";
import TopNavbar from "@/components/TopNavbar";
import AnalogClock from "@/components/miscellaneous/AnalogClock";
import styles from "@/styles/Home.module.scss";
import DigitalClock from "@/components/miscellaneous/DigitalClock";
import { initialStatesTypes } from "@/redux/features/bottomNavbar/reducer";
import { useSelector } from "react-redux";
import ClockHome from "@/components/home/clock";
import AlarmHome from "@/components/home/alarm";
import TimerHome from "@/components/home/timer";
import StopwatchHome from "@/components/home/stopwatch";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const stateData: initialStatesTypes = useSelector(
        (state: any) => state.homePage
    );

    useEffect(() => {
        console.log("start: ", stateData);
    }, []);

    useEffect(() => {
        console.log("updated: ", stateData);
    }, [stateData.currentHomePage]);

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
            <Stack className={styles.container}>
                {stateData.currentHomePage === 0 && <ClockHome />}
                {stateData.currentHomePage === 1 && <AlarmHome />}
                {stateData.currentHomePage === 2 && <TimerHome />}
                {stateData.currentHomePage === 3 && <StopwatchHome />}
            </Stack>
            <BottomNavbar />
        </>
    );
}
