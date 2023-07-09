import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import ResponsiveTimePickers from "./components/ResponsiveTimePickers";

function SetTime() {
    const [time, setTime] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const handleChangeTime = (value: string) => {
        console.log("sdf", value);
        // setTime(value);
    };
    const handleClickListItem = () => {
        setOpen(true);
    };
    const handleClose = (newValue?: string) => {
        setOpen(false);

        if (newValue) {
            setValue(newValue);
        }
    };
    return (
        <>
            <ListItemButton sx={{ pl: 9 }} onClick={handleClickListItem}>
                <ListItemText
                    primary={
                        <Typography variant="body1">
                            Change date & time
                        </Typography>
                    }
                />
            </ListItemButton>
            <ConfirmationDialogRaw
                id="time"
                keepMounted
                value={value}
                open={open}
                onClose={handleClose}
                handleChangeTime={handleChangeTime}
            />
        </>
    );
}

export interface ConfirmationDialogRawProps {
    id: string;
    keepMounted: boolean;
    value: string;
    open: boolean;
    onClose: (value?: string) => void;
    handleChangeTime: (value: string) => void;
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
    const { handleChangeTime, onClose, value: valueProp, open, ...other } = props;
    const [value, setValue] = useState(valueProp);
    const radioGroupRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!open) {
            setValue(valueProp);
        }
    }, [valueProp, open]);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        alert("cloose");
        onClose();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    useEffect(() => {
        onClose(value);
    }, [value]);

    return (
        <Dialog
            // sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
            // maxWidth="xs"
            // TransitionProps={{ onEntering: handleEntering }}
            open={open}
            {...other}
        >
            <DialogTitle>Date & time</DialogTitle>
            <DialogContent dividers>
                <ResponsiveTimePickers
                    action={handleCancel}
                    handleChangeTime={handleChangeTime}
                />
            </DialogContent>
        </Dialog>
    );
}
export default SetTime;
