import React, { useEffect } from "react";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import { useDispatch, useSelector } from "react-redux";
import { setTimerVolume } from "@/redux";
import { initialStatesTypes } from "@/redux/features/setting/timer/reducer";

function SetVolume() {
    const stateData: initialStatesTypes = useSelector(
        (state: any) => state.timerSetting
    );
    const dispatch = useDispatch();

    return (
        <ListItem sx={{ pl: 9 }}>
            <Box sx={{ width: "100vw" }}>
                <ListItemText
                    primary={
                        <Typography variant="body1">Timer volume</Typography>
                    }
                />
                <Stack
                    spacing={2}
                    direction="row"
                    sx={{ mb: 1 }}
                    alignItems="center"
                >
                    <VolumeDown />
                    <Slider
                        aria-label="Volume"
                        value={stateData.timerCurrentVolume}
                        min={stateData.timerMinVolume}
                        max={stateData.timerMaxVolume}
                        onChange={(event: Event, newValue: number | number[]) =>
                            dispatch(setTimerVolume(newValue as number))
                        }
                        valueLabelDisplay="auto"
                    />
                    <VolumeUp />
                </Stack>
            </Box>
        </ListItem>
    );
}

export default SetVolume;
