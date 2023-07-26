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
import { useDispatch, useSelector } from "react-redux";
import { setCurrentHomePage } from "@/redux";
import styles from "../styles/components/BottomNavbar.module.scss";
interface Temp {
    id: number;
    value: string;
}
function BottomNavbar() {
    const [navValue, setNavValue] = useState<Number>(0);
    const stateData = useSelector((state: any) => state);
    const dispatch = useDispatch();

    return (
        <>
            <Paper
                sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                elevation={5}
            >
                <BottomNavigation
                    showLabels
                    value={navValue}
                    onChange={(event, newValue) => {
                        setNavValue(newValue);
                        dispatch(setCurrentHomePage(newValue));
                    }}
                >
                    <BottomNavigationAction
                        label="Clock"
                        icon={<AccessTimeIcon />}
                        className={
                            navValue === 0
                                ? stateData.theme.currentTheme === "light"
                                    ? styles.selectedTabForLightTheme
                                    : styles.selectedTabForDarkTheme
                                : ""
                        }
                    />
                    <BottomNavigationAction
                        label="Alarm"
                        icon={<AccessAlarmIcon />}
                        className={
                            navValue === 1
                                ? stateData.theme.currentTheme === "light"
                                    ? styles.selectedTabForLightTheme
                                    : styles.selectedTabForDarkTheme
                                : ""
                        }
                    />
                    <BottomNavigationAction
                        label="Timer"
                        icon={<HourglassBottomIcon />}
                        className={
                            navValue === 2
                                ? stateData.theme.currentTheme === "light"
                                    ? styles.selectedTabForLightTheme
                                    : styles.selectedTabForDarkTheme
                                : ""
                        }
                    />
                    <BottomNavigationAction
                        label="Stopwatch"
                        icon={<TimerOutlinedIcon />}
                        className={
                            navValue === 3
                                ? stateData.theme.currentTheme === "light"
                                    ? styles.selectedTabForLightTheme
                                    : styles.selectedTabForDarkTheme
                                : ""
                        }
                    />
                </BottomNavigation>
            </Paper>
        </>
    );
}

export default BottomNavbar;
