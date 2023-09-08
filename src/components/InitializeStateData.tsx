import { initializeAnalogClockThemeStates } from "@/middleware/setting/clock/clockTheme/analog";
import { initializeDigitalClockThemeStates } from "@/middleware/setting/clock/clockTheme/digital";
import { initializeSecondFlagStatesMiddleware } from "@/middleware/setting/clock/second";
import { initializeClockStyleStatesMiddleware } from "@/middleware/setting/clock/style";
import { initializeThemeStates } from "@/middleware/setting/personalize";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function InitializeStateData({ setCompletedInitializationFlag }: any) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeThemeStates());
        dispatch(initializeAnalogClockThemeStates());
        dispatch(initializeDigitalClockThemeStates());
        dispatch(initializeClockStyleStatesMiddleware());
        dispatch(initializeSecondFlagStatesMiddleware());
        setTimeout(() => {
            setCompletedInitializationFlag(true);
        }, 1000);
    }, []);

    return <h1>InitializingStateData</h1>;
}

export default InitializeStateData;
