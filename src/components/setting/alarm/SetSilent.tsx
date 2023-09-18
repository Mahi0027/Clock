import React, { useCallback, useEffect, useMemo, useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import CustomDialog from "@/components/miscellaneous/CustomDialog";
import { useDispatch, useSelector } from "react-redux";
import { initialStatesTypes } from "@/redux/features/setting/alarm/silent/silentReducer";
import { setCurrentAlarmSilentMiddleware } from "@/middleware/setting/alarm/silent";

function SetSilent() {
    /* The code is using the `useSelector` hook from the `react-redux` library to select specific state
    values from the Redux store. It is extracting the `allSilentIntervals` and
    `currentSilentInterval` values from the `state.alarmSilent` slice of the Redux store and
    assigning them to the variables `allSilentIntervals` and `currentSilentInterval` respectively. */
    const {
        allSilentIntervals,
        currentSilentInterval,
    }: initialStatesTypes = useSelector((state: any) => ({
        allSilentIntervals: state.alarmSilent.allSilentIntervals,
        currentSilentInterval: state.alarmSilent.currentSilentInterval,
    }));
    const dispatch = useDispatch();
    const [open, setOpen] = useState<boolean>(false);

    /* The `handleClose` function is a callback function that is used to handle the closing of the
    dialog component. It takes an optional `value` parameter, which represents the selected value
    from the dialog. */
    const handleClose = useCallback(
        async (value?: string) => {
            setOpen(false);
            if (value) {
                (await setCurrentAlarmSilentMiddleware(value))(dispatch);
            }
        },
        [dispatch]
    );

    /* The `useMemo` hook is used to memoize the result of a computation. In this case, the
    `setSilentComponent` variable is assigned the result of the `useMemo` hook. */
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
                    data={allSilentIntervals}
                    keepMounted
                    value={currentSilentInterval}
                    open={open}
                    onClose={handleClose}
                />
            </>
        );
    }, [allSilentIntervals, currentSilentInterval, handleClose, open]);

    return <>{setSilentComponent}</>;
}

export default SetSilent;
