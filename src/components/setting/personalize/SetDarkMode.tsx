import React, { useContext, useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { blue, grey } from "@mui/material/colors";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { DataContext } from "@/contexts/DataComponent";
interface modeTemplate {
    id: number;
    name: string;
}
const modes: modeTemplate[] = [
    {
        id: 0,
        name: "Light Mode",
    },
    {
        id: 1,
        name: "Dark Mode",
    },
    {
        id: 2,
        name: "Extra Dark Mode",
    },
];
function SetDarkMode() {
    const { mode, updateMode } = useContext(DataContext);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [chosenMode, setChosenMode] = useState<number>(0);
    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const onClose = () => {
        setOpenDialog(false);
    };
    const onSetMode = (value: number) => {
        setOpenDialog(false);
        setChosenMode(value);
    };
    useEffect(()=> {
        chosenMode === 1 ? updateMode("dark") : updateMode("light");
    },[chosenMode])
    return (
        <>
            <ListItemButton sx={{ pl: 9 }} onClick={handleClickOpen}>
                <ListItemText
                    primary={<Typography variant="body1">Modes</Typography>}
                    secondary={modes.find(({ id }) => id == chosenMode)?.name}
                />
            </ListItemButton>
            {/* set modes dialog box */}
            <SetMode
                openDialog={openDialog}
                chosenMode={chosenMode}
                onSetMode={onSetMode}
                onClose={onClose}
            />
        </>
    );
}

interface SimpleDialogProps {
    openDialog: boolean;
    chosenMode: number;
    onSetMode: (value: number) => void;
    onClose: () => void;
}

function SetMode({
    openDialog,
    chosenMode,
    onSetMode,
    onClose,
}: SimpleDialogProps) {
    const handleClose = () => {
        onClose();
    };

    const handleChangeMode = (value: number) => {
        onSetMode(value);
    };
    return (
        <Dialog onClose={handleClose} open={openDialog}>
            <DialogTitle>Set mode</DialogTitle>
            <List sx={{ pt: 0 }}>
                {modes.map(({ id, name }, index) => (
                    <ListItem key={id} disableGutters>
                        <ListItemButton
                            key={id}
                            onClick={() => handleChangeMode(id)}
                            selected={id === chosenMode ? true : false}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        bgcolor: blue[100],
                                        color: blue[600],
                                    }}
                                >
                                    {id ? (
                                        id === 1 ? (
                                            <DarkModeIcon
                                                sx={{
                                                    color: grey[600],
                                                }}
                                            />
                                        ) : (
                                            <DarkModeIcon
                                                sx={{
                                                    color: grey[900],
                                                }}
                                            />
                                        )
                                    ) : (
                                        <LightModeIcon />
                                    )}
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
export default SetDarkMode;
