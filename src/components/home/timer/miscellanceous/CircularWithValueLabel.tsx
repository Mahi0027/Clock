import * as React from "react";
import CircularProgress, {
    CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTimer, setTimer, updateTimerTime } from "@/redux";
import ReplayIcon from "@mui/icons-material/Replay";
import { Button } from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TimerCompletedRingingScreen from "../TimerCompletedRingingScreen";
interface CircularProgressWithLabelProps extends CircularProgressProps {
    value: number;
    humanreadabletime: string;
    playtimer: () => void;
    pausetimer: () => void;
}

function CircularProgressWithLabel(props: CircularProgressWithLabelProps) {
    const [playFlag, setPlayFlag] = useState(true);

    const handlePlayPause = () => {
        if (playFlag) {
            props.pausetimer();
        } else {
            props.playtimer();
        }
        setPlayFlag(!playFlag);
    };

    return (
        <Box
            sx={{
                position: "relative",
                display: "inline-flex",
            }}
        >
            <CircularProgress
                variant="determinate"
                color="primary"
                {...props}
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
                <Typography variant="h4">{props.humanreadabletime}</Typography>

                <Button sx={{ top: "10%" }} onClick={handlePlayPause}>
                    {playFlag && <PauseIcon sx={{ scale: "1.5" }} />}
                    {!playFlag && <PlayArrowIcon sx={{ scale: "1.5" }} />}
                </Button>
            </Box>
        </Box>
    );
}
type CircularWithValueLabelProps = {
    timerdetails: any;
    closeRunningTimer: () => void;
};
export default function CircularWithValueLabel(
    props: CircularWithValueLabelProps
) {
    const stateData = useSelector((state: any) => state);
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

    useEffect(() => {
        playTimer();
        return () => {
            clearInterval(timerIntervalRef.current);
        };
    }, []);

    useEffect(() => {
        setRemainingTime(props.timerdetails.timerTime);
        if (!pauseFlag) playTimer();
    }, [stateData.timer]);

    useEffect(() => {
        if (timerRingDOM !== null) setTimerCompletedRingingPage(true);
    }, [timerRingDOM]);

    useEffect(() => {
        if (remainingTime <= 0 && !timerCompletedRingingPage) {
            dispatch(updateTimerTime(props.timerdetails.id, 0));
            clearTimeout(timerIntervalRef.current);
            let timerDOM = new Audio(
                `sounds/alarm/${props.timerdetails.sound}.mp3`
            );
            setTimerRingDOM(timerDOM);
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
    const deleteTimerDOM = () => {
        clearTimeout(timerIntervalRef.current);
        timerRingDOM.pause();
        dispatch(deleteTimer(props.timerdetails.id));
    };

    const closeTimerCompetedRingingScreen = () => {
        setTimerCompletedRingingPage(false);
        if (stateData.timer.timers.length === 0) props.closeRunningTimer();
    };

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
                <CircularProgressWithLabel
                    value={progress}
                    humanreadabletime={humanReadableTime}
                    playtimer={playTimer}
                    pausetimer={pauseTimer}
                />
            )}
        </>
    );
}
