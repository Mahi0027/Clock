import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

function SetSound() {
    return (
        <ListItemButton
            sx={{ pl: 9 }}
            // onClick={handleClickOpen}
        >
            <ListItemText
                primary={
                    <Typography variant="body1">Timer sound</Typography>
                }
                secondary="Timer Expired"
            />
        </ListItemButton>
    );
}

export default SetSound;
