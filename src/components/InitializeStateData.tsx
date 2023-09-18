import { initializeAlarmStatesMiddleware } from "@/middleware/home/alarm";
import { initializeAlarmSilentStatesMiddleware } from "@/middleware/setting/alarm/silent";
import { initializeAlarmSnoozeStatesMiddleware } from "@/middleware/setting/alarm/snooze";
import { initializeAlarmVolumeStatesMiddleware } from "@/middleware/setting/alarm/volume";
import { initializeAnalogClockThemeStates } from "@/middleware/setting/clock/clockTheme/analog";
import { initializeDigitalClockThemeStates } from "@/middleware/setting/clock/clockTheme/digital";
import { initializeSecondFlagStatesMiddleware } from "@/middleware/setting/clock/second";
import { initializeClockStyleStatesMiddleware } from "@/middleware/setting/clock/style";
import { initializeTimeZoneStatesMiddleware } from "@/middleware/setting/clock/timeZone";
import { initializeThemeStates } from "@/middleware/setting/personalize";
import { initializeTimerSettingStatesMiddleware } from "@/middleware/setting/timer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import loader from "@/../public/animations/loader.json";
import styles from "@/styles/components/home/InitializeStateData.module.scss";

function InitializeStateData({ setCompletedInitializationFlag }: any) {
    /* The code block is using the `useSelector` and `useDispatch` hooks from the `react-redux` library
    to access the Redux store and dispatch actions. */
    const { currentTheme }: { currentTheme: string } = useSelector(
        (state: any) => ({
            currentTheme: state.theme.currentTheme,
        })
    );
    const dispatch = useDispatch();
    const [myTheme, setMyTheme] = useState({});

    /* The `useEffect(() => { initializeStateValues(); }, []);` hook is used to call the
    `initializeStateValues` function when the component mounts. The empty array `[]` as the second
    argument ensures that the effect is only triggered once, when the component is initially
    rendered. */
    useEffect(() => {
        initializeStateValues();
    }, []);

    /* The `useEffect` hook is used to perform side effects in a functional component. In this case,
    the effect is triggered whenever the `currentTheme` value changes. */
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

    /**
     * The function initializes various state values and sets a completed initialization flag after a
     * delay of 2 seconds.
     * @returns The function `initializeStateValues` is returning a boolean value of `true`.
     */
    const initializeStateValues = async () => {
        (await initializeThemeStates())(dispatch);
        (await initializeAnalogClockThemeStates())(dispatch);
        (await initializeDigitalClockThemeStates())(dispatch);
        (await initializeClockStyleStatesMiddleware())(dispatch);
        (await initializeSecondFlagStatesMiddleware())(dispatch);
        (await initializeTimeZoneStatesMiddleware())(dispatch);
        (await initializeAlarmSilentStatesMiddleware())(dispatch);
        (await initializeAlarmSnoozeStatesMiddleware())(dispatch);
        (await initializeAlarmVolumeStatesMiddleware())(dispatch);
        (await initializeTimerSettingStatesMiddleware())(dispatch);
        (await initializeAlarmStatesMiddleware())(dispatch);
        setTimeout(() => {
            setCompletedInitializationFlag(true);
        }, 2000);
        return true;
    };
    return (
        <>
            <div className={styles.container} style={myTheme}>
                <div id={styles.drop}>
                    <Lottie
                        id={styles.loader}
                        loop={true}
                        animationData={loader}
                    />
                </div>
            </div>
        </>
    );
}

export default InitializeStateData;
