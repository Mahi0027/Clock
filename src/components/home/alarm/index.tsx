import React, { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import styles from "@/styles/components/home/alarm/index.module.scss";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import ResponsiveTimePickers from "@/components/miscellaneous/ResponsiveTimePickers";
import AlarmView from "@/components/home/alarm/AlarmView";
import { useDispatch, useSelector } from "react-redux";
import { setAlarm } from "@/redux";
import { setAlarmMiddleware } from "@/middleware/home/alarm";
import { initialStatesTypes } from "@/database/indexedDB/home/alarm";

const addAlarmButtonStyle = {
    position: "fixed",
    margin: "auto",
    left: "50%",
    maxWidth: "100px",
    maxHeight: "100px",
    width: "20vw",
    height: "20vw",
    bottom: "10vh",
    transform: "translateX(-50%)",
    "@media (orientation: landscape)": {
        width: "20vh",
        height: "20vh",
        left: "85%",
        top: "50%",
        transform: "translate(-50%, -50%)",
    },
};
function AlarmHome() {
    /* The code snippet is using React Redux hooks to interact with the Redux store. */
    const statesDetails = useSelector((state: any) => state.alarm);
    const dispatch = useDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const [scrollToTop, setScrollToTop] = useState<boolean>(false);

    /* The `getStateData` constant is a memoized callback function created using the `useCallback`
    hook. It returns the value of the `statesDetails` variable. */
    const getStateData = useCallback(() => {
        return statesDetails;
    }, [statesDetails]);

    /* The `addNewAlarm` function is a callback function created using the `useCallback` hook. It is
    used to add a new alarm by setting the alarm time and dispatching an action to update the alarm
    state in the Redux store. */
    const addNewAlarm = useCallback(
        async (alarmTime: Date) => {
            const currentTime = new Date();
            /* set alarm for next day if chosen time is gone today. */
            if (currentTime.getTime() > alarmTime.getTime()) {
                alarmTime.setDate(alarmTime.getDate() + 1);
            }
            await setAlarmMiddleware(alarmTime, getStateData)(dispatch);
            setScrollToTop(true);
        },
        [dispatch, getStateData]
    );

    /* The `alarmHomeComponent` constant is using the `useMemo` hook to memoize the rendering of a JSX
    component. */
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
                        sx={ addAlarmButtonStyle }
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
