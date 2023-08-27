import React, { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import TuneIcon from '@mui/icons-material/Tune';
import SetDarkMode from "./SetDarkMode";

function PersonalizeSetting() {
    const [open, setOpen] = useState<boolean>(true);

    const handleClick = () => {
        setOpen(!open);
    };
    
    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <TuneIcon />
                </ListItemIcon>
                <ListItemText
                    primary={<Typography variant="h6">Personalize</Typography>}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <SetDarkMode />
                </List>
            </Collapse>
        </>
    );
}

export default PersonalizeSetting;
