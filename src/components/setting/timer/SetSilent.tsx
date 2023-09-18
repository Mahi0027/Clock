import React, { useCallback, useMemo, useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import CustomDialog from "@/components/miscellaneous/CustomDialog";
import { useDispatch, useSelector } from "react-redux";
import { setTimerSilentInterval } from "@/redux";
import { setTimerSilentMiddleware } from "@/middleware/setting/timer";

type stateTypes = {
    allTimerSilentIntervals: string[];
    currentSilentInterval: string;
};
function SetSilent() {
    /* The code block is using the `useSelector` hook from the `react-redux` library to select specific
    data from the Redux store. It is extracting the `allTimerSilentIntervals` and
    `currentSilentInterval` values from the `timerSetting` slice of the Redux store. */
    const {
        allTimerSilentIntervals,
        currentSilentInterval,
    }: stateTypes = useSelector((state: any) => ({
        allTimerSilentIntervals: state.timerSetting.allTimerSilentIntervals,
        currentSilentInterval: state.timerSetting.currentSilentInterval,
    }));
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    /* The `handleClose` function is a callback function that is created using the `useCallback` hook.
    It is used to handle the closing of the dialog component and update the timer silent interval
    value. */
    const handleClose = useCallback(
        async (newValue?: string) => {
            setOpen(false);
            if (newValue) {
                (await setTimerSilentMiddleware(newValue))(dispatch);
            }
        },
        [dispatch]
    );

    /* The `setSilentComponent` constant is using the `useMemo` hook to memoize the rendering of a JSX
    component. */
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
