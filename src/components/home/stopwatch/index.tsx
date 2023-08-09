import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "@/styles/components/home/stopwatch/index.module.scss";
import ReplayIcon from "@mui/icons-material/Replay";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import PauseIcon from "@mui/icons-material/Pause";
function StopwatchHome() {
    let timer:any = null;
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [milliSecond, setMilliSecond] = useState(0);
    const [currentPlayFlag, setCurrentPlayFlag] = useState(false);
    // useEffect(() => {
    //     if (milliSecond === 60) {
    //         setSecond(second + 1);
    //         setMilliSecond(0);
    //     }
    // }, [milliSecond]);
    useEffect(() => {
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
    }, [minute]);

    const playStopwatch = () => {
        timer = setInterval(() => {
            // setMilliSecond(milliSecond + 1);
            setSecond((prevSecond) => prevSecond+1);
        }, 1000);
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
    };
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
                            {hour}:{minute}:{second}:{milliSecond}
                        </Typography>
                    </Grid>
                    <Grid item xl={12} className={styles.buttons}>
                        <Button variant="outlined">
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
                        <Button variant="contained">
                            <TimerOutlinedIcon />
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default StopwatchHome;
