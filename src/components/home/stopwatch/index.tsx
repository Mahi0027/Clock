import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "@/styles/components/home/stopwatch/index.module.scss";
import ReplayIcon from "@mui/icons-material/Replay";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import PauseIcon from "@mui/icons-material/Pause";
function StopwatchHome() {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [showHour, setShowHour] = useState("00");
    const [showMinute, setShowMinute] = useState("00");
    const [showSecond, setShowSecond] = useState("00");
    const [timer, setTimer] = useState<any>(null);
    const [snapshots, setSnapshots] = useState<string[]>([]);
    const [currentPlayFlag, setCurrentPlayFlag] = useState(false);
    useEffect(() => {
        console.log(snapshots);
        
    }, [snapshots]);
    
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
                setSecond((prevSecond) => prevSecond + 1);
            }, 1000)
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
        setSnapshots([]);
        setCurrentPlayFlag(false);
    };
    const getSnapshot = () => {
      const newSnapshot = `${showHour}:${showMinute}:${showSecond}`;
      setSnapshots([...snapshots, newSnapshot]);
    }
    return (
        <>
            <Box>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xl={12}>
                        <Typography className={styles.stopwatchTime}>
                            {showHour}:{showMinute}:{showSecond}
                        </Typography>
                        {snapshots.map((snapshot, index) => (
                            <Typography variant="body2" key={index}>
                                #{index+1}  {snapshot}
                            </Typography>
                        ))}
                    </Grid>
                    <Grid item xl={12} className={styles.buttons}>
                        <Button variant="outlined" onClick={resetStopwatch}>
                            <ReplayIcon />
                        </Button>
                        {!currentPlayFlag && (
                            <Button variant="contained" onClick={playStopwatch}>
                                <PlayArrowIcon />
                            </Button>
                        )}
                        {currentPlayFlag && (
                            <Button
                                variant="contained"
                                onClick={pauseStopwatch}
                            >
                                <PauseIcon />
                            </Button>
                        )}
                        <Button variant="contained" onClick={getSnapshot}>
                            <TimerOutlinedIcon />
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default StopwatchHome;
