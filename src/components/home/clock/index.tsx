import React, { useMemo } from "react";
import DigitalClock from "./DigitalClock";
import { useSelector } from "react-redux";
import AnalogClock from "./AnalogClock";

function ClockHome() {
    const currentStyle: string = useSelector(
        (state: any) => state.clockStyle.currentStyle
    );

    const clockComponent = useMemo(() => {
        if (currentStyle === "Analog") {
            return <AnalogClock />;
        }
        if (currentStyle === "Digital") {
            return <DigitalClock />;
        }
        return null;
    }, [currentStyle]);

    return <>{clockComponent}</>;
}

export default ClockHome;
