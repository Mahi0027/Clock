import React, { useEffect, useRef, useState } from "react";
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
    const timerAudio = Array.from(
        { length: stateData.allTimerSounds.length },
        useRef
    );

    /* set timer Sound. */
    const handleClose = (newValue?: string) => {
        for (let i = 0; i < stateData.allTimerSounds.length; i++) {
            timerAudio[i].current.pause();
        }
        setOpen(false);
        if (newValue) {
            dispatch(setTimerSound(newValue));
        }
    };

    /* play timer ringtone. */
    const playTimerSound = (value: string) => {
        for (let i = 0; i < stateData.allTimerSounds.length; i++) {
            timerAudio[i].current.pause();
        }
        timerAudio[stateData.allTimerSounds.indexOf(value)].current.play();
    };
    return (
        <>
            {stateData.allTimerSounds.map((value: string, index: number) => {
                return (
                    <span key={index}>
                        <audio
                            ref={(e: any) => (timerAudio[index].current = e)}
                            loop
                        >
                            <source
                                src={`/sounds/alarm/${value}.mp3`}
                                type="audio/mpeg"
                            />
                        </audio>
                    </span>
                );
            })}
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
                soundFlag={true}
                playSound={playTimerSound}
            />
        </>
    );
}

export default SetSound;
