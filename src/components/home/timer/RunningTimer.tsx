import {
    Box,
    Button,
    Card,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/components/home/timer/RunningTimer.module.scss";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import CircularWithValueLabel from "./miscellanceous/CircularWithValueLabel";
import DialogBox from "./miscellanceous/DialogBox";
import { deleteTimer, updateTimerLabel, updateTimerTime } from "@/redux";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";

type RunningTimerProps = {
    closeRunningTimer: () => void;
}
function RunningTimer(props: RunningTimerProps) {
    const stateData = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const [openLabelDialogFlag, setOpenLabelDialogFlag] = useState(false);
    const [idForOpenLabelDialogFlag, setIdForOpenLabelDialogFlag] = useState(0);
    const [labelText, setLabelText] = useState("");

    useEffect(() => {
        if (stateData.timer.timers.length === 0) {
            props.closeRunningTimer();
        }
    }, [stateData.timer]);

    const handleLabelButtonEvent = (
        openDialogBoxFlag: boolean,
        timerId: number,
        timerLabel: string
    ) => {
        setOpenLabelDialogFlag(openDialogBoxFlag);
        setIdForOpenLabelDialogFlag(timerId);
        setLabelText(timerLabel);
    };
    const handleLabelText = (timerId: number, label: string) => {
        dispatch(updateTimerLabel(timerId, label));
        setOpenLabelDialogFlag(false);
    };

    /* add 60 seconds(one minute) in timer. */
    const addTimeInTimer = (timer: any) => {
        const addTime = 60000; /* 60 seconds */
        if (timer.persistTime > timer.timerTime + addTime) {
            dispatch(updateTimerTime(timer.id, timer.timerTime + addTime));
        } else {
            dispatch(updateTimerTime(timer.id, timer.persistTime));
        }
    };

    return (
        <Box sx={{ marginBottom: "32vh" }}>
            {stateData.timer.timers.map((timer: any, index: number) => {
                return (
                    <Box key={timer.id} sx={{ margin: "2vh" }}>
                        <Card
                            variant="outlined"
                            sx={{
                                borderRadius: "10px",
                                padding: "0 2vw",
                                "@media (orientation: landscape)": {
                                    width: "70vw",
                                },
                            }}
                        >
                            <Stack
                                direction={"row"}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "2vh 0",
                                }}
                            >
                                <IconButton
                                    onClick={() =>
                                        handleLabelButtonEvent(
                                            true,
                                            timer.id,
                                            timer.label
                                        )
                                    }
                                >
                                    <LabelOutlinedIcon />
                                    <Typography
                                        variant="body1"
                                        sx={{ paddingLeft: "2vw" }}
                                    >
                                        {"  "}
                                        {timer.label}
                                    </Typography>
                                </IconButton>
                                <DialogBox
                                    id={idForOpenLabelDialogFlag}
                                    open={openLabelDialogFlag}
                                    close={setOpenLabelDialogFlag}
                                    labelText={labelText}
                                    handleLabelText={handleLabelText}
                                />
                                <Button
                                    variant="text"
                                    sx={{ opacity: 0.5 }}
                                    onClick={() =>
                                        dispatch(deleteTimer(timer.id))
                                    }
                                >
                                    <CancelTwoToneIcon />
                                </Button>
                            </Stack>
                            <Stack
                                direction={"row"}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingLeft: "2vw",
                                }}
                            >
                                <CircularWithValueLabel
                                    timerdetails={timer}
                                    closeRunningTimer={props.closeRunningTimer}
                                />
                            </Stack>
                            <Stack
                                direction="row"
                                justifyContent="center"
                                spacing={4}
                                className={styles.actionButtons}
                            >
                                <Button
                                    variant="text"
                                    onClick={() => addTimeInTimer(timer)}
                                >
                                    +1:00
                                </Button>
                                <Button
                                    variant="text"
                                    onClick={() =>
                                        dispatch(
                                            updateTimerTime(
                                                timer.id,
                                                timer.persistTime
                                            )
                                        )
                                    }
                                >
                                    <RestartAltIcon />
                                </Button>
                            </Stack>
                        </Card>
                    </Box>
                );
            })}
        </Box>
    );
}

export default RunningTimer;
