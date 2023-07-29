import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/components/home/alarm/AlarmView.module.scss";
import { getAllAlarm, updateAlarmScheduleFlag } from "@/redux";
import { styled } from "@mui/material/styles";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    ListItemButton,
    ListItemText,
    Paper,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

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

function AlarmView() {
    const stateData = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const [expand, setExpand] = useState<{
        values: boolean[];
        dependency: number;
    }>({ values: [], dependency: -1 });

    useEffect(() => {
        console.log(stateData.alarm);
        setExpandState(stateData.alarm.alarms.length);
        dispatch(getAllAlarm());
    }, [dispatch]);

    useEffect(() => {
        console.log("updated:", stateData.alarm);
        dispatch(getAllAlarm());
        setExpandState(stateData.alarm.alarms.length);
    }, [stateData.alarm]);

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

    return (
        <>
            <Box sx={{ marginBottom: "32vh" }}>
                {stateData.alarm.alarms.map((alarm: any, index: number) => {
                    const [alarmTime, meridiem] = convertTimeInMeridiemForm(
                        alarm.alarmTime
                    );
                    return (
                        <Box key={alarm.id} sx={{ margin: "2vw" }}>
                            <Card
                                variant="outlined"
                                sx={{ borderRadius: "10px",padding: "0 2%" }}
                            >
                                <Stack
                                    direction={"row"}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        border: "solid 1px red"
                                    }}
                                >
                                    <Typography>
                                        label
                                    </Typography>
                                    <CardActions disableSpacing>
                                        <ExpandMore
                                            expand={expand.values[index]}
                                            onClick={() => handleExpand(index)}
                                            aria-expanded={expand.values[index]}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </ExpandMore>
                                    </CardActions>
                                </Stack>
                                <Stack
                                    direction={"row"}
                                    sx={{
                                        display: "flex"
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
                                {/* <CardActions disableSpacing> */}
                                    {/* <Typography
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
                                    </Typography> */}
                                    {/* <ExpandMore
                                        expand={expand.values[index]}
                                        onClick={() => handleExpand(index)}
                                        aria-expanded={expand.values[index]}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </ExpandMore> */}
                                {/* </CardActions> */}
                                <Stack
                                    direction={"row"}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: "0 2%",
                                    }}
                                >
                                    {alarm.currentScheduleFlag ? (
                                        <Typography>Scheduled</Typography>
                                    ) : (
                                        <Typography
                                            variant="caption"
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
                                    <CardContent>
                                        <Typography>{index} </Typography>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Box>
                    );
                })}
            </Box>
        </>
    );
}

export default AlarmView;
