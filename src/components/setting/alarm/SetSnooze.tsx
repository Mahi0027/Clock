import React, { useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import CustomDialog from "@/components/miscellaneous/CustomDialog";

const options = ["Never"];
for (let i = 1; i <= 30; i++) {
    options.push(i + (i == 1 ? " minute" : " minutes"));
}
function SetSnooze() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(options[2]);
    const handleClickListItem = () => {
        setOpen(true);
    };
    const handleClose = (newValue?: string) => {
        setOpen(false);

        if (newValue) {
            setValue(newValue);
        }
    };
    return (
        <>
            <ListItemButton sx={{ pl: 9 }} onClick={handleClickListItem}>
                <ListItemText
                    primary={
                        <Typography variant="body1">Snooze length</Typography>
                    }
                    secondary={value}
                />
            </ListItemButton>
            <CustomDialog
                id="time-zone-menu"
                title="Snooze length"
                data={options}
                keepMounted
                value={value}
                open={open}
                onClose={handleClose}
            />
        </>
    );
}

export default SetSnooze;
