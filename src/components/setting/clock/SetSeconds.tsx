import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";

function SetSeconds() {
    const [check, setCheck] = useState<boolean>(true);
    const handleToggle = () => {
        setCheck(!check);
    };
    return (
        <ListItemButton sx={{ pl: 9 }} onChange={handleToggle} disableRipple>
            <ListItemText
                primary={
                    <Typography variant="body1">
                        Display time with seconds
                    </Typography>
                }
                secondary="Ex. HH:MM:SS"
            />
            <Switch edge="end" checked={check} />
        </ListItemButton>
    );
}

export default SetSeconds;
