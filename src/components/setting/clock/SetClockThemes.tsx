import { ListItemButton, ListItemText, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import CustomDialog from "@/components/miscellaneous/CustomDialog";

function AnalogClockThemes() {
    const [open, setOpen] = useState<boolean>(false);

    const setClockThemesComponent = useMemo(() => {
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
                    onClose={() => setOpen(false)}
                    clockThemeFlag={true}
                />
            </>
        );
    }, [open]);

    return <>{setClockThemesComponent}</>;
}

export default AnalogClockThemes;
