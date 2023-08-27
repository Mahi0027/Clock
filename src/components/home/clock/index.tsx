import React from "react";
import DigitalClock from "./DigitalClock";
import { useSelector } from "react-redux";
import AnalogClock from "./AnalogClock";

function ClockHome() {
    const currentStyle: string = useSelector(
        (state: any) => state.clockStyle.currentStyle
    );

    return (
        <>
            {currentStyle === "Analog" && <AnalogClock />}
            {currentStyle === "Digital" && <DigitalClock />}
        </>
    );
}

export default ClockHome;
