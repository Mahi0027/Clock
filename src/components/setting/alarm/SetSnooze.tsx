import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

function SetSnooze() {
    return (
        <ListItemButton
            sx={{ pl: 9 }}
            // onClick={handleClickOpen}
        >
            <ListItemText
                primary={<Typography variant="body1">Snooze length</Typography>}
                secondary="10 minutes"
            />
        </ListItemButton>
    );
}

export default SetSnooze;
