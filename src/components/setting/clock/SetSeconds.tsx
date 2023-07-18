import React, { useEffect, useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { initialStatesTypes } from "@/redux/features/setting/clock/second/secondReducer";
import { setSecondFlag } from "@/redux";

function SetSeconds() {
    const stateData: initialStatesTypes = useSelector(
        (state: any) => state.second
    );
    const dispatch = useDispatch();

    return (
        <ListItemButton
            sx={{ pl: 9 }}
            onChange={() => dispatch(setSecondFlag(!stateData.setSecond))}
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
            <Switch edge="end" checked={stateData.setSecond} />
        </ListItemButton>
    );
}

export default SetSeconds;
