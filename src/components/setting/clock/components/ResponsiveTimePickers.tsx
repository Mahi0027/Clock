import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
export interface ResponsiveTimePickersProps {
    action: () => void;
    handleChangeTime: (value: Date) => void;
}
export default function ResponsiveTimePickers({
    action,
    handleChangeTime,
}: ResponsiveTimePickersProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticTimePicker
                onClose={action}
                onAccept={(value) => {
                    handleChangeTime(value);
                }}
            />
        </LocalizationProvider>
    );
}
