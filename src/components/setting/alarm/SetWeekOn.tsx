import React, { useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import CustomDialog from "@/components/miscellaneous/CustomDialog";

const options = ["Sunday", "Friday", "Saturday", "Monday"];

function SetWeekOn() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(options[0]);
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
                        <Typography variant="body1">Start week on</Typography>
                    }
                    secondary={value}
                />
            </ListItemButton>
            <CustomDialog
                id="start-week-on"
                title="Start week on"
                data={options}
                keepMounted
                value={value}
                open={open}
                onClose={handleClose}
            />
        </>
    );
}

export default SetWeekOn;
