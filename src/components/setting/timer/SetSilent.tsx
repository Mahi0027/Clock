import React, { useCallback, useMemo, useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import CustomDialog from "@/components/miscellaneous/CustomDialog";
import { useDispatch, useSelector } from "react-redux";
import { setTimerSilentInterval } from "@/redux";

type stateTypes = {
    allTimerSilentIntervals: string[];
    currentSilentInterval: string;
};
function SetSilent() {
    const { allTimerSilentIntervals, currentSilentInterval }: stateTypes =
        useSelector((state: any) => ({
            allTimerSilentIntervals: state.timerSetting.allTimerSilentIntervals,
            currentSilentInterval: state.timerSetting.currentSilentInterval,
        }));
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleClose = useCallback(
        (newValue?: string) => {
            setOpen(false);
            if (newValue) {
                dispatch(setTimerSilentInterval(newValue));
            }
        },
        [dispatch]
    );

    /* JSX code under useMemo for optimization and improving performance. */
    const setSilentComponent = useMemo(() => {
        return (
            <>
                <ListItemButton sx={{ pl: 9 }} onClick={() => setOpen(true)}>
                    <ListItemText
                        primary={
                            <Typography variant="body1">
                                Silent after
                            </Typography>
                        }
                        secondary={currentSilentInterval}
                    />
                </ListItemButton>
                <CustomDialog
                    id="silent-after"
                    title="Silent after"
                    data={allTimerSilentIntervals}
                    keepMounted
                    value={currentSilentInterval}
                    open={open}
                    onClose={handleClose}
                />
            </>
        );
    }, [allTimerSilentIntervals, currentSilentInterval, handleClose, open]);

    return <>{setSilentComponent}</>;
}

export default SetSilent;
