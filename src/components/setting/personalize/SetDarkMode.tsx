import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { initialStatesTypes } from "@/redux/features/setting/personalize/theme/themeReducer";

/* set dark mode. */
function SetDarkMode() {
    /* get state and dispatch */
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const stateData: initialStatesTypes = useSelector(
        (state: any) => state.theme
    );
    const dispatch = useDispatch();

    useEffect(() => {
        /* get all themes */
        dispatch(fetchAllThemes());
    }, [dispatch]);

    const onSetMode = useCallback(
        (value: string) => {
            setOpenDialog(false);
            dispatch(setTheme(value));
        },
        [dispatch]
    );

    /* JSX code under useMemo for optimization and improving performance. */
    const setDarkModeComponent = useMemo(() => {
        return (
            <>
                <ListItemButton
                    sx={{ pl: 9 }}
                    onClick={() => setOpenDialog(true)}
                >
                    <ListItemText
                        primary={<Typography variant="body1">Modes</Typography>}
                        secondary={stateData.currentTheme}
                    />
                </ListItemButton>
                {/* set modes dialog box */}
                <SetMode
                    openDialog={openDialog}
                    stateData={stateData}
                    onSetMode={onSetMode}
                    setOpenDialog={setOpenDialog}
                />
            </>
        );
    }, [onSetMode, openDialog, stateData]);

    return <>{setDarkModeComponent}</>;
}

interface SimpleDialogProps {
    openDialog: boolean;
    stateData: initialStatesTypes;
    onSetMode: (value: string) => void;
    setOpenDialog: (value: boolean) => void;
}

function SetMode({
    openDialog,
    stateData,
    onSetMode,
    setOpenDialog,
}: SimpleDialogProps) {
    /* JSX code under useMemo for optimization and improving performance. */
    const setModeComponent = useMemo(() => {
        const handleChangeMode = (value: string) => {
            onSetMode(value);
        };
        return (
            <Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
                <DialogTitle>Set mode</DialogTitle>
                <List sx={{ pt: 0 }}>
                    {stateData.allThemes.map((value, index) => (
                        <ListItem key={index} disableGutters>
                            <ListItemButton
                                key={index}
                                onClick={() => handleChangeMode(value)}
                                selected={
                                    value === stateData.currentTheme
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
    }, [
        onSetMode,
        openDialog,
        setOpenDialog,
        stateData.allThemes,
        stateData.currentTheme,
    ]);

    return <>{setModeComponent}</>;
}
export default SetDarkMode;
