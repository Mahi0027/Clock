import { Button, Grid, Typography } from "@mui/material";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import styles from "@/styles/components/home/stopwatch/index.module.scss";
import ReplayIcon from "@mui/icons-material/Replay";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import PauseIcon from "@mui/icons-material/Pause";
import { useDispatch, useSelector } from "react-redux";
import { initialStatesTypes } from "@/redux/features/home/stopwatch/reducer";
import {
    setCurrentPlayFlag,
    setHour,
    setMillisecond,
    setMinute,
    setSecond,
    setSnapshot,
    stopStopwatch,
} from "@/redux";

type stopwatchHomePropsTypes = {
    playStopwatch: () => void;
};
type stateTypes = {
    showHour: string;
    showMinute: string;
    showSecond: string;
    showMillisecond: string;
    timer: any;
    snapshots: string[];
    currentPlayFlag: boolean;
};
function StopwatchHome({ playStopwatch }: stopwatchHomePropsTypes) {
    const {
        showHour,
        showMinute,
        showSecond,
        showMillisecond,
        timer,
        snapshots,
        currentPlayFlag,
    }: stateTypes = useSelector((state: any) => ({
        showHour: state.stopwatch.showHour,
        showMinute: state.stopwatch.showMinute,
        showSecond: state.stopwatch.showSecond,
        showMillisecond: state.stopwatch.showMillisecond,
        timer: state.stopwatch.timer,
        snapshots: state.stopwatch.snapshots,
        currentPlayFlag: state.stopwatch.currentPlayFlag,
    }));
    const dispatch = useDispatch();

    const resetStopwatch = useCallback(() => {
        clearInterval(timer);
        dispatch(setHour(0));
        dispatch(setMinute(0));
        dispatch(setSecond(0));
        dispatch(setMillisecond(0));
        dispatch(setSnapshot([]));
        dispatch(setCurrentPlayFlag(false));
    }, [dispatch, timer]);

    const getSnapshot = useCallback(() => {
        const newSnapshot = `${showHour}:${showMinute}:${showSecond}`;
        dispatch(setSnapshot([newSnapshot, ...snapshots]));
    }, [dispatch, showHour, showMinute, showSecond, snapshots]);

    const stopwatchHomeComponent = useMemo(() => {
        return (
            <>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item sm={4}>
                        <Typography
                            className={styles.stopwatchTime}
                            sx={{
                                fontSize: "25vw",
                                "@media (orientation: landscape)": {
                                    fontSize: "25vh",
                                },
                            }}
                        >
                            <Grid container>
                                <Grid item sm={12}>
                                    {showHour}:{showMinute}
                                </Grid>
                                <Grid item sm={12}>
                                    :{showSecond}
                                    {/* :{showMillisecond} */}
                                </Grid>
                            </Grid>
                        </Typography>
                    </Grid>
                    <Grid item sm={4} className={styles.snapshots}>
                        {snapshots.map((snapshot: any, index: number) => (
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
                                visibility: currentPlayFlag
                                    ? "visible"
                                    : "hidden",
                            }}
                        >
                            <TimerOutlinedIcon />
                        </Button>
                    </Grid>
                </Grid>
            </>
        );
    }, [
        currentPlayFlag,
        dispatch,
        getSnapshot,
        playStopwatch,
        resetStopwatch,
        showHour,
        showMinute,
        showSecond,
        snapshots,
    ]);
    return <>{stopwatchHomeComponent}</>;
}

export default memo(StopwatchHome);
