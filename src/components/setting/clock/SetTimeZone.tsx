import React, { useState, useEffect, useCallback, useMemo } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import CustomDialog from "@/components/miscellaneous/CustomDialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchTimeZone } from "@/redux";
import { setCurrentTimeZoneMiddleware } from "@/middleware/setting/clock/timeZone";

type stateTypes = {
    allTimeZones: string[];
    currentTimeZone: string;
};
function SetTimeZone() {
    const [open, setOpen] = useState<boolean>(false);
    const { allTimeZones, currentTimeZone }: stateTypes = useSelector(
        (state: any) => ({
            allTimeZones: state.timeZone.allTimeZones,
            currentTimeZone: state.timeZone.currentTimeZone,
        })
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTimeZone());
    }, [dispatch]);

    const handleClose = useCallback(
        (newValue?: string) => {
            setOpen(false);
            if (newValue) {
                // dispatch(setTimeZone(newValue));
                dispatch(setCurrentTimeZoneMiddleware(newValue));
            }
        },
        [dispatch]
    );

    const setTimeZoneComponent = useMemo(() => {
        return (
            <>
                <ListItemButton sx={{ pl: 9 }} onClick={() => setOpen(true)}>
                    <ListItemText
                        primary={
                            <Typography variant="body1">
                                Home time zone
                            </Typography>
                        }
                        secondary={currentTimeZone}
                    />
                </ListItemButton>
                <CustomDialog
                    id="clock-theme"
                    title="Clock Theme"
                    data={allTimeZones}
                    keepMounted
                    value={currentTimeZone}
                    open={open}
                    onClose={handleClose}
                />
            </>
        );
    }, [allTimeZones, currentTimeZone, handleClose, open]);

    return <>{setTimeZoneComponent}</>;
}

export default SetTimeZone;
