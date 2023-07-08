import React, { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Typography from "@mui/material/Typography";
import SetStyle from "./SetStyle";
import SetSeconds from "./SetSeconds";
import SetTimeZone from "./SetTimeZone";
import SetTime from "./SetTime";

function ClockSetting() {
    const [open, setOpen] = useState<boolean>(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <AccessTimeIcon color="info" />
                </ListItemIcon>
                <ListItemText
                    primary={<Typography variant="h6">Clock</Typography>}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <SetStyle />
                    <SetSeconds />
                    <SetTimeZone />
                    <SetTime />
                </List>
            </Collapse>
        </>
    );
}

export default ClockSetting;
