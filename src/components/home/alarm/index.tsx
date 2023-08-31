import React, { useCallback, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import styles from "@/styles/components/home/alarm/index.module.scss";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import ResponsiveTimePickers from "@/components/miscellaneous/ResponsiveTimePickers";
import AlarmView from "@/components/home/alarm/AlarmView";
import { useDispatch } from "react-redux";
import { setAlarm } from "@/redux";

function AlarmHome() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const [scrollToTop, setScrollToTop] = useState<boolean>(false);

    const addNewAlarm = useCallback(
        (alarmTime: Date) => {
            const currentTime = new Date();
            /* set alarm for next day if chosen time is gone today. */
            if (currentTime.getTime() > alarmTime.getTime()) {
                alarmTime.setDate(alarmTime.getDate() + 1);
            }
            dispatch(setAlarm(alarmTime));
            setScrollToTop(true);
        },
        [dispatch]
    );

    /* JSX code under useMemo for optimization and improving performance. */
    const alarmHomeComponent = useMemo(() => {
        return (
            <>
                <Box>
                    <AlarmView
                        scrollToTop={scrollToTop}
                        closeScrollToTop={() => setScrollToTop(false)}
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
                        <DialogContent
                            className={styles.dialogBoxContent}
                            dividers
                        >
                            <ResponsiveTimePickers
                                action={() => setOpen(false)}
                                handleChangeTime={(value: Date | null) => {
                                    value !== null &&
                                        addNewAlarm(new Date(value));
                                }}
                            />
                        </DialogContent>
                    </Dialog>
                </Box>
            </>
        );
    }, [addNewAlarm, setScrollToTop, open, scrollToTop]);

    return <>{alarmHomeComponent}</>;
}
export default AlarmHome;
