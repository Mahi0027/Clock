import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import styles from "@/styles/components/home/alarm/index.module.scss";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    Button,
} from "@mui/material";
import ResponsiveTimePickers from "@/components/miscellaneous/ResponsiveTimePickers";
import AlarmView from "@/components/home/alarm/AlarmView";
import { useDispatch, useSelector } from "react-redux";
import { setAlarm } from "@/redux";

function AlarmHome() {
    const stateData = useSelector((state: any) => state);
    const dispatch = useDispatch();
    // const [alarm, setAlarm] = useState<Date>(new Date());
    const [open, setOpen] = useState(false);

    const addNewAlarm = (alarmTime: Date) => {
        dispatch(setAlarm(alarmTime));
    };
    return (
        <>
            <Box>
                <AlarmView />
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
                            handleChangeTime={(value: Date | null) => {
                                value !== null && addNewAlarm(new Date(value));
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </Box>
        </>
    );
}
export default AlarmHome;
