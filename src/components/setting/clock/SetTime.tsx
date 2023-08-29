import React, { useState, useCallback, useMemo } from "react";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import ResponsiveTimePickers from "@/components/miscellaneous/ResponsiveTimePickers";

function SetTime() {
    const [time, setTime] = useState<Date>(new Date());
    const [open, setOpen] = useState<boolean>(false);

    /* JSX code under useMemo for optimization and improving performance. */
    const setTimeComponent = useMemo(() => {
        const handleChangeTime = (value: Date | null) => {
            if (value !== null) setTime(new Date(value));
        };
        return (
            <>
                <ListItemButton sx={{ pl: 9 }} onClick={() => setOpen(true)}>
                    <ListItemText
                        primary={
                            <Typography variant="body1">Change time</Typography>
                        }
                    />
                </ListItemButton>
                <Dialog open={open}>
                    <DialogTitle>Change Time</DialogTitle>
                    <DialogContent
                        dividers
                        sx={{
                            display: "flex",
                            textAlign: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                        }}
                    >
                        <ResponsiveTimePickers
                            action={() => setOpen(false)}
                            handleChangeTime={handleChangeTime}
                        />
                    </DialogContent>
                </Dialog>
            </>
        );
    }, [open]);

    return <>{setTimeComponent}</>;
}

export default SetTime;
