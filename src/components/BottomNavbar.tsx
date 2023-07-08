import {
    BottomNavigation,
    BottomNavigationAction,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
interface Temp {
    id: number;
    value: string;
}
const temp: readonly Temp[] = [
    {
        id: 0,
        value: "abcd0",
    },
    {
        id: 1,
        value: "abcd1",
    },
    {
        id: 2,
        value: "abcd2",
    },
    {
        id: 3,
        value: "abcd3",
    },
];
function BottomNavbar() {
    const [navValue, setNavValue] = useState<Number>(0);
    const [message, setMessage] = useState<null | string>(null);
    useEffect(() => {
        console.log(navValue);
        let text = temp.filter(({ id, value }, index) => navValue === id);
        console.log(text)
        setMessage(text[0].value);

    }, [navValue]);

    return (
        <>
            <Stack sx={{ textAlign: "center" }}>
                <Typography
                    variant="h3"
                    sx={{ marginTop: "40vh" }}
                >
                    {message}
                </Typography>
                <Paper
                    sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                    elevation={5}
                >
                    <BottomNavigation
                        showLabels
                        value={navValue}
                        onChange={(event, newValue) => {
                            setNavValue(newValue);
                        }}
                    >
                        <BottomNavigationAction
                            label="Alarm"
                            icon={<AccessAlarmIcon />}
                        />
                        <BottomNavigationAction
                            label="Clock"
                            icon={<AccessTimeIcon />}
                        />
                        <BottomNavigationAction
                            label="Timer"
                            icon={<HourglassBottomIcon />}
                        />
                        <BottomNavigationAction
                            label="Stopwatch"
                            icon={<TimerOutlinedIcon />}
                        />
                    </BottomNavigation>
                </Paper>
            </Stack>
        </>
    );
}

export default BottomNavbar;
