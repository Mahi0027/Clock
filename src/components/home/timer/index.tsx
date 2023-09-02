import { Button, Fab, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "@/styles/components/home/timer/index.module.scss";
import BackspaceIcon from "@mui/icons-material/Backspace";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RunningTimer from "./RunningTimer";
import { useDispatch, useSelector } from "react-redux";
import { setTimer } from "@/redux";
import ListIcon from "@mui/icons-material/List";

type stateTypes = {
    timers: {
        id: number;
        timerTime: number;
        persistTime: number;
        currentScheduleFlag: boolean;
        repeatFlag: boolean;
        sound: string;
        label: string | null;
    }[];
};
// type timerHomePropsTypes = {
//     runTimer: () => void;
// };
function TimerHome() {
    const { timers }: stateTypes = useSelector((state: any) => ({
        timers: state.timer.timers,
    }));
    const dispatch = useDispatch();
    const [hour, setHour] = useState<string>("00");
    const [minute, setMinute] = useState<string>("00");
    const [second, setSecond] = useState<string>("00");
    const [userValue, setUserValue] = useState<string>("");
    const [startTimerDisplayFlag, setStartTimerDisplayFlag] =
        useState<boolean>(false);

    useEffect(() => {
        setTime();
    }, [userValue]);

    const handleNumberClick = useCallback(
        (value: string) => {
            if (userValue.length < 6) {
                setUserValue((prevValue) => value + prevValue);
            }
        },
        [userValue.length]
    );

    const handleStartTimer = useCallback(() => {
        let milliSeconds =
            (Number(hour) * 60 * 60 + Number(second) + Number(minute) * 60) *
            1000;
        dispatch(setTimer(milliSeconds));
        setStartTimerDisplayFlag(true);
    }, [dispatch, hour, minute, second]);

    const closeRunningTimer = () => {
        setUserValue(""); //clear out  user value
        setStartTimerDisplayFlag(false);
    };
    /* base on input value set values which show on display. */
    const setTime = useCallback(() => {
        let userValueLength = userValue.length;
        let [tempSecond, tempMinute, tempHour] = ["00", "00", "00"];
        let temp;
        /* set tempSecond, tempMinute, tempHour value using input values. */
        for (let i = 0; i < userValueLength; i++) {
            if (i < 2) {
                temp = tempSecond.split("");
                temp[1 - (i % 2)] = userValue[i];
                tempSecond = temp.join("");
            } else if (i >= 2 && i < 4) {
                temp = tempMinute.split("");
                temp[1 - (i % 2)] = userValue[i];
                tempMinute = temp.join("");
            } else if (i >= 4 && i < 6) {
                temp = tempHour.split("");
                temp[1 - (i % 2)] = userValue[i];
                tempHour = temp.join("");
            }
        }
        /* if minute or second greater than 60 then do carry forward. */
        if (Number(tempSecond) >= 60) {
            tempSecond = (Number(tempSecond) - 60).toString();
            tempMinute = (Number(tempMinute) + 1).toString();

            /* add 0 as prefix if value is less then 10 */
            tempSecond =
                Number(tempSecond) < 10 ? "0" + tempSecond : tempSecond;
            tempMinute =
                Number(tempMinute) < 10 ? "0" + tempMinute : tempMinute;
        }
        if (Number(tempMinute) >= 60) {
            tempMinute = (Number(tempMinute) - 60).toString();
            tempHour = (Number(tempHour) + 1).toString();
            /* add 0 as prefix if value is less then 10 */
            tempMinute =
                Number(tempMinute) < 10 ? "0" + tempMinute : tempMinute;
            tempHour = Number(tempHour) < 10 ? "0" + tempHour : tempHour;
        }

        /* set second,minute,hour state. */
        setSecond(tempSecond);
        setMinute(tempMinute);
        setHour(tempHour);
    }, [userValue]);

    const timerHomeComponent = useMemo(() => {
        return (
            <>
                {!startTimerDisplayFlag && (
                    <Grid container spacing={2} className={styles.container}>
                        <Grid item sm={6}>
                            <Typography className={styles.timerTypography}>
                                <span
                                    style={{
                                        opacity: userValue.length > 4 ? 1 : 0.5,
                                    }}
                                >
                                    {hour}
                                    <span
                                        className={styles.timerTypographyType}
                                    >
                                        h
                                    </span>
                                </span>
                                <span
                                    style={{
                                        opacity: userValue.length > 2 ? 1 : 0.5,
                                    }}
                                >
                                    {minute}
                                    <span
                                        className={styles.timerTypographyType}
                                    >
                                        m
                                    </span>
                                </span>
                                <span
                                    style={{
                                        opacity: userValue.length > 0 ? 1 : 0.5,
                                    }}
                                >
                                    {second}
                                    <span
                                        className={styles.timerTypographyType}
                                    >
                                        s
                                    </span>
                                </span>
                            </Typography>
                        </Grid>
                        <Grid item sm={6} className={styles.dialerBox}>
                            <Grid container spacing={1}>
                                {[
                                    1,
                                    2,
                                    3,
                                    4,
                                    5,
                                    6,
                                    7,
                                    8,
                                    9,
                                    0,
                                    "backspace",
                                    "delete",
                                    "save",
                                ].map((number) => {
                                    if (number === "backspace") {
                                        return (
                                            <Grid item xs={4} key={number}>
                                                <Button
                                                    variant="outlined"
                                                    fullWidth
                                                    onClick={() =>
                                                        setUserValue(
                                                            userValue.slice(1)
                                                        )
                                                    }
                                                    className={styles.button}
                                                >
                                                    <BackspaceIcon />
                                                </Button>
                                            </Grid>
                                        );
                                    } else if (number === "delete") {
                                        return (
                                            <Grid item xs={4} key={number}>
                                                <Button
                                                    variant="outlined"
                                                    fullWidth
                                                    onClick={() =>
                                                        setUserValue("")
                                                    }
                                                    className={styles.button}
                                                >
                                                    <DeleteOutlineIcon />
                                                </Button>
                                            </Grid>
                                        );
                                    } else if (number === "save") {
                                        if (userValue.length) {
                                            return (
                                                <Grid item xs={12} key={number}>
                                                    <Button
                                                        variant="contained"
                                                        fullWidth
                                                        onClick={() =>
                                                            handleStartTimer()
                                                        }
                                                        className={
                                                            styles.button
                                                        }
                                                    >
                                                        <PlayArrowIcon />
                                                    </Button>
                                                </Grid>
                                            );
                                        }
                                    } else {
                                        return (
                                            <Grid item xs={4} key={number}>
                                                <Button
                                                    variant="outlined"
                                                    fullWidth
                                                    onClick={() =>
                                                        handleNumberClick(
                                                            number.toString()
                                                        )
                                                    }
                                                    className={styles.button}
                                                >
                                                    {number}
                                                </Button>
                                            </Grid>
                                        );
                                    }
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                )}
                {startTimerDisplayFlag && (
                    <RunningTimer closeRunningTimer={closeRunningTimer} />
                )}
                {!startTimerDisplayFlag && timers.length > 0 && (
                    <Fab
                        className={styles.addAlarmButton}
                        color="secondary"
                        aria-label="add"
                        onClick={() => setStartTimerDisplayFlag(true)}
                    >
                        <ListIcon />
                    </Fab>
                )}
            </>
        );
    }, [
        handleNumberClick,
        handleStartTimer,
        hour,
        minute,
        second,
        startTimerDisplayFlag,
        timers.length,
        userValue,
    ]);
    return <>{timerHomeComponent}</>;
}

export default TimerHome;
