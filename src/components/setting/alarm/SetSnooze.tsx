import React, { useCallback, useEffect, useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import CustomDialog from "@/components/miscellaneous/CustomDialog";
import { useDispatch, useSelector } from "react-redux";
import { initialStatesTypes } from "@/redux/features/setting/alarm/snooze/snoozeReducer";
import { getAllSnoozeIntervals, setSnoozeInterval } from "@/redux";

function SetSnooze() {
    const [open, setOpen] = useState<boolean>(false);
    const { allSnoozeIntervals, currentSnoozeInterval }: initialStatesTypes =
        useSelector((state: any) => ({
            allSnoozeIntervals: state.alarmSnooze.allSnoozeIntervals,
            currentSnoozeInterval: state.alarmSnooze.currentSnoozeInterval,
        }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSnoozeIntervals());
    }, [dispatch]);

    const handleClose = useCallback(
        (value?: string) => {
            setOpen(false);
            if (value) {
                dispatch(setSnoozeInterval(value));
            }
        },
        [dispatch, open]
    );

    return (
        <>
            <ListItemButton sx={{ pl: 9 }} onClick={() => setOpen(true)}>
                <ListItemText
                    primary={
                        <Typography variant="body1">Snooze length</Typography>
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
}

export default SetSnooze;
