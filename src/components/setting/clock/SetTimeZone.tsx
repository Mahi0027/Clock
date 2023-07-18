import React, { useState, useEffect } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import CustomDialog from "@/components/miscellaneous/CustomDialog";
import { useDispatch, useSelector } from "react-redux";
import { initialStatesTypes } from "@/redux/features/setting/clock/timeZone/timeZoneReducer";
import { getAllTimeZones, setTimeZone } from "@/redux";

function SetTimeZone() {
    const [open, setOpen] = useState(false);
    const stateData: initialStatesTypes = useSelector(
        (state: any) => state.timeZone
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTimeZones());
    }, [dispatch]);

    const handleClose = (newValue?: string) => {
        setOpen(false);
        if (newValue) {
            dispatch(setTimeZone(newValue));
        }
    };
    return (
        <>
            <ListItemButton sx={{ pl: 9 }} onClick={() => setOpen(true)}>
                <ListItemText
                    primary={
                        <Typography variant="body1">Home time zone</Typography>
                    }
                    secondary={stateData.currentTimeZone}
                />
            </ListItemButton>
            <CustomDialog
                id="time-zone-menu"
                title="Home time zone"
                data={stateData.allTimeZones}
                keepMounted
                value={stateData.currentTimeZone}
                open={open}
                onClose={handleClose}
            />
        </>
    );
}

export default SetTimeZone;
