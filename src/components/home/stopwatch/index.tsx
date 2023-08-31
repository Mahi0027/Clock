import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "@/styles/components/home/stopwatch/index.module.scss";
import ReplayIcon from "@mui/icons-material/Replay";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import PauseIcon from "@mui/icons-material/Pause";
import { useDispatch, useSelector } from "react-redux";
import { initialStatesTypes } from "@/redux/features/home/stopwatch/reducer";
import {
    getStopwatchStates,
    setCurrentPlayFlag,
    setHour,
    setLeavePageTime,
    setMillisecond,
    setMinute,
    setSecond,
    setShowHour,
    setShowMillisecond,
    setShowMinute,
    setShowSecond,
    setSnapshot,
    setStopwatchTimer,
    startStopwatch,
    stopStopwatch,
} from "@/redux";

function StopwatchHome() {
    const {
        hour,
        minute,
        second,
        millisecond,
        showHour,
        showMinute,
        showSecond,
        showMillisecond,
        timer,
        snapshots,
        currentPlayFlag,
        leavePageTime,
    }: initialStatesTypes = useSelector((state: any) => ({
        hour: state.stopwatch.hour,
        minute: state.stopwatch.minute,
        second: state.stopwatch.second,
        millisecond: state.stopwatch.millisecond,
        showHour: state.stopwatch.showHour,
        showMinute: state.stopwatch.showMinute,
        showSecond: state.stopwatch.showSecond,
        showMillisecond: state.stopwatch.showMillisecond,
        timer: state.stopwatch.timer,
        snapshots: state.stopwatch.snapshots,
        currentPlayFlag: state.stopwatch.currentPlayFlag,
        leavePageTime: state.stopwatch.leavePageTime,
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentPlayFlag) {
            if (leavePageTime !== null) {
                const currentTime = new Date();
                const {
                    diffMilliseconds,
                    diffSeconds,
                    diffMinutes,
                    diffHours,
                } = getTimeDifference(leavePageTime, currentTime);
                console.log(
                    diffMilliseconds,
                    diffSeconds,
                    diffMinutes,
                    diffHours
                );
                console.log(millisecond, second, minute, hour);
                // dispatch(stopStopwatch());
                dispatch(setMillisecond(millisecond + 1000));
                dispatch(setSecond(second + diffSeconds));
                dispatch(setMinute(minute + diffMinutes));
                dispatch(setHour(hour + diffHours));
                console.log();
            }
            return () => {
                dispatch(setLeavePageTime(new Date()));
            };
        }
    }, [dispatch, currentPlayFlag]);

    useEffect(() => {
        dispatch(
            setShowMillisecond(
                millisecond < 10
                    ? "0" + millisecond
                    : millisecond.toString().slice(0, 2)
            )
        );
        if (millisecond >= 1000) {
            dispatch(setSecond(getState().second + 1));
            // setSecond((prevSecond) => prevSecond + 1);
            dispatch(setMillisecond(0));
            // setMilliSecond(0);
        }
    }, [millisecond]);

    useEffect(() => {
        dispatch(setShowSecond(second < 10 ? "0" + second : second.toString()));
        // setShowSecond(second < 10 ? "0" + second : second.toString());
        // console.log("Hello Mahipal", hour, minute, second);
        if (second === 60) {
            dispatch(setMinute(getState().minute + 1));
            // setMinute((prevMinute) => prevMinute + 1);

            dispatch(setSecond(0));
            // setSecond(0);
        }
    }, [second]);

    useEffect(() => {
        if (minute === 60) {
            dispatch(setHour(getState().hour + 1));
            // setHour((prevHour) => prevHour + 1);
            dispatch(setMinute(0));
            // setMinute(0);
        }
        dispatch(setShowMinute(minute < 10 ? "0" + minute : minute.toString()));
        // setShowMinute(minute < 10 ? "0" + minute : minute.toString());
    }, [minute]);

    useEffect(() => {
        dispatch(setShowHour(hour < 10 ? "0" + hour : hour.toString()));
        // setShowHour(hour < 10 ? "0" + hour : hour.toString());
    }, [hour]);

    /* just to solve closures issue, provide latest state value in callback. Currently we are only providing millisecond. */
    const getState = () => {
        return {
            millisecond: millisecond,
            second: second,
            minute: minute,
            hour: hour,
        };
    };
    const playStopwatch = () => {
        if (timer !== null) {
            clearInterval(timer);
        }
        const interval = setInterval(() => {
            const newMillisecond = getState().millisecond + 1000;
            dispatch(setMillisecond(newMillisecond));
        }, 1000);
        dispatch(setStopwatchTimer(interval));
        dispatch(setCurrentPlayFlag(true));
    };
    const pauseStopwatch = () => {
        // console.log("stopwatch pause");
        clearInterval(timer);
        dispatch(setCurrentPlayFlag(false));
        // setCurrentPlayFlag(false);
    };
    const resetStopwatch = () => {
        clearInterval(timer);
        dispatch(setHour(0));
        // setHour(0);
        dispatch(setMinute(0));
        // setMinute(0);
        dispatch(setSecond(0));
        // setSecond(0);
        dispatch(setMillisecond(0));
        // setMilliSecond(0);
        dispatch(setSnapshot([]));
        // setSnapshots([]);
        dispatch(setCurrentPlayFlag(false));
        // setCurrentPlayFlag(false);
    };
    const getSnapshot = () => {
        const newSnapshot = `${showHour}:${showMinute}:${showSecond}:${showMillisecond}`;
        dispatch(setSnapshot([newSnapshot, ...snapshots]));
        // setSnapshots([newSnapshot, ...snapshots]);
    };

    const getTimeDifference = (oldTime: Date, currentTime: Date) => {
        const oldTimestamp = oldTime.getTime(); // Convert to milliseconds
        const currentTimestamp = currentTime.getTime(); // Convert to milliseconds

        const timeDifference = currentTimestamp - oldTimestamp;

        const milliseconds = timeDifference % 1000;
        const seconds = Math.floor((timeDifference / 1000) % 60);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));

        return {
            diffMilliseconds: milliseconds,
            diffSeconds: seconds,
            diffMinutes: minutes,
            diffHours: hours,
        };
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
                                {showSecond}:{showMillisecond}
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
                            // onClick={() => dispatch(startStopwatch())}
                            onClick={playStopwatch}
                            className={styles.playStopwatchButton}
                        >
                            <PlayArrowIcon sx={{ fontSize: "5em" }} />
                        </Button>
                    )}
                    {currentPlayFlag && (
                        <Button
                            variant="contained"
                            // onClick={pauseStopwatch}
                            onClick={() => dispatch(stopStopwatch())}
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
