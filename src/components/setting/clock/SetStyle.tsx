import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
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
import { setCurrentClockStyleMiddleware } from "@/middleware/setting/clock/style";

function SetStyle() {
    const stateData: initialStatesTypes = useSelector(
        (state: any) => state.clockStyle
    );
    const dispatch = useDispatch();

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const onSetClockStyle = useCallback(
        (value: string) => {
            setOpenDialog(false);
            dispatch(setCurrentClockStyleMiddleware(value));
        },
        [dispatch]
    );

    /* JSX code under useMemo for optimization and improving performance. */
    const setStyleComponent = useMemo(() => {
        return (
            <>
                <ListItemButton
                    sx={{ pl: 9 }}
                    onClick={() => setOpenDialog(true)}
                >
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
    }, [onSetClockStyle, openDialog, stateData]);

    return <>{setStyleComponent}</>;
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
    /* JSX code under useMemo for optimization and improving performance. */
    const setClockStyleComponent = useMemo(() => {
        return (
            <Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
                <DialogTitle>Set clock style</DialogTitle>
                <List sx={{ pt: 0 }}>
                    {stateData.allStyles.map((value, index) => (
                        <ListItem key={index} disableGutters>
                            <ListItemButton
                                key={index}
                                onClick={() => onSetClockStyle(value)}
                                selected={
                                    value === stateData.currentStyle
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
    }, [
        onSetClockStyle,
        openDialog,
        setOpenDialog,
        stateData.allStyles,
        stateData.currentStyle,
    ]);

    return <>{setClockStyleComponent}</>;
}

export default SetStyle;
