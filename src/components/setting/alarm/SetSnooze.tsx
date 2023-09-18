import React, { useCallback, useEffect, useMemo, useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import CustomDialog from "@/components/miscellaneous/CustomDialog";
import { useDispatch, useSelector } from "react-redux";
import { initialStatesTypes } from "@/redux/features/setting/alarm/snooze/snoozeReducer";
import { setCurrentAlarmSnoozeMiddleware } from "@/middleware/setting/alarm/snooze";

function SetSnooze() {
    /* The code snippet is a React functional component written in TypeScript. */
    const [open, setOpen] = useState<boolean>(false);
    const {
        allSnoozeIntervals,
        currentSnoozeInterval,
    }: initialStatesTypes = useSelector((state: any) => ({
        allSnoozeIntervals: state.alarmSnooze.allSnoozeIntervals,
        currentSnoozeInterval: state.alarmSnooze.currentSnoozeInterval,
    }));
    const dispatch = useDispatch();

    /* The `handleClose` function is a callback function that is used to handle the closing of the
    dialog component. It takes an optional `value` parameter, which represents the selected snooze
    interval value. */
    const handleClose = useCallback(
        async (value?: string) => {
            setOpen(false);
            if (value) {
                (await setCurrentAlarmSnoozeMiddleware(value))(dispatch);
            }
        },
        [dispatch]
    );

    /* The `setSnoozeComponent` variable is using the `useMemo` hook to memoize the JSX code and
    optimize performance. */
    const setSnoozeComponent = useMemo(() => {
        return (
            <>
                <ListItemButton sx={{ pl: 9 }} onClick={() => setOpen(true)}>
                    <ListItemText
                        primary={
                            <Typography variant="body1">
                                Snooze length
                            </Typography>
                        }
                        secondary={currentSnoozeInterval}
                    />
                </ListItemButton>
                <CustomDialog
                    id="time-zone-menu"
                    title="Snooze length"
                    data={allSnoozeIntervals}
                    keepMounted
                    value={currentSnoozeInterval}
                    open={open}
                    onClose={handleClose}
                />
            </>
        );
    }, [allSnoozeIntervals, currentSnoozeInterval, handleClose, open]);

    return <>{setSnoozeComponent}</>;
}

export default SetSnooze;
