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

export interface ConfirmationDialogRawProps {
    id: string;
    title: string;
    data: string[];
    keepMounted: boolean;
    value: string;
    open: boolean;
    onClose: (value?: string) => void;
}
function CustomDialog(props: ConfirmationDialogRawProps) {
    const { open, onClose, title, data, value: valueProp, ...other } = props;
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
            sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
            maxWidth="xs"
            TransitionProps={{ onEntering: handleEntering }}
            open={open}
            {...other}
        >
            <DialogTitle>{ title }</DialogTitle>
            <DialogContent dividers>
                <RadioGroup
                    ref={radioGroupRef}
                    aria-label={title.split(" ").join(" ")}
                    name={title.split(" ").join(" ")}
                    value={value}
                    onChange={handleChange}
                >
                    {data.map((option) => (
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

export default CustomDialog;
