import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTimer, updateTimerTime } from "@/redux";
import ReplayIcon from "@mui/icons-material/Replay";
import { Button } from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TimerCompletedRingingScreen from "../TimerCompletedRingingScreen";
import { initialStatesTypes } from "@/redux/features/home/timer/reducer";

type CircularWithValueLabelProps = {
    timerdetails: any;
    closeRunningTimer: () => void;
};

type stateTypes = {
    timer: initialStatesTypes;
    currentSilentInterval: string;
    currentTimerSound: string;
    timerCurrentVolume: number;
};
export default memo(function CircularWithValueLabel(
    props: CircularWithValueLabelProps
) {
    const {
        timer,
        currentSilentInterval,
        currentTimerSound,
        timerCurrentVolume,
    }: stateTypes = useSelector((state: any) => ({
        timer: state.timer,
        currentSilentInterval: state.timerSetting.currentSilentInterval,
        currentTimerSound: state.timerSetting.currentTimerSound,
        timerCurrentVolume: state.timerSetting.timerCurrentVolume,
    }));
    const dispatch = useDispatch();
    const [remainingTime, setRemainingTime] = useState(
        props.timerdetails.timerTime
    );
    const [humanReadableTime, setHumanReadableTime] = useState<string>("");
    const [progress, setProgress] = useState<number>(100);
    const [pauseFlag, setPauseFlag] = useState<boolean>(false);
    const [timerRingDOM, setTimerRingDOM] = useState<any>(null);
    const [timerCompletedRingingPage, setTimerCompletedRingingPage] =
        useState<boolean>(false);
    const timerIntervalRef = useRef<any>(null);
    const totalTime = useRef<number>(Number(props.timerdetails.persistTime));
    const [playFlag, setPlayFlag] = useState(true);

    useEffect(() => {
        playTimer();
        return () => {
            clearInterval(timerIntervalRef.current);
        };
    }, []);

    useEffect(() => {
        setRemainingTime(props.timerdetails.timerTime);
        if (!pauseFlag) playTimer();
    }, [timer]);

    useEffect(() => {
        if (timerRingDOM !== null) {
            setTimerCompletedRingingPage(true);
            const timeInterval = Number(currentSilentInterval.substring(0, 2));
            setTimeout(() => {
                deleteTimerDOM();
                closeTimerCompetedRingingScreen();
            }, timeInterval * 60 * 1000);
        }
    }, [timerRingDOM]);

    useEffect(() => {
        if (remainingTime <= 0 && !timerCompletedRingingPage) {
            dispatch(updateTimerTime(props.timerdetails.id, 0));
            clearTimeout(timerIntervalRef.current);
            let timerDOM = new Audio(
                `sounds/alarm/${currentTimerSound}.mp3` /* `sounds/alarm/${props.timerdetails.sound}.mp3` */
            );
            setTimerRingDOM(timerDOM);
            timerDOM.volume = Number(timerCurrentVolume) / 100;
            timerDOM.currentTime = 0;
            timerDOM.loop = true;
            timerDOM.play();
        } else {
            dispatch(updateTimerTime(props.timerdetails.id, remainingTime));
        }

        if (progress > 0) {
            setProgress(Math.trunc((remainingTime * 100) / totalTime.current));
            getHumanReadableRemainingTime();
        }
    }, [remainingTime]);

    /* play timer */
    const playTimer = () => {
        setPauseFlag(false);
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = setInterval(() => {
            setRemainingTime(
                (prevRemainingTime: number) => prevRemainingTime - 1000
            );
        }, 1000);
    };

    /* pause timer */
    const pauseTimer = () => {
        clearTimeout(timerIntervalRef.current);
        setPauseFlag(true);
    };

    /* delete timer */
    const deleteTimerDOM = useCallback(() => {
        clearTimeout(timerIntervalRef.current);
        timerRingDOM.pause();
        dispatch(deleteTimer(props.timerdetails.id));
    }, [dispatch, props.timerdetails.id, timerRingDOM]);

    const closeTimerCompetedRingingScreen = useCallback(() => {
        setTimerCompletedRingingPage(false);
        if (timer.timers.length === 0) props.closeRunningTimer();
    }, [props, timer.timers.length]);

    /* make human readable time form milliseconds. */
    const getHumanReadableRemainingTime = () => {
        let tempTime = remainingTime;
        const hours = Math.floor(tempTime / 3600000);
        tempTime %= 3600000;
        const minutes = Math.floor(tempTime / 60000);
        tempTime %= 60000;
        const seconds = Math.floor(tempTime / 1000);
        setHumanReadableTime(
            `${hours < 10 ? "0" + hours : hours}:
            ${minutes < 10 ? "0" + minutes : minutes}:
            ${seconds < 10 ? "0" + seconds : seconds}`
        );
    };

    const handlePlayPause = useCallback(() => {
        if (playFlag) {
            pauseTimer();
        } else {
            playTimer();
        }
        setPlayFlag(!playFlag);
    }, [playFlag]);

    const circularWithValueLabelComponent = useMemo(() => {
        return (
            <>
                {timerCompletedRingingPage && (
                    <TimerCompletedRingingScreen
                        currentTimerAudio={timerRingDOM}
                        deleteTimerDOM={deleteTimerDOM}
                        closeTimerCompetedRingingScreen={
                            closeTimerCompetedRingingScreen
                        }
                        timerRunningLabel={props.timerdetails.label}
                    />
                )}
                {!timerCompletedRingingPage && (
                    <Box
                        sx={{
                            position: "relative",
                            display: "inline-flex",
                        }}
                    >
                        <CircularProgress
                            variant="determinate"
                            color="primary"
                            value={progress}
                            size="15em"
                            thickness={1}
                        />
                        <Box
                            sx={{
                                top: "20%",
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: "absolute",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="h4">
                                {humanReadableTime}
                            </Typography>

                            <Button
                                sx={{ top: "10%" }}
                                onClick={handlePlayPause}
                            >
                                {playFlag && (
                                    <PauseIcon sx={{ scale: "1.5" }} />
                                )}
                                {!playFlag && (
                                    <PlayArrowIcon sx={{ scale: "1.5" }} />
                                )}
                            </Button>
                        </Box>
                    </Box>
                )}
            </>
        );
    }, [
        closeTimerCompetedRingingScreen,
        deleteTimerDOM,
        handlePlayPause,
        humanReadableTime,
        playFlag,
        progress,
        props.timerdetails.label,
        timerCompletedRingingPage,
        timerRingDOM,
    ]);
    return <>{circularWithValueLabelComponent}</>;
});
