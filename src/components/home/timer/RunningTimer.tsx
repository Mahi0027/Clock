import {
    Box,
    Button,
    Card,
    Fab,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import React, {
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/components/home/timer/runningTimer.module.scss";
import AddIcon from "@mui/icons-material/Add";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import CircularWithValueLabel from "./miscellanceous/CircularWithValueLabel";
import DialogBox from "./miscellanceous/DialogBox";
import {
    addOrReduceTimeInTimer,
    deleteTimer,
    setTimerSound,
    updateTimerLabel,
} from "@/redux";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CustomDialog from "@/components/miscellaneous/CustomDialog";
import { initialStatesTypes } from "@/redux/features/home/timer/reducer";

type RunningTimerProps = {
    closeRunningTimer: () => void;
};
function RunningTimer(props: RunningTimerProps) {
    const { timer }: { timer: initialStatesTypes } = useSelector(
        (state: any) => ({
            timer: state.timer,
        })
    );
    const dispatch = useDispatch();
    const [openLabelDialogFlag, setOpenLabelDialogFlag] = useState(false);
    const [idForOpenLabelDialogFlag, setIdForOpenLabelDialogFlag] = useState(0);
    const [openSoundDialogFlag, setOpenSoundDialogFlag] = useState(false);
    const [labelText, setLabelText] = useState("");
    const [currentTimerAudio, setCurrentTimerAudio] = useState<any>(null);
    const [timerRingtonesLength, setTimerRingtonesLength] = useState<number>(0);
    const timerAudio = Array.from({ length: timer.timerSounds.length }, useRef);

    useEffect(() => {
        if (timer.timers.length === 0) {
            props.closeRunningTimer();
        }
        setTimerRingtonesLength(timer.timerSounds.length);
    }, [timer]);

    const handleLabelButtonEvent = (
        openDialogBoxFlag: boolean,
        timerId: number,
        timerLabel: string
    ) => {
        setOpenLabelDialogFlag(openDialogBoxFlag);
        setIdForOpenLabelDialogFlag(timerId);
        setLabelText(timerLabel);
    };

    /* add 60 seconds(one minute) in timer. */
    const addTimeInTimer = useCallback(
        (timer: any) => {
            const addTime = 60000; /* 60 seconds */
            if (timer.persistTime > timer.timerTime + addTime) {
                dispatch(
                    addOrReduceTimeInTimer(timer.id, timer.timerTime + addTime)
                );
            } else {
                dispatch(addOrReduceTimeInTimer(timer.id, timer.persistTime));
            }
        },
        [dispatch]
    );

    /* reduce 60 seconds(one minute) in timer. */
    const reduceTimeInTimer = useCallback(
        (timer: any) => {
            const reduceTime = 60000; /* 60 seconds */
            if (timer.timerTime - reduceTime < 0) {
                dispatch(addOrReduceTimeInTimer(timer.id, 0));
            } else {
                dispatch(
                    addOrReduceTimeInTimer(
                        timer.id,
                        timer.timerTime - reduceTime
                    )
                );
            }
        },
        [dispatch]
    );
    /* set timer ringtone */
    // const handleCloseTimerSoundDialog = (newValue?: string, rowId?: number) => {
    //     for (let i = 0; i < timerRingtonesLength; i++) {
    //         timerAudio[i].current.pause();
    //     }
    //     setOpenSoundDialogFlag(false);
    //     if (rowId !== -1 && newValue) {
    //         dispatch(setTimerSound(rowId, newValue));
    //     }
    // };

    /* play timer ringtone. */
    // const playTimerSound = (value: string) => {
    //     for (let i = 0; i < timerRingtonesLength; i++) {
    //         timerAudio[i].current.pause();
    //     }
    //     timerAudio[timer.timerSounds.indexOf(value)].current.play();
    // };

    const runningTimeInTimerComponent = useMemo(() => {
        const handleLabelText = (timerId: number, label: string) => {
            dispatch(updateTimerLabel(timerId, label));
            setOpenLabelDialogFlag(false);
        };
        return (
            <>
                {timer.timerSounds.map((value: string, index: number) => {
                    return (
                        <span key={index}>
                            <audio
                                ref={(e: any) =>
                                    (timerAudio[index].current = e)
                                }
                                loop
                            >
                                <source
                                    src={`/sounds/alarm/${value}.mp3`}
                                    type="audio/mpeg"
                                />
                            </audio>
                        </span>
                    );
                })}
                <Fab
                    className={styles.addAlarmButton}
                    color="secondary"
                    aria-label="add"
                    onClick={() => props.closeRunningTimer()}
                >
                    <AddIcon />
                </Fab>
                <Box sx={{ marginBottom: "32vh" }}>
                    {timer.timers.map((timer: any, index: number) => {
                        return (
                            <>
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
                                                handleLabelText={
                                                    handleLabelText
                                                }
                                            />
                                            <Button
                                                variant="text"
                                                sx={{ opacity: 0.5 }}
                                                onClick={() =>
                                                    dispatch(
                                                        deleteTimer(timer.id)
                                                    )
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
                                                closeRunningTimer={
                                                    props.closeRunningTimer
                                                }
                                            />
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            justifyContent="center"
                                            spacing={4}
                                            className={styles.actionButtons}
                                        >
                                            {/* <Button
                                            variant="text"
                                            onClick={() =>
                                                setOpenSoundDialogFlag(true)
                                            }
                                        >
                                            <MusicNoteIcon />
                                        </Button> */}
                                            <Button
                                                variant="text"
                                                onClick={() =>
                                                    addTimeInTimer(timer)
                                                }
                                            >
                                                +1:00
                                            </Button>
                                            <Button
                                                variant="text"
                                                onClick={() =>
                                                    reduceTimeInTimer(timer)
                                                }
                                            >
                                                -1:00
                                            </Button>
                                            <Button
                                                variant="text"
                                                onClick={() =>
                                                    dispatch(
                                                        addOrReduceTimeInTimer(
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
                                {/* <CustomDialog
                                id="timer-ringtone"
                                title="Timer Ringtone"
                                data={timer.timerSounds}
                                keepMounted
                                value={timer.sound}
                                open={openSoundDialogFlag}
                                onClose={handleCloseTimerSoundDialog}
                                rowId={timer.id}
                                soundFlag={true}
                                playSound={playTimerSound}
                            /> */}
                            </>
                        );
                    })}
                </Box>
            </>
        );
    }, [
        addTimeInTimer,
        dispatch,
        idForOpenLabelDialogFlag,
        labelText,
        openLabelDialogFlag,
        props,
        reduceTimeInTimer,
        timer.timerSounds,
        timer.timers,
        timerAudio,
    ]);
    return <>{runningTimeInTimerComponent}</>;
}

export default memo(RunningTimer);
