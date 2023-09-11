import React, { useMemo } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { setSecondFlag } from "@/redux";
import { setCurrentSecondFlagMiddleware } from "@/middleware/setting/clock/second";

function SetSeconds() {
    const setSecond: boolean = useSelector(
        (state: any) => state.second.setSecond
    );
    const dispatch = useDispatch();

    /* JSX code under useMemo for optimization and improving performance. */
    const setSecondsComponent = useMemo(() => {
        return (
            <ListItemButton
                sx={{ pl: 9 }}
                onChange={() => dispatch(setCurrentSecondFlagMiddleware(!setSecond))}
                disableRipple
            >
                <ListItemText
                    primary={
                        <Typography variant="body1">
                            Display time with seconds
                        </Typography>
                    }
                    secondary="Ex. HH:MM:SS"
                />
                <Switch edge="end" checked={setSecond} />
            </ListItemButton>
        );
    }, [dispatch, setSecond]);

    return <>{setSecondsComponent}</>;
}

export default SetSeconds;
