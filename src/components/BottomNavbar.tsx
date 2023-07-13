import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { DataContext } from "@/contexts/DataComponent";
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
    const { mode, updateMode } = useContext(DataContext);
    const [navValue, setNavValue] = useState<Number>(0);
    const [message, setMessage] = useState<null | string>(null);
    useEffect(() => {
        console.log(navValue);
        let text = temp.filter(({ id, value }, index) => navValue === id);
        console.log(text);
        setMessage(text[0].value);
    }, [navValue]);

    useEffect(() => {
        console.log("addddddddd",mode);
        
    }, [mode]);
    

    return (
        <>
        <Box>

            <Stack sx={{ textAlign: "center" }}>
                <Typography
                    variant="h3"
                    sx={{
                        marginTop: "50%",
                    }}
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
                            label="Clock"
                            icon={<AccessTimeIcon />}
                        />
                        <BottomNavigationAction
                            label="Alarm"
                            icon={<AccessAlarmIcon />}
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
        </Box>
        </>
    );
}

export default BottomNavbar;
