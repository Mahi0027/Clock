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
    const { currentTheme }: { currentTheme: string } = useSelector(
        (state: any) => ({
            currentTheme: state.theme.currentTheme,
        })
    );
    const dispatch = useDispatch();
    const [myTheme, setMyTheme] = useState({});

    useEffect(() => {
        initializeStateValues();
    }, []);

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
