import React, { useState, useEffect } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import CustomDialog from "@/components/miscellaneous/CustomDialog";

const options = [
    "None",
    "Atria",
    "Callisto",
    "Dione",
    "Ganymede",
    "Hangouts Call",
    "Luna",
    "Oberon",
    "Phobos",
    "Pyxis",
    "Sedna",
    "Titania",
    "Triton",
    "Umbriel",
];
function SetTimeZone() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("Dione");
    const handleClickListItem = () => {
        setOpen(true);
    };
    const handleClose = (newValue?: string) => {
        setOpen(false);

        if (newValue) {
            setValue(newValue);
        }
    };

    useEffect(() => {
        console.log(value);
        
    },[value])
    return (
        <>
            <ListItemButton sx={{ pl: 9 }} onClick={handleClickListItem}>
                <ListItemText
                    primary={
                        <Typography variant="body1">Home time zone</Typography>
                    }
                    secondary={value}
                />
            </ListItemButton>
            <CustomDialog
                id="time-zone-menu"
                title="Home time zone"
                data={options}
                keepMounted
                value={value}
                open={open}
                onClose={handleClose}
            />
        </>
    );
}

export default SetTimeZone;
