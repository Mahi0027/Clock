import * as React from "react";
import CircularProgress, {
    CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTimer, updateTimerTime } from "@/redux";

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number; humanReadableTime: string }
) {
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
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h4">{props.humanReadableTime}</Typography>
            </Box>
        </Box>
    );
}

export default function CircularWithValueLabel({ id, time }) {
    const stateData = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const [remainingTime, setRemainingTime] = useState(time);
    const [humanReadableTime, setHumanReadableTime] = useState("");
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (progress > 0) {
            setProgress(Math.trunc((remainingTime * 100) / time));
            getHumanReadableRemainingTime();
        }
    }, [remainingTime]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (remainingTime > 0) {
                setRemainingTime(
                    (prevRemainingTime: number) => prevRemainingTime - 1000
                );
            }
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

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
            humanReadableTime={humanReadableTime}
        />
    );
}
