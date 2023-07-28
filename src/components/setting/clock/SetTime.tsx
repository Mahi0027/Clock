import React, { useState, useRef, useEffect } from "react";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import ResponsiveTimePickers from "@/components/miscellaneous/ResponsiveTimePickers";

function SetTime() {
    const [time, setTime] = useState<Date>(new Date());
    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log("set Time is: ", time);
    }, [time]);

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
                        handleChangeTime={(value: Date) =>
                            setTime(new Date(value))
                        }
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default SetTime;
