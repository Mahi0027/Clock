import React, { useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import CustomDialog from "@/components/miscellaneous/CustomDialog";

const options = [
    "Never",
    "1 minute",
    "5 minutes",
    "10 minutes",
    "15 minutes",
    "20 minutes",
    "25 minutes",
];
function SetSilent() {
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
                        <Typography variant="body1">Silent after</Typography>
                    }
                    secondary={value}
                />
            </ListItemButton>
            <CustomDialog
                id="silent-after"
                title="Silent after"
                data={options}
                keepMounted
                value={value}
                open={open}
                onClose={handleClose}
            />
        </>
    );
}

export default SetSilent;
