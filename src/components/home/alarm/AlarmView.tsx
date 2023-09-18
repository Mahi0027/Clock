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
    /* The above code is a TypeScript React component. It is using the useSelector and useDispatch
    hooks from the react-redux library to access and update the state of the application. It is
    retrieving specific properties from the state object, such as alarmDetail, alarmCurrentVolume,
    alarmCurrentSilentInterval, and alarmCurrentSnoozeInterval. */
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
    }>({
        values: [],
        dependency: -1,
    });
    const [openLabelDialogFlag, setOpenLabelDialogFlag] = useState<boolean>(
        false
    );
    const [openSoundDialogFlag, setOpenSoundDialogFlag] = useState<boolean>(
        false
    );
    const [idForOpenLabelDialogFlag, setIdForOpenLabelDialogFlag] = useState<
        number
    >(0);
    const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
    const [labelText, setLabelText] = useState<string>("");
    const [alarmTimeOut, setAlarmTimeOut] = useState<any>([]);
    const [alarmRunningPage, setAlarmRunningPage] = useState<boolean>(false);
    const [alarmRunningLabel, setAlarmRunningLabel] = useState<string>("");
    const [currentAlarmAudio, setCurrentAlarmAudio] = useState<any>(null);
    const [expandBox, setExpandBox] = useState<number>(-1);
    const alarmAudio = Array.from(
        {
            length: alarmDetail.alarmSounds.length,
        },
        useRef
    );

    /* The above code is a useEffect hook in a TypeScript React component. It is used to perform side
    effects in functional components. */
    useEffect(() => {
        setExpandState(alarmDetail.alarms.length, expandBox);
        setExpandBox(-1);
        dispatch(getAllAlarm());
    }, [dispatch]);

    /* The above code is defining a function called `getStateData` using the `useCallback` hook in a
    TypeScript React component. The function returns the value of the `alarmDetail` variable. The
    `useCallback` hook is used to memoize the function, meaning that it will only be re-created if
    the `alarmDetail` variable changes. */
    const getStateData = useCallback(() => {
        return alarmDetail;
    }, [alarmDetail]);
    /* The above code is a useEffect hook in a TypeScript React component. It is used to perform
    certain actions when the dependencies specified in the second argument (in this case,
    [alarmDetail]) change. */
    useEffect(() => {
        // getStateData();
        // dispatch(getAllAlarm());
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
    /**
     * The `setAlarms` function sets alarms based on the provided alarm details and schedules them to
     * ring at the specified times.
     */
    const setAlarms = async () => {
        let tempAlarmTimeout = Array.from({
            length: alarmDetail.alarms.length,
        });
        alarmDetail.alarms.map(async (value: any, index: number) => {
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
                        await updateAlarmScheduleFlagMiddleware(
                            value.id,
                            false,
                            getStateData
                        )(dispatch);
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
    /**
     * The function starts an alarm ringing, sets up the alarm audio, plays the sound, updates the
     * alarm label, and stops the alarm after a specific time interval.
     * @param {boolean} repeatFlag - A boolean flag indicating whether the alarm should repeat or not.
     * @param {number} id - The `id` parameter is a number that represents the unique identifier of the
     * alarm.
     * @param {string} label - The label is a string that represents the label or name of the alarm.
     * @param {string} sound - The `sound` parameter is a string that represents the name of the sound
     * file to be played for the alarm. It is used to construct the file path for the audio file.
     */
    const startAlarmRinging = async (
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
            await updateAlarmScheduleFlagMiddleware(
                id,
                false,
                getStateData
            )(dispatch);
        }
        const timeInterval = Number(alarmCurrentSilentInterval.substring(0, 2));
        /* stop alarm after specific time. */
        setTimeout(() => {
            alarmDOM.pause();
            setAlarmRunningPage(false);
        }, timeInterval * 60 * 1000); /* 60=seconds,1000=milliseconds */
    };

    /* it use to manage expand state variable */
    /**
     * The function `setExpandState` sets the expand state of an array of values, with one value being
     * set to `true` and the rest being set to `false`, based on the provided index.
     * @param {number} length - The length parameter is the total number of items in the list or array
     * that you want to set the expand state for.
     * @param index - The `index` parameter is an optional parameter that specifies the index of the
     * element that should be expanded. If no index is provided, all elements will be set to the
     * default state.
     */
    const setExpandState = (length: number, index = -1) => {
        setExpand({
            values: [],
            dependency: -1,
        }); //set to default
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

    /* The above code is defining a function called `handleExpand` in a TypeScript React component.
    This function takes an `index` parameter of type `number`. */
    const handleExpand = useCallback(
        (index: number) => {
            const updatedTempExpand = expand.values;
            updatedTempExpand[index] = !updatedTempExpand[index];
            setExpand({
                values: updatedTempExpand,
                dependency: index,
            });
        },
        [expand.values]
    );

    /* The above code is a TypeScript React function that converts a given time into a specific format.
    It takes in two parameters: `time` (a Date object) and `repeat` (an object containing
    information about repeated alarms for different days). */
    const convertTimeInMeridiemForm = useCallback((time: Date, repeat: any) => {
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
    }, []);

    /* make first character capital in string. */
    /**
     * The function capitalizes the first letter of a given string.
     * @param {string} inputString - The inputString parameter is a string that represents the input
     * text that you want to capitalize the first letter of.
     * @returns the input string with the first letter capitalized.
     */
    function capitalizeFirstLetter(inputString: string) {
        return inputString.charAt(0).toUpperCase() + inputString.slice(1);
    }

    /* The above code is defining a function called `handleLabelText` in a TypeScript React component.
    This function is using the `useCallback` hook to memoize the function and optimize performance. */
    const handleLabelText = useCallback(
        async (alarmId: number, label: string) => {
            await updateAlarmLabelMiddleware(
                alarmId,
                label,
                getStateData
            )(dispatch);
            setOpenLabelDialogFlag(false);
        },
        [dispatch, getStateData]
    );

    /* on click in label button icon event. */
    /**
     * The function `handleLabelButtonEvent` sets the state variables `openLabelDialogFlag`,
     * `idForOpenLabelDialogFlag`, and `labelText` based on the provided parameters.
     * @param {boolean} openDialogBoxFlag - A boolean flag indicating whether the label dialog box
     * should be opened or closed.
     * @param {number} alarmId - The alarmId parameter is a number that represents the unique
     * identifier of an alarm.
     * @param {string} alarmLabel - The `alarmLabel` parameter is a string that represents the label of
     * an alarm.
     */
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
    /* The above code is defining a function called `handleCloseAlarmSoundDialog` using the
    `useCallback` hook. This function is used to handle the closing of an alarm sound dialog. */
    const handleCloseAlarmSoundDialog = useCallback(
        async (newValue?: string, rowId?: number) => {
            for (let i = 0; i < alarmDetail.alarmSounds.length; i++) {
                alarmAudio[i].current.pause();
            }
            setOpenSoundDialogFlag(false);
            if (rowId !== -1 && newValue) {
                await setAlarmSoundMiddleware(
                    rowId,
                    newValue,
                    getStateData
                )(dispatch);
            }
        },
        [alarmDetail.alarmSounds.length, alarmAudio, getStateData, dispatch]
    );

    /* play alarm ringtone. */
    /* The above code is defining a function called `playAlarmSound` in TypeScript with React. This
    function takes a parameter `value` of type string. */
    const playAlarmSound = useCallback(
        (value: string) => {
            for (let i = 0; i < alarmDetail.alarmSounds.length; i++) {
                alarmAudio[i].current.pause();
            }
            alarmAudio[alarmDetail.alarmSounds.indexOf(value)].current.play();
        },
        [alarmAudio, alarmDetail.alarmSounds]
    );

    /* The above code is defining a function called `updateAlarmDate` using the `useCallback` hook in a
    TypeScript React component. This function takes three parameters: `alarmId` (a number),
    `currentAlarmTime` (a Date object), and `customDate` (a Date object). */
    const updateAlarmDate = useCallback(
        (alarmId: number, currentAlarmTime: Date, customDate: Date) => {
            customDate.setHours(currentAlarmTime.getHours());
            customDate.setMinutes(currentAlarmTime.getMinutes());
            updateAlarmTimeMiddleware(
                alarmId,
                customDate,
                getStateData
            )(dispatch);
        },
        [dispatch, getStateData]
    );

    /* JSX code under useMemo for optimization and improving performance. */
    /**
     * The `alarmViewComponent` function is a React component that renders a list of alarms with
     * various functionalities such as checking/unchecking alarm schedule flag, setting repeat alarms,
     * editing labels, selecting alarm sounds, and deleting alarms.
     * @param {number} alarmId - The `alarmId` parameter is a number that represents the unique
     * identifier of an alarm.
     * @param event - The `event` parameter is a React.ChangeEvent<HTMLInputElement> object. It
     * represents the event that occurred when the user interacts with the input element, such as
     * checking or unchecking a checkbox.
     */
    const alarmViewComponent = useMemo(() => {
        /* check/uncheck alarm schedule flag. */
        /**
         * The handleChangeSwitch function is an asynchronous function that updates the alarm schedule
         * flag based on the event target's checked value.
         * @param {number} alarmId - The alarmId parameter is a number that represents the unique
         * identifier of an alarm.
         * @param event - The `event` parameter is a React.ChangeEvent<HTMLInputElement> object. It
         * represents the event that occurred when the user interacts with the input element, such as
         * checking or unchecking a checkbox.
         */
        const handleChangeSwitch = async (
            alarmId: number,
            event: React.ChangeEvent<HTMLInputElement>
        ) => {
            await updateAlarmScheduleFlagMiddleware(
                alarmId,
                event.target.checked,
                getStateData
            )(dispatch);
        };
        /* set repeat alarm.  */
        /**
         * The function `handleRepeatAlarm` sets a new alarm time based on the specified day of the
         * week and updates the state with the new alarm time.
         * @param {number} alarmId - The ID of the alarm that needs to be repeated.
         * @param {Date} alarmTime - The time at which the alarm is set to go off. It is a Date object
         * representing the specific date and time of the alarm.
         * @param {number} dayOfWeek - The `dayOfWeek` parameter represents the day of the week for
         * which the alarm should be repeated. It is a number that corresponds to the day of the week,
         * where Sunday is 0, Monday is 1, and so on.
         * @param {number} expandIndex - The `expandIndex` parameter is used to determine which alarm's
         * details should be expanded or displayed. It is an index value that helps identify the
         * specific alarm in a list or array.
         */
        const handleRepeatAlarm = async (
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
            await setRepeatAlarmMiddleware(
                alarmId,
                newAlarmTime,
                dayOfWeek,
                getStateData
            )(dispatch);
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
                    <Box
                        sx={{
                            marginBottom: "32vh",
                        }}
                    >
                        {alarmDetail.alarms.map((alarm: any, index: number) => {
                            const [
                                alarmDay,
                                alarmTime,
                                meridiem,
                            ] = convertTimeInMeridiemForm(
                                alarm.alarmTime,
                                alarm.repeat
                            );
                            return (
                                <Box
                                    key={alarm.id}
                                    sx={{
                                        margin: "2vh",
                                    }}
                                >
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
                                                    sx={{
                                                        paddingLeft: "2vw",
                                                    }}
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
                                                    sx={{
                                                        opacity: "0.5",
                                                    }}
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
                                                    onClick={async () =>
                                                        await deleteAlarmMiddleware(
                                                            alarm.id,
                                                            getStateData
                                                        )(dispatch)
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
        getStateData,
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
