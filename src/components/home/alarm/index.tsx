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
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [scrollToTop, setScrollToTop] = useState(false);

    const addNewAlarm = (alarmTime: Date) => {
        dispatch(setAlarm(alarmTime));
        setScrollToTop(true);
    };

    const closeScrollToTop = () => {
        setScrollToTop(false);
    };
    return (
        <>
            <Box>
                <AlarmView
                    scrollToTop={scrollToTop}
                    closeScrollToTop={closeScrollToTop}
                />
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
