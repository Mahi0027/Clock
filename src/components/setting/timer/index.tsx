import React, { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import SetSound from "./SetSound";
import SetGraduallyIncreaseVolume from "./SetGraduallyIncreaseVolume";
import SetVibration from "./SetVibration";

function TimerSetting() {
    const [open, setOpen] = useState<boolean>(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <TimerOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                    primary={<Typography variant="h6">Timer</Typography>}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <SetSound />
                  <SetGraduallyIncreaseVolume />
                  <SetVibration />
                </List>
            </Collapse>
        </>
    );
}

export default TimerSetting;
