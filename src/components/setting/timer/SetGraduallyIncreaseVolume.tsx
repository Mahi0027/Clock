import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

function SetGraduallyIncreaseVolume() {
    return (
        <ListItemButton
            sx={{ pl: 9 }}
            // onClick={handleClickOpen}
        >
            <ListItemText
                primary={<Typography variant="body1">Gradually increase volume</Typography>}
                secondary="Never"
            />
        </ListItemButton>
    );
}

export default SetGraduallyIncreaseVolume;
