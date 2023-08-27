import React, { useCallback, useEffect, useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import CustomDialog from "@/components/miscellaneous/CustomDialog";
import { useDispatch, useSelector } from "react-redux";
import { getAllWeekOnValues, setWeekOnValue } from "@/redux";
import { initialStatesTypes } from "@/redux/features/setting/alarm/weekOn/weekOnReducer";

function SetWeekOn() {
    const [open, setOpen] = useState<boolean>(false);
    const { allWeekOnValues, currentWeekOnValue }: initialStatesTypes =
        useSelector((state: any) => ({
            allWeekOnValues: state.alarmWeekOn.allWeekOnValues,
            currentWeekOnValue: state.alarmWeekOn.currentWeekOnValue,
        }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllWeekOnValues());
    }, [dispatch]);

    const handleClose = useCallback(
        (newValue?: string) => {
            setOpen(false);
            if (newValue) {
                dispatch(setWeekOnValue(newValue));
            }
        },
        [dispatch, open]
    );
    return (
        <>
            <ListItemButton sx={{ pl: 9 }} onClick={() => setOpen(true)}>
                <ListItemText
                    primary={
                        <Typography variant="body1">Start week on</Typography>
                    }
                    secondary={currentWeekOnValue}
                />
            </ListItemButton>
            <CustomDialog
                id="start-week-on"
                title="Start week on"
                data={allWeekOnValues}
                keepMounted
                value={currentWeekOnValue}
                open={open}
                onClose={handleClose}
            />
        </>
    );
}

export default SetWeekOn;
