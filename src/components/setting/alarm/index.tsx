import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Stack from "@mui/material/Stack";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import SetSilent from "./SetSilent";
import SetSnooze from "./SetSnooze";
import SetVolume from "./SetVolume";
import SetWeekOn from "./SetWeekOn";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { initialStatesTypes } from "@/redux/features/setting/personalize/theme/themeReducer";

function AlarmSetting() {
    const [open, setOpen] = useState<boolean>(true);
    const [showSeconds, setShowSeconds] = useState<boolean>(true);
    const stateData:initialStatesTypes = useSelector((state: any) => state.theme);
    
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <AccessAlarmIcon />
                </ListItemIcon>
                <ListItemText
                    primary={<Typography variant="h6">Alarm</Typography>}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto">
                <List component="div" disablePadding>
                    <SetSilent />
                    <SetSnooze />
                    <SetVolume />
                    <SetWeekOn />
                </List>
            </Collapse>
        </>
    );
}

export default AlarmSetting;
