import React, { useState, useEffect } from "react";
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
import MemoryIcon from "@mui/icons-material/Memory";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface ClockStyleTemplate {
    id: number;
    name: string;
}
const clockStyles: ClockStyleTemplate[] = [
    {
        id: 0,
        name: "Analog",
    },
    {
        id: 1,
        name: "Digital",
    },
];

function SetStyle() {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [chosenClockStyle, setChosenClockStyle] = useState<number>(0);
    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const onClose = () => {
        setOpenDialog(false);
    };
    const onSetClockStyle = (value: number) => {
        setOpenDialog(false);
        setChosenClockStyle(value);
    };
    return (
        <>
            <ListItemButton sx={{ pl: 9 }} onClick={handleClickOpen}>
                <ListItemText
                    primary={<Typography variant="body1">Style</Typography>}
                    secondary={
                        clockStyles.find(({ id }) => id == chosenClockStyle)
                            ?.name
                    }
                />
            </ListItemButton>
            {/* set clock style dialog box */}
            <SetClockStyle
                openDialog={openDialog}
                chosenClockStyle={chosenClockStyle}
                onSetClockStyle={onSetClockStyle}
                onClose={onClose}
            />
        </>
    );
}

/* dialog box */
interface SimpleDialogProps {
    openDialog: boolean;
    chosenClockStyle: number;
    onSetClockStyle: (value: number) => void;
    onClose: () => void;
}

function SetClockStyle({
    openDialog,
    chosenClockStyle,
    onSetClockStyle,
    onClose,
}: SimpleDialogProps) {
    const handleClose = () => {
        onClose();
    };

    const handleChangeClockStyle = (value: number) => {
        onSetClockStyle(value);
    };
    return (
        <Dialog onClose={handleClose} open={openDialog}>
            <DialogTitle>Set clock style</DialogTitle>
            <List sx={{ pt: 0 }}>
                {clockStyles.map(({ id, name }, index) => (
                    <ListItem key={id} disableGutters>
                        <ListItemButton
                            key={id}
                            onClick={() => handleChangeClockStyle(id)}
                            selected={id === chosenClockStyle ? true : false}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        bgcolor: blue[100],
                                        color: blue[600],
                                    }}
                                >
                                    {id ? <AccessTimeIcon /> : <MemoryIcon />}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    name.charAt(0).toUpperCase() + name.slice(1)
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}


export default SetStyle;