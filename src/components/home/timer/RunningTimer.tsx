import { Box, Card, IconButton, Stack, Switch, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import CircularWithValueLabel from "./miscellanceous/CircularWithValueLabel";

function RunningTimer() {
    const stateData = useSelector((state: any) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(stateData.timer);
    }, [stateData.timer]);

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
                                    padding: "2vh 0 0 0",
                                }}
                            >
                                <IconButton
                                    onClick={() =>
                                        // handleLabelButtonEvent(
                                        //     true,
                                        //     alarm.id,
                                        //     alarm.label
                                        // )
                                        alert("Hello Mahi")
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
                                {/* <DialogBox
                                    id={idForOpenLabelDialogFlag}
                                    open={openLabelDialogFlag}
                                    close={setOpenLabelDialogFlag}
                                    labelText={labelText}
                                    handleLabelText={handleLabelText}
                                /> */}
                                {/* <ExpandMore
                                    expand={expand.values[index]}
                                    onClick={() => handleExpand(index)}
                                    aria-expanded={expand.values[index]}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore> */}
                            </Stack>
                            {/* <Stack
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
                                    Hello Mahi
                                </Typography>
                            </Stack> */}
                            <Stack
                                direction={"row"}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingLeft: "2vw",
                                }}
                            >
                                {/* {timer.currentScheduleFlag ? (
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
                                )} */}
                                <CircularWithValueLabel
                                    id={timer.id}
                                    time={timer.timerTime}
                                />
                                {/* <Switch
                                    checked={timer.currentScheduleFlag}
                                    onChange={(e) =>
                                        // handleChangeSwitch(timer.id, e)
                                        alert("Hello mahi")
                                    }
                                    inputProps={{
                                        "aria-label": "controlled",
                                    }}
                                /> */}
                            </Stack>
                        </Card>
                    </Box>
                );
            })}
        </Box>
    );
}

export default RunningTimer;
