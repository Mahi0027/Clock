import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Stack } from "@mui/material";
import BottomNavbar from "@/components/BottomNavbar";
import TopNavbar from "@/components/TopNavbar";
import styles from "@/styles/Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import ClockHome from "@/components/home/clock";
import AlarmHome from "@/components/home/alarm";
import TimerHome from "@/components/home/timer";
import StopwatchHome from "@/components/home/stopwatch";
import {
    setCurrentPlayFlag,
    setHour,
    setMillisecond,
    setMinute,
    setSecond,
    setShowHour,
    setShowMillisecond,
    setShowMinute,
    setShowSecond,
    setStopwatchTimer,
    updateRemainingTimerTime,
} from "@/redux";

const homePageTitle = ["Clock", "Alarm", "Timer", "Stopwatch"];
const MenuItems = ["Setting", "Privacy policy", "Send feedback", "Help"];
type stateTypes = {
    currentHomePage: number;
    currentTheme: string;
    timer: any;
    millisecond: number;
    second: number;
    minute: number;
    hour: number;
};
export default function Home() {
    const {
        currentHomePage,
        currentTheme,
        timer,
        millisecond,
        hour,
        minute,
        second,
    }: stateTypes = useSelector((state: any) => ({
        currentHomePage: state.homePage.currentHomePage,
        currentTheme: state.theme.currentTheme,
        hour: state.stopwatch.hour,
        minute: state.stopwatch.minute,
        second: state.stopwatch.second,
        millisecond: state.stopwatch.millisecond,
        timer: state.stopwatch.timer,
    }));
    const dispatch = useDispatch();
    const [myTheme, setMyTheme] = useState({});
    const timerIntervalRef = useRef<any>(null);
    
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

    /* timer related code start. */
    // const runTimer = useCallback(() => {
    //     return setInterval(() => {
    //         dispatch(updateRemainingTimerTime());
    //     }, 1000);
    // }, []);
    /* timer related code end. */

    /* stopwatch related code start. */
    useEffect(() => {
        dispatch(
            setShowMillisecond(
                millisecond < 10
                    ? "0" + millisecond
                    : millisecond.toString().slice(0, 2)
            )
        );
        if (millisecond >= 1000) {
            dispatch(setSecond(second + 1));
            dispatch(setMillisecond(0));
        }
    }, [millisecond]);

    useEffect(() => {
        dispatch(setShowSecond(second < 10 ? "0" + second : second.toString()));
        if (second === 60) {
            dispatch(setMinute(minute + 1));
            dispatch(setSecond(0));
        }
    }, [second]);

    useEffect(() => {
        if (minute === 60) {
            dispatch(setHour(hour + 1));
            dispatch(setMinute(0));
        }
        dispatch(setShowMinute(minute < 10 ? "0" + minute : minute.toString()));
    }, [minute]);

    useEffect(() => {
        dispatch(setShowHour(hour < 10 ? "0" + hour : hour.toString()));
    }, [hour]);

    /* just to solve closures issue, provide latest state value in callback. Currently we are only providing millisecond. */
    const getStopwatchState = useCallback(() => {
        return {
            millisecond: millisecond,
        };
    }, [millisecond]);

    const playStopwatch = useCallback(() => {
        if (timer !== null) {
            clearInterval(timer);
        }
        const interval = setInterval(() => {
            const newMillisecond = getStopwatchState().millisecond + 1000;
            dispatch(setMillisecond(newMillisecond));
        }, 1000);
        dispatch(setStopwatchTimer(interval));
        dispatch(setCurrentPlayFlag(true));
    }, [getStopwatchState, timer]);
    /* stopwatch related code end. */

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
                    {currentHomePage === 2 && (
                        <TimerHome
                            // runTimer={runTimer}
                            // timerIntervalRef={timerIntervalRef}
                        />
                    )}
                    {currentHomePage === 3 && (
                        <StopwatchHome playStopwatch={playStopwatch} />
                    )}
                </Stack>
                <BottomNavbar />
            </>
        );
    }, [currentHomePage, myTheme, playStopwatch]);

    return <>{indexPageComponent}</>;
}
