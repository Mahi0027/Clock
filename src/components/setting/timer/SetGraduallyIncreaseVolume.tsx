import React, { useCallback, useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import CustomDialog from "@/components/miscellaneous/CustomDialog";

const options = ["Never"];
for (let i = 5; i <= 60; i = i + 5) {
    options.push(i + " minutes");
}

function SetGraduallyIncreaseVolume() {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState(options[2]);

    const handleClickListItem = () => {
        setOpen(true);
    };

    const handleClose = useCallback(
        (newValue?: string) => {
            setOpen(false);

            if (newValue) {
                setValue(newValue);
            }
        },
        [open, value]
    );

    return (
        <>
            <ListItemButton sx={{ pl: 9 }} onClick={handleClickListItem}>
                <ListItemText
                    primary={
                        <Typography variant="body1">
                            Gradually increase volume
                        </Typography>
                    }
                    secondary={value}
                />
            </ListItemButton>
            <CustomDialog
                id="gradually-increase-volume"
                title="Gradually increase volume"
                data={options}
                keepMounted
                value={value}
                open={open}
                onClose={handleClose}
            />
        </>
    );
}

export default SetGraduallyIncreaseVolume;
