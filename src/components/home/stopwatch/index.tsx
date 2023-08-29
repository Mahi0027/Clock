import { Button, Chip, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "@/styles/components/home/stopwatch/index.module.scss";
import ReplayIcon from "@mui/icons-material/Replay";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import PauseIcon from "@mui/icons-material/Pause";
let tempArr = [];
function StopwatchHome() {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [milliSecond, setMilliSecond] = useState(0);
    const [showHour, setShowHour] = useState("00");
    const [showMinute, setShowMinute] = useState("00");
    const [showSecond, setShowSecond] = useState("00");
    const [showMilliSecond, setShowMilliSecond] = useState("00");
    const [timer, setTimer] = useState<any>(null);
    const [snapshots, setSnapshots] = useState<string[]>([]);
    const [currentPlayFlag, setCurrentPlayFlag] = useState(false);
    
    useEffect(() => {
        setShowMilliSecond(milliSecond<10? "0"+ milliSecond: milliSecond.toString().slice(0, 2));
        if (milliSecond >= 1000) {
          setSecond(prevSecond => prevSecond + 1);
            setMilliSecond(0);
        }
    }, [milliSecond]);

    useEffect(() => {
        setShowSecond(second < 10 ? "0" + second : second.toString());
        if (second === 60) {
            setMinute((prevMinute) => prevMinute + 1);
            setSecond(0);
        }
    }, [second]);

    useEffect(() => {
        if (minute === 60) {
            setHour((prevHour) => prevHour + 1);
            setMinute(0);
        }
        setShowMinute(minute < 10 ? "0" + minute : minute.toString());
    }, [minute]);

    useEffect(() => {
        setShowHour(hour < 10 ? "0" + hour : hour.toString());
    }, [hour]);

    const playStopwatch = () => {
        if (timer !== null) {
            clearInterval(timer);
        }
        setTimer(() =>
            setInterval(() => {
                setMilliSecond((prevMilliSecond) => prevMilliSecond + 50);
            }, 50)
        );
        setCurrentPlayFlag(true);
    };
    const pauseStopwatch = () => {
        clearInterval(timer);
        setCurrentPlayFlag(false);
    };
    const resetStopwatch = () => {
        clearInterval(timer);
        setHour(0);
        setMinute(0);
        setSecond(0);
        setMilliSecond(0);
        setSnapshots([]);
        setCurrentPlayFlag(false);
    };
    const getSnapshot = () => {
        const newSnapshot = `${showHour}:${showMinute}:${showSecond}:${showMilliSecond}`;
        setSnapshots([newSnapshot, ...snapshots]);
    };
    return (
        <>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item sm={4}>
                    <Typography className={styles.stopwatchTime}>
                        <Grid container>
                            <Grid item sm={12}>
                                {showHour}:{showMinute}:
                            </Grid>
                            <Grid item sm={12}>
                                {showSecond}:{showMilliSecond}
                            </Grid>
                        </Grid>
                    </Typography>
                </Grid>
                <Grid item sm={4} className={styles.snapshots}>
                    {snapshots.map((snapshot, index) => (
                        <Typography
                            variant="body1"
                            key={index}
                            className={styles.snapshotText}
                        >
                            #{snapshots.length - index} {snapshot}
                        </Typography>
                    ))}
                </Grid>
                <Grid item sm={3} className={styles.buttons}>
                    <Button variant="contained" onClick={resetStopwatch}>
                        <ReplayIcon />
                    </Button>
                    {!currentPlayFlag && (
                        <Button
                            variant="contained"
                            onClick={playStopwatch}
                            className={styles.playStopwatchButton}
                        >
                            <PlayArrowIcon sx={{ fontSize: "5em" }} />
                        </Button>
                    )}
                    {currentPlayFlag && (
                        <Button
                            variant="contained"
                            onClick={pauseStopwatch}
                            className={styles.pauseStopwatchButton}
                        >
                            <PauseIcon sx={{ fontSize: "5em" }} />
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        onClick={getSnapshot}
                        sx={{
                            visibility: currentPlayFlag ? "visible" : "hidden",
                        }}
                    >
                        <TimerOutlinedIcon />
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default StopwatchHome;
