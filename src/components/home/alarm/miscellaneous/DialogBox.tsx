import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'

function DialogBox({ id, open,close, handleLabelText }) {
    const [label, setLabel] = useState("");
    return (
        <Dialog open={open} /* onClose={} */>
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
                    onChange={(e) => setLabel(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => close(false)}>Cancel</Button>
                <Button onClick={() => handleLabelText(id, label)}>Set</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogBox