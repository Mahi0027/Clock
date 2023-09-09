import React, { useMemo } from "react";
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
import { setTimerVolumeMiddleware } from "@/middleware/setting/timer";

type stateTypes = {
    timerMinVolume: number;
    timerMaxVolume: number;
    timerCurrentVolume: number;
};

function SetVolume() {
    const { timerMinVolume, timerMaxVolume, timerCurrentVolume }: stateTypes =
        useSelector((state: any) => ({
            timerMinVolume: state.timerSetting.timerMinVolume,
            timerMaxVolume: state.timerSetting.timerMaxVolume,
            timerCurrentVolume: state.timerSetting.timerCurrentVolume,
        }));
    const dispatch = useDispatch();

    /* JSX code under useMemo for optimization and improving performance. */
    const setVolumeComponent = useMemo(() => {
        return (
            <ListItem sx={{ pl: 9 }}>
                <Box sx={{ width: "100vw" }}>
                    <ListItemText
                        primary={
                            <Typography variant="body1">
                                Timer volume
                            </Typography>
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
                            value={timerCurrentVolume}
                            min={timerMinVolume}
                            max={timerMaxVolume}
                            onChange={(
                                event: Event,
                                newValue: number | number[]
                            ) =>
                                dispatch(
                                    setTimerVolumeMiddleware(newValue as number)
                                )
                            }
                            valueLabelDisplay="auto"
                        />
                        <VolumeUp />
                    </Stack>
                </Box>
            </ListItem>
        );
    }, [dispatch, timerCurrentVolume, timerMaxVolume, timerMinVolume]);
    return <>{setVolumeComponent}</>;
}

export default SetVolume;
