import React, { useEffect, useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import CustomDialog from "@/components/miscellaneous/CustomDialog";
import { useDispatch, useSelector } from "react-redux";
import { initialStatesTypes } from "@/redux/features/setting/alarm/silent/silentReducer";
import { getAllSilentIntervals, setSilentInterval } from "@/redux";

function SetSilent() {
    const stateData: initialStatesTypes = useSelector(
        (state: any) => state.silent
    );
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(getAllSilentIntervals());
    }, [dispatch]);

    const handleClose = (newValue?: string) => {
        setOpen(false);
        if (newValue) {
            dispatch(setSilentInterval(newValue));
        }
    };

    return (
        <>
            <ListItemButton sx={{ pl: 9 }} onClick={() => setOpen(true)}>
                <ListItemText
                    primary={
                        <Typography variant="body1">Silent after</Typography>
                    }
                    secondary={stateData.currentSilentInterval}
                />
            </ListItemButton>
            <CustomDialog
                id="silent-after"
                title="Silent after"
                data={stateData.allSilentIntervals}
                keepMounted
                value={stateData.currentSilentInterval}
                open={open}
                onClose={handleClose}
            />
        </>
    );
}

export default SetSilent;
