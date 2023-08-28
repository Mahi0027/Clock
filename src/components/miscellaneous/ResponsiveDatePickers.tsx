import React, { memo, useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

export interface ResponsiveDatePickersProps {
    action: () => void;
    handleChangeDate: (value: Date | null) => void;
}
function ResponsiveDatePickers({
    action,
    handleChangeDate,
}: ResponsiveDatePickersProps) {
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
            <StaticDatePicker
                orientation={isPortrait ? "portrait" : "landscape"}
                sx={{ overflowY: "auto" }}
                onAccept={(value: Date | null) => {
                    handleChangeDate(value);
                }}
                onClose={action}
                disablePast
            />
        </LocalizationProvider>
    );
}

export default memo(ResponsiveDatePickers);
