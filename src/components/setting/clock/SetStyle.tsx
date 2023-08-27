import React, { useCallback, useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { blue } from "@mui/material/colors";
import MemoryIcon from "@mui/icons-material/Memory";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useDispatch, useSelector } from "react-redux";
import { initialStatesTypes } from "@/redux/features/setting/clock/style/styleReducer";
import { fetchAllStyles, setStyle } from "@/redux";

function SetStyle() {
    const stateData: initialStatesTypes = useSelector(
        (state: any) => state.clockStyle
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllStyles());
    }, [dispatch]);

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const onSetClockStyle = useCallback(
        (value: string) => {
            setOpenDialog(false);
            dispatch(setStyle(value));
        },
        [dispatch, openDialog]
    );
    return (
        <>
            <ListItemButton sx={{ pl: 9 }} onClick={() => setOpenDialog(true)}>
                <ListItemText
                    primary={<Typography variant="body1">Style</Typography>}
                    secondary={stateData.currentStyle}
                />
            </ListItemButton>
            {/* set clock style dialog box */}
            <SetClockStyle
                openDialog={openDialog}
                stateData={stateData}
                onSetClockStyle={onSetClockStyle}
                setOpenDialog={setOpenDialog}
            />
        </>
    );
}

interface SimpleDialogProps {
    openDialog: boolean;
    stateData: initialStatesTypes;
    onSetClockStyle: (value: string) => void;
    setOpenDialog: (value: boolean) => void;
}

function SetClockStyle({
    openDialog,
    stateData,
    onSetClockStyle,
    setOpenDialog,
}: SimpleDialogProps) {
    const handleChangeClockStyle = (value: string) => {
        onSetClockStyle(value);
    };
    return (
        <Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
            <DialogTitle>Set clock style</DialogTitle>
            <List sx={{ pt: 0 }}>
                {stateData.allStyles.map((value, index) => (
                    <ListItem key={index} disableGutters>
                        <ListItemButton
                            key={index}
                            onClick={() => handleChangeClockStyle(value)}
                            selected={
                                value === stateData.currentStyle ? true : false
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
                                        <AccessTimeIcon />
                                    ) : (
                                        <MemoryIcon />
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

export default SetStyle;
