import React, { useState, useRef, useEffect, memo } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import CustomHorizontalScrollableDialog from "./CustomHorizontalScrollableDialog";

export interface ConfirmationDialogRawProps {
    id: string;
    title: string;
    data: string[];
    keepMounted: boolean;
    value: string;
    open: boolean;
    onClose: () => void /* parameter type: value?: string | boolean, id?: number */;
    clockThemeFlag?: boolean;
    rowId?: number;
    soundFlag?: boolean;
    playSound?: (value: string) => void;
}

function CustomDialog({
    open,
    onClose,
    title,
    data,
    value: valueProp,
    clockThemeFlag = false,
    rowId = -1,
    soundFlag = false,
    playSound,
    ...other
}: ConfirmationDialogRawProps) {
    const [value, setValue] = useState<string>(valueProp);
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
        const newValue = (event.target as HTMLInputElement).value;
        if (soundFlag) {
            playSound((event.target as HTMLInputElement).value);
        }
        else{
            closeAndSetValue(newValue);
        }
        setValue(newValue);
    };

    // useEffect(() => {
        // if (!soundFlag) {
        //     closeAndSetValue(value);
        // }
    // }, [value]);

    const closeAndSetValue = (value: any, id = -1) => {
        id === -1 ? onClose(value) : onClose(value, id);
    };
    return (
        <Dialog
            sx={{ "& .MuiDialog-paper": { width: "80%" } }}
            maxWidth="xs"
            TransitionProps={{ onEntering: handleEntering }}
            open={open}
            {...other}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>
                {clockThemeFlag ? (
                    <CustomHorizontalScrollableDialog
                        onComplete={handleCancel}
                    />
                ) : (
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
                )}
            </DialogContent>
            <DialogActions>
                <Button sx={{ fontWeight: "bold" }} onClick={handleCancel}>
                    Cancel
                </Button>
                {soundFlag && (
                    <Button
                        sx={{ fontWeight: "bold" }}
                        onClick={() => closeAndSetValue(value, rowId)}
                    >
                        Set
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

export default memo(CustomDialog);
