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
import { setCurrentAlarmVolumeMiddleware } from "@/middleware/setting/alarm/volume";

function SetVolume() {
    /* The code block is using the `useSelector` hook from the `react-redux` library to select specific
    values from the Redux store. It is extracting the `minValue`, `maxValue`, and `currentValue`
    properties from the `state.alarmVolume` object in the Redux store. */
    const {
        minValue,
        maxValue,
        currentValue,
    }: initialStatesTypes = useSelector((state: any) => ({
        minValue: state.alarmVolume.minValue,
        maxValue: state.alarmVolume.maxValue,
        currentValue: state.alarmVolume.currentValue,
    }));
    const dispatch = useDispatch();

    /* The `useMemo` hook is used to memoize the result of a function so that it is only recomputed
    when its dependencies change. In this case, the `useMemo` hook is used to optimize and improve
    performance by memoizing the JSX code that represents the `SetVolume` component. */
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
                            onChange={async (
                                event: Event,
                                newValue: number | number[]
                            ) =>
                                (
                                    await setCurrentAlarmVolumeMiddleware(
                                        newValue
                                    )
                                )(dispatch)
                            }
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
