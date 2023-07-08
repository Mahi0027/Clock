import React, { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";

function SetStyle() {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string>("");
    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleClose = (value: string) => {
        setOpenDialog(false);
        setSelectedValue(value);
    };
    return (
        <>
            <ListItemButton sx={{ pl: 9 }} onClick={handleClickOpen}>
                <ListItemText
                    primary={<Typography variant="body1">Style</Typography>}
                    secondary="Digital"
                />
            </ListItemButton>
            {/* set clock style */}
            <SetClockStyle
                selectedValue={selectedValue}
                open={openDialog}
                onClose={handleClose}
            />
        </>
    );
}

export default SetStyle;

/* dialog box */
interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}
const emails = ["username@gmail.com", "user02@gmail.com"];

function SetClockStyle(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Set backup account</DialogTitle>
            <List sx={{ pt: 0 }}>
                {emails.map((email, index) => (
                    <ListItem key={index} disableGutters>
                        <ListItemButton
                            onClick={() => handleListItemClick(email)}
                            key={email}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        bgcolor: blue[100],
                                        color: blue[600],
                                    }}
                                >
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={email} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disableGutters>
                    <ListItemButton
                        autoFocus
                        onClick={() => handleListItemClick("addAccount")}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Add account" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Dialog>
    );
}
