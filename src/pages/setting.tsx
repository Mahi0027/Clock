import React from "react";
import TopNavbar from "@/components/TopNavbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ClockSetting from "@/components/setting/clock";
import AlarmSetting from "@/components/setting/alarm";
import TimerSetting from "@/components/setting/timer";
function setting() {
    return (
        <>
            <TopNavbar
                heading={"Setting"}
                menuItemsProps={["Privacy policy", "Send feedback", "Help"]}
                homepage={false}
            />
            <List
                sx={{
                    bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
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
