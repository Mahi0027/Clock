import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteTimer,
    setTimerCompletedFlag,
    setTimerRingDOM,
    updatePauseFlag,
    updateRemainingTimerTime,
    updateTimerIntervalRef,
    updateTimerTime,
} from "@/redux";
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
    const [humanReadableTime, setHumanReadableTime] =
        useState<string>(""); /* same page */
    const [progress, setProgress] = useState<number>(100); /* same page */
    const timerIntervalRef = useRef<any>(null); /* not sure */
    const totalTime = useRef<number>(
        Number(props.timerdetails.persistTime)
    ); /* same page */

    useEffect(() => {
        playTimer();
        return () => {
            clearInterval(timerIntervalRef.current);
        };
    }, []);

    useEffect(() => {
        if (!props.timerdetails.pauseFlag) playTimer();
    }, [props.timerdetails.pauseFlag]);

    useEffect(() => {
        if (props.timerdetails.timerRingDOM !== null) {
            dispatch(setTimerCompletedFlag(props.timerdetails.id, true));
            const timeInterval = Number(currentSilentInterval.substring(0, 2));
            setTimeout(() => {
                deleteTimerDOM();
                closeTimerCompetedRingingScreen();
            }, timeInterval * 60 * 1000);
        }
    }, [props.timerdetails.timerRingDOM]);

    useEffect(() => {
        if (
            props.timerdetails.remainingTime <= 0 &&
            !props.timerdetails.timerCompletedFlag
        ) {
            dispatch(updateTimerTime(props.timerdetails.id, 0));
            clearTimeout(timerIntervalRef.current);
            let timerDOM = new Audio(
                `sounds/alarm/${currentTimerSound}.mp3` /* `sounds/alarm/${props.timerdetails.sound}.mp3` */
            );
            dispatch(setTimerRingDOM(props.timerdetails.id, timerDOM));
            timerDOM.volume = Number(timerCurrentVolume) / 100;
            timerDOM.currentTime = 0;
            timerDOM.loop = true;
            timerDOM.play();
        } else {
            dispatch(
                updateTimerTime(
                    props.timerdetails.id,
                    props.timerdetails.remainingTime
                )
            );
        }

        if (progress > 0) {
            setProgress(
                Math.trunc(
                    (props.timerdetails.remainingTime * 100) / totalTime.current
                )
            );
            getHumanReadableRemainingTime();
        }
    }, [props.timerdetails.remainingTime]);

    /* play timer */
    const playTimer = useCallback(() => {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = setInterval(() => {
            dispatch(updateRemainingTimerTime(props.timerdetails.id));
        }, 1000);
    }, [dispatch]);

    /* delete timer */
    const deleteTimerDOM = useCallback(() => {
        clearTimeout(timerIntervalRef.current);
        props.timerdetails.timerRingDOM.pause();
        dispatch(deleteTimer(props.timerdetails.id));
    }, [dispatch, props.timerdetails.id, props.timerdetails.timerRingDOM]);

    const closeTimerCompetedRingingScreen = useCallback(() => {
        dispatch(setTimerCompletedFlag(props.timerdetails.id, false));
        if (timer.timers.length === 0) props.closeRunningTimer();
    }, [dispatch, props, timer.timers.length]);

    /* make human readable time form milliseconds. */
    const getHumanReadableRemainingTime = () => {
        let tempTime = props.timerdetails.remainingTime;
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
        if (!props.timerdetails.pauseFlag) {
            // pauseTimer();
            /* pause timer. */
            clearTimeout(timerIntervalRef.current);
        } else {
            playTimer();
        }
        dispatch(
            updatePauseFlag(
                props.timerdetails.id,
                !props.timerdetails.pauseFlag
            )
        );
    }, [
        dispatch,
        playTimer,
        props.timerdetails.id,
        props.timerdetails.pauseFlag,
    ]);

    const circularWithValueLabelComponent = useMemo(() => {
        return (
            <>
                {props.timerdetails.timerCompletedFlag && (
                    <TimerCompletedRingingScreen
                        currentTimerAudio={props.timerdetails.timerRingDOM}
                        deleteTimerDOM={deleteTimerDOM}
                        closeTimerCompetedRingingScreen={
                            closeTimerCompetedRingingScreen
                        }
                        timerRunningLabel={props.timerdetails.label}
                    />
                )}
                {!props.timerdetails.timerCompletedFlag && (
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
                                {!props.timerdetails.pauseFlag && (
                                    <PauseIcon sx={{ scale: "1.5" }} />
                                )}
                                {props.timerdetails.pauseFlag && (
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
        progress,
        props.timerdetails.label,
        props.timerdetails.pauseFlag,
        props.timerdetails.timerCompletedFlag,
        props.timerdetails.timerRingDOM,
    ]);
    return <>{circularWithValueLabelComponent}</>;
});
