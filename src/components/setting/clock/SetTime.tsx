import React, { useState, useRef, useEffect } from "react";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import ResponsiveTimePickers from "./components/ResponsiveTimePickers";

function SetTime() {
    const [time, setTime] = useState<Date>(new Date());
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const handleChangeTime = (value: Date) => {
        setTime(new Date(value));
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
                        <Typography variant="body1">Change time</Typography>
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
    handleChangeTime: (value: Date) => void;
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
    const {
        handleChangeTime,
        onClose,
        value: valueProp,
        open,
        ...other
    } = props;
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
        onClose();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    useEffect(() => {
        onClose(value);
    }, [value]);

    return (
        <Dialog open={open} {...other}>
            <DialogTitle>Time</DialogTitle>
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
