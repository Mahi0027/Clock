import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import styles from "@/styles/components/home/alarm/index.module.scss";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import ResponsiveTimePickers from "@/components/miscellaneous/ResponsiveTimePickers";

function AlarmHome() {
    const [alarm, setAlarm] = useState<Date>(new Date());
    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log("set Alarm Time is: ", alarm);
    }, [alarm]);

    return (
        <>
            <Fab
                className={styles.addAlarmButton}
                color="secondary"
                aria-label="add"
                onClick={() => setOpen(true)}
            >
                <AddIcon />
            </Fab>
            <Dialog open={open}>
                <DialogTitle>Set Alarm</DialogTitle>
                <DialogContent className={styles.dialogBoxContent} dividers>
                    <ResponsiveTimePickers
                        action={() => setOpen(false)}
                        handleChangeTime={(value: Date) =>
                            setAlarm(new Date(value))
                        }
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
export default AlarmHome;
