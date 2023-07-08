import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

function SetWeekOn() {
    return (
        <ListItemButton
            sx={{ pl: 9 }}
            // onClick={handleClickOpen}
        >
            <ListItemText
                primary={<Typography variant="body1">Start week on</Typography>}
                secondary="Sunday"
            />
        </ListItemButton>
    );
}

export default SetWeekOn;
