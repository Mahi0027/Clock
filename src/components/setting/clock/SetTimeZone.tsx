import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

function SetTimeZone() {
    return (
        <ListItemButton
            sx={{ pl: 9 }}
            // onClick={handleClickOpen}
        >
            <ListItemText
                primary={
                    <Typography variant="body1">Home time zone</Typography>
                }
                secondary="(GMT+5:30) Kolkata"
            />
        </ListItemButton>
    );
}

export default SetTimeZone;
