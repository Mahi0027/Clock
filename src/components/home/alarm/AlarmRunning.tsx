import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import alarm from "@/../public/animations/alarm.json";
import Lottie from "lottie-react";
import { Box, Grid } from "@mui/material";
import styles from "@/styles/components/home/alarm/AlarmRunning.module.scss";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AlarmRunning({
    currentAlarmAudio,
    setAlarmRunningPage,
    alarmRunningLabel,
}) {
    return (
        <>
            <Dialog fullScreen open={true} TransitionComponent={Transition}>
                <Box className={styles.container}>
                    <Grid container>
                        <Grid item sm={6} className={styles.animation}>
                            <Typography variant="h6" gutterBottom>
                                {alarmRunningLabel}
                            </Typography>
                            <Lottie loop={true} animationData={alarm} />
                        </Grid>
                        <Grid item sm={6}>
                            <Button
                                className={styles.button}
                                variant="outlined"
                                onClick={() => {
                                    currentAlarmAudio.pause();
                                    setAlarmRunningPage(false);
                                }}
                            >
                                Stop
                            </Button>
                            <Button
                                className={styles.button}
                                variant="contained"
                                color="warning"
                                onClick={() => {
                                    currentAlarmAudio.pause();
                                    setAlarmRunningPage(false);
                                    setTimeout(() => {
                                        currentAlarmAudio.play();
                                        setAlarmRunningPage(true);
                                    }, 10000);
                                }}
                            >
                                Snooze
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Dialog>
        </>
    );
}

export default AlarmRunning;
