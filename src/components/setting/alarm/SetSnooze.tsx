import React, { useEffect, useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import CustomDialog from "@/components/miscellaneous/CustomDialog";
import { useDispatch, useSelector } from "react-redux";
import { initialStatesTypes } from "@/redux/features/setting/alarm/snooze/snoozeReducer";
import { getAllSnoozeIntervals, setSnoozeInterval } from "@/redux";

function SetSnooze() {
    const [open, setOpen] = useState(false);
    const stateData: initialStatesTypes = useSelector(
        (state: any) => state.alarmSnooze
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSnoozeIntervals());
    }, [dispatch]);

    // useEffect(() => {
    //     console.log(Number(stateData.currentSnoozeInterval.substring(0, 2)));
    // }, [stateData]);
    
    const handleClose = (newValue?: string) => {
        setOpen(false);
        if (newValue) {
            dispatch(setSnoozeInterval(newValue));
        }
    };
    return (
        <>
            <ListItemButton sx={{ pl: 9 }} onClick={() => setOpen(true)}>
                <ListItemText
                    primary={
                        <Typography variant="body1">Snooze length</Typography>
                    }
                    secondary={stateData.currentSnoozeInterval}
                />
            </ListItemButton>
            <CustomDialog
                id="time-zone-menu"
                title="Snooze length"
                data={stateData.allSnoozeIntervals}
                keepMounted
                value={stateData.currentSnoozeInterval}
                open={open}
                onClose={handleClose}
            />
        </>
    );
}

export default SetSnooze;
