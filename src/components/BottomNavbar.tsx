import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentHomePage } from "@/redux";
import styles from "../styles/components/BottomNavbar.module.scss";

function BottomNavbar() {
    const { currentHomePage, currentTheme } = useSelector((state: any) => ({
        currentHomePage: state.homePage.currentHomePage,
        currentTheme: state.theme.currentTheme,
    }));
    const dispatch = useDispatch();

    return (
        <>
            <Paper
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                }}
                elevation={5}
            >
                <BottomNavigation
                    showLabels
                    value={currentHomePage}
                    onChange={(event, newValue) => {
                        dispatch(setCurrentHomePage(newValue));
                    }}
                >
                    <BottomNavigationAction
                        label="Clock"
                        icon={<AccessTimeIcon />}
                        className={
                            currentHomePage === 0
                                ? currentTheme === "light"
                                    ? styles.selectedTabForLightTheme
                                    : styles.selectedTabForDarkTheme
                                : ""
                        }
                    />
                    <BottomNavigationAction
                        label="Alarm"
                        icon={<AccessAlarmIcon />}
                        className={
                            currentHomePage === 1
                                ? currentTheme === "light"
                                    ? styles.selectedTabForLightTheme
                                    : styles.selectedTabForDarkTheme
                                : ""
                        }
                    />
                    <BottomNavigationAction
                        label="Timer"
                        icon={<HourglassBottomIcon />}
                        className={
                            currentHomePage === 2
                                ? currentTheme === "light"
                                    ? styles.selectedTabForLightTheme
                                    : styles.selectedTabForDarkTheme
                                : ""
                        }
                    />
                    <BottomNavigationAction
                        label="Stopwatch"
                        icon={<TimerOutlinedIcon />}
                        className={
                            currentHomePage === 3
                                ? currentTheme === "light"
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
