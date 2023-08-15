import * as React from "react";
import CircularProgress, {
    CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTimer } from "@/redux";

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number }
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
                <Typography
                    variant="caption"
                    component="div"
                    color="text.primary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

export default function CircularWithValueLabel({ time }) {
    const stateData = useSelector((state:any) => state);
    const dispatch = useDispatch();
    const [progress, setProgress] = useState(time);


    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) =>
                prevProgress >= 100 ? 0 : prevProgress - 1000
            );
        }, 1000);
        return () => {
            dispatch(setTimer(stateData.timer.timers.timerTime - 1000));
            clearInterval(timer);
        };
    }, []);

    return <CircularProgressWithLabel value={progress} />;
}
