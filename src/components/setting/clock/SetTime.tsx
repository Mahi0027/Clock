import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

function SetTime() {
    return (
        <ListItemButton
            sx={{ pl: 9 }}
            // onClick={handleClickOpen}
        >
            <ListItemText
                primary={
                    <Typography variant="body1">Change date & time</Typography>
                }
            />
        </ListItemButton>
    );
}

export default SetTime;
