import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "@/styles/components/home/timer/index.module.scss";
import BackspaceIcon from "@mui/icons-material/Backspace";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function TimerHome() {
    const [hour, setHour] = useState("00");
    const [minute, setMinute] = useState("00");
    const [second, setSecond] = useState("00");
    const [userValue, setUserValue] = useState("");

    useEffect(() => {
        console.log("userValue", userValue);
        setTime();
    }, [userValue]);

    const handleNumberClick = (value: string) => {
        if(userValue.length<6) {
            setUserValue((prevValue) => value + prevValue);
        }
    };

    const handleDeleteClick = () => {
        setUserValue("");
    };
    const handleBackspaceClick = () => {
        setUserValue(userValue.slice(1));
    };
    const setTime = () => {
        let userValueLength = userValue.length;
        console.log(userValueLength,userValue);
        
        for (let i = 0; i < userValueLength; i++) {
            if (i < 2) {
                let temp = second.split("");
                temp[1 - (i % 2)] = userValue[i];
                setSecond(temp.join(""));
            } else if (i >= 2 && i < 4) {
                console.log("minute");
                let temp = minute.split("");
                temp[1 - (i % 2)] = userValue[i];
                setMinute(temp.join(""));
            }
            else if (i >= 4 && i < 6) {
                console.log("hour");
                let temp = hour.split("");
                temp[1 - (i % 2)] = userValue[i];
                setHour(temp.join(""));
            }
        }
    };
    return (
        <Grid container spacing={2} className={styles.container}>
            <Grid item sm={6}>
                <Typography className={styles.timerTypography}>
                    {hour}
                    <span className={styles.timerTypographyType}>h</span>
                    {minute}
                    <span className={styles.timerTypographyType}>m</span>
                    {second}
                    <span className={styles.timerTypographyType}>s</span>
                </Typography>
            </Grid>
            <Grid item sm={6} className={styles.dialerBox}>
                <Grid container spacing={1}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "backspace", "delete"].map(
                        (number) => {
                            if (number === "backspace") {
                                return (
                                    <Grid item xs={4} key={number}>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            onClick={() =>
                                                handleBackspaceClick()
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
                                            onClick={() => handleDeleteClick()}
                                            className={styles.button}
                                        >
                                            <DeleteOutlineIcon />
                                        </Button>
                                    </Grid>
                                );
                            } else {
                                return (
                                    <Grid item xs={4} key={number}>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            onClick={() =>
                                                handleNumberClick(number)
                                            }
                                            className={styles.button}
                                        >
                                            {number}
                                        </Button>
                                    </Grid>
                                );
                            }
                        }
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default TimerHome;
