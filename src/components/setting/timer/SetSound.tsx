import React, { useEffect, useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import CustomDialog from "@/components/miscellaneous/CustomDialog";
import { initialStatesTypes } from "@/redux/features/setting/timer/reducer";
import { useDispatch, useSelector } from "react-redux";
import { getAllTimerSounds, setTimerSound } from "@/redux";

function SetSound() {
    const stateData: initialStatesTypes = useSelector(
        (state: any) => state.timerSetting
    );
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    // const [value, setValue] = useState(options[2]);

    useEffect(() => {
      dispatch(getAllTimerSounds());
    }, [dispatch])

    useEffect(() => {
        console.log(stateData);
    }, [stateData]);
    
    
    const handleClose = (newValue?: string) => {
        setOpen(false);
        if (newValue) {
            dispatch(setTimerSound(newValue));
        }
    };
    return (
        <>
            <ListItemButton sx={{ pl: 9 }} onClick={() => setOpen(true)}>
                <ListItemText
                    primary={
                        <Typography variant="body1">Timer sound</Typography>
                    }
                    secondary={stateData.currentTimerSound}
                />
            </ListItemButton>
            <CustomDialog
                id="timer-sound"
                title="Timer sound"
                data={stateData.allTimerSounds}
                keepMounted
                value={stateData.currentTimerSound}
                open={open}
                onClose={handleClose}
            />
        </>
    );
}

export default SetSound;
