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
import { initialStatesTypes } from "@/redux/features/setting/alarm/volume/volumeReducer";
import { setVolume } from "@/redux";

function SetVolume() {
    const { minValue, maxValue, currentValue }: initialStatesTypes =
        useSelector((state: any) => ({
            minValue: state.alarmVolume.minValue,
            maxValue: state.alarmVolume.maxValue,
            currentValue: state.alarmVolume.currentValue,
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
                                Alarm volume
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
                            value={currentValue}
                            min={minValue}
                            max={maxValue}
                            onChange={(
                                event: Event,
                                newValue: number | number[]
                            ) => dispatch(setVolume(newValue as number))}
                            valueLabelDisplay="auto"
                        />
                        <VolumeUp />
                    </Stack>
                </Box>
            </ListItem>
        );
    }, [currentValue, dispatch, maxValue, minValue]);

    return <>{setVolumeComponent}</>;
}

export default SetVolume;
