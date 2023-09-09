import React, {
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/components/home/alarm/AlarmView.module.scss";
import { getAllAlarm } from "@/redux";
import { styled } from "@mui/material/styles";
import {
    Box,
    Button,
    Card,
    Collapse,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import DialogBox from "./miscellaneous/DialogBox";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import CustomDialog from "@/components/miscellaneous/CustomDialog";
import AlarmRunning from "./AlarmRunning";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import ResponsiveDatePickers from "@/components/miscellaneous/ResponsiveDatePickers";
import { initialStatesTypes } from "@/redux/features/home/alarm/reducer";
import {
    deleteAlarmMiddleware,
    setAlarmSoundMiddleware,
    setRepeatAlarmMiddleware,
    updateAlarmLabelMiddleware,
    updateAlarmScheduleFlagMiddleware,
    updateAlarmTimeMiddleware,
} from "@/middleware/home/alarm";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

/* expand more icon effect */
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

type AlarmViewProps = {
    scrollToTop: boolean;
    closeScrollToTop: () => void;
};

const dayHashTable = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

type stateTypes = {
    alarmDetail: initialStatesTypes;
    alarmCurrentVolume: number;
    alarmCurrentSilentInterval: string;
    alarmCurrentSnoozeInterval: string;
};
function AlarmView({ scrollToTop, closeScrollToTop }: AlarmViewProps) {
    const {
        alarmDetail,
        alarmCurrentVolume,
        alarmCurrentSilentInterval,
        alarmCurrentSnoozeInterval,
    }: stateTypes = useSelector((state: any) => ({
        alarmDetail: state.alarm,
        alarmCurrentVolume: state.alarmVolume.currentValue,
        alarmCurrentSilentInterval: state.alarmSilent.currentSilentInterval,
        alarmCurrentSnoozeInterval: state.alarmSnooze.currentSnoozeInterval,
    }));
    const dispatch = useDispatch();
    const [expand, setExpand] = useState<{
        values: boolean[];
        dependency: number;
    }>({ values: [], dependency: -1 });
    const [openLabelDialogFlag, setOpenLabelDialogFlag] =
        useState<boolean>(false);
    const [openSoundDialogFlag, setOpenSoundDialogFlag] =
        useState<boolean>(false);
    const [idForOpenLabelDialogFlag, setIdForOpenLabelDialogFlag] =
        useState<number>(0);
    const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
    const [labelText, setLabelText] = useState<string>("");
    const [alarmTimeOut, setAlarmTimeOut] = useState<any>([]);
    const [alarmRunningPage, setAlarmRunningPage] = useState<boolean>(false);
    const [alarmRunningLabel, setAlarmRunningLabel] = useState<string>("");
    const [currentAlarmAudio, setCurrentAlarmAudio] = useState<any>(null);
    const [prevTimeOut, setPrevTimeOut] = useState<number>(0);
    const [expandBox, setExpandBox] = useState<number>(-1);
    const alarmAudio = Array.from(
        { length: alarmDetail.alarmSounds.length },
        useRef
    );

    const getStateData = () => {
        return alarmDetail;
    };
    useEffect(() => {
        setExpandState(alarmDetail.alarms.length, expandBox);
        setExpandBox(-1);
        dispatch(getAllAlarm());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllAlarm());
        setExpandState(alarmDetail.alarms.length, expandBox);
        setExpandBox(-1);
        setAlarms();

        if (scrollToTop) {
            // Scroll to the top
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            closeScrollToTop();
        }
    }, [alarmDetail]);

    /* set all alarms. */
    const setAlarms = () => {
        let tempAlarmTimeout = Array.from({
            length: alarmDetail.alarms.length,
        });
        alarmDetail.alarms.map((value: any, index: number) => {
            if (value.currentScheduleFlag) {
                const currentTime = new Date();
                let repeatFlag = false;
                let finalAlarmTime: number = Number.MAX_VALUE;
                let PlayAlarmFlag = false;

                /* check repeat alarm values. */
                for (const day in value.repeat) {
                    if (value.repeat[day].flag) {
                        repeatFlag = true;
                        let repeatAlarmDate = new Date(value.repeat[day].time);
                        let tempTimeDiff =
                            repeatAlarmDate.getTime() - currentTime.getTime();
                        if (tempTimeDiff > 0 && tempTimeDiff < finalAlarmTime) {
                            finalAlarmTime = tempTimeDiff;
                            PlayAlarmFlag = true;
                        }
                    }
                }

                /* if do not set repeat then run below if condition. */
                if (!repeatFlag) {
                    const givenTime = new Date(value.alarmTime);
                    if (givenTime <= currentTime) {
                        /* set time is past then automatically off alarm.
                            This functionality need to revise after adding date in alarm time.
                        */
                        PlayAlarmFlag = false;
                        dispatch(
                            updateAlarmScheduleFlagMiddleware(
                                value.id,
                                false,
                                getStateData
                            )
                        );
                    } else {
                        /* set alarm. */
                        finalAlarmTime =
                            givenTime.getTime() - currentTime.getTime();
                        PlayAlarmFlag = true;
                    }
                }

                if (PlayAlarmFlag) {
                    tempAlarmTimeout[index] = setTimeout(() => {
                        startAlarmRinging(
                            repeatFlag,
                            value.id,
                            value.label,
                            value.sound
                        );
                    }, finalAlarmTime);
                }
            }
        });
        for (let i = 0; i < alarmTimeOut.length; i++) {
            if (alarmTimeOut[i] !== undefined) {
                clearTimeout(alarmTimeOut[i]);
            }
        }
        setAlarmTimeOut(tempAlarmTimeout);
    };

    /* This function start ringing alarm. */
    const startAlarmRinging = (
        repeatFlag: boolean,
        id: number,
        label: string,
        sound: string
    ) => {
        setAlarmRunningPage(true);
        let alarmDOM = new Audio(`/sounds/alarm/${sound}.mp3`);
        setCurrentAlarmAudio(alarmDOM);
        alarmDOM.volume = Number(alarmCurrentVolume) / 100;
        alarmDOM.currentTime = 0;
        alarmDOM.loop = true;
        alarmDOM.play();
        setAlarmRunningLabel(label);
        if (!repeatFlag) {
            dispatch(
                updateAlarmScheduleFlagMiddleware(id, false, getStateData)
            );
        }
        const timeInterval = Number(alarmCurrentSilentInterval.substring(0, 2));
        /* stop alarm after specific time. */
        setTimeout(() => {
            alarmDOM.pause();
            setAlarmRunningPage(false);
        }, timeInterval * 60 * 1000); /* 60=seconds,1000=milliseconds */
    };

    /* it use to manage expand state variable */
    const setExpandState = (length: number, index = -1) => {
        setExpand({ values: [], dependency: -1 }); //set to default
        for (let i = 0; i < length; i++) {
            i === index
                ? setExpand((prevState) => ({
                      ...prevState,
                      values: [...prevState.values, true],
                  }))
                : setExpand((prevState) => ({
                      ...prevState,
                      values: [...prevState.values, false],
                  }));
        }
    };

    const handleExpand = (index: number) => {
        const updatedTempExpand = expand.values;
        updatedTempExpand[index] = !updatedTempExpand[index];
        setExpand({ values: updatedTempExpand, dependency: index });
    };

    /* convert time into day/date, time, meridian */
    const convertTimeInMeridiemForm = (time: Date, repeat: any) => {
        let repeatFlag = false;
        let date = new Date(time);
        let hour = Number(date.getHours());
        let minute = Number(date.getMinutes());
        let meridiem = "";
        let alarmDay = "";
        let repeatDaysCounter = 0;
        for (const day in repeat) {
            if (repeat[day].flag) {
                let repeatAlarmDate = new Date(repeat[day].time);
                repeatFlag = true;
                if (alarmDay === "") {
                    alarmDay = capitalizeFirstLetter(
                        dayHashTable[repeatAlarmDate.getDay()].substring(0, 3)
                    );
                } else {
                    alarmDay =
                        alarmDay +
                        ", " +
                        capitalizeFirstLetter(
                            dayHashTable[repeatAlarmDate.getDay()].substring(
                                0,
                                3
                            )
                        );
                }
                repeatDaysCounter++;
            }
        }
        if (repeatDaysCounter === 7) {
            alarmDay = "Every Day";
        }
        if (!repeatFlag) {
            /* set alarm date. */
            alarmDay = `${date.getDate()}/${
                months[date.getMonth()]
            }/${date.getFullYear()}`;
        }

        /* set alarm time. */
        if (hour < 12) {
            meridiem = "AM";
        } else {
            hour = hour - 12;
            meridiem = "PM";
        }
        const finalAlarmTime =
            (hour < 10 ? "0" + hour.toString() : hour.toString()) +
            ":" +
            (minute < 10 ? "0" + minute.toString() : minute.toString());
        return [alarmDay, finalAlarmTime, meridiem];
    };

    /* make first character capital in string. */
    function capitalizeFirstLetter(inputString: string) {
        return inputString.charAt(0).toUpperCase() + inputString.slice(1);
    }

    const handleLabelText = useCallback(
        (alarmId: number, label: string) => {
            dispatch(updateAlarmLabelMiddleware(alarmId, label, getStateData));
            setOpenLabelDialogFlag(false);
        },
        [dispatch]
    );

    /* on click in label button icon event. */
    const handleLabelButtonEvent = (
        openDialogBoxFlag: boolean,
        alarmId: number,
        alarmLabel: string
    ) => {
        setOpenLabelDialogFlag(openDialogBoxFlag);
        setIdForOpenLabelDialogFlag(alarmId);
        setLabelText(alarmLabel);
    };

    /* set alarm ringtone. */
    const handleCloseAlarmSoundDialog = useCallback(
        (newValue?: string, rowId?: number) => {
            for (let i = 0; i < alarmDetail.alarmSounds.length; i++) {
                alarmAudio[i].current.pause();
            }
            setOpenSoundDialogFlag(false);
            if (rowId !== -1 && newValue) {
                dispatch(
                    setAlarmSoundMiddleware(rowId, newValue, getStateData)
                );
            }
        },
        [alarmDetail.alarmSounds.length, alarmAudio, dispatch]
    );

    /* play alarm ringtone. */
    const playAlarmSound = useCallback(
        (value: string) => {
            for (let i = 0; i < alarmDetail.alarmSounds.length; i++) {
                alarmAudio[i].current.pause();
            }
            alarmAudio[alarmDetail.alarmSounds.indexOf(value)].current.play();
        },
        [alarmAudio, alarmDetail.alarmSounds]
    );

    /* schedule alarm date. */
    const updateAlarmDate = useCallback(
        (alarmId: number, currentAlarmTime: Date, customDate: Date) => {
            customDate.setHours(currentAlarmTime.getHours());
            customDate.setMinutes(currentAlarmTime.getMinutes());
            dispatch(
                updateAlarmTimeMiddleware(alarmId, customDate, getStateData)
            );
        },
        [dispatch]
    );

    /* JSX code under useMemo for optimization and improving performance. */
    const alarmViewComponent = useMemo(() => {
        /* check/uncheck alarm schedule flag. */
        const handleChangeSwitch = (
            alarmId: number,
            event: React.ChangeEvent<HTMLInputElement>
        ) => {
            dispatch(
                updateAlarmScheduleFlagMiddleware(
                    alarmId,
                    event.target.checked,
                    getStateData
                )
            );
        };
        /* set repeat alarm.  */
        const handleRepeatAlarm = (
            alarmId: number,
            alarmTime: Date,
            dayOfWeek: number,
            expandIndex: number
        ) => {
            let date = new Date(alarmTime);
            const currentAlarmDayOfWeek = date.getDay();
            let newAlarmTime = date;
            if (currentAlarmDayOfWeek <= dayOfWeek) {
                newAlarmTime.setDate(
                    date.getDate() + (dayOfWeek - currentAlarmDayOfWeek)
                );
            } else {
                newAlarmTime.setDate(
                    date.getDate() + (7 - (currentAlarmDayOfWeek - dayOfWeek))
                );
            }
            setExpandBox(expandIndex);
            dispatch(
                setRepeatAlarmMiddleware(
                    alarmId,
                    newAlarmTime,
                    dayOfWeek,
                    getStateData
                )
            );
        };

        return (
            <>
                {alarmRunningPage && (
                    <AlarmRunning
                        currentAlarmAudio={currentAlarmAudio}
                        setAlarmRunningPage={setAlarmRunningPage}
                        alarmRunningLabel={alarmRunningLabel}
                        snoozeTimeInterval={Number(
                            alarmCurrentSnoozeInterval.substring(0, 2)
                        )}
                    />
                )}
                {alarmDetail.alarmSounds.map((value: string, index: number) => {
                    return (
                        <span key={index}>
                            <audio
                                ref={(e: any) =>
                                    (alarmAudio[index].current = e)
                                }
                                loop
                            >
                                <source
                                    src={`/sounds/alarm/${value}.mp3`}
                                    type="audio/mpeg"
                                />
                            </audio>
                        </span>
                    );
                })}
                {!alarmRunningPage && (
                    <Box sx={{ marginBottom: "32vh" }}>
                        {alarmDetail.alarms.map((alarm: any, index: number) => {
                            const [alarmDay, alarmTime, meridiem] =
                                convertTimeInMeridiemForm(
                                    alarm.alarmTime,
                                    alarm.repeat
                                );
                            return (
                                <Box key={alarm.id} sx={{ margin: "2vh" }}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            borderRadius: "10px",
                                            padding: "0 2vw",
                                            "@media (orientation: landscape)": {
                                                width: "70vw",
                                            },
                                        }}
                                    >
                                        <Stack
                                            direction={"row"}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                padding: "2vh 0 0 0",
                                            }}
                                        >
                                            <IconButton
                                                onClick={() =>
                                                    handleLabelButtonEvent(
                                                        true,
                                                        alarm.id,
                                                        alarm.label
                                                    )
                                                }
                                            >
                                                <LabelOutlinedIcon />
                                                <Typography
                                                    variant="body1"
                                                    sx={{ paddingLeft: "2vw" }}
                                                >
                                                    {"  "}
                                                    {alarm.label}
                                                </Typography>
                                            </IconButton>
                                            <DialogBox
                                                id={idForOpenLabelDialogFlag}
                                                open={openLabelDialogFlag}
                                                close={setOpenLabelDialogFlag}
                                                labelText={labelText}
                                                handleLabelText={
                                                    handleLabelText
                                                }
                                            />
                                            <ExpandMore
                                                expand={expand.values[index]}
                                                onClick={() =>
                                                    handleExpand(index)
                                                }
                                                aria-expanded={
                                                    expand.values[index]
                                                }
                                                aria-label="show more"
                                            >
                                                <ExpandMoreIcon />
                                            </ExpandMore>
                                        </Stack>
                                        <Stack
                                            direction={"row"}
                                            sx={{
                                                display: "flex",
                                                paddingLeft: "2vw",
                                            }}
                                        >
                                            <Typography
                                                variant="h3"
                                                sx={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {alarmTime}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    marginBottom: "1.5em",
                                                }}
                                            >
                                                {meridiem}
                                            </Typography>
                                        </Stack>
                                        <Stack
                                            direction={"row"}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                paddingLeft: "2vw",
                                            }}
                                        >
                                            {alarm.currentScheduleFlag ? (
                                                <Typography variant="body2">
                                                    {alarmDay}
                                                </Typography>
                                            ) : (
                                                <Typography
                                                    variant="body2"
                                                    sx={{ opacity: "0.5" }}
                                                >
                                                    Not Scheduled
                                                </Typography>
                                            )}
                                            <Switch
                                                checked={
                                                    alarm.currentScheduleFlag
                                                }
                                                onChange={(e) =>
                                                    handleChangeSwitch(
                                                        alarm.id,
                                                        e
                                                    )
                                                }
                                                inputProps={{
                                                    "aria-label": "controlled",
                                                }}
                                            />
                                        </Stack>
                                        <Collapse
                                            in={expand.values[index]}
                                            timeout="auto"
                                            unmountOnExit
                                        >
                                            <Stack
                                                direction={"row"}
                                                sx={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                {dayHashTable.map(
                                                    (
                                                        day,
                                                        dayHashTableIndex
                                                    ) => (
                                                        <Button
                                                            variant={
                                                                alarm.repeat[
                                                                    day
                                                                ].flag
                                                                    ? "contained"
                                                                    : "outlined"
                                                            }
                                                            key={
                                                                dayHashTableIndex
                                                            }
                                                            className={
                                                                styles.scheduleByDay
                                                            }
                                                            onClick={() =>
                                                                handleRepeatAlarm(
                                                                    alarm.id,
                                                                    alarm.alarmTime,
                                                                    dayHashTableIndex,
                                                                    index
                                                                )
                                                            }
                                                            disabled={
                                                                !alarm.currentScheduleFlag
                                                            }
                                                        >
                                                            {day
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </Button>
                                                    )
                                                )}
                                            </Stack>
                                            <Divider />
                                            <Stack direction={"row"}>
                                                <Button
                                                    onClick={() =>
                                                        setOpenDatePicker(true)
                                                    }
                                                >
                                                    <EditCalendarIcon
                                                        className={styles.icon}
                                                    />
                                                    Schedule Alarm
                                                </Button>
                                                <Dialog open={openDatePicker}>
                                                    <DialogTitle>
                                                        Custom Schedule Alarm
                                                    </DialogTitle>
                                                    <DialogContent
                                                        className={
                                                            styles.dialogBoxContent
                                                        }
                                                        dividers
                                                    >
                                                        <ResponsiveDatePickers
                                                            action={() =>
                                                                setOpenDatePicker(
                                                                    false
                                                                )
                                                            }
                                                            handleChangeDate={(
                                                                value: Date | null
                                                            ) => {
                                                                value !==
                                                                    null &&
                                                                    updateAlarmDate(
                                                                        alarm.id,
                                                                        alarm.alarmTime,
                                                                        new Date(
                                                                            value
                                                                        )
                                                                    );
                                                            }}
                                                        />
                                                    </DialogContent>
                                                </Dialog>
                                            </Stack>
                                            <Divider />
                                            <Stack direction={"row"}>
                                                <Button
                                                    onClick={() => {
                                                        setOpenSoundDialogFlag(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    <MusicNoteOutlinedIcon
                                                        className={styles.icon}
                                                    />
                                                    Sound
                                                </Button>
                                                <CustomDialog
                                                    id="alarm-ringtone"
                                                    title="Alarm Ringtone"
                                                    data={
                                                        alarmDetail.alarmSounds
                                                    }
                                                    keepMounted
                                                    value={alarm.sound}
                                                    open={openSoundDialogFlag}
                                                    onClose={
                                                        handleCloseAlarmSoundDialog
                                                    }
                                                    rowId={alarm.id}
                                                    soundFlag={true}
                                                    playSound={playAlarmSound}
                                                />
                                            </Stack>
                                            <Divider />
                                            <Stack direction={"row"}>
                                                <Button
                                                    onClick={() =>
                                                        dispatch(
                                                            deleteAlarmMiddleware(
                                                                alarm.id,
                                                                getStateData
                                                            )
                                                        )
                                                    }
                                                >
                                                    <DeleteOutlineOutlinedIcon
                                                        className={styles.icon}
                                                    />
                                                    Delete
                                                </Button>
                                            </Stack>
                                        </Collapse>
                                    </Card>
                                </Box>
                            );
                        })}
                    </Box>
                )}
            </>
        );
    }, [
        alarmAudio,
        alarmCurrentSnoozeInterval,
        alarmDetail.alarmSounds,
        alarmDetail.alarms,
        alarmRunningLabel,
        alarmRunningPage,
        convertTimeInMeridiemForm,
        currentAlarmAudio,
        dispatch,
        expand.values,
        handleCloseAlarmSoundDialog,
        handleExpand,
        handleLabelText,
        idForOpenLabelDialogFlag,
        labelText,
        openDatePicker,
        openLabelDialogFlag,
        openSoundDialogFlag,
        playAlarmSound,
        updateAlarmDate,
    ]);

    return <>{alarmViewComponent}</>;
}

export default memo(AlarmView);
