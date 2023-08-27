import React, { useCallback, useEffect, useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import CustomDialog from "@/components/miscellaneous/CustomDialog";
import { useDispatch, useSelector } from "react-redux";
import { initialStatesTypes } from "@/redux/features/setting/alarm/silent/silentReducer";
import { getAllSilentIntervals, setSilentInterval } from "@/redux";

function SetSilent() {
    const { allSilentIntervals, currentSilentInterval }: initialStatesTypes =
        useSelector((state: any) => ({
            allSilentIntervals: state.alarmSilent.allSilentIntervals,
            currentSilentInterval: state.alarmSilent.currentSilentInterval,
        }));
    const dispatch = useDispatch();
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getAllSilentIntervals());
    }, [dispatch]);

    const handleClose = useCallback(
        (value?: string) => {
            setOpen(false);
            if (value) {
                dispatch(setSilentInterval(value));
            }
        },
        [dispatch]
    );

    return (
        <>
            <ListItemButton sx={{ pl: 9 }} onClick={() => setOpen(true)}>
                <ListItemText
                    primary={
                        <Typography variant="body1">Silent after</Typography>
                    }
                    secondary={currentSilentInterval}
                />
            </ListItemButton>
            <CustomDialog
                id="silent-after"
                title="Silent after"
                data={allSilentIntervals}
                keepMounted
                value={currentSilentInterval}
                open={open}
                onClose={handleClose}
            />
        </>
    );
}

export default SetSilent;
