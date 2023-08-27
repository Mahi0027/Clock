import React, { useEffect, useState } from "react";
import TopNavbar from "@/components/TopNavbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ClockSetting from "@/components/setting/clock";
import AlarmSetting from "@/components/setting/alarm";
import TimerSetting from "@/components/setting/timer";
import PersonalizeSetting from "@/components/setting/personalize";
import { useSelector } from "react-redux";

const menuItems = ["Privacy policy", "Send feedback", "Help"];
function Setting() {
    const currentTheme: string = useSelector(
        (state: any) => state.theme.currentTheme
    );
    const [myTheme, setMyTheme] = useState({});

    useEffect(() => {
        if (currentTheme === "light") {
            setMyTheme({
                backgroundColor: "#fff",
            });
        } else {
            setMyTheme({
                backgroundColor: "#000000",
            });
        }
    }, [currentTheme]);
    return (
        <>
            <TopNavbar
                heading={"Setting"}
                menuItemsProps={menuItems}
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

export default Setting;
