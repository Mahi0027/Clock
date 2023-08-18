import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import timer from "@/../public/animations/timer.json";
import Lottie from "lottie-react";
import { Box, Grid } from "@mui/material";
import styles from "@/styles/components/home/timer/TimerCompletedRingingScreen.module.scss";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface TimerCompletedRingingScreenProps {
    currentTimerAudio: any;
    deleteTimerDOM: () => void;
    closeTimerCompetedRingingScreen: () => void;
    timerRunningLabel: string;
}
function TimerCompletedRingingScreen({
    currentTimerAudio,
    deleteTimerDOM,
    closeTimerCompetedRingingScreen,
    timerRunningLabel,
}: TimerCompletedRingingScreenProps) {
    return (
        <>
            <Dialog fullScreen open={true} TransitionComponent={Transition}>
                <Box className={styles.container}>
                    <Grid container>
                        <Grid item sm={6} className={styles.animation}>
                            <Typography variant="h6" gutterBottom>
                                {timerRunningLabel}
                            </Typography>
                            <Lottie loop={true} animationData={timer} />
                        </Grid>
                        <Grid item sm={6}>
                            <Button
                                className={styles.button}
                                variant="outlined"
                                onClick={() => {
                                    deleteTimerDOM();
                                    closeTimerCompetedRingingScreen();
                                }}
                            >
                                Stop
                            </Button>
                            {/* <Button
                                className={styles.button}
                                variant="contained"
                                color="warning"
                                onClick={() => {
                                    currentTimerAudio.pause();
                                    setTimerRunningPage(false);
                                    setTimeout(() => {
                                        currentTimerAudio.play();
                                        setTimerRunningPage(true);
                                    }, 10000);
                                }}
                            >
                                Snooze
                            </Button> */}
                        </Grid>
                    </Grid>
                </Box>
            </Dialog>
        </>
    );
}

export default TimerCompletedRingingScreen;
