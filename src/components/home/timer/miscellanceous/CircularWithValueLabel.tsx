import * as React from "react";
import CircularProgress, {
    CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTimer, updateTimerTime } from "@/redux";
import ReplayIcon from "@mui/icons-material/Replay";
import { Button } from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
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
                size="50vw"
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
                    {playFlag && <PauseIcon />}
                    {!playFlag && <PlayArrowIcon />}
                </Button>
            </Box>
        </Box>
    );
}

export default function CircularWithValueLabel(props: { timerdetails:any }) {
    const stateData = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const [remainingTime, setRemainingTime] = useState(
        props.timerdetails.timerTime
    );
    const [humanReadableTime, setHumanReadableTime] = useState("");
    const [progress, setProgress] = useState(100);
    const [pauseFlag, setPauseFlag] = useState(false);
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
        if (remainingTime <= 0) {
            dispatch(updateTimerTime(props.timerdetails.id, 0));
            clearTimeout(timerIntervalRef.current);
            let timerDOM = new Audio(
                `sounds/alarm/${props.timerdetails.sound}.mp3`
            );
            timerDOM.currentTime = 0;
            timerDOM.loop = true;
            timerDOM.play();
        }
        else {
            dispatch(updateTimerTime(props.timerdetails.id,remainingTime));
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
        // dispatch(updateTimerTime(props.timerdetails.id, remainingTime));
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
        <CircularProgressWithLabel
            value={progress}
            humanreadabletime={humanReadableTime}
            playtimer={playTimer}
            pausetimer={pauseTimer}
        />
    );
}
