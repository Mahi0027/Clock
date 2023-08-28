import React, { memo, useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";

export interface ResponsiveTimePickersProps {
    action: () => void;
    handleChangeTime: (value: Date | null) => void;
}
function ResponsiveTimePickers({
    action,
    handleChangeTime,
}: ResponsiveTimePickersProps) {
    const [isPortrait, setIsPortrait] = useState<boolean>(
        window.matchMedia("(orientation: portrait)").matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia("(orientation: portrait)");

        const handleOrientationChange = (e: any) => {
            setIsPortrait(e.matches);
        };

        mediaQuery.addListener(handleOrientationChange);

        // Clean up the listener when the component is unmounted
        return () => {
            mediaQuery.removeListener(handleOrientationChange);
        };
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticTimePicker
                orientation={isPortrait ? "portrait" : "landscape"}
                sx={{ overflowY: "auto" }}
                onAccept={(value: Date | null) => {
                    handleChangeTime(value);
                }}
                onClose={action}
                ampm={true}
                openTo="hours"
            />
        </LocalizationProvider>
    );
}

export default memo(ResponsiveTimePickers);
