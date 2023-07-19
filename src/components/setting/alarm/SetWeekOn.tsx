import React, { useEffect, useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import CustomDialog from "@/components/miscellaneous/CustomDialog";
import { useDispatch, useSelector } from "react-redux";
import { getAllWeekOnValues, setWeekOnValue } from "@/redux";
import { initialStatesTypes } from "@/redux/features/setting/alarm/weekOn/weekOnReducer";

const options = ["Sunday", "Friday", "Saturday", "Monday"];

function SetWeekOn() {
    const [open, setOpen] = useState(false);
    const stateData: initialStatesTypes = useSelector(
        (state: any) => state.weekOn
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllWeekOnValues());
    }, [dispatch]);

    const handleClose = (newValue?: string) => {
        setOpen(false);
        if (newValue) {
            dispatch(setWeekOnValue(newValue));
        }
    };
    return (
        <>
            <ListItemButton sx={{ pl: 9 }} onClick={() => setOpen(true)}>
                <ListItemText
                    primary={
                        <Typography variant="body1">Start week on</Typography>
                    }
                    secondary={stateData.currentWeekOnValue}
                />
            </ListItemButton>
            <CustomDialog
                id="start-week-on"
                title="Start week on"
                data={stateData.allWeekOnValues}
                keepMounted
                value={stateData.currentWeekOnValue}
                open={open}
                onClose={handleClose}
            />
        </>
    );
}

export default SetWeekOn;
