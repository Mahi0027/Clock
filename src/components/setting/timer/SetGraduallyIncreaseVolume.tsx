import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
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

const options = ["Never"];
for (let i = 5; i <= 60; i = i + 5) {
    options.push(i + " minutes");
}

function SetGraduallyIncreaseVolume() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(options[2]);
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
                            Gradually increase volume
                        </Typography>
                    }
                    secondary={value}
                />
            </ListItemButton>
            <ConfirmationDialogRaw
                id="gradually-increase-volume"
                keepMounted
                value={value}
                open={open}
                onClose={handleClose}
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
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
    const { onClose, value: valueProp, open, ...other } = props;
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
        <Dialog
            sx={{ "& .MuiDialog-paper": { width: "80%" } }}
            maxWidth="xs"
            TransitionProps={{ onEntering: handleEntering }}
            open={open}
            {...other}
        >
            <DialogTitle>Gradually increase volume</DialogTitle>
            <DialogContent dividers>
                <RadioGroup
                    ref={radioGroupRef}
                    aria-label="graduallyincreasevolume"
                    name="graduallyincreasevolume"
                    value={value}
                    onChange={handleChange}
                >
                    {options.map((option) => (
                        <FormControlLabel
                            value={option}
                            key={option}
                            control={<Radio />}
                            label={option}
                        />
                    ))}
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button sx={{ fontWeight: "bold" }} onClick={handleCancel}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SetGraduallyIncreaseVolume;
