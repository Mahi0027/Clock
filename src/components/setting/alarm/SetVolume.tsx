import React, { useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";

function SetVolume() {
    const [volume, setVolume] = useState<number>(30);
    const handleChangeVolume = (event: Event, newValue: number | number[]) => {
        setVolume(newValue as number);
    };
    return (
        <ListItem sx={{ pl: 9 }}>
            <Box sx={{ width: "100vw" }}>
                <ListItemText
                    primary={
                        <Typography variant="body1">Alarm volume</Typography>
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
                        value={volume}
                        onChange={handleChangeVolume}
                    />
                    <VolumeUp />
                </Stack>
            </Box>
        </ListItem>
    );
}

export default SetVolume;
