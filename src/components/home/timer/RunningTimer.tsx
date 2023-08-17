import {
    Box,
    Card,
    Collapse,
    IconButton,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import CircularWithValueLabel from "./miscellanceous/CircularWithValueLabel";
import DialogBox from "./miscellanceous/DialogBox";
import { updateTimerLabel } from "@/redux";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

function RunningTimer() {
    const stateData = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const [openLabelDialogFlag, setOpenLabelDialogFlag] = useState(false);
    const [idForOpenLabelDialogFlag, setIdForOpenLabelDialogFlag] = useState(0);
    const [labelText, setLabelText] = useState("");
    const [expand, setExpand] = useState<{
        values: boolean[];
        dependency: number;
    }>({ values: [], dependency: -1 });

    useEffect(() => {
        console.log(stateData.timer);
    }, [stateData.timer]);

    const handleLabelButtonEvent = (
        openDialogBoxFlag: boolean,
        timerId: number,
        timerLabel: string
    ) => {
        setOpenLabelDialogFlag(openDialogBoxFlag);
        setIdForOpenLabelDialogFlag(timerId);
        setLabelText(timerLabel);
    };
    const handleLabelText = (timerId: number, label: string) => {
        dispatch(updateTimerLabel(timerId, label));
        setOpenLabelDialogFlag(false);
    };

    const handleExpand = (index: number) => {
        const updatedTempExpand = expand.values;
        updatedTempExpand[index] = !updatedTempExpand[index];
        setExpand({ values: updatedTempExpand, dependency: index });
    };
    return (
        <Box sx={{ marginBottom: "32vh" }}>
            {stateData.timer.timers.map((timer: any, index: number) => {
                return (
                    <Box key={timer.id} sx={{ margin: "2vh" }}>
                        <Card
                            variant="outlined"
                            sx={{
                                borderRadius: "10px",
                                padding: "0 2vw",
                            }}
                        >
                            <Stack
                                direction={"row"}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "2vh 0",
                                }}
                            >
                                <IconButton
                                    onClick={() =>
                                        handleLabelButtonEvent(
                                            true,
                                            timer.id,
                                            timer.label
                                        )
                                    }
                                >
                                    <LabelOutlinedIcon />
                                    <Typography
                                        variant="body1"
                                        sx={{ paddingLeft: "2vw" }}
                                    >
                                        {"  "}
                                        {timer.label}
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
                                    justifyContent: "center",
                                    paddingLeft: "2vw",
                                }}
                            >
                                <CircularWithValueLabel timerdetails={timer} />
                            </Stack>
                            <Collapse
                                in={expand.values[index]}
                                timeout="auto"
                                unmountOnExit
                            >
                                <Typography>sldfskjfldjfldsj</Typography>
                            </Collapse>
                        </Card>
                    </Box>
                );
            })}
        </Box>
    );
}

export default RunningTimer;
