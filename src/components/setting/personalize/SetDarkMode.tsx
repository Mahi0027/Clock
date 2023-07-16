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
import { useDispatch, useSelector } from "react-redux";
import { fetchAllThemes, setTheme } from "@/redux";

type initialStateTypes = {
    currentTheme: string;
    allThemes: string[];
};
function SetDarkMode() {
    const stateData = useSelector(state => state.theme);
    const dispatch = useDispatch();
    console.log(stateData, dispatch);

    useEffect(() => {
        dispatch(fetchAllThemes());
    }, []);

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const onClose = () => {
        setOpenDialog(false);
    };
    const onSetMode = (value: string) => {
        setOpenDialog(false);
        dispatch(setTheme(value));
    };
    return (
        <>
            <ListItemButton sx={{ pl: 9 }} onClick={handleClickOpen}>
                <ListItemText
                    primary={<Typography variant="body1">Modes</Typography>}
                    secondary={stateData["currentTheme"]}
                />
            </ListItemButton>
            {/* set modes dialog box */}
            <SetMode
                openDialog={openDialog}
                stateData={stateData}
                onSetMode={onSetMode}
                onClose={onClose}
            />
        </>
    );
}

interface SimpleDialogProps {
    openDialog: boolean;
    stateData: initialStateTypes;
    onSetMode: (value: string) => void;
    onClose: () => void;
}

function SetMode({
    openDialog,
    stateData,
    onSetMode,
    onClose,
}: SimpleDialogProps) {
    const handleClose = () => {
        onClose();
    };

    const handleChangeMode = (value: string) => {
        onSetMode(value);
    };
    return (
        <Dialog onClose={handleClose} open={openDialog}>
            <DialogTitle>Set mode</DialogTitle>
            <List sx={{ pt: 0 }}>
                {stateData["allThemes"].map((value, index) => (
                    <ListItem key={index} disableGutters>
                        <ListItemButton
                            key={index}
                            onClick={() => handleChangeMode(value)}
                            selected={
                                value === stateData["currentTheme"]
                                    ? true
                                    : false
                            }
                        >
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        bgcolor: blue[100],
                                        color: blue[600],
                                    }}
                                >
                                    {index ? (
                                        <DarkModeIcon
                                            sx={{
                                                color: grey[600],
                                            }}
                                        />
                                    ) : (
                                        <LightModeIcon />
                                    )}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    value.charAt(0).toUpperCase() +
                                    value.slice(1)
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
