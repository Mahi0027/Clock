import { initializeAlarmSilentStatesMiddleware } from "@/middleware/setting/alarm/silent";
import { initializeAlarmSnoozeStatesMiddleware } from "@/middleware/setting/alarm/snooze";
import { initializeAlarmVolumeStatesMiddleware } from "@/middleware/setting/alarm/volume";
import { initializeAnalogClockThemeStates } from "@/middleware/setting/clock/clockTheme/analog";
import { initializeDigitalClockThemeStates } from "@/middleware/setting/clock/clockTheme/digital";
import { initializeSecondFlagStatesMiddleware } from "@/middleware/setting/clock/second";
import { initializeClockStyleStatesMiddleware } from "@/middleware/setting/clock/style";
import { initializeTimeZoneStatesMiddleware } from "@/middleware/setting/clock/timeZone";
import { initializeThemeStates } from "@/middleware/setting/personalize";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function InitializeStateData({ setCompletedInitializationFlag }: any) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeThemeStates());
        dispatch(initializeAnalogClockThemeStates());
        dispatch(initializeDigitalClockThemeStates());
        dispatch(initializeClockStyleStatesMiddleware());
        dispatch(initializeSecondFlagStatesMiddleware());
        dispatch(initializeTimeZoneStatesMiddleware());
        dispatch(initializeAlarmSilentStatesMiddleware());
        dispatch(initializeAlarmSnoozeStatesMiddleware());
        dispatch(initializeAlarmVolumeStatesMiddleware());
        setTimeout(() => {
            setCompletedInitializationFlag(true);
        }, 1000);
    }, []);

    return <h1>InitializingStateData</h1>;
}

export default InitializeStateData;
