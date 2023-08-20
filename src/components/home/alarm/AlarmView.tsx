import React, { RefObject, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/components/home/alarm/AlarmView.module.scss";
import {
    deleteAlarm,
    getAllAlarm,
    updateAlarmLabel,
    updateAlarmScheduleFlag,
} from "@/redux";
import { styled } from "@mui/material/styles";
import {
    Box,
    Button,
    Card,
    CardContent,
    Collapse,
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
import { setAlarmSound } from "@/redux/features/home/alarm/actions";
import AlarmRunning from "./AlarmRunning";

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
function AlarmView({ scrollToTop, closeScrollToTop }: AlarmViewProps) {
    let prevTimeOut = 0;
    const stateData = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const [expand, setExpand] = useState<{
        values: boolean[];
        dependency: number;
    }>({ values: [], dependency: -1 });
    const [openLabelDialogFlag, setOpenLabelDialogFlag] = useState(false);
    const [openSoundDialogFlag, setOpenSoundDialogFlag] = useState(false);
    const [idForOpenLabelDialogFlag, setIdForOpenLabelDialogFlag] = useState(0);
    const [labelText, setLabelText] = useState("");
    const [alarmTimeOut, setAlarmTimeOut] = useState<any>([]);
    const [alarmRunningPage, setAlarmRunningPage] = useState(false);
    const [alarmRunningLabel, setAlarmRunningLabel] = useState("");
    const [currentAlarmAudio, setCurrentAlarmAudio] = useState<any>(null);

    const alarmAudio = Array.from(
        { length: stateData.alarm.alarmSounds.length },
        useRef
    );

    useEffect(() => {
        setExpandState(stateData.alarm.alarms.length);
        dispatch(getAllAlarm());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllAlarm());
        setExpandState(stateData.alarm.alarms.length);
        // setAlarmTimeOut(Array.from({ length: stateData.alarm.alarms.length }));
        setAlarms();

        if (scrollToTop) {
            // Scroll to the top
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            closeScrollToTop();
        }
    }, [stateData.alarm]);

    /* set all alarms. */
    const setAlarms = () => {
        /* for clearing timeouts. */
        for (let i = 0; i < alarmTimeOut.length; i++) {
            if (alarmTimeOut[i] !== undefined) {
                clearExtraTimeout(prevTimeOut, alarmTimeOut[i]);
                prevTimeOut = alarmTimeOut[i];
            }
        }
        let tempAlarmTimeout = Array.from({
            length: stateData.alarm.alarms.length,
        });
        stateData.alarm.alarms.map((value:any, index:number) => {
            if (value.currentScheduleFlag) {
                const givenTime = new Date(value.alarmTime);
                const currentTime = new Date();

                if (givenTime < currentTime) {
                    /* set time is past then automatically off alarm. 
                        This functionality need to revise after adding date in alarm time.
                    */
                    dispatch(updateAlarmScheduleFlag(value.id, false));
                } else {
                    /* set alarm. */
                    const timeDiff:number = givenTime.getTime() - currentTime.getTime();
                    let alarmDOM = new Audio(
                        `/sounds/alarm/${value.sound}.mp3`
                    );
                    tempAlarmTimeout[index] = setTimeout(() => {
                        setCurrentAlarmAudio(alarmDOM);
                        alarmDOM.currentTime = 0;
                        alarmDOM.loop = true;
                        alarmDOM.play();
                        setAlarmRunningPage(true);
                        setAlarmRunningLabel(value.label);
                        dispatch(updateAlarmScheduleFlag(value.id, false));
                    }, timeDiff);
                }
            }
        });
        setAlarmTimeOut(tempAlarmTimeout);
    };

    const clearExtraTimeout = (prevTimeOut: number, CurrentTimeOut: number) => {
        for (let i = prevTimeOut; i < CurrentTimeOut; i++) {
            clearTimeout(i);
        }
    };

    /* it use to manage expand state variable */
    const setExpandState = (length: number) => {
        setExpand({ values: [], dependency: -1 }); //set to default
        for (let i = 0; i < length; i++) {
            setExpand((prevState) => ({
                ...prevState,
                values: [...prevState.values, false],
            }));
        }
    };
    0;

    const handleExpand = (index: number) => {
        const updatedTempExpand = expand.values;
        updatedTempExpand[index] = !updatedTempExpand[index];
        setExpand({ values: updatedTempExpand, dependency: index });
    };

    const convertTimeInMeridiemForm = (time: Date) => {
        let date = new Date(time);
        let hour = Number(date.getHours());
        let minute = Number(date.getMinutes());
        let meridiem = "";
        if (hour <= 12) {
            meridiem = "AM";
        } else {
            hour = hour - 12;
            meridiem = "PM";
        }

        const finalAlarmTime =
            (hour < 10 ? "0" + hour.toString() : hour.toString()) +
            ":" +
            (minute < 10 ? "0" + minute.toString() : minute.toString());
        return [finalAlarmTime, meridiem];
    };

    /* check/uncheck alarm schedule flag. */
    const handleChangeSwitch = (
        alarmId: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(updateAlarmScheduleFlag(alarmId, event.target.checked));
    };

    const handleLabelText = (alarmId: number, label: string) => {
        dispatch(updateAlarmLabel(alarmId, label));
        setOpenLabelDialogFlag(false);
    };

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

    /* on click on delete button. */
    const handleDeleteAlarmEvent = (alarmId: number) => {
        dispatch(deleteAlarm(alarmId));
    };

    const handleCloseAlarmSoundDialog = (newValue?: string, rowId?: number) => {
        for (let i = 0; i < stateData.alarm.alarmSounds.length; i++) {
            alarmAudio[i].current.pause();
        }
        setOpenSoundDialogFlag(false);
        if (rowId !== -1 && newValue) {
            dispatch(setAlarmSound(rowId, newValue));
        }
    };

    const playAlarmSound = (value: string) => {
        for (let i = 0; i < stateData.alarm.alarmSounds.length; i++) {
            alarmAudio[i].current.pause();
        }
        alarmAudio[stateData.alarm.alarmSounds.indexOf(value)].current.play();
    };
    return (
        <>
            {alarmRunningPage && (
                <AlarmRunning
                    currentAlarmAudio={currentAlarmAudio}
                    setAlarmRunningPage={setAlarmRunningPage}
                    alarmRunningLabel={alarmRunningLabel}
                />
            )}
            {stateData.alarm.alarmSounds.map((value: string, index: number) => {
                return (
                    <span key={index}>
                        <audio
                            ref={(e: any) => (alarmAudio[index].current = e)}
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
                    {stateData.alarm.alarms.map((alarm: any, index: number) => {
                        const [alarmTime, meridiem] = convertTimeInMeridiemForm(
                            alarm.alarmTime
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
                                            handleLabelText={handleLabelText}
                                        />
                                        <ExpandMore
                                            expand={expand.values[index]}
                                            onClick={() => handleExpand(index)}
                                            aria-expanded={expand.values[index]}
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
                                            variant="h4"
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
                                                Scheduled
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
                                            checked={alarm.currentScheduleFlag}
                                            onChange={(e) =>
                                                handleChangeSwitch(alarm.id, e)
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
                                        <Stack direction={"row"}>
                                            <Button
                                                onClick={() => {
                                                    // handleSoundAlarmEvent();
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
                                                    stateData.alarm.alarmSounds
                                                }
                                                keepMounted
                                                value={alarm.sound}
                                                open={openSoundDialogFlag}
                                                onClose={
                                                    handleCloseAlarmSoundDialog
                                                }
                                                rowId={alarm.id}
                                                alarmSoundFlag={true}
                                                playAlarmSound={playAlarmSound}
                                            />
                                        </Stack>
                                        <Stack direction={"row"}>
                                            <Button
                                                onClick={() =>
                                                    handleDeleteAlarmEvent(
                                                        alarm.id
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
}

export default AlarmView;
