import React, { useEffect } from "react";
import DigitalClock from "./DigitalClock";
import { useSelector } from "react-redux";
import { initialStatesTypes } from "@/redux/features/setting/clock/style/styleReducer";
import AnalogClock from "./AnalogClock";

function ClockHome() {
    const stateData: initialStatesTypes = useSelector(
        (state: any) => state.clockStyle
    );

    return (
        <>
            {stateData.currentStyle === "Analog" && <AnalogClock />}
            {stateData.currentStyle === "Digital" && <DigitalClock />}
        </>
    );
}

export default ClockHome;
