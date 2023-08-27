import { ListItemButton, ListItemText, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import CustomDialog from "@/components/miscellaneous/CustomDialog";

function AnalogClockThemes() {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, [open]);

    return (
        <>
            <ListItemButton sx={{ pl: 9 }} onClick={() => setOpen(true)}>
                <ListItemText
                    primary={
                        <Typography variant="body1">Clock Theme</Typography>
                    }
                />
            </ListItemButton>
            <CustomDialog
                id="time-zone-menu"
                title="Home time zone"
                data={["a", "b", "c"]}
                keepMounted
                value={"a"}
                open={open}
                onClose={handleClose}
                clockThemeFlag={true}
            />
        </>
    );
}

export default AnalogClockThemes;
