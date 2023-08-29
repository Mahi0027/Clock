import React, { useCallback, useMemo, useState } from "react";
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

    /* JSX code under useMemo for optimization and improving performance. */
    const setGraduallyIncreaseVolumeComponent = useMemo(() => {
        const handleClose = (newValue?: string) => {
            setOpen(false);

            if (newValue) {
                setValue(newValue);
            }
        };
        return (
            <>
                <ListItemButton sx={{ pl: 9 }} onClick={() => setOpen(true)}>
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
    }, [open, value]);

    return <>{setGraduallyIncreaseVolumeComponent}</>;
}

export default SetGraduallyIncreaseVolume;
