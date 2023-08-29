import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import React, { memo, useEffect, useMemo, useState } from "react";
interface DialogBoxPropTypes {
    id: number;
    open: boolean;
    labelText: string;
    close: (value: boolean) => void;
    handleLabelText: (id: number, label: string) => void;
}
function DialogBox({
    id,
    open,
    labelText,
    close,
    handleLabelText,
}: DialogBoxPropTypes) {
    const [label, setLabel] = useState<string>("");

    useEffect(() => {
        labelText !== null ? setLabel(labelText) : setLabel("");
        return () => setLabel("");
    }, [labelText]);

    /* JSX code under useMemo for optimization and improving performance. */
    const dialogBoxComponent = useMemo(() => {
        return (
            <Dialog open={open} onClose={() => close(false)}>
                <DialogTitle>Alarm Label</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="label"
                        label="label"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={label}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            if (newValue.length < 30) {
                                setLabel(newValue);
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => close(false)}>Cancel</Button>
                    <Button onClick={() => handleLabelText(id, label)}>
                        Set
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }, [close, handleLabelText, id, label, open]);

    return <>{dialogBoxComponent}</>;
}

export default memo(DialogBox);
