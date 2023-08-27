import React, { useCallback, useEffect, useRef, useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import CustomDialog from "@/components/miscellaneous/CustomDialog";
import { initialStatesTypes } from "@/redux/features/setting/timer/reducer";
import { useDispatch, useSelector } from "react-redux";
import { getAllTimerSounds, setTimerSound } from "@/redux";

type stateTypes = {
    allTimerSounds: string[];
    currentTimerSound: string;
};
function SetSound() {
    const { allTimerSounds, currentTimerSound }: stateTypes = useSelector(
        (state: any) => ({
            allTimerSounds: state.timerSetting.allTimerSounds,
            currentTimerSound: state.timerSetting.currentTimerSound,
        })
    );
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const timerAudio = Array.from({ length: allTimerSounds.length }, useRef);

    /* set timer Sound. */
    const handleClose = useCallback(
        (newValue?: string) => {
            for (let i = 0; i < allTimerSounds.length; i++) {
                timerAudio[i].current.pause();
            }
            setOpen(false);
            if (newValue) {
                dispatch(setTimerSound(newValue));
            }
        },
        [dispatch, allTimerSounds, timerAudio]
    );

    /* play timer ringtone. */
    const playTimerSound = useCallback(
        (value: string) => {
            for (let i = 0; i < allTimerSounds.length; i++) {
                timerAudio[i].current.pause();
            }
            timerAudio[allTimerSounds.indexOf(value)].current.play();
        },
        [dispatch, timerAudio]
    );

    return (
        <>
            {allTimerSounds.map((value: string, index: number) => {
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
                    secondary={currentTimerSound}
                />
            </ListItemButton>
            <CustomDialog
                id="timer-sound"
                title="Timer sound"
                data={allTimerSounds}
                keepMounted
                value={currentTimerSound}
                open={open}
                onClose={handleClose}
                soundFlag={true}
                playSound={playTimerSound}
            />
        </>
    );
}

export default SetSound;
