import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import dayjs from "dayjs";
export interface ResponsiveTimePickersProps {
    action: () => void;
    handleChangeTime: (value: Date) => void;
}
export default function ResponsiveTimePickers({
    action,
    handleChangeTime,
}: ResponsiveTimePickersProps) {
    const [isPortrait, setIsPortrait] = useState(
        window.matchMedia("(orientation: portrait)").matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia("(orientation: portrait)");

        const handleOrientationChange = (e) => {
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
                onAccept={(value) => {
                    handleChangeTime(value);
                }}
                onClose={action}
                ampm={true}
                openTo="hours"
            />
        </LocalizationProvider>
    );
}
