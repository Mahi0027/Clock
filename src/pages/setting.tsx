import React, { useEffect, useState } from "react";
import TopNavbar from "@/components/TopNavbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ClockSetting from "@/components/setting/clock";
import AlarmSetting from "@/components/setting/alarm";
import TimerSetting from "@/components/setting/timer";
import PersonalizeSetting from "@/components/setting/personalize";
import { Box, Paper } from "@mui/material";
import Layout from "@/components/Layout";
import { useSelector } from "react-redux";
import { initialStatesTypes } from "@/redux/features/setting/personalize/theme/themeReducer";
function setting() {
    const stateData: initialStatesTypes = useSelector(
        (state: any) => state.theme
    );
    const [myTheme, setMyTheme] = useState({});

    useEffect(() => {
        if (stateData.currentTheme === "light") {
            setMyTheme({
                backgroundColor: "#fff",
            });
        } else {
            setMyTheme({
                backgroundColor: "#000000",
            });
        }
    }, [stateData.currentTheme]);
    return (
        <>
            <TopNavbar
                heading={"Setting"}
                menuItemsProps={["Privacy policy", "Send feedback", "Help"]}
                homepage={false}
            />
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                sx={myTheme}
            >
                <PersonalizeSetting />
                <Divider />
                <ClockSetting />
                <Divider />
                <AlarmSetting />
                <Divider />
                <TimerSetting />
            </List>
        </>
    );
}

export default setting;
