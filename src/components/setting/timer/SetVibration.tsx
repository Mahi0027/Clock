import React, { useMemo, useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";

function SetVibration() {
    const [check, setCheck] = useState<boolean>(true);

    /* JSX code under useMemo for optimization and improving performance. */
    const setVibrationComponent = useMemo(() => {
        return (
            <ListItemButton
                sx={{ pl: 9 }}
                onChange={() => setCheck(!check)}
                disableRipple
            >
                <ListItemText
                    primary={
                        <Typography variant="body1">Timer Vibration</Typography>
                    }
                />
                <Switch edge="end" checked={check} />
            </ListItemButton>
        );
    }, [check]);
    return <>{setVibrationComponent}</>;
}

export default SetVibration;
