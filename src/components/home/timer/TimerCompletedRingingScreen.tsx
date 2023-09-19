import React, { memo, useMemo } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import timer from "@/../public/animations/timer.json";
import Lottie from "lottie-react";
import { Grid } from "@mui/material";
import styles from "@/styles/components/home/timer/timerCompletedRingingScreen.module.scss";

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
    const timerCompletedRingingScreenComponent = useMemo(() => {
        return (
            <>
                <Dialog fullScreen open={true} TransitionComponent={Transition}>
                    <Grid container className={styles.container}>
                        <Grid item sm={6} className={styles.animation}>
                            <Lottie loop={true} animationData={timer} /* style={{width: "100vw"}} */ />
                        </Grid>
                        <Grid item sm={6}>
                            <Typography
                                variant="h6"    
                                gutterBottom
                                className={styles.label}
                            >
                                {timerRunningLabel}
                            </Typography>
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
                </Dialog>
            </>
        );
    }, [closeTimerCompetedRingingScreen, deleteTimerDOM, timerRunningLabel]);

    return <>{timerCompletedRingingScreenComponent}</>;
}

export default memo(TimerCompletedRingingScreen);
